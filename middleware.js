// Sets _detected_lang cookie before HTML is served so React reads the correct
// language synchronously on first render (no Czech→English flash for CZ visitors).
export const config = { matcher: '/' }

export default async function middleware(request) {
  const cookieHeader = request.headers.get('cookie') || ''
  const hasManualPref = cookieHeader.split(';').some((c) => c.trim().startsWith('lang='))
  if (hasManualPref) return

  const country = request.headers.get('x-vercel-ip-country') ?? ''
  const detectedLang = country === 'CZ' ? 'cs' : 'en'

  const response = await fetch(request)
  const headers = new Headers(response.headers)
  headers.append(
    'Set-Cookie',
    `_detected_lang=${detectedLang}; Path=/; SameSite=Lax; Max-Age=86400`
  )
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}
