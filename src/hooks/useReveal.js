import { useEffect, useRef, useState } from 'react'

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(prefersReducedMotion)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { rootMargin: options.rootMargin || '0px 0px -8% 0px', threshold: options.threshold ?? 0.1 },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [options.rootMargin, options.threshold])

  return { ref, visible }
}
