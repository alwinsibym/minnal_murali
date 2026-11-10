import { useEffect, useRef } from 'react'

// Embers and electric specks drifting upward. Static dots when motion is reduced.
export default function Sparks({ count = 60, colors = ['#ffb347', '#ffd27a', '#8fdcff', '#52c8ff'] }) {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf
    const make = () => ({ x: Math.random() * w, y: Math.random() * h, r: 0.6 + Math.random() * 1.8, vy: 0.15 + Math.random() * 0.6, vx: (Math.random() - 0.5) * 0.3, a: 0.3 + Math.random() * 0.7, col: colors[Math.floor(Math.random() * colors.length)], ph: Math.random() * 6 })
    let ps = []
    const size = () => { const d = Math.min(devicePixelRatio || 1, 2); w = c.clientWidth; h = c.clientHeight; c.width = w * d; c.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0); ps = Array.from({ length: Math.round(count * Math.min(1, w / 900 + 0.35)) }, make) }
    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of ps) {
        if (!reduce) { p.y -= p.vy; p.x += p.vx + Math.sin(t / 900 + p.ph) * 0.2; if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w } }
        ctx.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(t / 400 + p.ph)); ctx.fillStyle = p.col
        ctx.shadowColor = p.col; ctx.shadowBlur = 8; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill()
      }
      ctx.globalAlpha = 1
      if (!reduce) raf = requestAnimationFrame(draw)
    }
    size(); draw(0)
    window.addEventListener('resize', size)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', size) }
  }, [count, colors])
  return <canvas ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', mixBlendMode: 'screen' }} />
}
