import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import styled from 'styled-components'
import Obj from './Objects'

const Spot = styled(motion.div)`
  position: absolute; z-index: 3; pointer-events: none;
  width: ${(p) => p.$size}px; max-width: ${(p) => Math.round(p.$size * 0.62)}vw;
  filter: drop-shadow(0 14px 18px rgba(0,0,0,.45));
  @media (max-width: 720px) { opacity: .55; width: ${(p) => Math.round(p.$size * 0.6)}px; }
`

// A prop that sits on the page and drifts at its own speed as the section scrolls past.
function Floater({ kind, size = 90, color = 'var(--gold)', rot = 0, depth = 0.4, bob = 0, ...pos }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [90 * depth, -90 * depth])
  const r = useTransform(scrollYProgress, [0, 1], reduce ? [rot, rot] : [rot - 6 * depth, rot + 6 * depth])
  return (
    <Spot ref={ref} $size={size} style={{ y, rotate: r, ...pos }}>
      <motion.div animate={reduce || !bob ? undefined : { y: [0, -bob, 0] }} transition={{ duration: 5 + bob / 6, repeat: Infinity, ease: 'easeInOut' }}>
        <Obj kind={kind} size={size} color={color} style={{ width: '100%', height: 'auto' }} />
      </motion.div>
    </Spot>
  )
}

export default function Floaters({ items = [] }) {
  return items.map((it, i) => <Floater key={i} {...it} />)
}
