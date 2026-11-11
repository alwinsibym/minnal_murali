import { useRef } from 'react'
import styled from 'styled-components'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Band, { Inner, Eyebrow, Title } from './Band'
import Reveal from './Reveal'
import { img } from '../data/film'

const Grid = styled.div`display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: clamp(1.5rem, 5vw, 4rem); align-items: center; @media (max-width: 820px) { grid-template-columns: minmax(0, 1fr); }`
const Text = styled.div`p { max-width: 58ch; margin-top: 1.1rem; color: #2a3563; } p:first-of-type { margin-top: 1.6rem; font-size: 1.2rem; color: #0d1431; }`
const Frame = styled.div`
  position: relative; aspect-ratio: 4 / 5; overflow: hidden; background: #0d1431;
  clip-path: polygon(14% 0, 100% 0, 100% 86%, 86% 100%, 0 100%, 0 14%);
  box-shadow: inset 0 0 0 1px rgba(232,177,58,.6);
  @media (max-width: 820px) { aspect-ratio: 4 / 3; }
`
const Pic = styled(motion.img)`
  position: absolute; inset: -10% 0; width: 100%; height: 120%; object-fit: cover; object-position: 55% 40%;
  filter: grayscale(1) contrast(1.15) brightness(.95);
  transition: filter .8s ease;
  ${Frame}:hover & { filter: grayscale(0) contrast(1.05) saturate(1.2); }
`
const Tag = styled.span`position: absolute; left: 16%; bottom: 8%; z-index: 2; font-family: var(--mono); font-size: .7rem; letter-spacing: .14em; text-transform: uppercase; color: var(--gold); background: rgba(7,11,28,.7); padding: 6px 10px;`
const Facts = styled.ul`list-style: none; padding: 0; margin: 1.8rem 0 0; display: grid; gap: .6rem; li { display: grid; grid-template-columns: 7.5rem 1fr; gap: .75rem; padding-top: .6rem; border-top: 1px solid rgba(13,20,49,.2); } b { font-family: var(--mono); font-weight: 500; font-size: .7rem; letter-spacing: .12em; text-transform: uppercase; color: var(--crimson); padding-top: .2rem; }`

export default function Story() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '6%'])
  return (
    <Band id="story" $tone="light" ghost="Storm" floaters={[
      { kind: 'scissors', size: 130, color: 'var(--crimson)', rot: -18, depth: 0.5, bob: 8, top: '3%', right: '4%' },
      { kind: 'spool', size: 84, color: '#0d1431', rot: 14, depth: 0.3, bottom: '8%', left: '1%' },
      { kind: 'bolt', size: 74, color: 'var(--gold)', rot: 14, depth: 0.7, bob: 10, top: '46%', right: '-1%' },
      { kind: 'crow', size: 90, color: '#0d1431', rot: -8, depth: 0.9, bob: 14, top: '12%', left: '46%' },
      { kind: 'crow', size: 54, color: '#0d1431', rot: 6, depth: 1.2, bob: 10, top: '20%', left: '56%' },
    ]}>
      <Inner>
        <Grid>
          <Text>
            <Reveal><Eyebrow $light>Story · spoiler-light</Eyebrow><Title $light>The bolt <span>strikes</span> a tailor</Title></Reveal>
            <Reveal delay={0.1}><p>Minnal Murali (Malayalam for “Lightning Murali”) is a 2021 superhero film directed by Basil Joseph. Jaison, played by Tovino Thomas, works as a tailor in a village in Kerala. A lightning strike gives him extraordinary abilities.</p></Reveal>
            <Reveal delay={0.15}><p>He is not the only person the storm changes. Jaison has to face an opponent he did not expect, and the film follows what an ordinary man chooses to do with his strength. It is set in the 1990s and mixes action with village comedy.</p></Reveal>
            <Reveal delay={0.2}>
              <Facts>
                <li><b>Genre</b><span>Action, comedy, fantasy</span></li>
                <li><b>Languages</b><span>Malayalam original. Netflix versions in Tamil, Telugu, Kannada, Hindi and English.</span></li>
                <li><b>The night</b><span>A TV broadcast warns of a rare planetary alignment, forecast for 9:00 to 9:23 pm.</span></li>
                <li><b>First screening</b><span>Mumbai Film Festival, 16 December 2021</span></li>
                <li><b>Distinction</b><span>Widely described as the first Malayalam superhero film</span></li>
              </Facts>
            </Reveal>
          </Text>
          <Reveal x={50} y={0}>
            <Frame ref={ref}>
              <Pic style={{ y }} src={img('costume-city.jpg')} alt="Minnal Murali in his red and blue suit on a rock above a misty city" loading="lazy" />
              <Tag>Hover for colour</Tag>
            </Frame>
          </Reveal>
        </Grid>
      </Inner>
    </Band>
  )
}
