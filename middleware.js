/**
 * Vercel Edge Middleware — runs before the HTML is served.
 * Sets a _detected_lang cookie based on the visitor's country,
 * so the React app can read it synchronously with no language flash.
 */
export const config = { matcher: '/' }

export default async function middleware(request) {
  // If the user has already made a manual choice, don't touch anything
  const cookieHeader = request.headers.get('cookie') || ''
  if (cookieHeader.includes('lang=')) return

  const country = request.headers.get('x-vercel-ip-country') ?? ''
  const detectedLang = country === 'CZ' ? 'cs' : 'en'

  // Pass through the original response, add our cookie
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
