import { useEffect, useRef } from 'react'

// Canvas lightning that strikes now and then over the hero. Draws a still bolt when motion is reduced.
function build(x1, y1, x2, y2, d, out) {
  if (d < 3) { out.push([x1, y1, x2, y2]); return }
  const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * d
  const my = (y1 + y2) / 2 + (Math.random() - 0.5) * d * 0.4
  build(x1, y1, mx, my, d / 2, out)
  build(mx, my, x2, y2, d / 2, out)
}

export default function Lightning() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, timer, raf, dead = false

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const bolt = () => {
      const main = []
      const sx = w * (0.15 + Math.random() * 0.7)
      build(sx, -10, sx + (Math.random() - 0.5) * w * 0.25, h * (0.5 + Math.random() * 0.3), Math.max(60, w * 0.1), main)
      const branches = [0.3, 0.5, 0.7].map((f) => {
        const s = main[Math.floor(main.length * f)]
        const b = []
        build(s[2], s[3], s[2] + (Math.random() - 0.5) * w * 0.25, s[3] + h * 0.2, w * 0.05, b)
        return b
      })
      return { main, branches }
    }
    const stroke = (list, k, a) => {
      const n = Math.floor(list.length * k)
      ctx.lineCap = 'round'
      ;[[12, 0.1], [4, 0.35], [1.6, 1]].forEach(([lw, al]) => {
        ctx.beginPath()
        for (let i = 0; i < n; i++) { ctx.moveTo(list[i][0], list[i][1]); ctx.lineTo(list[i][2], list[i][3]) }
        ctx.strokeStyle = '#8fdcff'; ctx.globalAlpha = a * al; ctx.lineWidth = lw; ctx.stroke()
      })
      ctx.globalAlpha = 1
    }
    const draw = (b, k, a) => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = `rgba(150,210,255,${a * 0.16 * (k < 1 ? k : 1)})`; ctx.fillRect(0, 0, w, h)
      stroke(b.main, k, a)
      b.branches.forEach((br) => stroke(br, Math.max(0, k - 0.3) / 0.7, a * 0.7))
    }
    const strike = () => {
      if (dead) return
      const b = bolt(); const t0 = performance.now()
      const frame = (now) => {
        if (dead) return
        const t = now - t0
        if (t < 380) draw(b, t / 380, 1)
        else if (t < 1300) { const f = t - 380; draw(b, 1, (f > 120 && f < 200 ? 0.3 : 1) * (1 - f / 920) * 0.9 + 0.05) }
        else { ctx.clearRect(0, 0, w, h); timer = setTimeout(strike, 6000 + Math.random() * 6000); return }
        raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)
    }

    size()
    if (reduce) draw(bolt(), 1, 0.3)
    else timer = setTimeout(strike, 1200)
    const onResize = () => { size(); if (reduce) draw(bolt(), 1, 0.3) }
    window.addEventListener('resize', onResize)
    return () => { dead = true; clearTimeout(timer); cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])
  return <canvas ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', mixBlendMode: 'screen' }} />
}
