import styled from 'styled-components'
import { cut } from '../theme'

// One full-width band of the page. The top edge is cut on a diagonal; the band above
// reserves the same height in its bottom padding, so neighbouring bands zig and zag.
const Band = styled.section`
  --cut: ${cut};
  position: relative;
  margin-top: calc(var(--cut) * -1);
  padding: calc(var(--cut) + clamp(48px, 8vw, 110px)) max(20px, env(safe-area-inset-right, 0px)) calc(var(--cut) + clamp(32px, 6vw, 80px)) max(20px, env(safe-area-inset-left, 0px));
  clip-path: ${(p) => (p.$flip ? 'polygon(0 0, 100% var(--cut), 100% 100%, 0 100%)' : 'polygon(0 var(--cut), 100% 0, 100% 100%, 0 100%)')};
  background: ${(p) => (p.$tone === 'light'
    ? 'var(--grain), linear-gradient(180deg, var(--paper), var(--paper-deep))'
    : 'radial-gradient(120% 80% at 80% 0%, #16225a 0%, transparent 60%), linear-gradient(180deg, var(--storm), var(--ink))')};
  color: ${(p) => (p.$tone === 'light' ? '#0d1431' : '#e9eefc')};
  scroll-margin-top: 0;
  &:last-of-type { padding-bottom: clamp(48px, 8vw, 110px); }
`

export const Inner = styled.div`
  width: 100%; max-width: 1120px; margin: 0 auto; min-width: 0;
`

export const Eyebrow = styled.p`
  font-family: var(--mono); font-size: .76rem; letter-spacing: .16em; text-transform: uppercase;
  color: ${(p) => (p.$light ? 'var(--crimson)' : 'var(--gold)')};
  margin-bottom: .75rem;
`

export const Title = styled.h2`
  font-size: clamp(2.6rem, 8vw, 5.6rem); line-height: .92;
  span { color: ${(p) => (p.$light ? 'var(--crimson)' : 'var(--volt)')}; }
`

export default Band
