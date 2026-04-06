import { useEffect, useRef, useState } from 'react'

export default function CursorGlow() {
  const [on, setOn] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)
  const hasPointerRef = useRef(false)

  useEffect(() => {
    let removeMove = () => {}

    const boot = requestAnimationFrame(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (window.matchMedia('(pointer: coarse)').matches) return

      setOn(true)

      const move = (e) => {
        hasPointerRef.current = true
        targetRef.current = { x: e.clientX, y: e.clientY }
        if (!currentRef.current.x && !currentRef.current.y) {
          currentRef.current = { x: e.clientX, y: e.clientY }
          setPos({ x: e.clientX, y: e.clientY })
        }
      }

      window.addEventListener('mousemove', move, { passive: true })
      removeMove = () => window.removeEventListener('mousemove', move)

      const smooth = () => {
        if (!hasPointerRef.current) {
          rafRef.current = requestAnimationFrame(smooth)
          return
        }
        const t = targetRef.current
        const c = currentRef.current
        const k = 0.12
        c.x += (t.x - c.x) * k
        c.y += (t.y - c.y) * k
        setPos({ x: c.x, y: c.y })
        rafRef.current = requestAnimationFrame(smooth)
      }
      rafRef.current = requestAnimationFrame(smooth)
    })

    return () => {
      cancelAnimationFrame(boot)
      cancelAnimationFrame(rafRef.current)
      removeMove()
    }
  }, [])

  if (!on) return null

  return (
    <div
      className="pointer-events-none fixed z-0 motion-reduce:hidden"
      style={{
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
      }}
      aria-hidden
    >
      <div className="relative h-[min(32rem,85vw)] w-[min(32rem,85vw)]">
        <div className="cursor-glow-ring pointer-events-none absolute inset-0 rounded-full border border-cyan-400/25" />
        <div
          className="cursor-glow-layer pointer-events-none absolute rounded-full"
          style={{
            left: '50%',
            top: '50%',
            width: '88%',
            height: '88%',
            background:
              'radial-gradient(circle, rgba(34, 211, 238, 0.11) 0%, rgba(124, 58, 237, 0.04) 35%, transparent 68%)',
          }}
        />
        <div
          className="cursor-glow-core pointer-events-none absolute rounded-full"
          style={{
            left: '50%',
            top: '50%',
            width: '40%',
            height: '40%',
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.22) 0%, transparent 65%)',
          }}
        />
      </div>
    </div>
  )
}
