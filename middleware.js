// Sets _detected_lang cookie before HTML is served so React reads the correct
// language synchronously on first render (no Czech→English flash for CZ visitors).
// Also adds security headers to all responses.
export const config = { matcher: '/' }

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://use.typekit.net",
    "font-src 'self' https://fonts.gstatic.com https://use.typekit.net",
    "img-src 'self' data: https://workers.paper.design https://store.steampowered.com",
    "frame-src https://www.youtube-nocookie.com",
    "connect-src 'self' https://*.api.mailchimp.com",
  ].join('; '),
}

export default async function middleware(request) {
  const cookieHeader = request.headers.get('cookie') || ''
  const hasManualPref = cookieHeader.split(';').some((c) => c.trim().startsWith('lang='))

  const response = await fetch(request)
  const headers = new Headers(response.headers)

  // Security headers
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value)
  }

  // Language detection cookie (only if no manual preference set)
  if (!hasManualPref) {
    const country = request.headers.get('x-vercel-ip-country') ?? ''
    const detectedLang = country === 'CZ' ? 'cs' : 'en'
    headers.append(
      'Set-Cookie',
      // Not HttpOnly — client-side i18n.jsx reads this cookie during React hydration.
      // Safe: value is only ever "cs" or "en", no sensitive data.
      `_detected_lang=${detectedLang}; Path=/; SameSite=Lax; Max-Age=86400`
    )
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}
