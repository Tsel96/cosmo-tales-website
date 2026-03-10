/**
 * Mailchimp subscribe endpoint — Vercel serverless function
 *
 * Environment variables required:
 *   MAILCHIMP_API_KEY  — Mailchimp API key (e.g. "abc123-us21")
 *   MAILCHIMP_LIST_ID  — Audience / list ID (e.g. "a1b2c3d4e5")
 *
 * Deploy: push to Vercel and it auto-detects /api/*.js as serverless functions.
 */

export default async function handler(req, res) {
  // CORS headers (allow the frontend origin)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body || {}
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required.' })
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY
  const LIST_ID = process.env.MAILCHIMP_LIST_ID

  if (!API_KEY || !LIST_ID) {
    console.error('Missing MAILCHIMP_API_KEY or MAILCHIMP_LIST_ID env vars')
    return res.status(500).json({ error: 'Server misconfigured.' })
  }

  // Data-center is the suffix after the dash in the API key
  const DC = API_KEY.split('-')[1]

  try {
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
      }
    )

    const data = await mcRes.json()

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
