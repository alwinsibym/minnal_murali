import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({ children, delay = 0, x = 0, y = 28, as = 'div', ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      initial={reduce ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Props for a styled(motion.x) element that should fade in when scrolled into view.
export function useReveal() {
  const reduce = useReducedMotion()
  return (delay = 0, y = 20) => ({
    initial: reduce ? false : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -8% 0px' },
    transition: { duration: 0.7, delay: Math.min(delay, 0.3), ease: [0.16, 1, 0.3, 1] },
  })
}
