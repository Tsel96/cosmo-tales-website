# Cosmo Tales Website — Repository Context

> Authoritative engineering context for the `cosmo-tales-website` repo. Written for a new engineer or future AI agent who needs to fully understand this codebase before touching it. Synthesized from 12 deep-read specialist passes (read → synthesize → adversarial-critique → finalize); contradictions between those passes are resolved or explicitly flagged in §10.

---

## 1. What this is

**Cosmo Tales** is the public-facing **marketing / landing website** for a retro-futuristic space game of the same name by **Bohemia Interactive a.s.** (the studio behind Arma / DayZ). The site is a single-page promotional experience plus a privacy policy: hero with a levitating ship, story blurb, three feature videos, a YouTube trailer, an email-newsletter signup (Mailchimp), and Steam-wishlist calls-to-action.

- **Owner / brand:** Bohemia Interactive a.s. Footer copyright is hardcoded `© 2026 BOHEMIA INTERACTIVE a.s.`; the BI logo links to `bohemia.net`.
- **Steam product:** app **3601630** — `https://store.steampowered.com/app/3601630/Cosmo_Tales/`.
- **Deploy target:** **Vercel** (`.vercel/` is gitignored; Edge Middleware + a serverless function are present).
- **Languages:** Bilingual **English / Czech (cs)**, with geo + browser + manual detection.
- **Design source-of-truth situation:** The repo is kept in sync with a **Paper Design** file at `app.paper.design/file/01KJPX5...`. Critically, **the code is the declared source of truth**; the standing agent task (per `.claude-context.md`) is to update the *Paper Design file to match the code*, not the reverse. A local **Paper MCP server** (`.mcp.json`, `127.0.0.1:29979`) lets an agent read the live design file and reconcile it. Some image assets are still served from Paper's CDN (`workers.paper.design/file-assets/01KJPX5MQYW5WMXDR20PGMHFVR/`).
- **README is NOT a source of truth:** `README.md` is the unmodified default "React + Vite" template and describes neither the real stack nor the product. Use this document and `.claude-context.md` instead.
- **Meta tags:** `home.jsx` and `privacy.jsx` each export `meta()`; `root.jsx` does **not**. Home's `meta()` emits an **English** `<title>` (`"Cosmo Tales — Journey Beyond the Stars"`, identical to the i18n `en.metaTitle`) plus a `name="description"` tag. The i18n `useEffect` later overwrites **`document.title` only** per language — the meta **description stays English permanently** (see §10).

---

## 2. Stack & architecture

| Layer | Choice | Notes |
|---|---|---|
| UI runtime | **React 19** (`react`/`react-dom` ^19.2.0) | Plain JSX, no TypeScript. |
| Build / dev | **Vite 7** (^7.3.1) | Driven by the React Router CLI, not invoked directly. |
| Framework | **React Router v7** (^7.6.1, lock-resolved 7.13.1), **framework mode**, **SPA (`ssr: false`)** | `react-router.config.js` exports `{ ssr: false }` → fully client-rendered. |
| Styling | **Tailwind CSS v4** (^4.2.1) via `@tailwindcss/vite` | Config-less; no `tailwind.config.js` / `postcss.config.js`. Tokens live in CSS `@theme`. |
| Hosting | **Vercel** | Static SPA + 1 Edge Middleware + 1 serverless function. |
| Smooth scroll | **Lenis** (^1.3.21) | |
| Scroll animation | **GSAP + ScrollTrigger** (^3.14.2) | |
| Shader accents | **@paper-design/shaders-react** (^0.0.71) | `PulsingBorder` glow behind CTA buttons. |
| Haptics | **web-haptics** (^0.0.6) | |
| Dev overlay | **agentation** (^2.3.3) | dev-only. |

**SPA implications:** Because `ssr: false`, rendering is client-only. `root.jsx` exports a `HydrateFallback` (a centered "Loading..." on `#050A1A`). The `start` script and the SSR-flavored deps (`@react-router/node`, `isbot`) are vestigial template boilerplate (see §8). Production deploy is static SPA + Vercel functions, **not** `react-router-serve`.

### Route map

There are exactly **two routes**, registered explicitly in `app/routes.js` (config-manifest API, not file-convention):

```
/         → app/routes/home.jsx     (index)   — the entire marketing page
/privacy  → app/routes/privacy.jsx  (route)   — bilingual GDPR privacy policy
```

### Component / shell map

```
app/root.jsx  (root route module)
├── links()           — preconnect + Google Fonts (Inter, Inter Tight) + Typekit kit wzh6wvx
├── Layout()          — the <html lang="en"> document; renders <Meta/><Links/><ScrollRestoration/><Scripts/>
│                       and <Agentation/> only when NODE_ENV === 'development'
├── HydrateFallback() — pre-hydration "Loading..." splash
├── App()  (default)  — calls useLenis() once; wraps <Outlet/> in <LangProvider>
└── ErrorBoundary()   — route-error vs generic error display

  /  → Home()  (home.jsx, ~1016 lines, ≈16 component functions + useScrolledPast hook + getFeatures helper, all in ONE file; the navbar is inline JSX in Home(), not its own component)
       ├── StarField (canvas)        ├── ScrollScrubber (custom right rail)
       ├── VideoMaskDefs (SVG mask)  ├── Hero (parallax + ship + Steam CTA)
       ├── navbar (inline in Home)   ├── Story → Features → Trailer → EmailSignup → CtaSection
       ├── Footer                    └── SteamWishlistButton (shared ×3), LangSwitch, FeatureCard, ExternalLinkIcon, HeatmapSteamIcon

  /privacy → Privacy()  (privacy.jsx, 529 lines)
             ├── in-file CONTENT object (en+cs legal text)
             ├── DataTable  (Appendix 1 — fixed 3-col table)
             └── PartnerCards (Appendix 2 / Affiliates — card list)
```

