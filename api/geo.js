/**
 * Returns the visitor's country code using Vercel's geo headers.
 * Used for automatic language detection (CZ → Czech).
 */
export default function handler(req, res) {
  const country = req.headers['x-vercel-ip-country'] || 'US'
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'no-store')
  res.status(200).json({ country })
}
