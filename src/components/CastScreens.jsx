import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Obj from './Objects'
import Sparks from './Sparks'
import { characters } from '../data/characters'
import { photo } from '../data/photos'
import { img } from '../data/film'
import { cut } from '../theme'

const Stage = styled.section`
  --cut: ${cut};
  position: relative; isolation: isolate; margin-top: calc(var(--cut) * -1); background: #05081a; color: #e9eefc;
  padding-bottom: var(--cut);
`
const Head = styled.div`
  position: relative; z-index: 2; padding: calc(var(--cut) + 3rem) max(20px, env(safe-area-inset-left, 0px)) 1rem;
  max-width: 1120px; margin: 0 auto;
  p { font-family: var(--mono); font-size: .76rem; letter-spacing: .16em; text-transform: uppercase; color: var(--gold); }
  h2 { font-size: clamp(2.6rem, 8vw, 5.6rem); line-height: .92; transform: skewX(-4deg); transform-origin: left bottom; text-shadow: 3px 3px 0 rgba(200,33,58,.5); }
  h2 span { color: var(--volt); }
  small { display: block; margin-top: .8rem; max-width: 56ch; color: #9aa6cf; font-size: .95rem; }
`
const Wrap = styled.div`position: relative;`
const Overlay = styled.div`position: sticky; top: 0; z-index: 20; height: 100svh; margin-top: -100svh; pointer-events: none; > * { pointer-events: auto; }`
const Track = styled.div`
  display: flex; overflow-x: auto; overscroll-behavior-x: contain; scroll-snap-type: x mandatory; scrollbar-width: none; outline: none;
  &::-webkit-scrollbar { display: none; }
  &:focus-visible { box-shadow: inset 0 0 0 2px var(--gold); }
`
const Dock = styled.nav`
  position: absolute; z-index: 20; left: 50%; bottom: 22px; transform: translateX(-50%); display: flex; gap: 10px; align-items: center; padding: 8px 12px;
  background: rgba(7,11,28,.55); backdrop-filter: blur(6px); border-radius: 40px; max-width: calc(100% - 24px);
  @media (max-width: 720px) { gap: 8px; padding: 8px 12px; bottom: 74px; }
`
const Arrow = styled.button`
  position: absolute; z-index: 20; top: 50%; ${(p) => (p.$side === 'l' ? 'left' : 'right')}: max(10px, env(safe-area-inset-left, 0px)); transform: translateY(-50%);
  display: grid; place-items: center; width: 54px; height: 54px; padding: 0; cursor: pointer; border-radius: 50%; color: #fff;
  background: rgba(7,11,28,.78); border: 2px solid rgba(233,238,252,.4); transition: border-color .25s, box-shadow .25s, opacity .25s;
  &:hover:not(:disabled) { border-color: ${(p) => p.$c}; box-shadow: 0 0 22px ${(p) => p.$c}; }
  &:disabled { opacity: .25; cursor: default; }
  @media (max-width: 720px) { width: 40px; height: 40px; top: auto; bottom: 74px; transform: none; ${(p) => (p.$side === 'l' ? 'left' : 'right')}: 10px; }
`
const Dot = styled.button`
  position: relative; display: grid; place-items: center; width: 46px; height: 46px; padding: 0; cursor: pointer; border-radius: 50%; flex: 0 0 auto;
  background: ${(p) => (p.$on ? 'rgba(7,11,28,.92)' : 'rgba(7,11,28,.7)')}; color: ${(p) => p.$c};
  border: 2px solid ${(p) => (p.$on ? p.$c : 'rgba(233,238,252,.35)')};
  box-shadow: ${(p) => (p.$on ? `0 0 0 3px rgba(7,11,28,.8), 0 0 22px ${p.$c}` : 'none')};
  transform: scale(${(p) => (p.$on ? 1.08 : 0.88)}); transition: transform .3s, border-color .3s, box-shadow .3s;
  &:hover { transform: scale(1.1); border-color: ${(p) => p.$c}; }
  @media (max-width: 720px) { width: 14px; height: 14px; border-width: 2px; background: ${(p) => (p.$on ? p.$c : "rgba(7,11,28,.8)")}; svg { display: none !important; } }
  @media (min-width: 721px) and (max-width: 1000px) { width: 40px; height: 40px; }
`
const Screen = styled.article`
  position: relative; flex: 0 0 100%; min-width: 0; scroll-snap-align: start; scroll-snap-stop: always; min-height: max(100svh, 640px); display: grid; align-items: center; overflow: hidden;
  padding: 64px max(84px, env(safe-area-inset-right, 0px)) 120px max(84px, env(safe-area-inset-left, 0px));
  background:
    radial-gradient(65% 75% at ${(p) => (p.$flip ? '28%' : '72%')} 45%, color-mix(in srgb, ${(p) => p.$c} 30%, transparent), transparent 70%),
    linear-gradient(${(p) => (p.$flip ? '100deg' : '260deg')}, #0a1033, #05081a 70%);
  border-right: 1px solid rgba(154,166,207,.14);
  @media (max-width: 720px) { padding: 48px 18px 140px; }
  &::before { content: ''; position: absolute; inset: 0; background: var(--grain); opacity: .8; pointer-events: none; }
  &::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(120% 100% at 50% 50%, transparent 55%, rgba(0,0,0,.65)); }
`
const Ghost = styled.div`
  position: absolute; z-index: 0; pointer-events: none; user-select: none; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-4deg);
  font-family: var(--display); text-transform: uppercase; white-space: nowrap; line-height: .8; font-size: clamp(7rem, 26vw, 24rem);
  color: transparent; -webkit-text-stroke: 2px color-mix(in srgb, ${(p) => p.$c} 24%, transparent);
`
const Grid = styled.div`
  position: relative; z-index: 2; width: 100%; max-width: 1120px; margin: 0 auto; display: grid; align-items: center; gap: clamp(1.5rem, 4vw, 4rem);
  grid-template-columns: ${(p) => (p.$flip ? 'minmax(0, 1.05fr) minmax(0, 1fr)' : 'minmax(0, 1fr) minmax(0, 1.05fr)')};
  @media (max-width: 820px) { grid-template-columns: minmax(0, 1fr); }
`
const ArtBox = styled(motion.div)`
  position: relative; order: ${(p) => (p.$flip ? 2 : 0)}; aspect-ratio: 4 / 5; max-height: 74svh; width: 100%; margin: 0 auto;
  @media (max-width: 820px) { order: 0; aspect-ratio: 5 / 4; max-height: 42svh; }
`
const Frame = styled.div`
  position: absolute; inset: 0; overflow: hidden; background: #0a1033;
  clip-path: polygon(${(p) => (p.$flip ? '0 0, 88% 0, 100% 10%, 100% 100%, 12% 100%, 0 90%' : '12% 0, 100% 0, 100% 90%, 88% 100%, 0 100%, 0 10%')});
  box-shadow: inset 0 0 0 2px ${(p) => p.$c};
  img { width: 100%; height: 100%; object-fit: cover; object-position: ${(p) => p.$pos || '50% 30%'}; filter: saturate(1.2) contrast(1.1) brightness(.92); }
  &::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 55%, rgba(5,8,26,.85)), linear-gradient(120deg, color-mix(in srgb, ${(p) => p.$c} 22%, transparent), transparent 50%); mix-blend-mode: multiply; }
`
const Credit = styled.span`position: absolute; left: 0; bottom: 0; z-index: 3; padding: 6px 12px; font-family: var(--mono); font-size: .66rem; letter-spacing: .1em; text-transform: uppercase; background: rgba(7,11,28,.85); color: var(--gold);`
const Emblem = styled.div`
  position: absolute; inset: 0; display: grid; place-items: center;
  .ring { position: absolute; border-radius: 50%; border: 2px solid ${(p) => p.$c}; opacity: .55; }
  .r1 { inset: 6%; } .r2 { inset: 16%; border-style: dashed; opacity: .35; } .r3 { inset: 26%; opacity: .7; box-shadow: 0 0 60px ${(p) => p.$c}66, inset 0 0 60px ${(p) => p.$c}33; }
  .mono { position: absolute; font-family: var(--display); font-size: clamp(14rem, 30vw, 26rem); line-height: .8; color: transparent; -webkit-text-stroke: 2px ${(p) => p.$c}55; }
  .obj { position: relative; width: 44%; filter: drop-shadow(0 0 24px ${(p) => p.$c}99); }
`
const Text = styled.div`position: relative; z-index: 3; min-width: 0;`
const Count = styled.p`font-family: var(--mono); font-size: .78rem; letter-spacing: .16em; text-transform: uppercase; color: ${(p) => p.$c}; display: flex; align-items: center; gap: .8rem; &::after { content: ''; flex: 0 1 90px; height: 2px; background: ${(p) => p.$c}; }`
const Name = styled.h3`
  margin: .5rem 0 0; font-family: var(--display); font-weight: 400; text-transform: uppercase; line-height: .86; letter-spacing: .02em;
  font-size: clamp(3rem, 8vw, 6.6rem); transform: skewX(-4deg); transform-origin: left bottom; text-shadow: 3px 3px 0 rgba(0,0,0,.6);
  overflow-wrap: break-word; hyphens: manual;
`
const Alias = styled.p`font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-size: clamp(1.4rem, 3vw, 2rem); color: ${(p) => p.$c}; margin-top: .2rem;`
const Played = styled.p`margin-top: 1.2rem; font-family: var(--mono); font-size: .8rem; letter-spacing: .12em; text-transform: uppercase; color: #9aa6cf; b { display: block; margin-top: .15rem; font-family: var(--display); font-weight: 400; letter-spacing: .06em; font-size: 1.9rem; color: #fff; text-transform: uppercase; }`
const Role = styled.p`margin-top: 1rem; font-size: 1.1rem; font-weight: 500; color: #fff;`
const About = styled.p`margin-top: .4rem; max-width: 52ch; color: #c3cdee;`
const Quote = styled.blockquote`
  margin: 1.2rem 0 0; padding: .1rem 0 .1rem 1rem; border-left: 3px solid ${(p) => p.$c};
  q { font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-size: clamp(1.4rem, 3vw, 1.9rem); line-height: 1.2; quotes: '“' '”'; color: #fff; }
  cite { display: block; margin-top: .3rem; font-style: normal; font-family: var(--mono); font-size: .66rem; letter-spacing: .12em; text-transform: uppercase; color: #9aa6cf; }
`
const Stats = styled.dl`
  margin: 1.4rem 0 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0; border-top: 1px solid rgba(154,166,207,.3);
  div { padding: .65rem 1rem .65rem 0; min-width: 0; border-bottom: 1px solid rgba(154,166,207,.16); }
  dt { font-family: var(--mono); font-size: .64rem; letter-spacing: .12em; text-transform: uppercase; color: #9aa6cf; }
  dd { margin: .1rem 0 0; font-weight: 500; overflow-wrap: anywhere; }
`

