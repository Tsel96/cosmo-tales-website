/**
 * Mailchimp subscribe endpoint — Vercel serverless function
 *
 * Environment variables required:
 *   MAILCHIMP_API_KEY  — Mailchimp API key (e.g. "abc123-us21")
 *   MAILCHIMP_LIST_ID  — Audience / list ID (e.g. "a1b2c3d4e5")
 *   FRONTEND_URL       — Production origin (e.g. "https://cosmotales.com")
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/* ─── Simple in-memory rate limiter (per serverless instance) ─── */
const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW_MS = 60_000 // 1 minute
const RATE_LIMIT_MAX = 5 // max requests per IP per window

function isRateLimited(ip) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now - entry.start > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { start: now, count: 1 })
    return false
  }

  entry.count++
  if (entry.count > RATE_LIMIT_MAX) return true
  return false
}

// Periodically clean stale entries to prevent memory leaks
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of rateLimitMap) {
    if (now - entry.start > RATE_LIMIT_WINDOW_MS * 2) rateLimitMap.delete(ip)
  }
}, RATE_LIMIT_WINDOW_MS * 2)

/* ─── User-friendly error messages by Mailchimp error title ─── */
const ERROR_MESSAGES = {
  'Invalid Resource': 'Please check your email address and try again.',
  'Forgotten Email Not Subscribed': 'This email cannot be subscribed. Please use a different address.',
  'Compliance State': 'This email cannot be subscribed due to compliance restrictions.',
}

export default async function handler(req, res) {
  // ── Require FRONTEND_URL ──
  const origin = process.env.FRONTEND_URL
  if (!origin) {
    console.error('Missing FRONTEND_URL env var')
    return res.status(500).json({ error: 'Server misconfigured.' })
  }

  res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // ── CSRF: verify Origin header matches expected frontend ──
  const reqOrigin = req.headers['origin']
  if (!reqOrigin || reqOrigin !== origin) {
    return res.status(403).json({ error: 'Forbidden.' })
  }

  // ── Rate limiting ──
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' })
  }

  const { email } = req.body || {}
  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Valid email is required.' })
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY
  const LIST_ID = process.env.MAILCHIMP_LIST_ID

  if (!API_KEY || !LIST_ID) {
    console.error('Missing MAILCHIMP_API_KEY or MAILCHIMP_LIST_ID env vars')
    return res.status(500).json({ error: 'Server misconfigured.' })
  }

  const DC = API_KEY.split('-')[1]
  if (!DC) {
    console.error('Malformed MAILCHIMP_API_KEY — expected format: <key>-<datacenter>')
    return res.status(500).json({ error: 'Server misconfigured.' })
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const mcRes = await fetch(
      `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `apikey ${API_KEY}`,
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
        }),
        signal: controller.signal,
      }
    )
    clearTimeout(timeout)

    const data = await mcRes.json().catch(() => ({}))

    if (mcRes.ok) {
      return res.status(200).json({ success: true })
    }

    // Already subscribed is not an error for the user
    if (data.title === 'Member Exists') {
      return res.status(200).json({ success: true })
    }

    // Return sanitized error — never forward raw Mailchimp detail
    const safeMessage = ERROR_MESSAGES[data.title] || 'Subscription failed. Please try again.'
    return res.status(400).json({ error: safeMessage })
  } catch (err) {
    console.error('Mailchimp API error:', err)
    return res.status(500).json({ error: 'Server error. Please try again later.' })
  }
}