> **Function tally (`home.jsx`):** 18 top-level `function` definitions — `useScrolledPast`, `ExternalLinkIcon`, `Hero`, `HeatmapSteamIcon`, `LangSwitch`, `SteamWishlistButton`, `Story`, `getFeatures`, `FeatureCard`, `Features`, `Trailer`, `EmailSignup`, `CtaSection`, `Footer`, `StarField`, `ScrollScrubber`, `VideoMaskDefs`, `Home` — of which ≈16 are rendered components, one is the `useScrolledPast` hook, and one (`getFeatures`) is a data helper. The navbar is inline markup inside `Home()` (no `function Navbar`).

---

## 3. File-by-file map

### Routes & shell (`app/`)
- `app/root.jsx` (98 lines) — root route module: document `<html>`, `links()` (fonts), `Layout`, `HydrateFallback`, `App` (mounts `useLenis`, wraps `LangProvider`), `ErrorBoundary`. References `/favicon.png` which **does not exist** (L37). No `meta()` export.
- `app/routes/home.jsx` (1016 lines) — the entire single-page marketing site; ≈16 component functions + local `useScrolledPast` hook + `getFeatures` helper; navbar is inline in `Home()`. Exports `meta()` (L28-33) and default `Home()` (L951).
- `app/routes/privacy.jsx` (529 lines) — bilingual privacy policy; in-file `CONTENT`, `DataTable`, `PartnerCards`, `Privacy()`. Language via URL `?lang=` (not the site i18n context). Exports `meta()` (L5).
- `app/routes.js` (6 lines) — route manifest: `index('routes/home.jsx')` + `route('privacy', 'routes/privacy.jsx')`.
- `app/i18n.jsx` (171 lines) — `LangProvider`/`useLang`; `en`+`cs` flat dictionaries; detection chain (localStorage → `_detected_lang` cookie → `navigator.language`); a `useEffect` (L147-150) imperatively sets `document.documentElement.lang` and `document.title` (title only — it does **not** touch the meta description).
- `app/CosmoLogo.jsx` (111 lines) — interactive inline-SVG wordmark/mascot (183×135 viewBox); two `<circle>` eyes track the cursor via direct DOM-ref mutation (clamped `MAX_OFFSET=4.5px`; LEFT_EYE 44.23/50.5, RIGHT_EYE 155.64/50.57). The **animated** hero logo. (Distinct from the flat `CosmoLogo.svg` file — see §10.)

### Hooks (`app/hooks/`)
- `useLenis.js` (25 lines) — Lenis smooth scroll: `duration 1.2`, expo-out easing, `smoothWheel:true`, self-perpetuating rAF pump. Returns the (unused) instance ref. Invoked once in `root.jsx:71`.
- `useMagnetic.js` (35 lines) — cursor-magnet translate, **hover-only** (`matchMedia('(hover: hover)')` guard). `strength` default 0.3; home passes 0.25. In: 150ms ease-out; out: 300ms `cubic-bezier(0.22,1,0.36,1)`.
- `useScrollReveal.js` (48 lines) — GSAP ScrollTrigger one-shot reveal of `.animate-enter` descendants; `gsap.set` hides them `{y:8, opacity:0, blur:5px}`, then tweens to visible (`duration:0.5`, `power2.out`, `stagger:0.08`) at `top {100-threshold*100}%`, `once:true`. Registers ScrollTrigger at module scope.

### Styles
- `app/app.css` (146 lines) — the only stylesheet. `@import "tailwindcss"`; `@theme` token block (palette, fonts); `:root` easing vars; `@keyframes levitate`; hand-rolled utility classes (`.btn-press`, `.input-glow`, `.video-mask-wrap video`, `.img-outline`, `.animate-enter`, `.link-reveal`, `.external-arrow`); `@layer base` resets (scrollbar hiding, OpenType features, `:visited` color, `text-wrap`).

### API / middleware (server surface)
- `api/subscribe.js` (134 lines) — Vercel serverless function: validates email, rate-limits (in-memory Map, 5/60s fixed window), enforces Origin (CSRF), proxies a single-opt-in subscribe to Mailchimp. DC derived from API key.
- `middleware.js` (52 lines) — Vercel Edge Middleware, `matcher: '/'` (root only): sets security headers + CSP; sets `_detected_lang` cookie from Vercel geo (`x-vercel-ip-country`) when no manual `lang` cookie exists.

### Config
- `react-router.config.js` (5 lines) — `{ ssr: false }`.
- `vite.config.js` (7 lines) — `plugins: [tailwindcss(), reactRouter()]` (order matters; nothing else).
- `eslint.config.js` (27 lines) — flat config; JS recommended + react-hooks flat recommended; `no-unused-vars` ignores `^[A-Z_]`; `globalIgnores(['dist','build','.react-router'])`.
- `package.json` (37 lines) — `type:module`, private, version `0.0.0`; scripts + deps.
- `.gitignore` (31 lines) — logs, node_modules, build artifacts, `.env*` (keeps `.env.example`), `.vercel`.
- `.env.example` (6 lines) — documents `MAILCHIMP_API_KEY`, `MAILCHIMP_LIST_ID`, `FRONTEND_URL`.

