import styled from 'styled-components'
import { Play } from 'lucide-react'
import Band, { Inner, Eyebrow, Title } from './Band'
import Reveal from './Reveal'
import { film, img } from '../data/film'

const Row = styled.div`display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(1.5rem, 5vw, 4rem); align-items: center; margin-top: 2rem; @media (max-width: 820px) { grid-template-columns: minmax(0, 1fr); }`
const Copy = styled.div`p { max-width: 52ch; color: #d3dcf7; } p + p { margin-top: 1rem; }`
const Langs = styled.ul`list-style: none; padding: 0; margin: 1.4rem 0 0; display: flex; flex-wrap: wrap; gap: 8px; li { font-family: var(--mono); font-size: .74rem; letter-spacing: .1em; text-transform: uppercase; padding: .35rem .7rem; border: 1px solid rgba(232,177,58,.6); color: var(--gold); }`
const Card = styled.a`display: flex; align-items: center; gap: 1.2rem; padding: 1.4rem; text-decoration: none; color: #fff; background: linear-gradient(135deg, rgba(200,33,58,.9), rgba(120,16,36,.95)); box-shadow: 0 20px 50px -20px rgba(200,33,58,.7); transition: transform .3s, box-shadow .3s; &:hover { transform: translateY(-4px); box-shadow: 0 28px 60px -20px rgba(200,33,58,.9); } img { width: 72px; height: 72px; flex: none; border-radius: 12px; } b { display: block; font-family: var(--display); font-weight: 400; font-size: 2rem; letter-spacing: .05em; line-height: 1.1; } span { font-family: var(--mono); font-size: .74rem; letter-spacing: .1em; text-transform: uppercase; color: #ffd9de; display: flex; align-items: center; gap: 6px; margin-top: .3rem; }`

export default function Watch() {
  return (
    <Band id="watch" $tone="dark" $flip ghost="Stream" floaters={[
      { kind: 'bolt', size: 150, color: 'var(--volt)', rot: 16, depth: 0.6, bob: 12, top: '14%', right: '3%' },
      { kind: 'crow', size: 90, color: '#9aa6cf', rot: -6, depth: 1, bob: 14, top: '10%', left: '48%' },
      { kind: 'star', size: 40, color: 'var(--gold)', rot: 12, depth: 0.5, bottom: '12%', left: '44%' },
    ]}>
      <Inner>
        <Reveal><Eyebrow>Where to watch</Eyebrow><Title>Streaming on <span>Netflix</span></Title></Reveal>
        <Row>
          <Reveal delay={0.05}>
            <Copy>
              <p>Minnal Murali is a Netflix original. It was planned for theatres, but the second COVID wave moved it to streaming, and it was never released in cinemas.</p>
              <p>Availability depends on your country and plan, so check the title page in your region.</p>
              <Langs>{['Malayalam', 'Tamil', 'Telugu', 'Kannada', 'Hindi', 'English'].map((l) => <li key={l}>{l}</li>)}</Langs>
            </Copy>
          </Reveal>
          <Reveal delay={0.12} x={30} y={0}>
            <Card href={film.netflix} target="_blank" rel="noreferrer"><img src={img('netflix.png')} alt="" /><div><b>Watch Minnal Murali</b><span><Play size={13} fill="currentColor" aria-hidden /> Open on Netflix</span></div></Card>
          </Reveal>
        </Row>
      </Inner>
    </Band>
  )
}
