import { useEffect, useRef, useState } from 'react'

function reducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useCountUp(target, { duration = 1600, decimals = 0 } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (reducedMotion()) {
      queueMicrotask(() => setValue(target))
      return
    }

    const el = ref.current
    if (!el) return

    function animate() {
      const start = performance.now()
      const from = 0
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - (1 - t) ** 3
        const raw = from + (target - from) * eased
        const next =
          decimals > 0 ? Math.round(raw * 10 ** decimals) / 10 ** decimals : Math.floor(raw)
        setValue(t < 1 ? next : target)
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        animate()
        obs.disconnect()
      },
      { threshold: 0.35 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration, decimals])

  return { ref, value }
}