### CI / agent tooling
- `.github/workflows/security-review.yml` (23 lines) — "Security Review" Action on every `pull_request`; runs `anthropics/claude-code-security-review@main`, comments findings; needs secret `CLAUDE_API_KEY`.
- `.claude-context.md` (65 lines) — session briefing: stack, deploy URL, key files, Paper Design URL, and the standing design-sync task + change log.
- `.claude/settings.local.json` (9 lines) — pre-approves 3 **read-only** paper MCP tools (`get_basic_info`, `get_tree_summary`, `get_screenshot`).
- `.claude/launch.json` (11 lines) — `dev` profile: `npm run dev` on port 5173.
- `.claude/commands/visited-links.md` (73 lines) — `/visited-links` slash command playbook (the CSS-mask `:visited` technique).
- `.claude/skills/web-haptics` — **symlink** → `../../.agents/skills/web-haptics`.
- `.agents/skills/web-haptics/SKILL.md` (40 lines) + full vendored `lochie/web-haptics` monorepo (library + 4 example apps + marketing site). Bulk; do not deep-read.
- `.mcp.json` (8 lines) — registers MCP server `paper` via `npx mcp-remote http://127.0.0.1:29979/mcp`.
- `skills-lock.json` (10 lines) — pins the `web-haptics` skill to `lochie/web-haptics` + `computedHash`.

### Assets (`public/` = web root; referenced by root-absolute `/…` strings, never imported)
- `public/hero-bg-hd.webp` (~5.0 MB) — hero background; counter-parallax (home.jsx:38/139). No srcset/lazy.
- `public/videos/feature-1.mp4` (~3.5 MB), `feature-2.mp4` (~5.1 MB), `feature-3.mp4` (~3.5 MB) — autoplay/muted/loop/playsInline feature videos.
- `public/CosmoLogo.svg` — flat wordmark used in home header (home.jsx:569) and privacy (privacy.jsx).
- `public/SteamLogo.svg` (~3.7 KB) — used once (home.jsx:574).
- `public/bi-logo-white.svg` (~8.2 KB) — used twice (home header + privacy footer); links to `bohemia.net`.
- **`CosmoLogo.svg` (repo root)** — byte-identical duplicate of the public one (same md5); served/imported nowhere. **Dead/stray.**
- `README.md` — default Vite template boilerplate. **Effectively dead.**
- **Missing:** `public/favicon.png` (referenced by root.jsx:37 → 404 in prod).

---

## 4. The home page in depth

