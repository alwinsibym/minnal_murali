import styled from 'styled-components'
import { cut } from '../theme'
import Floaters from './Floaters'

// Jagged, lightning-shaped top edge. Points run left to right; every other point dips a little deeper.
const xs = [0, 7, 15, 22, 31, 39, 47, 56, 63, 72, 80, 88, 100]
const jag = (flip) => {
  const pts = xs.map((x, i) => {
    const base = flip ? x / 100 : 1 - x / 100
    const dip = i === 0 || i === xs.length - 1 ? 0 : i % 2 ? 0.16 : 0
    return `${x}% calc(var(--cut) * ${(base + dip).toFixed(3)})`
  })
  return `polygon(${pts.join(', ')}, 100% 100%, 0 100%)`
}

const Section = styled.section`
  --cut: ${cut};
  position: relative; isolation: isolate;
  margin-top: calc(var(--cut) * -1);
  padding: calc(var(--cut) + clamp(48px, 8vw, 110px)) max(20px, env(safe-area-inset-right, 0px)) calc(var(--cut) + clamp(32px, 6vw, 80px)) max(20px, env(safe-area-inset-left, 0px));
  color: ${(p) => (p.$tone === 'light' ? '#0d1431' : '#e9eefc')};
`
const Bg = styled.div`
  position: absolute; inset: 0; z-index: -1;
  clip-path: ${(p) => jag(p.$flip)};
  background: ${(p) => (p.$tone === 'light'
    ? 'var(--grain), radial-gradient(90% 60% at 10% 0%, rgba(82,200,255,.25), transparent 60%), linear-gradient(180deg, var(--paper), var(--paper-deep))'
    : 'radial-gradient(120% 80% at 80% 0%, #1a2766 0%, transparent 60%), radial-gradient(70% 50% at 0% 100%, rgba(200,33,58,.18), transparent 70%), linear-gradient(180deg, var(--storm), var(--ink))')};
  &::after { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, ${(p) => (p.$tone === 'light' ? 'rgba(13,20,49,.09)' : 'rgba(82,200,255,.07)')} 1.2px, transparent 1.6px); background-size: 14px 14px; mask-image: linear-gradient(115deg, #000, transparent 45%); -webkit-mask-image: linear-gradient(115deg, #000, transparent 45%); }
`
const Ghost = styled.div`
  position: absolute; z-index: 0; pointer-events: none; user-select: none; right: -2%; top: calc(var(--cut) + 1.5rem);
  font-family: var(--display); text-transform: uppercase; line-height: .8; letter-spacing: .02em; white-space: nowrap;
  font-size: clamp(6rem, 24vw, 21rem); color: transparent;
  -webkit-text-stroke: 2px ${(p) => (p.$tone === 'light' ? 'rgba(13,20,49,.09)' : 'rgba(82,200,255,.12)')};
`

export default function Band({ children, floaters, ghost, ...rest }) {
  const { $tone, $flip, ...dom } = rest
  return (
    <Section $tone={$tone} {...dom}>
      <Bg $tone={$tone} $flip={$flip} />
      {ghost && <Ghost $tone={$tone} aria-hidden>{ghost}</Ghost>}
      <Floaters items={floaters} />
      {children}
    </Section>
  )
}

export const Inner = styled.div`
  position: relative; z-index: 1; width: 100%; max-width: 1120px; margin: 0 auto; min-width: 0;
`

export const Eyebrow = styled.p`
  font-family: var(--mono); font-size: .76rem; letter-spacing: .16em; text-transform: uppercase;
  color: ${(p) => (p.$light ? 'var(--crimson)' : 'var(--gold)')};
  margin-bottom: .75rem;
  &::before { content: ''; display: inline-block; width: 28px; height: 2px; background: currentColor; vertical-align: middle; margin-right: 10px; transform: skewX(-30deg); }
`

export const Title = styled.h2`
  font-size: clamp(2.6rem, 8vw, 5.6rem); line-height: .92; transform: skewX(-4deg); transform-origin: left bottom;
  text-shadow: ${(p) => (p.$light ? '3px 3px 0 rgba(200,33,58,.18)' : '3px 3px 0 rgba(200,33,58,.5)')};
  span { color: ${(p) => (p.$light ? 'var(--crimson)' : 'var(--volt)')}; }
`
