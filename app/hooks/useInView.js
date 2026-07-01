import { useEffect, useRef, useState } from 'react'

/* ─── Tracks whether an element has ever entered the viewport (one-shot) ─── */
export default function useInView({ rootMargin = '200px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { rootMargin }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [rootMargin])

  return [ref, inView]
}