`Home()` (home.jsx:951-1015) shell: `<div className="relative min-h-screen bg-space-900 overflow-x-hidden">` containing, in order: `StarField`, `VideoMaskDefs`, the fixed inline navbar, `ScrollScrubber`, then `Hero` (in a ref'd wrapper), `Story`, `Features`, `Trailer`, `EmailSignup`, `CtaSection`, `Footer`. It calls `const [heroRef, pastHero] = useScrolledPast()` (L952) and attaches `heroRef` to the hero wrapper (L1005).

**Local hook `useScrolledPast` (L10-24):** IntersectionObserver (`threshold: 0`); `isPast = !entry.isIntersecting` → true once the hero is fully out of view. Drives the navbar swap.

**Hero (L60-203, `#section-hero`, `h-[75vh] md:h-[85vh]`):**
- Two-layer cursor parallax (rAF, `EPS 0.05`): background `bgRef` lerps at **0.035** and moves **opposite** the cursor (`nx*-28, ny*-18`, distant feel); foreground `fgRef` (portal+ship) lerps at **0.055** and moves **with** the cursor (`nx*22, ny*16`), keeping its `calc(-50% + …)` centering. The rAF loop self-stops when settled.
- Layer z-stack: bg color fallback `-z-20`; parallax bg image `-z-10` with `inset:-24px` overscan; bottom gradient fade `h-[168px] … z-10`; foreground portal+ship `z-[2]`; hero text `z-[15]`.
- **Ship** rendering is fully branched mobile vs desktop (L161-191) with different positioning math; desktop uses six `calc()` expressions keyed to `85vh` and the 733px-tall source art. Both apply inline `animation: 'levitate 5.5s ease-in-out infinite'`. (`isMobileRef` is set but never read — dead; see §10.)
- Hero text (L195-200): `h1 font-heading font-bold text-[42pt] leading-[1] tracking-[-0.02em]` rendering `{t.heroLine1}<br/>{t.heroLine2}`, then a shared `SteamWishlistButton`.

**Shared `SteamWishlistButton` (L229-249)** — used in hero (L199), navbar (L987), CTA (L520). An `<a target="_blank" rel="noopener noreferrer">` to `STEAM_URL`, `ref={useMagnetic(0.25)}`, `btn-press`, `onClick` haptic `'medium'`. Contains a `PulsingBorder` shader with large negative insets (`-top-4 -bottom-4 -left-16 -right-16`), a 38×38 white-forced Steam icon, and `{t.wishlistOnSteam}` at `text-[14pt]`. **Three live WebGL shader canvases on the page** (one per instance; the navbar one mounts even while invisible).

**`LangSwitch` (L215-226)** — toggles `cs↔en`, haptic `'selection'`, classes include `link-reveal`.

**Story (L254-270):** `useScrollReveal()`; eyebrow (`uppercase text-muted tracking-[0.15em]`), title `text-[34pt]`, body `text-[14pt] text-muted max-w-[560px]`.

**Features (L275-366):** `FEATURE_VIDEOS` (3 local mp4s) → `getFeatures(t)`. `FeatureCard` (L285-345) uses `useScrollReveal({threshold:0.25})`, `canHover` captured once. **3D tilt** (anti-flicker two-div pattern, L309): outer `animate-enter` div stays flat and owns the mouse events; inner `tiltRef` div transforms `perspective(800px) rotateY(nx*8deg) rotateX(ny*-8deg)` (in: 80ms ease-out; out: 280ms `cubic-bezier(0.22,1,0.36,1)`). Video clipped by `clipPath: url(#videoMask)`, `aspectRatio: '1964/1119'`, double 0.5px white drop-shadow hairline. **Zig-zag** via `reverse={i !== 1}` (L361) — cards 0 and 2 reversed, middle card not.

**Trailer (L371-408):** YouTube-nocookie iframe `XsfETQ5cL8U`, controls stripped, deliberately oversized/offset (`top:-62px, height:calc(100% + 180px)`, L401) to crop YouTube chrome, same squircle mask, plus a blue glow `drop-shadow(0 0 32px rgba(77,201,246,0.28))`.

**EmailSignup (L413-500):** state `email` / `status` (`idle|loading|success|error`) / `message`. `handleSubmit` (L421-451): `AbortController` 10000ms timeout, POST JSON `{email}` to `/api/subscribe`; `res.ok` → success + clear + haptic `'success'`; `!ok` → `data.error || t.emailError` + haptic `'error'`; catch → `t.emailNetworkError`. Input `type=email required input-glow`; submit button has a `PulsingBorder` and disables while loading; on-click checks `closest('form').checkValidity()` and fires haptic `'error'` if invalid (native validation still blocks submit). Privacy line links `/privacy` with `ExternalLinkIcon`.

**CtaSection (L505-524, `#section-cta`):** eyebrow/title/text + another shared `SteamWishlistButton`.

**Footer (L529-580):** social links (Discord, X/Twitter, Facebook, Instagram) each haptic `'light'`; Privacy link pushed right (`md:ml-auto`); bottom row: hardcoded `© 2026 BOHEMIA INTERACTIVE a.s.` + three logos (`/CosmoLogo.svg`, `/bi-logo-white.svg`→bohemia.net, `/SteamLogo.svg`→Steam).

**StarField (L585-774):** fixed full-screen canvas, `pointer-events-none`, `zIndex 0`, `aria-hidden`. `STAR_DENSITY=2200` (px²/star). Per-star blink scintillation + ~25% slow sine breathe. Delta-time meteor spawner (initial 3.3-5s, respawn 5.3-8s), 25-40° angle, 7-14 px/frame. **Easter egg:** clicking anywhere spawns a meteor at the cursor (window `click` listener, ~L757).

**ScrollScrubber (L788-933):** custom right-edge indicator. Reads **real** `window.scrollY/scrollHeight` (not Lenis's virtual position); native scrollbar hidden via CSS. Active section found by walking `SECTIONS` backwards against a 40%-viewport anchor line. Shows on scroll, hides 1500ms after scroll stops. Desktop: click-to-scroll (`smooth`), label always visible while active. Mobile (`hover:none`): **non-passive** `touchmove` `preventDefault` to hijack native scroll (`behavior:'instant'`), label only while touching. `thumbH = max(viewportRatio*100, 5)%`.

**VideoMaskDefs (L936-949):** a single 0×0 SVG `<clipPath id="videoMask" clipPathUnits="objectBoundingBox">` squircle, `transform="scale(0.000509165, 0.000893655)"` (= 1/1964, ≈1/1119). Shared by **all three feature videos AND the trailer**.

**Navbar (inline JSX in `Home()`, L959-1001):** not a separate component. Fixed; wrapper `pointer-events-none`, content row `pointer-events-auto`. Progressive-blur gradient overlay fades in (`opacity: pastHero ? 1 : 0`, 600ms, `backdropFilter blur(20px)` + mask). Left: `CosmoLogo` component `h-[60px] md:h-[93px] 2xl:h-[155px]`. Right: crossfade — `SteamWishlistButton` (in the `opacity: pastHero?1:0 / pointerEvents` div, L978-988) appears past hero; `LangSwitch` (in the `absolute top-0 right-0` div, L989-998) shows before scroll. So the language toggle becomes the wishlist button after the hero scrolls off.

---

## 5. Design & animation system

**Design tokens (`app.css @theme`):**
- Fonts: `--font-sans: "Inter", system-ui, …`; `--font-heading`/`--font-eyebrow: "sway-variable", sans-serif` (Adobe Typekit kit `wzh6wvx`). **`--font-eyebrow` is defined but never referenced — dead** (eyebrows use plain `uppercase tracking-[0.15em] text-muted` utilities instead).
- Palette: `--color-space-950 #030712`, `--color-space-900 #050A1A`, `--color-space-800 #0A1128`; `--color-accent #4DC9F6` (cyan); `--color-visited #9083C4`; `--color-muted` = `--color-text-muted` = `#8A95B0` (duplicate); `--color-text #E8EDF5`; surfaces `rgba(255,255,255,0.06/0.08)`.
- Easing (`:root`): `--ease-spring: cubic-bezier(0.22,1,0.36,1)` (dominant), `--ease-out-expo: cubic-bezier(0.16,1,0.3,1)` (**defined but never referenced — dead**).

**Typography:** Google **Inter** loaded with optical-size axis `opsz,wght@14..32,400;14..32,600` (this is the "Inter Display" optical grade referenced loosely in docs — there is no literal "Inter Display" family). `.font-heading` sets `font-variation-settings: 'CNST' 100, 'wght' 900` on `sway-variable`. Body OpenType stack: `ss07, ss08, cv01, cv03, cv04, cv05, cv08, cv09, cv10` (cv02/cv06/cv07 deliberately omitted). `h1-h3 { text-wrap: balance }`, `p { text-wrap: pretty }`. **Type sizes are in `pt`** (`42pt` h1, `34pt` h2/h3, `14pt` body, `12pt` nav/footer) while leading, eyebrows, legal text, and all layout dims stay in `px` — a Paper Design import convention.

**Full interaction inventory (interaction → driver):**
1. Lenis smooth scroll (`useLenis`, global; native scrollbar hidden).
2. Hero two-layer cursor parallax (rAF, direct `.style.transform`).
3. Levitating ship — `@keyframes levitate` (translateY 0→-22px + rotate -0.4°↔0.4°, 5.5s).
4. 3D feature-card tilt (anti-flicker two-div; ±8° rotate).
5. Magnetic Steam CTA (`useMagnetic(0.25)`).
6. Button press scale — `.btn-press` (hover scale 1.04 + brightness 1.12; `:active` scale 0.97 @ 80ms).
7. Scroll reveal — `useScrollReveal` (GSAP, `.animate-enter`, blur/fade/slide).
8. Input glow — `.input-glow` (layered cyan focus box-shadow).
9. Link reveal underline — `.link-reveal::after` (scaleX wipe-in, hover-only).
10. External-link arrow + `:visited` — `.external-arrow` CSS mask + `background-color: currentColor`.
11. Custom scroll scrubber (desktop click / mobile touch-hijack).
12. Navbar reveal on scroll-past-hero (progressive blur + LangSwitch↔CTA crossfade).
13. StarField canvas (blink/breathe stars + meteors + click-to-spawn easter egg).
14. Haptics on lang toggle / CTA / email / footer links.

**Motion rules ("Emil Kowalski 8 rules" — HOLDS):** every *interaction-feedback* duration is ≤300ms (80ms tilt-in / press-active, 150ms magnetic-in, 200ms btn-press/input-glow/link-reveal, 250ms video zoom, 280ms tilt-out, 300ms magnetic-out/scrubber, 350ms scrubber label). The only longer values are **entrance choreography** (navbar reveal 500ms/600ms), not feedback. `--ease-spring` is used almost everywhere.

**Responsive strategy:** Tailwind `md:` (768px) is the primary layout split (`flex-col→flex-row`, padding, type). A JS `matchMedia('(max-width:767px)')` swaps hero ship geometry. **Capability queries** `(hover: hover)` / `(hover: none)` — not width — gate every pointer-driven effect (tilt, magnetic, video zoom, btn hover, link reveal) and switch the scrubber between click and touch modes. A couple of `2xl:` tweaks size the logo.

---

## 6. Backend / data flow

The entire server surface is **two files**: `api/subscribe.js` (Mailchimp proxy) and `middleware.js` (headers + lang cookie). No database, no auth, no other routes.

**Subscribe path (`POST /api/subscribe`):**
- Frontend POSTs JSON `{email}` **same-origin** to the relative `/api/subscribe`, with a 10s client `AbortController`.
- Server: OPTIONS→200; non-POST→405. CORS set unconditionally: `Access-Control-Allow-Origin: <FRONTEND_URL>` (fixed single origin, never `*`, never reflected), methods `POST, OPTIONS`, header `Content-Type`.
- **CSRF defense:** `req.headers['origin'] === FRONTEND_URL` exact match, else 403 (checked after CORS headers + method gating). (Stops cross-site *browser* requests only; curl can spoof Origin — rate limiting is the only defense against scripted abuse.)
- **Rate limit:** in-memory `Map` keyed by IP (`x-forwarded-for` first hop), **5 req / 60s**; over → 429. Implemented as a **fixed window** (entry struct holds `start`/`count`; the whole window resets on the first request after expiry — slightly more permissive at boundaries than a sliding window). A 120s `setInterval` (`RATE_LIMIT_WINDOW_MS * 2`) prunes. Per-instance only.
- **Email validation:** regex `^[^\s@]+@[^\s@]+\.[^\s@]{2,}$`; no length cap, no trim/lowercase.
- **Mailchimp call:** datacenter derived at runtime `DC = API_KEY.split('-')[1]`; URL `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`; header `Authorization: apikey ${API_KEY}`; body `{ email_address, status: 'subscribed' }` (**single opt-in**); 8000ms `AbortController`. **No MD5 / no email hashing** — uses `POST /members` (create), not `PUT /members/{md5}` upsert. Idempotency handled by treating Mailchimp title `'Member Exists'` as success.
- **Errors:** `ok`→200 `{success:true}`; other failures mapped through an `ERROR_MESSAGES` whitelist (`Invalid Resource`, `Forgotten Email Not Subscribed`, `Compliance State`) → sanitized 400; raw Mailchimp `detail` never forwarded; thrown/timeout → 500 (real error only `console.error`'d). Misconfig (missing env / unparseable DC) → 500.

**Middleware (`matcher: '/'` — root HTML only, NOT `/api/*`):**
- Pattern: `await fetch(request)` passthrough, clone headers, rewrite, return new `Response`.
- Security headers: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/mic/geo off), `Strict-Transport-Security` (2yr, includeSubDomains, preload), and a **CSP**. CSP notables: `default-src 'self'`; `script-src` allows **`'unsafe-inline'` AND `'unsafe-eval'`**; `style-src` allows **`'unsafe-inline'`** + Google Fonts (`fonts.googleapis.com`) + Typekit (`use.typekit.net`) (the site relies on style-src `'unsafe-inline'` for all the inline `style={{}}` in home.jsx); `font-src` allows Google Fonts + Typekit; `img-src 'self' data: https://workers.paper.design https://store.steampowered.com`; `frame-src` youtube-nocookie; `connect-src 'self' https://*.api.mailchimp.com` (the Mailchimp call is server-side, so this isn't strictly needed). No CORS headers here.
- **Lang cookie:** only if no manual `lang=` cookie — reads `x-vercel-ip-country`; CZ→`cs` else `en`; `Set-Cookie: _detected_lang=…; Path=/; SameSite=Lax; Max-Age=86400`. **Deliberately non-HttpOnly** so client i18n reads it on hydration (anti-flicker for first paint).

**Env vars (all server-only, no `VITE_` prefix → never shipped to client):** `MAILCHIMP_API_KEY` (auth + DC derivation), `MAILCHIMP_LIST_ID` (URL path, unsanitized but operator-controlled), `FRONTEND_URL` (used for **both** the CORS ACAO header and the CSRF Origin check — must exactly equal the deployed origin, scheme+host, no trailing slash, or all real submissions 403).

**Security posture summary:** Good — single-origin CORS, strict Origin CSRF, rate limiting, sanitized errors, hard security headers + HSTS + CSP on the root document, no secrets to client, single-opt-in only. Weak spots: per-instance rate limiter (effectively looser than 5/min globally, and fixed-window so burst-permissive at boundaries), `'unsafe-inline'`+`'unsafe-eval'` in `script-src` **and `'unsafe-inline'` in `style-src`** (both weaken XSS protection), headers/CSP cover only `/` (not the API), and CSRF is bypassable by non-browser clients.

---

## 7. Build, tooling & agent setup

**npm scripts** (all via the React Router CLI):
- `dev` → `react-router dev` (boots Vite + HMR, port 5173).
- `build` → `react-router build`.
- `start` → `react-router-serve ./build/server/index.js` — **vestigial** under `ssr:false` (and `@react-router/serve` isn't even installed; see §8).
- `lint` → `eslint .`.

**Vite (`vite.config.js`):** `plugins: [tailwindcss(), reactRouter()]`. Tailwind v4 plugin first (CSS-first engine, no config file); `reactRouter()` brings React/Fast-Refresh itself (no separate `@vitejs/plugin-react`). No custom `entry.client.jsx`/`entry.server.jsx` — RR defaults are used.

**ESLint (`eslint.config.js`):** flat config; `js.configs.recommended` + `reactHooks.configs.flat.recommended`; targets `**/*.{js,jsx}`; `globals.browser`; one custom rule `no-unused-vars: ['error', { varsIgnorePattern: '^[A-Z_]' }]` (so unused PascalCase imports / CONSTANTS don't error — can hide genuinely dead component imports). `eslint-plugin-react-refresh` is installed but **never referenced** (dead). `ecmaVersion` is set inconsistently: `languageOptions.ecmaVersion: 2020` (L15) vs `parserOptions.ecmaVersion: 'latest'` (L18) (the latter governs parsing).

**MCP (`paper`):** `npx mcp-remote http://127.0.0.1:29979/mcp` — bridges to a **local** Paper Design daemon. Backs the `mcp__paper__*` tools. Only works where that daemon is running (the author's session). `.claude/settings.local.json` pre-approves only the 3 **read-only** paper tools; design mutations still prompt.

**`.claude/` & `.agents/`:** `launch.json` (dev profile, port 5173); `commands/visited-links.md` (slash command, also surfaced as a skill); `skills/web-haptics` is a **symlink** into `.agents/skills/web-haptics` (a full vendored `lochie/web-haptics` monorepo — library + 4 example apps + marketing site, large; do not deep-read). `skills-lock.json` pins it by hash. `web-haptics` is also a real npm dep, so the skill matches a usable library.

**Security-review CI (`.github/workflows/security-review.yml`):** "Security Review" on every `pull_request`; checks out PR head (`fetch-depth: 2`); runs `anthropics/claude-code-security-review@main` (`comment-pr: true`, `claude-api-key: ${{ secrets.CLAUDE_API_KEY }}`). Permissions `pull-requests: write` + `contents: read`. **Pinned to a moving `@main` branch** (supply-chain risk); inert if `CLAUDE_API_KEY` is unset.

---

## 8. Dependencies

**Runtime (`dependencies`) — usage verdict:**

| Package | Used? | Role |
|---|---|---|
| `react` / `react-dom` ^19.2 | ✅ | `react` imported directly across components; `react-dom` is the client hydration runtime (indirect but required). |
| `react-router` ^7.6.1 | ✅ | Framework primitives (`root.jsx`, `privacy.jsx`). |
| `@react-router/node` ^7.6.1 | ❌ **DEAD** | SSR Node adapter; never imported; SPA has no `entry.server`. **Redundant** — `@react-router/dev` already pulls it transitively. |
| `isbot` ^5 | ❌ **DEAD** | SSR bot detection for `entry.server`; never imported; also pulled transitively by `@react-router/dev`. |
| `@paper-design/shaders-react` ^0.0.71 | ✅ | `PulsingBorder` glow behind Steam/submit buttons (home.jsx:242,484). **NOT** the hero bg (that's a static webp + canvas StarField). |
| `gsap` ^3.14.2 | ✅ | ScrollTrigger scroll-reveals (`useScrollReveal`). |
| `lenis` ^1.3.21 | ✅ | Smooth scroll (`useLenis`). |
| `web-haptics` ^0.0.6 | ✅ | `useWebHaptics` haptic feedback (home.jsx:5). Most grep hits are the vendored skill copy, not app usage. |
| `agentation` ^2.3.3 | ✅ (dev-only) | `<Agentation>` overlay, `NODE_ENV==='development'` gated; tree-shaken from prod. PolyForm-Shield-1.0.0 license (non-OSI). |

**Dev (`devDependencies`):** `@eslint/js`, `eslint`, `eslint-plugin-react-hooks` (used), `eslint-plugin-react-refresh` (**installed, unwired — dead**), `globals`, `@react-router/dev` (the RR CLI + Vite plugin), `@tailwindcss/vite` + `tailwindcss`, `vite`, `@types/react` + `@types/react-dom` (editor IntelliSense only; project is plain JS).

**Dead / removable:** `@react-router/node` and `isbot` can both be dropped from `dependencies` with zero source impact. `eslint-plugin-react-refresh` is an unused devDep. Dead in code/assets: `--ease-out-expo` token, `--font-eyebrow` token, `isMobileRef` in Hero, the root-level stray `CosmoLogo.svg`, and the **`Inter Tight:wght@700` font** (loaded in `root.jsx:24` but referenced by **no** `font-family` anywhere — verified: `CosmoLogo.jsx` uses only `<path fill>`/circles, no font; **confirmed dead**).

> **Version note:** `node_modules` is not installed; declared `^` ranges (e.g. `react-router ^7.6.1`) resolved to `7.13.1` in the lockfile. Reported numbers are caps, not pins.

---

## 9. Project evolution

**Git history:** 124 commits, ~46 merged PRs (#9–#54), **2026-03-23 → 2026-04-08**. Almost entirely **agent-driven** (branches `claude/*`, 45 commits by "Claude", `Co-Authored-By: Claude Opus 4.6/4.6-1M/4.8`; human Sergei / `isergei96@gmail.com` drives the agent and merges PRs). History **starts at PR #9** — the true origin (a single 5,521-line import, likely a Paper Design / Claude Artifact export) is squashed and unreconstructable from git.

**Churn:** `app/routes/home.jsx` is the site — touched by **57 of 124 commits** (~46%), ~2,896 lifetime line-changes. Distant runners-up: `app.css` (18), `privacy.jsx` (10), `i18n.jsx`/`root.jsx` (7 each). (Line-count totals are skewed by `package-lock.json` and the vendored `.agents/skills/web-haptics` tree — use commit *count* for "what evolved.")

**Phase narrative:**
1. **Scaffold & foundations** (03-23) — initial import (home, privacy, app.css, subscribe API, hero webp + 3 videos); external-link arrow; Czech localization + auto-detect.
2. **i18n hardening & assets** (03-24/26) — geo detection moved to Edge Middleware (cookie before HTML); first code-quality pass; local SVG logo; **Paper MCP config added**.
3. **Interactive CosmoLogo + scroll/nav** — eye-tracking logo; fixed logo + sticky wishlist on scroll-out (`useScrolledPast` extracted); custom scroll scrubber; unified navbar with progressive blur; a CSS-mask `:visited` attempt committed **then reverted**.
4. **Haptics saga** (~6 commits) — global touchstart → direct attach → vendored web-haptics skill → iOS fixes → revert to "library used exactly as documented" → error-haptic on invalid email.
5. **Typography / heading-font churn** — repeated heading-font swaps chasing Czech glyph support (Sway Variable Black → FF Folk → Inter Tight 900 → back to `sway-variable` CNST/wght); uppercase added then removed.
6. **Privacy, footer, security** (03-31/04-01) — bilingual privacy policy + table/card layout; **security-review GitHub Action added**; subscribe.js **security hardening** (rate limit / CSRF / headers / sanitized errors).
7. **Navbar/footer pixel-tuning marathon** (~10 PRs, 04-02) — optical alignment, logo ordering/sizing, footer lang-switch → privacy link.
8. **Code quality + typography standardization** — biggest cleanup (466ffb9): replaced 60fps setState parallax/cursor loops with **direct DOM ref mutation**, removed dead shaders-react imports, added SSR `matchMedia` guards; then unified type, bumped h1→42px, switched **all px units to pt**, then shrank to 14pt/12pt.
9. **Animation upgrade** (04-08, `84c14da`, **current HEAD on branch `claude/serene-pasteur-b5eivc`**) — adds Lenis, swaps IntersectionObserver `useReveal` for GSAP ScrollTrigger (`useScrollReveal`), adds `useMagnetic`, expands theme vars, removes the old SplitWords + CSS keyframe enter animation (GSAP now owns timing).

> **Verified at write time:** the working tree is on branch `claude/serene-pasteur-b5eivc` at HEAD `84c14da`, and `git rev-list --left-right --count main...HEAD` reports `0 0` — i.e. local `main` is currently *at* this commit, so the "animation upgrade" work is present in the checked-out tree (whether it landed on the remote default branch / a PR #55 is a GitHub-side question, not resolvable from the local clone).

**What's churning:** typography sizing, navbar/footer optical alignment, and the motion layer. Stable: the API, middleware, i18n structure, and route shape.

---

## 10. Gotchas, tech debt & open questions

### Resolved cross-agent contradictions (these were flagged as disagreements — here is the verified answer)
- **"No `meta()` export anywhere" (root-shell agent) vs `meta()` in home/privacy:** Both are right about their slice. `root.jsx` has **no** `meta()`. But `home.jsx` **does** export `meta()` (L28-33) and `privacy.jsx` also exports `meta()` (L5). Home's `meta()` returns title `"Cosmo Tales — Journey Beyond the Stars"` — which is **byte-identical to the i18n `en.metaTitle`** (so it does not "diverge" or leak a different hardcoded English string) — plus a `name="description"` tag. The i18n `useEffect` (`i18n.jsx:147-150`) overwrites **`document.title` only** per language; it does **not** update the description meta tag at all. **Net:** for a Czech user the `<title>` flips to Czech post-hydration, but the **meta description stays English permanently**, and the SSR/prerender `<title>` is English until hydration. There is **no per-language meta-description rewriting layer**.
- **"`useLenis` is used in home.jsx" (task framing) vs reality:** `useLenis` is invoked **only** in `root.jsx:71`, not in `home.jsx`. home consumes `useScrollReveal`, `useMagnetic`, `useWebHaptics`, and `useLang`.
- **Lenis vs ScrollScrubber position source:** Lenis smooths `window` scroll globally, but `ScrollScrubber` reads **real** `window.scrollY/scrollHeight` and calls `window.scrollTo` — it operates on the real scroll position, not Lenis's virtual one. They coexist; native scrollbar is hidden in CSS.
- **"Inter Display" naming:** `.claude-context.md`/design notes say "Inter Display"; the code loads plain **Inter** with the `opsz 14..32` optical axis. No literal "Inter Display" family is loaded. **Docs are stale; code is canonical.**
- **`@paper-design/shaders-react` = hero background?** No. It's the `PulsingBorder` glow behind CTA/submit buttons. Hero bg = static `/hero-bg-hd.webp` + the hand-rolled canvas `StarField`.
- **Footer links inventory:** `.claude-context.md` says "Press Kit, Discord, Twitter"; the **code** renders Discord, X/Twitter, Facebook, Instagram (no Press Kit). Code is source of truth → **docs stale**.
- **"Navbar component":** there is **no `function Navbar`** — the navbar is inline JSX inside `Home()` (home.jsx:959-1001). The "16 components" tally counts it as if it were a component; the real `home.jsx` function list is 18 defs (≈16 rendered components + `useScrolledPast` hook + `getFeatures` helper).

### Dead / stray / missing
- **Missing `public/favicon.png`** — `root.jsx:37` links it; it does not exist → 404 in production (verified).
- **Stray root `CosmoLogo.svg`** — byte-identical duplicate of `public/CosmoLogo.svg`, served/imported nowhere.
- **`README.md`** — default Vite template, misleading about the stack.
- **Dead deps:** `@react-router/node`, `isbot` (runtime), `eslint-plugin-react-refresh` (dev).
- **Dead code/tokens (all confirmed):** `--ease-out-expo` token (never referenced); `--font-eyebrow` token (never referenced — eyebrows use plain utilities); `isMobileRef` in Hero (set, never read); the `Inter Tight:wght@700` font (loaded in `root.jsx:24`, referenced by no `font-family` anywhere).

### Real tech debt / fragility
- **No `prefers-reduced-motion` anywhere** (CSS or JS) — levitate, starfield, parallax, tilt, reveals, and Lenis all run unconditionally. The most likely accessibility flag.
- **No-JS / GSAP-failure risk:** `useScrollReveal` `gsap.set`s every `.animate-enter` to `opacity:0`; if GSAP/JS fails or is disabled, most page copy stays invisible (no CSS fallback). Same single-point-of-failure risk for hero content.
- **`useLenis` rAF loop is never cancelled** — cleanup calls `lenis.destroy()` but never `cancelAnimationFrame`. Harmless because root never unmounts, but a latent leak under StrictMode dev double-invoke / repeated mount.
- **`useMagnetic`/`useScrollReveal` lack reduced-motion guards** (only `hover:hover`).
- **One 1016-line file, ≈16 components** — `StarField` physics, `FeatureCard`, `ScrollScrubber` would normally be separate modules. High cognitive load; no functional bug.
- **Three live WebGL shader canvases on the page** (one per `SteamWishlistButton`, incl. the invisible navbar one) — performance-relevant.
- **`PulsingBorder` glows rely on exact large negative insets** (`-left-16 -right-16`) + parent `isolate` to look centered — fragile to refactor.
- **Trailer iframe crop** uses magic inline pixel offsets (`top:-62px`, `+180px`) to hide YouTube chrome — breaks if YouTube changes its embed layout.
- **ScrollScrubber non-passive `touchmove`** must stay in sync with React's passive `onTouchStart/End` via `touchingRef`.
- **Parallax `mousemove` listener** runs site-wide for the page lifetime even after the hero scrolls off (the rAF loop self-stops, but the listener keeps calling `getBoundingClientRect`). No throttle.
- **`FeatureCard.canHover`** is captured once via `useRef(...).current` and never updates if hover capability changes.
- **Body color hardcoded `#E8EDF5`** instead of `var(--color-text)` (drift risk); `--color-muted`/`--color-text-muted` are duplicate tokens.
- **Star animation is frame-count based** (frame-rate dependent) while meteor spawning is delta-time based — inconsistent.
- **i18n leaks:** `STEAM_URL` is hardcoded `?l=czech` for *both* languages; home's `meta()` title/description are English (title becomes reactive post-hydration; **description never does**).
- **Privacy language is URL-only and unpersisted** — `/privacy` always starts English unless `?lang=cs`; home does **not** forward the visitor's site language, so EN/CS visitors can land on a mismatched-language policy. Footer copyright is English-only on both pages, year hardcoded `2026`.
- **`DataTable`** is hardwired to a 3-col 100/auto/180px `colgroup` — only valid for Appendix 1.
- **Rate limiter is per-serverless-instance and fixed-window** — looser than "5/min/IP" globally; resets on cold start and is burst-permissive at window boundaries.
- **CSP has `'unsafe-inline'` + `'unsafe-eval'` in `script-src` and `'unsafe-inline'` in `style-src`** (weakens XSS protection; the site relies on style-src `'unsafe-inline'` for inline `style={{}}`); headers/CSP cover only `/`, not `/api/*`.
- **Security-review Action pinned to `@main`** (moving target).

### Open questions to resolve with the user / next session
1. **Is the `84c14da` animation upgrade meant to land on the remote default branch / a PR?** Local `main` is at this commit, but its remote/PR status (e.g. PR #55) is a GitHub-side check.
2. **Is the absence of `prefers-reduced-motion` intentional** or an oversight against any accessibility requirement?
3. **`FRONTEND_URL` exact value** — must equal the deployed origin precisely (scheme+host, no trailing slash); preview-deployment / www-vs-non-www origins would fail the CSRF check and 403 all submissions. Confirm against the real domain.
4. **No `vercel.json`** — Node runtime version relies on Vercel defaults; confirm Node 18+ (global `fetch`/`AbortController`).
5. **Single-opt-in** — confirm the Mailchimp audience doesn't require double opt-in / GDPR marketing permissions (`status: 'pending'`).
6. **Privacy effective date is "April 1, 2020"** (`privacy.jsx:17/118/178`; Czech "1. dubna 2020") while footer is 2026 and today is 2026-06-24 — confirm the policy text is current.
7. **Is `.claude/settings.local.json` meant to be committed?** It conventionally holds per-user overrides but is tracked here, so its pre-approved tool list applies to anyone who checks out the repo.
8. **Does CI/deploy actually provide the local Paper MCP daemon** (`127.0.0.1:29979`) and is `CLAUDE_API_KEY` configured, or are the design-sync + security-review pipelines currently inert outside the author's session?
9. **Is the root-level stray `CosmoLogo.svg`** safe to delete, and should `README.md` be replaced and the dead deps (`@react-router/node`, `isbot`, `eslint-plugin-react-refresh`) be pruned?
10. **`.claude-context.md` encodes a transient "current task" (design sync)** — confirm it's still active before acting on it; treat it as context, not durable architecture.
