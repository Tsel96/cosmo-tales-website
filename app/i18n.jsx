import { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react'

const translations = {
  en: {
    // Meta
    metaTitle: 'Cosmo Tales — Journey Beyond the Stars',
    metaDesc: 'Buckle up, hit the gas and switch between dimensions in a totally fresh space adventure.',

    // Hero
    heroLine1: 'Journey Beyond',
    heroLine2: 'the Stars',

    // Steam buttons
    wishlistOnSteam: 'Wishlist on Steam',
    addToWishlist: 'Add to your Steam Wishlist',

    // Scroll scrubber section labels
    navHero: 'Hero',
    navStory: 'Story',
    navFeatures: 'Features',
    navTrailer: 'Trailer',
    navEmail: 'Newsletter',
    navCta: 'Wishlist',

    // Story
    storyEyebrow: 'The Story',
    storyTitle: 'Cars in Space?!',
    storyText: 'Buckle up, hit the gas and switch between dimensions in a totally fresh space adventure full of wit and emotional stories. Each sector is a standalone comic episode with characters, conflicts and interdimensional drama.',

    // Features
    featuresEyebrow: 'Features',
    featuresTitle: 'What Awaits You',
    feature1Title: 'Dimension Switching',
    feature1Desc: 'Switch between alternative reality versions at the press of a button — escape traps, solve puzzles or turn the tide of seemingly lost battles.',
    feature2Title: 'Space Combat',
    feature2Desc: 'Shoot, dodge and maneuver! Overcome chaotic swarms and sophisticated enemy formations, colossal bosses and massive motherships.',
    feature3Title: 'A Vibrant Universe',
    feature3Desc: 'Vibrant colors, donut-shaped planets, bright stars and rainbow-hued space. Each sector features its own comic book style inspired by retro 1970s sci-fi.',

    // Trailer
    trailerEyebrow: 'Trailer',
    trailerTitle: 'Watch the Trailer',

    // Email signup
    emailEyebrow: 'Stay in the Loop',
    emailTitle: 'Get Notified at Launch',
    emailText: 'Drop your email and be the first to know when the adventure begins.',
    emailPlaceholder: 'Enter your email',
    emailButton: 'Notify Me',
    emailSending: 'Sending...',
    emailSuccess: "You're in! We'll notify you at launch.",
    emailError: 'Something went wrong. Please try again.',
    emailNetworkError: 'Network error. Please try again.',
    emailPrivacy: "We'll only use your email to notify you about Cosmo Tales.",
    privacyPolicy: 'Privacy Policy',

    // CTA
    ctaEyebrow: 'Coming Soon',
    ctaTitle: 'Ready to Launch?',
    ctaText: 'Add Cosmo Tales to your Steam wishlist and be the first to know when the adventure begins.',

    // Footer
    langSwitch: 'Česky',
  },
  cs: {
    // Meta
    metaTitle: 'Cosmo Tales — Výprava za hvězdami',
    metaDesc: 'Připoutejte se, šlápněte na plyn a přepínejte mezi dimenzemi v naprosto unikátním vesmírném dobrodružství.',

    // Hero
    heroLine1: 'Výprava',
    heroLine2: 'za hvězdami',

    // Steam buttons
    wishlistOnSteam: 'Přidat na wishlist',
    addToWishlist: 'Přidat na seznam přání',

    // Scroll scrubber section labels
    navHero: 'Intro',
    navStory: 'Příběh',
    navFeatures: 'Vlastnosti',
    navTrailer: 'Trailer',
    navEmail: 'Newsletter',
    navCta: 'Wishlist',

    // Story
    storyEyebrow: 'Příběh',
    storyTitle: 'Auta ve vesmíru?!',
    storyText: 'Připoutejte se, šlápněte na plyn a přepínejte mezi dimenzemi v naprosto unikátním vesmírném dobrodružství plném vtipu a emotivních příběhů. Každý sektor je samostatná komiksová epizoda s vlastními postavami, konflikty a mezidimenzionálním dramatem.',

    // Features
    featuresEyebrow: 'Vlastnosti',
    featuresTitle: 'Co vás čeká',
    feature1Title: 'Přepínání dimenzí',
    feature1Desc: 'Přepínejte mezi alternativními verzemi reality stisknutím tlačítka — unikejte z pastí, řešte hádanky nebo obraťte průběh zdánlivě prohraných bitev.',
    feature2Title: 'Vesmírné bitvy',
    feature2Desc: 'Střílej, uhýbej a manévruj! Překonej chaotické roje a sofistikované nepřátelské formace, kolosální bossy a masivní mateřské lodě.',
    feature3Title: 'Živý vesmír',
    feature3Desc: 'Zářivé barvy, planety ve tvaru donutů, jasné hvězdy a duhově zbarvený vesmír. Každý sektor má svůj vlastní komiksový styl inspirovaný retro sci-fi ze 70. let.',

    // Trailer
    trailerEyebrow: 'Trailer',
    trailerTitle: 'Podívejte se na trailer',

    // Email signup
    emailEyebrow: 'Zůstaňte v obraze',
    emailTitle: 'Buďte informováni',
    emailText: 'Zadejte svůj email a buďte první, kdo se dozví o startu dobrodružství.',
    emailPlaceholder: 'Zadejte svůj email',
    emailButton: 'Informujte mě',
    emailSending: 'Odesílání...',
    emailSuccess: 'Jste v tom! Dáme vám vědět při spuštění.',
    emailError: 'Něco se pokazilo. Zkuste to prosím znovu.',
    emailNetworkError: 'Chyba sítě. Zkuste to prosím znovu.',
    emailPrivacy: 'Váš email použijeme pouze k zasílání novinek o Cosmo Tales.',
    privacyPolicy: 'Zásady ochrany soukromí',

    // CTA
    ctaEyebrow: 'Již brzy',
    ctaTitle: 'Připraveni ke startu?',
    ctaText: 'Přidejte si Cosmo Tales na seznam přání ve Steamu a buďte první, kdo se dozví o startu dobrodružství.',

    // Footer
    langSwitch: 'English',
  },
}

const getCookie = (name) =>
  document.cookie.split('; ').find((c) => c.startsWith(name + '='))?.split('=')[1] ?? null

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return 'en'
    // 1. Manual choice saved by the user
    const saved = localStorage.getItem('lang')
    if (saved === 'cs' || saved === 'en') return saved
    // 2. Cookie set synchronously by Edge Middleware before the HTML was served
    const geo = getCookie('_detected_lang')
    if (geo === 'cs' || geo === 'en') return geo
    // 3. Browser language fallback
    if ((navigator.language || '').startsWith('cs')) return 'cs'
    return 'en'
  })

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = translations[lang].metaTitle
  }, [lang])

  const setLang = useCallback((l) => {
    setLangState(l)
    localStorage.setItem('lang', l)
    // Cookie prevents middleware from overriding a manual choice
    const secure = location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `lang=${l}; path=/; max-age=31536000; SameSite=Lax${secure}`
  }, [])

  const value = useMemo(() => ({ lang, setLang, t: translations[lang] }), [lang, setLang])

  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
