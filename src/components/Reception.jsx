import styled from 'styled-components'
import { ArrowUpRight } from 'lucide-react'
import Band, { Inner, Eyebrow, Title } from './Band'
import Reveal from './Reveal'
import { awards } from '../data/film'

const Grid = styled.div`display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: clamp(1.5rem, 5vw, 4rem); margin-top: 2rem; @media (max-width: 820px) { grid-template-columns: minmax(0, 1fr); }`
const Copy = styled.div`p { max-width: 58ch; color: #2a3563; } p + p { margin-top: 1rem; } blockquote { margin: 1.6rem 0 0; padding: .2rem 0 .2rem 1.2rem; border-left: 4px solid var(--crimson); font-size: 1.2rem; color: #0d1431; } cite { display: block; margin-top: .4rem; font-family: var(--mono); font-size: .72rem; letter-spacing: .1em; text-transform: uppercase; font-style: normal; color: #46527f; }`
const Chips = styled.ul`list-style: none; padding: 0; margin: 1rem 0 1.4rem; display: flex; flex-wrap: wrap; gap: 8px; li { padding: .35rem .8rem; background: #0d1431; color: #e9eefc; font-size: .88rem; clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%); padding-right: 1.2rem; }`
const Links = styled.div`display: grid; gap: 10px;`
const Out = styled.a`display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.2rem; text-decoration: none; color: #0d1431; background: #fff; border: 1px solid #b7c0dd; transition: border-color .2s, transform .2s, box-shadow .2s; &:hover { border-color: var(--crimson); transform: translateX(4px); box-shadow: -6px 0 0 var(--crimson); } span { font-family: var(--mono); font-size: .72rem; letter-spacing: .1em; text-transform: uppercase; color: #46527f; display: block; } b { font-weight: 500; }`

export default function Reception() {
  return (
    <Band id="reception" $tone="light">
      <Inner>
        <Reveal><Eyebrow $light>Reception</Eyebrow><Title $light>What critics <span>said</span></Title></Reveal>
        <Grid>
          <Reveal delay={0.05}>
            <Copy>
              <p>Critics praised the performances, especially Tovino Thomas and Guru Somasundaram. Star ratings across Indian outlets in one review roundup ranged from 2.5 to 4 out of 5.</p>
              <blockquote>“Tovino Thomas is identified by his innocent appearance and Everyman-ness, not muscle.”<cite>Sowmya Rajendran, The News Minute · 4 stars</cite></blockquote>
              <p style={{ marginTop: '1.6rem' }}>Audience scores keep changing, so this page links to the live ratings instead of copying a number that may be out of date.</p>
            </Copy>
          </Reveal>
          <Reveal delay={0.12}>
            <Eyebrow $light>Awards · 12 wins, 15 nominations on IMDb</Eyebrow>
            <Chips>{awards.map((a) => <li key={a}>{a}</li>)}</Chips>
            <Links>
              <Out href="https://www.imdb.com/title/tt7268738/reviews" target="_blank" rel="noreferrer"><div><span>IMDb</span><b>User reviews and rating</b></div><ArrowUpRight size={20} aria-hidden /></Out>
              <Out href="https://www.rottentomatoes.com/m/minnal_murali" target="_blank" rel="noreferrer"><div><span>Rotten Tomatoes</span><b>Critic and audience scores</b></div><ArrowUpRight size={20} aria-hidden /></Out>
            </Links>
          </Reveal>
        </Grid>
      </Inner>
    </Band>
  )
}
