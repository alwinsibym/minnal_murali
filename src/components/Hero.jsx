import { useRef } from 'react'
import styled from 'styled-components'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Play, Star } from 'lucide-react'
import Lightning from './Lightning'
import Sparks from './Sparks'
import Floaters from './Floaters'
import { film, img } from '../data/film'
import { cut } from '../theme'

const Wrap = styled.section`
  position: relative; min-height: min(100svh, 920px); overflow: hidden; background: var(--ink);
  padding-bottom: ${cut}; display: grid; align-items: end;
`
const Bg = styled(motion.div)`
  position: absolute; inset: -8% 0 0 0;
  background: url(${(p) => p.$src}) center 30% / cover no-repeat;
  filter: saturate(1.2) contrast(1.08) brightness(.82);
  &::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(7,11,28,.25), rgba(7,11,28,.2) 40%, var(--ink) 100%), radial-gradient(80% 60% at 50% 40%, rgba(200,33,58,.18), transparent 70%); }
`
const Rain = styled.div`
  position: absolute; inset: 0; pointer-events: none; opacity: .5; mix-blend-mode: screen;
  background-image: linear-gradient(103deg, transparent 0 46%, rgba(170,215,255,.45) 48% 50%, transparent 52%), linear-gradient(103deg, transparent 0 46%, rgba(170,215,255,.3) 48% 50%, transparent 52%);
  background-size: 38px 120px, 71px 190px; animation: fall .9s linear infinite;
  @keyframes fall { to { background-position: -22px 120px, -41px 190px; } }
`
const Speed = styled.div`
  position: absolute; inset: 0; pointer-events: none; opacity: .5;
  background: repeating-conic-gradient(from 200deg at 78% 88%, rgba(255,255,255,.07) 0 1.2deg, transparent 1.2deg 7deg);
  mask-image: radial-gradient(circle at 78% 88%, transparent 8%, #000 70%); -webkit-mask-image: radial-gradient(circle at 78% 88%, transparent 8%, #000 70%);
`
const Hero1 = styled(motion.img)`
  position: absolute; z-index: 1; right: clamp(0px, 5vw, 90px); bottom: 0; height: min(86%, 760px); width: auto; max-width: 52%; object-fit: contain; pointer-events: none; user-select: none;
  filter: drop-shadow(0 0 28px rgba(82,200,255,.45)) drop-shadow(0 0 70px rgba(200,33,58,.35));
  -webkit-mask-image: linear-gradient(180deg, #000 82%, transparent 100%); mask-image: linear-gradient(180deg, #000 82%, transparent 100%);
  @media (max-width: 820px) { height: 52%; max-width: 62%; right: -6%; opacity: .72; }
`
const Copy = styled(motion.div)`
  position: relative; z-index: 2; width: 100%; max-width: 1120px; margin: 0 auto;
  padding: 120px max(20px, env(safe-area-inset-left, 0px)) 40px;
`
const Kicker = styled.p`font-family: var(--mono); font-size: .78rem; letter-spacing: .16em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem;`
const H1 = styled.h1`
  font-size: clamp(4.4rem, 17vw, 12.5rem); line-height: .82; letter-spacing: .01em;
  text-shadow: 0 8px 40px rgba(0,0,0,.6);
  span { display: block; }
  span + span { color: var(--volt); text-shadow: 0 0 40px rgba(82,200,255,.45); }
`
const Ml = styled.p`font-family: var(--ml); font-weight: 700; font-size: clamp(1.4rem, 4.5vw, 2.4rem); margin-top: .8rem;`
const Lede = styled.p`max-width: 50ch; font-size: 1.15rem; margin-top: 1.2rem; color: #dbe4ff;`
const Actions = styled.div`display: flex; flex-wrap: wrap; gap: 12px; margin-top: 1.8rem;`
const Btn = styled(motion.a)`
  display: inline-flex; align-items: center; gap: 10px; padding: 14px 26px; text-decoration: none;
  font-family: var(--mono); font-size: .8rem; letter-spacing: .12em; text-transform: uppercase; font-weight: 500;
  background: ${(p) => (p.$ghost ? 'rgba(7,11,28,.5)' : 'var(--crimson)')}; color: #fff;
  border: 1px solid ${(p) => (p.$ghost ? 'rgba(233,238,252,.4)' : 'var(--crimson)')};
  &:hover { box-shadow: 0 0 28px ${(p) => (p.$ghost ? 'rgba(82,200,255,.35)' : 'rgba(200,33,58,.55)')}; }
`
const Facts = styled.dl`
  display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0; margin: 2.2rem 0 0; border-top: 1px solid rgba(154,166,207,.3);
  div { padding: .8rem 1rem .8rem 0; min-width: 0; }
  dt { font-family: var(--mono); font-size: .66rem; letter-spacing: .12em; text-transform: uppercase; color: #9aa6cf; }
  dd { margin: .15rem 0 0; font-weight: 500; font-variant-numeric: tabular-nums; }
`

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '18%'])
  const yFig = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '-8%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], reduce ? [1, 1] : [1, 0.15])
  return (
    <Wrap id="top" ref={ref}>
      <Bg style={{ y }} $src={img('hero-city.jpg')} />
      <Rain />
      <Speed />
      <Lightning />
      <Sparks count={70} />
      <Floaters items={[
        { kind: 'crow', size: 96, color: '#05081a', rot: -6, depth: 1.2, bob: 16, top: '16%', right: '14%' },
        { kind: 'crow', size: 58, color: '#05081a', rot: 8, depth: 1.5, bob: 12, top: '24%', right: '26%' },
        { kind: 'crow', size: 40, color: '#05081a', rot: -2, depth: 1.8, bob: 10, top: '11%', right: '30%' },
        { kind: 'bolt', size: 110, color: 'var(--gold)', rot: 12, depth: 0.5, bob: 10, bottom: '12%', right: '6%' },
      ]} />
      <Hero1 src={img('murali-cutout.png')} alt="" aria-hidden style={{ y: yFig }} {...(reduce ? {} : { initial: { opacity: 0, scale: 0.94 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 } })} />
      <Copy style={{ opacity: fade }}>
        <Kicker>A Malayalam superhero film · Netflix · 2021</Kicker>
        <H1><span>Minnal</span><span>Murali</span></H1>
        <Ml lang="ml">{film.malayalam}</Ml>
        <Lede>A tailor in a small Kerala village is struck by lightning and wakes up with powers he never asked for. An unofficial fan site.</Lede>
        <Actions>
          <Btn href={film.netflix} target="_blank" rel="noreferrer" whileHover={{ y: -2 }} whileTap={{ scale: .97 }}><Play size={16} aria-hidden /> Watch on Netflix</Btn>
          <Btn $ghost href={film.imdb} target="_blank" rel="noreferrer" whileHover={{ y: -2 }} whileTap={{ scale: .97 }}><Star size={16} aria-hidden /> IMDb</Btn>
        </Actions>
        <Facts>
          <div><dt>Released</dt><dd>{film.released}</dd></div>
          <div><dt>Runtime</dt><dd>{film.runtime}</dd></div>
          <div><dt>Director</dt><dd>{film.director}</dd></div>
          <div><dt>Producer</dt><dd>{film.producer}</dd></div>
        </Facts>
      </Copy>
    </Wrap>
  )
}
