import { useEffect, useRef, useState } from 'react'
import { HalftoneCmyk, PulsingBorder, Heatmap } from '@paper-design/shaders-react'
import { useLang } from '../i18n'
import { CosmoLogo } from '../CosmoLogo'
import { useWebHaptics } from 'web-haptics/react'

function useGlobalHaptics() {
  const { trigger } = useWebHaptics()
  useEffect(() => {
    const onTouch = () => trigger()
    document.addEventListener('touchstart', onTouch, { passive: true })
    return () => document.removeEventListener('touchstart', onTouch)
  }, [trigger])
}

/* ─── Returns true once element has scrolled fully out of viewport ─── */
function useScrolledPast() {
  const ref = useRef(null)
  const [isPast, setIsPast] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setIsPast(!entry.isIntersecting),
      { threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, isPast]
}

/* ─── Scroll-triggered reveal: adds .visible to all .animate-enter children ─── */
function useReveal(threshold = 0.35) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.querySelectorAll('.animate-enter')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          targets.forEach((t) => t.classList.add('visible'))
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}

/* ─── Split text into individually animated word spans ─── */
function SplitWords({ children, className = '', staggerStart = 1 }) {
  const words = String(children).split(/\s+/)
  return words.map((word, i) => (
    <span
      key={i}
      className={`inline-block animate-enter ${className}`}
      style={{ '--stagger': staggerStart + i }}
    >
      {word}{i < words.length - 1 ? '\u00A0' : ''}
    </span>
  ))
}

/* ─── Route meta ─── */
export function meta() {
  return [
    { title: "Cosmo Tales \u2014 Journey Beyond the Stars" },
    { name: "description", content: "Buckle up, hit the gas and switch between dimensions in a totally fresh space adventure." },
  ];
}

/* ─── Asset URLs from Paper design ─── */
const ASSETS = 'https://workers.paper.design/file-assets/01KJPX5MQYW5WMXDR20PGMHFVR/'
const SHIP_URL = ASSETS + '16BDY4JWN7S32GW0Y4J5X4YC1D.png'
const HERO_BG_URL = '/hero-bg-hd.webp'
const STEAM_ICON_URL = ASSETS + '01KJSGM5CCA1ZVHYDWH64816GQ.png'
// 1x1 white pixel for ambient glow heatmap (no visible image pattern)
const WHITE_PIXEL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
const STEAM_URL = 'https://store.steampowered.com/app/3601630/Cosmo_Tales/?l=czech'

/* ─── External link arrow icon (marks links opening in new tab) ─── */
function ExternalLinkIcon({ className = 'w-3 h-3' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M11.9993 10V4M11.9993 4H5.99935M11.9993 4L4.16602 11.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* ─── Steam SVG Icon ─── */
function SteamIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 94 95" fill="none">
      <path d="M46.639 0C22.075 0 1.927 19.105 0 43.428L25.046 53.864C27.133 52.419 29.701 51.536 32.511 51.536C32.752 51.536 32.993 51.536 33.233 51.536L44.392 35.24V34.999C44.392 25.206 52.339 17.179 62.052 17.179C71.765 17.179 79.712 25.126 79.712 34.999C79.712 44.793 71.765 52.82 62.052 52.82C61.891 52.82 61.811 52.82 61.65 52.82L45.756 64.299C45.756 64.54 45.756 64.701 45.756 64.942C45.756 72.327 39.816 78.267 32.511 78.267C26.089 78.267 20.711 73.611 19.507 67.51L1.605 60.045C7.144 79.873 25.206 94.402 46.639 94.402C72.487 94.402 93.439 73.29 93.439 47.201C93.359 21.112 72.407 0 46.639 0ZM29.3 71.604L23.52 69.196C24.564 71.364 26.33 73.13 28.658 74.093C33.715 76.18 39.575 73.772 41.662 68.715C42.706 66.226 42.706 63.497 41.662 61.008C40.619 58.52 38.772 56.593 36.284 55.55C33.876 54.506 31.227 54.586 28.979 55.469L34.919 57.958C38.612 59.563 40.378 63.818 38.853 67.591C37.327 71.444 33.073 73.21 29.3 71.604ZM73.772 34.999C73.772 28.497 68.474 23.119 62.052 23.119C55.55 23.119 50.332 28.417 50.332 34.999C50.332 41.502 55.63 46.88 62.052 46.88C68.554 46.88 73.772 41.582 73.772 34.999ZM53.222 34.999C53.222 30.103 57.155 26.089 62.052 26.089C66.948 26.089 70.882 30.103 70.882 34.999C70.882 39.896 66.948 43.91 62.052 43.91C57.155 43.91 53.222 39.896 53.222 34.999Z" fill="currentColor"/>
    </svg>
  )
}


