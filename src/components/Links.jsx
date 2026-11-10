import styled from 'styled-components'
import { ArrowUpRight } from 'lucide-react'
import Band, { Inner, Eyebrow, Title } from './Band'
import { motion } from 'framer-motion'
import Reveal, { useReveal } from './Reveal'
import { links } from '../data/film'

const Para = styled.p`max-width: 64ch; margin-top: 1.4rem; color: #d3dcf7;`
const Grid = styled.div`display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 12px; margin-top: 2rem;`
const Card = styled(motion.a)`display: flex; flex-direction: column; gap: .25rem; padding: 1.1rem 1.2rem; text-decoration: none; min-width: 0; background: rgba(28,47,122,.3); border: 1px solid rgba(154,166,207,.25); transition: border-color .2s, background .2s, transform .2s; &:hover { border-color: var(--volt); background: rgba(28,47,122,.55); transform: translateY(-3px); } span { font-family: var(--mono); font-size: .7rem; letter-spacing: .12em; text-transform: uppercase; color: var(--gold); } b { font-weight: 500; overflow-wrap: anywhere; } svg { margin-top: auto; padding-top: .4rem; box-sizing: content-box; color: var(--volt); }`

export default function Links() {
  const rv = useReveal()
  return (
    <Band id="links" $tone="dark" $flip ghost="Next" floaters={[
      { kind: 'church', size: 260, color: '#16225a', rot: 0, depth: 0.2, bottom: '-2%', right: '4%' },
      { kind: 'pole', size: 90, color: '#1c2f7a', rot: 0, depth: 0.2, bottom: '0%', left: '3%' },
      { kind: 'crow', size: 80, color: '#9aa6cf', rot: 8, depth: 1, bob: 14, top: '12%', right: '30%' },
      { kind: 'bolt', size: 100, color: 'var(--volt)', rot: 10, depth: 0.7, bob: 12, top: '8%', right: '6%' },
    ]}>
      <Inner>
        <Reveal><Eyebrow>Sequel and links</Eyebrow><Title>What comes <span>next</span></Title></Reveal>
        <Reveal delay={0.08}><Para>A sequel has been discussed since January 2022. Basil Joseph has said it will be bigger in scale and budget, but he has not given a release date, and in a recent interview said he is not sure about it for now. Neither he nor Tovino Thomas has said it is cancelled.</Para></Reveal>
        <Grid>
          {links.map(([src, t, href], i) => (
            <Card key={href} href={href} target="_blank" rel="noreferrer" {...rv(i * 0.04)}><span>{src}</span><b>{t}</b><ArrowUpRight size={18} aria-hidden /></Card>
          ))}
        </Grid>
      </Inner>
    </Band>
  )
}