function CharacterScreen({ c, i, total, active }) {
  const flip = i % 2 === 1
  const reduce = useReducedMotion()
  const userPhoto = photo(c.id)
  const src = userPhoto || (c.art ? img(c.art.src) : null)
  const reveal = (d = 0) => reduce ? {} : { initial: false, animate: active ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }, transition: { duration: 0.7, delay: active ? d : 0, ease: [0.16, 1, 0.3, 1] } }
  return (
    <Screen id={`char-${c.id}`} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${total}: ${c.name}, played by ${c.actor}`} $flip={flip} $c={c.accent}>
      <Ghost $c={c.accent} aria-hidden>{c.alias.split(' ').pop().replace(/[^A-Za-z]/g, '') || c.name}</Ghost>
      {active && <Sparks count={26} colors={[c.accent, '#ffd27a', '#8fdcff']} />}
      <Grid $flip={flip}>
        <ArtBox $flip={flip} {...(reduce ? {} : { initial: false, animate: active ? { opacity: 1, scale: 1 } : { opacity: 0.4, scale: 0.94 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } })}>
          {src ? (
            <>
              <Frame $c={c.accent} $flip={flip} $pos={c.art?.pos}><img src={src} alt={userPhoto ? `${c.name}` : `Fan art for ${c.name}`} loading="lazy" /></Frame>
              {!userPhoto && c.art?.credit && <Credit>{c.art.credit}</Credit>}
            </>
          ) : (
            <Emblem $c={c.accent}>
              <div className="ring r1" /><div className="ring r2" /><div className="ring r3" />
              <span className="mono" aria-hidden>{c.name.replace(/[^A-Za-z]/g, '').charAt(0)}</span>
              <div className="obj"><Obj kind={c.obj} size={300} color={c.accent} style={{ width: '100%', height: 'auto' }} /></div>
            </Emblem>
          )}
        </ArtBox>
        <Text>
          <motion.div {...reveal(0)}>
            <Count $c={c.accent}>{String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</Count>
            <Name>{c.name}</Name>
            <Alias $c={c.accent}>{c.alias}</Alias>
          </motion.div>
          <motion.div {...reveal(0.1)}>
            <Played>Played by<b>{c.actor}</b></Played>
            <Role>{c.role}</Role>
            <About>{c.about}</About>
            {c.quote && <Quote $c={c.accent}><q>{c.quote.text}</q><cite>{c.quote.by || c.name.replace(/[“”]/g, '')} · Netflix subtitles, {c.quote.at}</cite></Quote>}
          </motion.div>
          <motion.div {...reveal(0.2)}>
            <Stats>{c.stats.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</Stats>
          </motion.div>
        </Text>
      </Grid>
    </Screen>
  )
}

export default function CastScreens() {
  const [active, setActive] = useState(0)
  const track = useRef(null)
  const raf = useRef(0)
  const reduce = useReducedMotion()
  const total = characters.length
  const go = (i) => {
    const el = track.current; if (!el) return
    const n = Math.max(0, Math.min(total - 1, i))
    el.scrollTo({ left: n * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' })
  }
  const onScroll = () => {
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const el = track.current; if (!el) return
      setActive(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)))
    })
  }
  useEffect(() => () => cancelAnimationFrame(raf.current), [])
  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1) }
  }
  const cur = characters[active] || characters[0]
  return (
    <Stage id="cast">
      <Head>
        <p>Cast · {total} characters</p>
        <h2>The village <span>and the storm</span></h2>
        <small>Swipe sideways, use the arrows or the icons below. Descriptions avoid major spoilers.</small>
      </Head>
      <Wrap>
        <Track ref={track} onScroll={onScroll} onKeyDown={onKey} tabIndex={0} aria-label="Characters carousel">
          {characters.map((c, i) => <CharacterScreen key={c.id} c={c} i={i} total={total} active={active === i} />)}
        </Track>
        <Overlay>
        <Arrow type="button" $side="l" $c={cur.accent} onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous character"><ChevronLeft size={26} /></Arrow>
        <Arrow type="button" $side="r" $c={cur.accent} onClick={() => go(active + 1)} disabled={active === total - 1} aria-label="Next character"><ChevronRight size={26} /></Arrow>
        <Dock aria-label="Characters">
          {characters.map((c, i) => (
            <Dot key={c.id} type="button" $c={c.accent} $on={active === i} onClick={() => go(i)} aria-label={`Go to ${c.name}`} aria-current={active === i}>
              <Obj kind={c.obj} size={22} color={active === i ? c.accent : '#c3cdee'} />
            </Dot>
          ))}
        </Dock>
        </Overlay>
      </Wrap>
    </Stage>
  )
}