/* ═══════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════ */
function Hero() {
  const { t } = useLang()
  const heroRef      = useRef(null)
  // Parallax: two separate lerp tracks at different speeds for depth
  const bgTarget     = useRef({ x: 0, y: 0 })   // background (slow)
  const bgCurrent    = useRef({ x: 0, y: 0 })
  const fgTarget     = useRef({ x: 0, y: 0 })   // ship (faster)
  const fgCurrent    = useRef({ x: 0, y: 0 })
  const [bg, setBg]  = useState({ x: 0, y: 0 })
  const [fg, setFg]  = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    let raf
    const lerp = (a, b, t) => a + (b - a) * t
    const tick = () => {
      bgCurrent.current.x = lerp(bgCurrent.current.x, bgTarget.current.x, 0.035)
      bgCurrent.current.y = lerp(bgCurrent.current.y, bgTarget.current.y, 0.035)
      fgCurrent.current.x = lerp(fgCurrent.current.x, fgTarget.current.x, 0.055)
      fgCurrent.current.y = lerp(fgCurrent.current.y, fgTarget.current.y, 0.055)
      setBg({ x: bgCurrent.current.x, y: bgCurrent.current.y })
      setFg({ x: fgCurrent.current.x, y: fgCurrent.current.y })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onMove = (e) => {
      const rect = heroRef.current.getBoundingClientRect()
      // Normalize to -1 … +1 around center
      const nx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
      const ny = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
      bgTarget.current = { x: nx * -28, y: ny * -18 }   // counter-moves (deep)
      fgTarget.current = { x: nx *  22, y: ny *  16 }   // co-moves (close)
    }
    const onLeave = () => {
      bgTarget.current = { x: 0, y: 0 }
      fgTarget.current = { x: 0, y: 0 }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section
      id="section-hero"
      ref={heroRef}
      className="relative w-full h-[75vh] md:h-[85vh] flex flex-col items-center overflow-hidden isolate"
    >
      {/* Background color fallback */}
      <div className="absolute inset-0 bg-space-900 -z-20" />

      {/* Background image — counter-parallax (moves opposite, feels distant) */}
      <div
        className="absolute -z-10 pointer-events-none"
        style={{ inset: '-24px', transform: `translate(${bg.x}px, ${bg.y}px)` }}
      >
        <img
          src={HERO_BG_URL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[168px] bg-gradient-to-b from-transparent to-space-900 z-10 pointer-events-none" />

      {/* Hero Visual — portal + ship, foreground parallax (moves with cursor) */}
      <div
        className="absolute z-[2]"
        style={{
          top: '50%',
          left: '50%',
          height: isMobile ? '75vh' : '85vh',
          width: isMobile ? '75vh' : 'calc(85vh * 816 / 733)',
          transform: `translate(calc(-50% + ${fg.x}px), calc(-50% + ${fg.y}px))`,
        }}
      >
        {/* Ship image */}
        {isMobile ? (
          <div
            className="absolute z-[1] pointer-events-none"
            style={{
              top: '58%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '56vh',
            }}
          >
            <img
              src={SHIP_URL}
              alt="Cosmo Tales spaceship"
              className="w-full h-auto max-w-none object-contain"
              style={{ animation: 'levitate 5.5s ease-in-out infinite' }}
            />
          </div>
        ) : (
          <img
            src={SHIP_URL}
            alt="Cosmo Tales spaceship"
            className="absolute max-w-none object-contain pointer-events-none z-[1]"
            style={{
              top: 'calc(85vh * 90 / 733)',
              left: 'calc(-85vh * 162 / 733)',
              width: 'calc(85vh * 1140 / 733)',
              height: 'calc(85vh * 699 / 733)',
              animation: 'levitate 5.5s ease-in-out infinite',
            }}
          />
        )}
      </div>

      {/* Hero Text + CTA grouped together */}
      <div className="absolute bottom-[10vh] md:bottom-[12vh] left-0 right-0 flex flex-col items-center gap-6 md:gap-9 z-[15] px-5">
        <h1 className="font-heading font-bold text-[36px] md:text-[56px] leading-[1] tracking-[-0.02em] text-white text-center max-w-[484px] md:max-w-[720px]">
          {t.heroLine1}<br />{t.heroLine2}
        </h1>
        <SteamWishlistButton />
      </div>
    </section>
  )
}

/* Steam icon circle */
function HeatmapSteamIcon() {
  return (
    <span className="relative w-[38px] h-[38px] rounded-full overflow-hidden flex items-center justify-center shrink-0 bg-white/10 img-outline">
      <img src={STEAM_ICON_URL} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0) invert(1)' }} />
    </span>
  )
}

/* ─── Shared Steam Wishlist Button (hero + CTA) ─── */
function SteamWishlistButton() {
  const { t } = useLang()
  return (
    <a
      href={STEAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center gap-2.5 rounded-full py-0.5 pr-3.5 pl-1 bg-black/25 isolate btn-press"
    >
      <PulsingBorder
        className="absolute -top-4 -bottom-4 -left-16 -right-16 rounded-full z-0"
        aspectRatio="auto"
        speed={1}
        scale={0.60}
        roundness={1}
        softness={0.75}
        rotation={0}
        thickness={0.05}
        intensity={0.20}
        bloom={0.25}
        spots={5}
        spotSize={0.50}
        pulse={0.25}
        smoke={0.30}
        smokeSize={0.60}
        colors={['#5B00FF', '#AC00BF', '#0DC1FD']}
        colorBack="#00000000"
      />
      <HeatmapSteamIcon />
      <span className="font-semibold text-base tracking-[-0.02em] text-white leading-5">
        {t.wishlistOnSteam}
      </span>
    </a>
  )
}

/* ═══════════════════════════════════════════
   STORY SECTION
   ═══════════════════════════════════════════ */
function Story() {
  const ref = useReveal()
  const { t } = useLang()
  return (
    <section id="section-story" ref={ref} className="flex flex-col items-center w-full px-5 md:px-12 py-16 md:py-[120px] gap-4" style={{ '--delay': '80ms' }}>
      <p className="text-[13px] md:text-[14px] leading-[22px] font-semibold tracking-[0.15em] uppercase text-[#8A95B0] text-center max-w-[640px]">
        <SplitWords staggerStart={0}>{t.storyEyebrow}</SplitWords>
      </p>
      <h2 className="animate-enter font-heading font-bold text-[32px] md:text-[56px] leading-[1.05] md:leading-[50px] tracking-[-0.02em] text-white text-center max-w-[640px]" style={{ '--stagger': 3 }}>
        {t.storyTitle}
      </h2>
      <p className="animate-enter text-[15px] md:text-[17px] leading-[26px] md:leading-[29px] text-[#8A95B0] text-center max-w-[560px] pt-1" style={{ '--stagger': 4 }}>
        {t.storyText}
      </p>
    </section>
  )
}

/* ═══════════════════════════════════════════
   FEATURES SECTION
   ═══════════════════════════════════════════ */
const FEATURE_VIDEOS = ['/videos/feature-1.mp4', '/videos/feature-2.mp4', '/videos/feature-3.mp4']

function getFeatures(t) {
  return [
    { video: FEATURE_VIDEOS[0], title: t.feature1Title, desc: t.feature1Desc },
    { video: FEATURE_VIDEOS[1], title: t.feature2Title, desc: t.feature2Desc },
    { video: FEATURE_VIDEOS[2], title: t.feature3Title, desc: t.feature3Desc },
  ]
}

function FeatureCard({ video, title, desc, reverse }) {
  const cardRef = useReveal(0.25)
  const tiltRef = useRef(null)
  const canHover = window.matchMedia('(hover: hover)').matches

  const handleMouseMove = (e) => {
    if (!canHover) return
    const el = tiltRef.current
    const rect = el.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transition = 'transform 80ms ease-out'
    el.style.transform = `perspective(800px) rotateY(${nx * 8}deg) rotateX(${ny * -8}deg)`
  }

  const handleMouseLeave = () => {
    if (!canHover) return
    const el = tiltRef.current
    el.style.transition = 'transform 280ms cubic-bezier(0.22, 1, 0.36, 1)'
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)'
  }

  return (
    <div ref={cardRef} className={`flex flex-col md:flex-row md:items-center w-full max-w-[1200px] gap-4 md:gap-12 ${reverse ? 'md:flex-row-reverse' : ''}`} style={{ '--delay': '80ms' }}>
      {/* Video — trigger parent stays flat, child tilts (Rule #1: anti-flicker) */}
      <div
        className="animate-enter relative w-full md:flex-[3] min-w-0"
        style={{ '--stagger': 0 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={tiltRef}
          className="video-mask-wrap"
          style={{ filter: 'drop-shadow(0 0 0.5px rgba(255,255,255,0.15)) drop-shadow(0 0 0.5px rgba(255,255,255,0.15))' }}
        >
          <div
            className="w-full overflow-hidden"
            style={{ clipPath: 'url(#videoMask)', aspectRatio: '1964 / 1119' }}
          >
            <video
              src={video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* Text */}
      <div className="flex flex-col gap-2 md:gap-4 w-full md:w-[280px] md:shrink-0">
        <h3 className="animate-enter font-heading font-bold text-[24px] md:text-[32px] leading-[1.1] tracking-[-0.02em] text-white" style={{ '--stagger': 1 }}>
          {title}
        </h3>
        <p className="animate-enter text-[15px] md:text-[17px] leading-[24px] md:leading-[29px] text-[#8A95B0]" style={{ '--stagger': 2 }}>{desc}</p>
      </div>
    </div>
  )
}

function Features() {
  const ref = useReveal()
  const { t } = useLang()
  const features = getFeatures(t)
  return (
    <section id="section-features" ref={ref} className="flex flex-col items-center w-full px-5 md:px-12 pt-10 pb-16 md:pb-[120px] gap-4" style={{ '--delay': '80ms' }}>
      <p className="text-[13px] md:text-[14px] leading-[22px] font-semibold tracking-[0.15em] uppercase text-[#8A95B0] text-center">
        <SplitWords staggerStart={0}>{t.featuresEyebrow}</SplitWords>
      </p>
      <h2 className="animate-enter font-heading font-bold text-[32px] md:text-[56px] leading-[1.05] md:leading-[50px] tracking-[-0.02em] text-white text-center" style={{ '--stagger': 3 }}>
        {t.featuresTitle}
      </h2>
      <div className="flex flex-col w-full items-center pt-8 md:pt-16 gap-10 md:gap-12">
        {features.map((f, i) => (
          <FeatureCard key={f.video} {...f} reverse={i !== 1} />
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   TRAILER SECTION
   ═══════════════════════════════════════════ */
function Trailer() {
  const ref = useReveal()
  const { t } = useLang()
  return (
    <section id="section-trailer" ref={ref} className="flex flex-col items-center w-full px-5 md:px-12 pb-16 md:pb-[120px] gap-4" style={{ '--delay': '80ms' }}>
      <p className="text-[13px] md:text-[14px] leading-[22px] font-semibold tracking-[0.15em] uppercase text-[#8A95B0] text-center">
        <SplitWords staggerStart={0}>{t.trailerEyebrow}</SplitWords>
      </p>
      <h2 className="animate-enter font-heading font-bold text-[32px] md:text-[56px] leading-[1.05] md:leading-[50px] tracking-[-0.02em] text-white text-center" style={{ '--stagger': 3 }}>
        {t.trailerTitle}
      </h2>
      <div className="animate-enter w-full max-w-[1080px] pt-6 md:pt-12" style={{ '--stagger': 4 }}>
        {/* filter wrapper — drop-shadow respects clip-path shape for outline + glow */}
        <div style={{
          filter: [
            'drop-shadow(0 0 0.5px rgba(255,255,255,0.2))',
            'drop-shadow(0 0 0.5px rgba(255,255,255,0.2))',
            'drop-shadow(0 0 32px rgba(77,201,246,0.28))',
          ].join(' '),
        }}>
          <div
            className="relative w-full overflow-hidden bg-space-800"
            style={{ clipPath: 'url(#videoMask)', aspectRatio: '1964 / 1119' }}
          >
            <iframe
              src="https://www.youtube.com/embed/XsfETQ5cL8U?rel=0&modestbranding=1&controls=0&iv_load_policy=3&showinfo=0"
              title="Cosmo Tales — Official Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute"
              style={{ top: '-62px', left: '-14px', width: 'calc(100% + 28px)', height: 'calc(100% + 180px)' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   EMAIL SIGNUP SECTION
   ═══════════════════════════════════════════ */
function EmailSignup() {
  const fadeRef = useReveal()
  const { t } = useLang()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(t.emailSuccess)
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || t.emailError)
      }
    } catch {
      setStatus('error')
      setMessage(t.emailNetworkError)
    }
  }

  return (
    <section id="section-email" ref={fadeRef} className="relative flex flex-col items-center w-full px-5 md:px-12 py-16 md:py-[100px] gap-4 overflow-hidden isolate" style={{ '--delay': '80ms' }}>
      <p className="text-[13px] md:text-[14px] leading-[22px] font-semibold tracking-[0.15em] uppercase text-[#8A95B0] text-center">
        <SplitWords staggerStart={0}>{t.emailEyebrow}</SplitWords>
      </p>
      <h2 className="animate-enter font-heading font-bold text-[28px] md:text-[44px] leading-[1.1] md:leading-[50px] tracking-[-0.02em] text-white text-center" style={{ '--stagger': 4 }}>
        {t.emailTitle}
      </h2>
      <p className="animate-enter text-[15px] md:text-[17px] leading-[24px] md:leading-[29px] text-[#8A95B0] text-center max-w-[480px] pt-1" style={{ '--stagger': 5 }}>
        {t.emailText}
      </p>

      {status === 'success' ? (
        <p className="animate-enter text-accent text-base mt-6 font-medium" style={{ '--stagger': 6 }}>{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="animate-enter flex flex-col md:flex-row items-center mt-8 gap-3 w-full md:w-auto" style={{ '--stagger': 6 }}>
          <input
            type="email"
            placeholder={t.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full md:w-[260px] rounded-full px-6 py-[9px] bg-white/[0.06] text-white placeholder:text-[#8A95B0] text-base focus:outline-none input-glow"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08), 0 1px 2px 0 rgba(0,0,0,0.2)' }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="relative flex items-center gap-2.5 rounded-full py-0.5 pr-5 pl-5 bg-black/25 isolate shrink-0 btn-press"
          >
            <PulsingBorder
              className="absolute -top-4 -bottom-4 -left-10 -right-10 rounded-full z-0"
              aspectRatio="auto"
              speed={1}
              scale={0.60}
              roundness={1}
              softness={0.75}
              rotation={0}
              thickness={0.05}
              intensity={0.20}
              bloom={0.25}
              spots={5}
              spotSize={0.50}
              pulse={0.25}
              smoke={0.30}
              smokeSize={0.60}
              colors={['#5B00FF', '#AC00BF', '#0DC1FD']}
              colorBack="#00000000"
            />
            <span className="font-semibold text-base tracking-[-0.02em] text-white leading-5 py-2.5">
              {status === 'loading' ? t.emailSending : t.emailButton}
            </span>
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-sm mt-2">{message}</p>
      )}
      <p className="animate-enter text-[12px] md:text-[13px] leading-4 text-white/25 text-center max-w-[400px] mt-1" style={{ '--stagger': 7 }}>
        {t.emailPrivacy}{' '}
        <a href="/privacy" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-white visited:text-[var(--color-visited)] transition-colors link-reveal">{t.privacyPolicy}<ExternalLinkIcon className="w-3.5 h-3.5" /></a>
      </p>
    </section>
  )
}

/* ═══════════════════════════════════════════
   STEAM WISHLIST SECTION
   ═══════════════════════════════════════════ */
function CtaSection() {
  const ref = useReveal()
  const { t } = useLang()
  return (
    <section id="section-cta" ref={ref} className="relative flex flex-col items-center w-full px-5 md:px-12 py-16 md:py-[100px] gap-4 overflow-hidden isolate" style={{ '--delay': '80ms' }}>
      <p className="text-[13px] md:text-[14px] leading-[22px] font-semibold tracking-[0.15em] uppercase text-[#8A95B0] text-center">
        <SplitWords staggerStart={0}>{t.ctaEyebrow}</SplitWords>
      </p>
      <h2 className="animate-enter font-heading font-bold text-[28px] md:text-[44px] leading-[1.1] md:leading-[50px] tracking-[-0.02em] text-white text-center" style={{ '--stagger': 3 }}>
        {t.ctaTitle}
      </h2>
      <p className="animate-enter text-[15px] md:text-[17px] leading-[24px] md:leading-[29px] text-[#8A95B0] text-center max-w-[480px] pt-1" style={{ '--stagger': 4 }}>
        {t.ctaText}
      </p>
      <div className="animate-enter mt-6" style={{ '--stagger': 5 }}>
        <SteamWishlistButton />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function Footer() {
  const { lang, setLang, t } = useLang()
  return (
    <footer className="flex flex-col items-center w-full px-5 md:px-12 pt-8 md:pt-10 pb-8 md:pb-12 gap-5 md:gap-6" style={{ boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.06), inset 0 1px 4px 0 rgba(0,0,0,0.15)' }}>
      {/* Nav links row */}
      <div className="flex flex-wrap items-center gap-5 md:gap-7 w-full">
        {[
          { label: 'Discord', href: 'https://discord.gg/h4bZ4A5aqw' },
          { label: 'X / Twitter', href: 'https://x.com/CosmoTalesGame' },
          { label: 'Facebook', href: 'https://www.facebook.com/cosmotalesgame' },
          { label: 'Instagram', href: 'https://www.instagram.com/cosmotalesgame/' },
          { label: t.privacyPolicy, href: '/privacy', newTab: true },
        ].map(({ label, href, newTab }) => (
          <a
            key={href}
            href={href}
            target={href.startsWith('http') || newTab ? '_blank' : undefined}
            rel={href.startsWith('http') || newTab ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-0.5 text-[13px] leading-4 text-white visited:text-[var(--color-visited)] transition-colors link-reveal"
          >
            {label}{(href.startsWith('http') || newTab) && <ExternalLinkIcon className="w-3.5 h-3.5" />}
          </a>
        ))}
        <button
          onClick={() => setLang(lang === 'cs' ? 'en' : 'cs')}
          className="text-[13px] leading-4 text-white transition-colors cursor-pointer link-reveal md:ml-auto"
        >
          {t.langSwitch}
        </button>
      </div>
      {/* Bottom row: BI logo left · copyright right */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4 md:gap-0">
        <a href="https://www.bohemia.net" target="_blank" rel="noopener noreferrer">
          <img src="/bi-logo-white.svg" alt="Bohemia Interactive" className="h-6 md:h-7 w-auto opacity-60 hover:opacity-100 transition-opacity" />
        </a>
        <p className="text-[10px] md:text-[11px] leading-4 md:leading-5 text-white/25 md:text-right max-w-[480px]">
          &copy; 2026 BOHEMIA INTERACTIVE a.s. Cosmo Tales&reg; and BOHEMIA INTERACTIVE&reg; are registered trademarks of BOHEMIA INTERACTIVE a.s. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

/* ─── Fixed starfield background ─── */
function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const stars = []
    const meteors = []
    let meteorTimer = Math.floor(Math.random() * 300 + 200)

    // smooth easeInOut for blink curve
    const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

    const init = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      stars.length  = 0
      const count = Math.floor((canvas.width * canvas.height) / 2200)
      for (let i = 0; i < count; i++) {
        const base = Math.random() * 0.5 + 0.15
        stars.push({
          x:     Math.random() * canvas.width,
          y:     Math.random() * canvas.height,
          r:     Math.random() * 0.85 + 0.2,
          base,
          alpha: base,
          hue:   Math.random() < 0.07 ? 195 : (Math.random() < 0.5 ? 210 : 220),
          sat:   Math.random() < 0.07 ? 75  : (Math.random() * 18 + 8),

          // blink state — each star waits a random delay then fires a sharp twinkle
          blinkWait:     Math.floor(Math.random() * 400),  // frames until next blink
          blinkFrame:    0,                                 // current frame within blink
          blinkDuration: 0,                                 // total blink frames
          blinking:      false,
          blinkPeak:     0,                                 // max opacity during blink

          // slow breathe (only ~25% of stars)
          breathe:       Math.random() < 0.25,
          breathePhase:  Math.random() * Math.PI * 2,
          breatheSpeed:  Math.random() * 0.004 + 0.001,    // very slow
        })
      }
    }
    init()

    let raf, frame = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++

      for (const s of stars) {
        // --- slow breathe (continuous, subtle) ---
        let alpha = s.base
        if (s.breathe) {
          alpha += Math.sin(frame * s.breatheSpeed + s.breathePhase) * (s.base * 0.22)
        }

        // --- random blink event ---
        if (!s.blinking) {
          s.blinkWait--
          if (s.blinkWait <= 0) {
            s.blinking      = true
            s.blinkFrame    = 0
            s.blinkDuration = Math.floor(Math.random() * 40 + 25) // 25–65 frames
            s.blinkPeak     = Math.random() * 0.45 + 0.35         // how bright the peak gets above base
            s.blinkWait     = Math.floor(Math.random() * 500 + 150) // next blink delay
          }
        } else {
          s.blinkFrame++
          const progress = s.blinkFrame / s.blinkDuration
          // spike up fast, ease out slowly — like a real star scintillation
          const curve = progress < 0.3
            ? ease(progress / 0.3)           // rise
            : ease(1 - (progress - 0.3) / 0.7) // fall
          alpha += curve * s.blinkPeak
          if (s.blinkFrame >= s.blinkDuration) s.blinking = false
        }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${s.hue}, ${s.sat}%, 97%, ${Math.min(1, alpha)})`
        ctx.fill()
      }
      // ─── Meteor spawning ───
      meteorTimer--
      if (meteorTimer <= 0) {
        const angle  = (Math.random() * 15 + 25) * (Math.PI / 180) // 25–40°
        const speed  = Math.random() * 7 + 7                        // 7–14 px/frame
        const tail   = Math.random() * 110 + 70                     // 70–180 px
        const isTop  = Math.random() < 0.7
        meteors.push({
          x:       isTop ? Math.random() * canvas.width : -30,
          y:       isTop ? -30 : Math.random() * canvas.height * 0.55,
          vx:      Math.cos(angle) * speed,
          vy:      Math.sin(angle) * speed,
          tail,
          life:    0,
          maxLife: Math.ceil((canvas.width + canvas.height) / speed * 1.1),
          hue:     Math.random() < 0.18 ? 195 : 218,
        })
        meteorTimer = Math.floor(Math.random() * 480 + 320) // ~5–13 s at 60 fps
      }

      // ─── Draw meteors ───
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i]
        const progress = m.life / m.maxLife
        let opacity = progress < 0.08  ? progress / 0.08
                    : progress > 0.72  ? (1 - progress) / 0.28
                    : 1
        opacity *= 0.55 // keep it subtle

        const dir   = Math.atan2(m.vy, m.vx)
        const tx    = m.x - Math.cos(dir) * m.tail
        const ty    = m.y - Math.sin(dir) * m.tail

        // tail gradient — fades to transparent at the back
        const grad = ctx.createLinearGradient(tx, ty, m.x, m.y)
        grad.addColorStop(0, `hsla(${m.hue}, 70%, 97%, 0)`)
        grad.addColorStop(1, `hsla(${m.hue}, 70%, 97%, ${opacity})`)
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(m.x, m.y)
        ctx.strokeStyle = grad
        ctx.lineWidth   = 1.1
        ctx.stroke()

        // soft glow at the head
        const glow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 3.5)
        glow.addColorStop(0, `hsla(${m.hue}, 60%, 98%, ${opacity * 0.9})`)
        glow.addColorStop(1, `hsla(${m.hue}, 60%, 98%, 0)`)
        ctx.beginPath()
        ctx.arc(m.x, m.y, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()
        ctx.restore()

        m.x += m.vx
        m.y += m.vy
        m.life++
        if (m.life >= m.maxLife || m.x > canvas.width + 60 || m.y > canvas.height + 60) {
          meteors.splice(i, 1)
        }
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => init()
    window.addEventListener('resize', onResize)

    const spawnMeteorAt = (x, y) => {
      const angle = (Math.random() * 15 + 25) * (Math.PI / 180)
      const speed = Math.random() * 7 + 7
      const tail  = Math.random() * 110 + 70
      meteors.push({
        x: x - Math.cos(angle) * tail * 0.5,
        y: y - Math.sin(angle) * tail * 0.5,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        tail,
        life:    0,
        maxLife: Math.ceil((canvas.width + canvas.height) / speed * 1.1),
        hue:     Math.random() < 0.18 ? 195 : 218,
      })
    }
    const onClick = (e) => spawnMeteorAt(e.clientX, e.clientY)
    window.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

/* ═══════════════════════════════════════════
   SCROLL SCRUBBER
   ═══════════════════════════════════════════ */
const SECTIONS = [
  { id: 'section-hero',     labelKey: 'navHero' },
  { id: 'section-story',    labelKey: 'navStory' },
  { id: 'section-features', labelKey: 'navFeatures' },
  { id: 'section-trailer',  labelKey: 'navTrailer' },
  { id: 'section-email',    labelKey: 'navEmail' },
  { id: 'section-cta',      labelKey: 'navCta' },
]

function ScrollScrubber() {
  const { t } = useLang()
  const trackRef = useRef(null)
  const touchingRef = useRef(false)
  const inactivityTimer = useRef(null)

  const [scrollRatio, setScrollRatio] = useState(0)
  const [viewportRatio, setViewportRatio] = useState(1)
  const [activeIdx, setActiveIdx] = useState(0)
  const [active, setActive] = useState(false)   // scrubber visible (scroll in progress)
  const [touching, setTouching] = useState(false) // touching the scrubber track
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(hover: none)')
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Scroll progress + active section + scrubber visibility
  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll > 0) setScrollRatio(window.scrollY / maxScroll)

      const anchor = window.scrollY + window.innerHeight * 0.4
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id)
        if (el && el.offsetTop <= anchor) { setActiveIdx(i); break }
      }

      // Show scrubber, then hide 1.5 s after scroll stops
      setActive(true)
      clearTimeout(inactivityTimer.current)
      inactivityTimer.current = setTimeout(() => setActive(false), 1500)
    }
    const onResize = () => {
      setViewportRatio(window.innerHeight / document.documentElement.scrollHeight)
    }
    onResize()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Non-passive touchmove so we can preventDefault and block native scroll while scrubbing
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onMove = (e) => {
      if (!touchingRef.current) return
      e.preventDefault()
      const { top, height } = el.getBoundingClientRect()
      const ratio = Math.max(0, Math.min(1, (e.touches[0].clientY - top) / height))
      window.scrollTo({ top: ratio * (document.documentElement.scrollHeight - window.innerHeight), behavior: 'instant' })
    }
    el.addEventListener('touchmove', onMove, { passive: false })
    return () => el.removeEventListener('touchmove', onMove)
  }, [])

  useEffect(() => () => clearTimeout(inactivityTimer.current), [])

  const handleTouchStart = (e) => {
    clearTimeout(inactivityTimer.current)
    touchingRef.current = true
    setActive(true)
    setTouching(true)
    const { top, height } = trackRef.current.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.touches[0].clientY - top) / height))
    window.scrollTo({ top: ratio * (document.documentElement.scrollHeight - window.innerHeight), behavior: 'instant' })
  }

  const handleTouchEnd = () => {
    touchingRef.current = false
    setTouching(false)
    inactivityTimer.current = setTimeout(() => setActive(false), 1500)
  }

  // Click-to-scroll on desktop
  const handleClick = (e) => {
    if (isMobile) return
    const { top, height } = trackRef.current.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientY - top) / height))
    window.scrollTo({ top: ratio * (document.documentElement.scrollHeight - window.innerHeight), behavior: 'smooth' })
  }

  const thumbH = Math.max(viewportRatio * 100, 5)
  const thumbTop = scrollRatio * (100 - thumbH)
  // Label: desktop shows whenever scrubber is active; mobile only while touching the track
  const labelVisible = active && (!isMobile || touching)

  return (
    <div className="fixed right-0 inset-y-0 z-50 pointer-events-none">
      <div
        ref={trackRef}
        className="absolute inset-y-2 right-0 w-6 pointer-events-auto"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        {/* Track line */}
        <div
          className="absolute inset-y-0 right-[6px] w-[2px] rounded-full bg-white/[0.08]"
          style={{
            opacity: active ? 1 : 0,
            transition: 'opacity 300ms var(--ease-spring)',
          }}
        />

        {/* Thumb */}
        <div
          className="absolute right-[6px] w-[2px] rounded-full bg-white/40"
          style={{
            top: `${thumbTop}%`,
            height: `${thumbH}%`,
            opacity: active ? 1 : 0,
            transition: 'opacity 300ms var(--ease-spring)',
          }}
        />

        {/* Section label — slides in from the right, offset left so it clears the finger */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: `${thumbTop + thumbH / 2}%`,
            right: '20px',
            transform: `translateY(-50%) translateX(${labelVisible ? '0px' : '6px'})`,
            opacity: labelVisible ? 1 : 0,
            filter: labelVisible ? 'blur(0px)' : 'blur(3px)',
            transition: 'opacity 350ms var(--ease-spring), transform 350ms var(--ease-spring), filter 350ms var(--ease-spring)',
          }}
        >
          <div className="bg-white/90 backdrop-blur-sm text-space-900 rounded-2xl px-3 py-1.5 text-[12px] font-semibold leading-none whitespace-nowrap shadow-sm">
            {t[SECTIONS[activeIdx].labelKey]}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── SVG clip-path definition for squircle video mask ─── */
function VideoMaskDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <clipPath id="videoMask" clipPathUnits="objectBoundingBox">
          <path
            transform="scale(0.000509165, 0.000893655)"
            d="M982 0C1125.41 6.26859e-06 1669.51 8.82648 1758.6 18.3306C1833.89 26.3617 1871.54 30.3776 1902.58 61.4188C1933.62 92.46 1937.64 130.104 1945.67 205.388C1955.17 294.481 1964 415.824 1964 559.232C1964 702.639 1955.17 823.982 1945.67 913.075C1937.64 988.359 1933.62 1026 1902.58 1057.04C1871.54 1088.09 1833.89 1092.1 1758.6 1100.13C1683.32 1108.16 1116.63 1118.46 982 1118.46C838.587 1118.46 294.492 1109.64 205.396 1100.13C130.109 1092.1 92.4635 1088.09 61.4211 1057.04C30.3787 1026 26.3627 988.359 18.3313 913.075C8.82681 823.982 6.30717e-06 702.639 0 559.232C0 415.824 8.82681 294.481 18.3313 205.388C26.3627 130.104 30.3787 92.46 61.4211 61.4188C92.4635 30.3776 130.109 26.3617 205.396 18.3306C294.492 8.82648 838.587 3.83813e-08 982 0Z"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default function Home() {
  const [heroRef, pastHero] = useScrolledPast()
  useGlobalHaptics()

  return (
    <div className="relative min-h-screen bg-space-900 overflow-x-hidden">
      <StarField />
      <VideoMaskDefs />

      {/* Fixed navbar: logo + wishlist on same row */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        {/* Progressive blur + gradient — fades in when past hero */}
        <div
          className="absolute top-0 left-0 right-0 h-[120px] md:h-[200px] 2xl:h-[280px]"
          style={{
            opacity: pastHero ? 1 : 0,
            transition: 'opacity 600ms ease',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            maskImage: 'linear-gradient(to bottom, black 35%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 35%, transparent 100%)',
          }}
        />
        {/* Content row */}
        <div className="relative flex items-center justify-between px-4 pt-4 md:pl-5 md:pr-12 md:pt-12 2xl:px-12 pointer-events-auto">
          <CosmoLogo className="h-[60px] md:h-[93px] 2xl:h-[155px] w-auto" />
          <div
            style={{
              opacity: pastHero ? 1 : 0,
              transform: pastHero ? 'translateY(0)' : 'translateY(-8px)',
              filter: pastHero ? 'blur(0px)' : 'blur(5px)',
              transition: 'opacity 500ms var(--ease-spring), transform 500ms var(--ease-spring), filter 500ms var(--ease-spring)',
              pointerEvents: pastHero ? 'auto' : 'none',
            }}
          >
            <SteamWishlistButton />
          </div>
        </div>
      </div>

      <ScrollScrubber />

      <div ref={heroRef}>
        <Hero />
      </div>
      <Story />
      <Features />
      <Trailer />
      <EmailSignup />
      <CtaSection />
      <Footer />
    </div>
  )
}
