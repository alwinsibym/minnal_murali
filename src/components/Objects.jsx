// Original line-art props used as decoration. They take their colour from `color` (currentColor).
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 4, strokeLinecap: 'round', strokeLinejoin: 'round' }

const shapes = {
  bolt: { vb: '0 0 100 140', el: <path d="M62 0 L14 78 L46 78 L30 140 L90 54 L56 54 L80 0 Z" fill="currentColor" /> },
  scissors: { vb: '0 0 120 120', el: (<g><path d="M58 62 L100 6 L108 12 L66 72 Z" fill="currentColor" /><path d="M62 62 L20 6 L12 12 L54 72 Z" fill="currentColor" opacity=".8" /><circle cx="36" cy="98" r="15" {...S} /><circle cx="84" cy="98" r="15" {...S} /><path d="M56 68 L44 85 M64 68 L76 85" {...S} /></g>) },
  spool: { vb: '0 0 100 120', el: (<g><rect x="14" y="6" width="72" height="12" rx="3" fill="currentColor" /><rect x="14" y="102" width="72" height="12" rx="3" fill="currentColor" /><rect x="24" y="18" width="52" height="84" {...S} /><path d="M24 34 H76 M24 50 H76 M24 66 H76 M24 82 H76" {...S} strokeWidth="3" /><path d="M76 90 Q98 96 92 114" {...S} strokeWidth="3" /></g>) },
  tape: { vb: '0 0 150 100', el: (<g><circle cx="46" cy="50" r="38" {...S} /><circle cx="46" cy="50" r="14" {...S} /><rect x="84" y="38" width="62" height="22" {...S} strokeWidth="3" /><path d="M94 38 v8 M104 38 v12 M114 38 v8 M124 38 v12 M134 38 v8" {...S} strokeWidth="3" /></g>) },
  crow: { vb: '0 0 120 60', el: <path d="M2 30 C20 4 46 6 60 30 C74 6 100 4 118 30 C100 22 78 26 60 48 C42 26 20 22 2 30 Z" fill="currentColor" /> },
  pole: { vb: '0 0 160 300', el: (<g><rect x="74" y="16" width="12" height="284" fill="currentColor" /><rect x="28" y="48" width="104" height="8" fill="currentColor" /><rect x="46" y="88" width="68" height="6" fill="currentColor" /><circle cx="34" cy="42" r="5" fill="currentColor" /><circle cx="126" cy="42" r="5" fill="currentColor" /><path d="M0 110 Q40 150 80 112 T160 112" {...S} strokeWidth="2" /></g>) },
  church: { vb: '0 0 200 170', el: (<g><path d="M28 170 V86 L100 52 L172 86 V170 Z" fill="currentColor" /><path d="M82 52 V30 L100 4 L118 30 V52 Z" fill="currentColor" /><path d="M100 -10 V14 M91 2 H109" {...S} strokeWidth="3" /><path d="M86 170 V132 A14 14 0 0 1 114 132 V170" fill="var(--ink)" /></g>) },
  cap: { vb: '0 0 140 100', el: (<g><path d="M18 62 C18 10 122 10 122 62 Z" fill="currentColor" /><rect x="14" y="60" width="112" height="14" fill="currentColor" opacity=".8" /><path d="M28 76 Q70 100 112 76 Z" fill="currentColor" /><circle cx="70" cy="38" r="10" fill="var(--ink)" /></g>) },
  lamp: { vb: '0 0 100 150', el: (<g><ellipse cx="50" cy="136" rx="32" ry="9" fill="currentColor" /><rect x="45" y="76" width="10" height="58" fill="currentColor" /><path d="M16 70 Q50 98 84 70 Z" fill="currentColor" /><path d="M50 4 C62 28 70 36 50 62 C30 36 38 28 50 4 Z" fill="currentColor" opacity=".85" /></g>) },
  belt: { vb: '0 0 160 90', el: (<g><rect x="0" y="32" width="160" height="18" fill="currentColor" /><rect x="60" y="22" width="40" height="38" rx="6" fill="currentColor" stroke="var(--ink)" strokeWidth="3" /><path d="M72 60 L52 88 L68 88 L84 62 Z M88 62 L104 88 L120 88 L98 60 Z" fill="currentColor" /></g>) },
  umbrella: { vb: '0 0 120 140', el: (<g><path d="M4 64 Q60 -24 116 64 Q98 54 88 64 Q74 54 60 64 Q46 54 32 64 Q22 54 4 64 Z" fill="currentColor" /><path d="M60 64 V118 Q60 134 46 130" {...S} /></g>) },
  plane: { vb: '0 0 140 100', el: (<g><path d="M2 52 L138 6 L96 94 L72 64 Z" fill="currentColor" /><path d="M72 64 L138 6 L60 58 Z" fill="var(--ink)" opacity=".4" /></g>) },
  star: { vb: '0 0 100 100', el: <path d="M50 2 L61 38 L98 38 L68 60 L79 96 L50 74 L21 96 L32 60 L2 38 L39 38 Z" fill="currentColor" /> },
  trophy: { vb: '0 0 120 140', el: (<g><path d="M30 8 H90 V50 A30 30 0 0 1 30 50 Z" fill="currentColor" /><path d="M30 18 H10 Q8 44 34 50 M90 18 H110 Q112 44 86 50" {...S} /><rect x="54" y="78" width="12" height="28" fill="currentColor" /><rect x="34" y="106" width="52" height="12" rx="2" fill="currentColor" /><rect x="26" y="118" width="68" height="14" rx="2" fill="currentColor" opacity=".8" /><path d="M64 20 L52 42 H62 L56 60 L76 34 H65 L72 20 Z" fill="var(--ink)" /></g>) },
}

export default function Obj({ kind, size = 80, color = 'currentColor', style, className, label }) {
  const s = shapes[kind] || shapes.bolt
  const [, , w, h] = s.vb.split(' ').map(Number)
  return (
    <svg viewBox={s.vb} width={size} height={(size * h) / w} style={{ color, display: 'block', overflow: 'visible', ...style }} className={className} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {s.el}
    </svg>
  )
}
