import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useScrollReveal({ threshold = 0.15, stagger = 0.08 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.querySelectorAll('.animate-enter')
    if (!targets.length) return

    // Respect reduced-motion: skip the hide/reveal choreography entirely.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(targets, { y: 0, opacity: 1, filter: 'blur(0px)' })
      return
    }

    let tl
    try {
      gsap.set(targets, {
        y: 8,
        opacity: 0,
        filter: 'blur(5px)',
      })

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: `top ${100 - threshold * 100}%`,
          once: true,
        },
      })

      tl.to(targets, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.5,
        ease: 'power2.out',
        stagger: stagger,
      })
    } catch (err) {
      // If GSAP/ScrollTrigger fails for any reason, never leave content stuck invisible.
      console.error('useScrollReveal failed, falling back to visible content:', err)
      gsap.set(targets, { y: 0, opacity: 1, filter: 'blur(0px)' })
    }

    return () => {
      tl?.kill()
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill()
      })
    }
  }, [threshold, stagger])

  return ref
}
