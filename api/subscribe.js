/**
 * Mailchimp subscribe endpoint — Vercel serverless function
 *
 * Environment variables required:
 *   MAILCHIMP_API_KEY  — Mailchimp API key (e.g. "abc123-us21")
 *   MAILCHIMP_LIST_ID  — Audience / list ID (e.g. "a1b2c3d4e5")
 *   FRONTEND_URL       — Production origin (e.g. "https://cosmotales.com")
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default async function handler(req, res) {
  const origin = process.env.FRONTEND_URL || ''
  res.setHeader('Access-Control-Allow-Origin', origin || 'null')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
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

    return res.status(400).json({
      error: data.detail || 'Subscription failed. Please try again.',
    })
  } catch (err) {
    console.error('Mailchimp API error:', err)
    return res.status(500).json({ error: 'Server error. Please try again later.' })
  }
}
