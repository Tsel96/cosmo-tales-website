# Cosmo Tales — Website

Marketing website for **Cosmo Tales**, a retro-futuristic space game by Bohemia Interactive.

## Stack

- [React 19](https://react.dev) + [React Router v7](https://reactrouter.com) (SPA mode, `ssr: false`)
- [Vite 7](https://vite.dev) for dev/build tooling
- [Tailwind CSS v4](https://tailwindcss.com) (config-less, CSS-first `@theme`)
- [GSAP](https://gsap.com) + ScrollTrigger, [Lenis](https://lenis.darkroom.engineering) for scroll animation
- Deployed on [Vercel](https://vercel.com) — a static SPA plus one Edge Middleware and one serverless function

## Structure

```
app/
  root.jsx              Document shell, fonts, error boundary
  routes.js             Route manifest
  routes/home.jsx        Marketing page (hero, features, email signup, footer)
  routes/privacy.jsx      Bilingual (EN/CS) privacy policy
  i18n.jsx              Language context + translations
  hooks/                 Smooth scroll, scroll reveal, magnetic buttons, in-view detection
  app.css               Global styles, design tokens, reduced-motion handling
api/subscribe.js         Mailchimp signup proxy (rate-limited, CSRF-checked)
middleware.js            Security headers, CSP, geo language detection
```

## Development

```sh
npm install
npm run dev      # start dev server on :5173
npm run build    # production build
npm run lint     # eslint
```

## Environment variables

See `.env.example` — `MAILCHIMP_API_KEY`, `MAILCHIMP_LIST_ID`, `FRONTEND_URL` (required by `api/subscribe.js` for CORS/CSRF and the Mailchimp integration).
