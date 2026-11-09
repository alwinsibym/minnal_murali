import styled from 'styled-components'
import Band, { Inner, Eyebrow, Title } from './Band'
import Reveal from './Reveal'
import { timeline, img } from '../data/film'

const Grid = styled.div`display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: clamp(1.5rem, 5vw, 4rem); margin-top: 2rem; align-items: start; @media (max-width: 820px) { grid-template-columns: minmax(0, 1fr); }`
const Line = styled.ol`list-style: none; margin: 0; padding: 0; border-left: 1px solid rgba(82,200,255,.4);
  li { position: relative; padding: 0 0 1.5rem 1.6rem; }
  li::before { content: ''; position: absolute; left: -6px; top: .5em; width: 11px; height: 11px; background: var(--gold); transform: rotate(45deg); box-shadow: 0 0 14px rgba(232,177,58,.7); }
  time { display: block; font-family: var(--mono); font-size: .74rem; letter-spacing: .12em; text-transform: uppercase; color: var(--gold); }
  p { margin-top: .2rem; color: #d3dcf7; max-width: 52ch; }
`
const Side = styled.div`display: grid; gap: 1.2rem; min-width: 0;`
const Pic = styled.figure`margin: 0; aspect-ratio: 1; overflow: hidden; position: relative; clip-path: polygon(0 0, 88% 0, 100% 12%, 100% 100%, 0 100%); box-shadow: inset 0 0 0 1px rgba(232,177,58,.5);
  img { width: 100%; height: 100%; object-fit: cover; filter: saturate(1.15) contrast(1.08); }
  figcaption { position: absolute; left: 0; bottom: 0; padding: 6px 12px; font-family: var(--mono); font-size: .68rem; letter-spacing: .1em; text-transform: uppercase; background: rgba(7,11,28,.8); color: var(--gold); }
`
const Note = styled.div`padding: 1.1rem 1.25rem; background: rgba(28,47,122,.35); border: 1px solid rgba(154,166,207,.25); p { color: #c3cdee; font-size: .97rem; } p + p { margin-top: .7rem; } b { color: #fff; font-weight: 500; } a { color: var(--volt); text-underline-offset: 3px; }`

export default function Making() {
  return (
    <Band id="making" $tone="dark" $flip>
      <Inner>
        <Reveal><Eyebrow>Behind the scenes</Eyebrow><Title>Three years, <span>one pandemic</span></Title></Reveal>
        <Grid>
          <Line>{timeline.map(([d, t], i) => <Reveal as="li" key={d} delay={Math.min(i * 0.05, 0.3)} y={16}><time>{d}</time><p>{t}</p></Reveal>)}</Line>
          <Side>
            <Reveal x={40} y={0}><Pic><img src={img('village-strike.jpg')} alt="Lightning striking a Kerala village at night" loading="lazy" /><figcaption>Fan artwork · the strike</figcaption></Pic></Reveal>
            <Reveal delay={0.1}>
              <Note>
                <p><b>Stunts.</b> Hollywood stunt coordinator Vlad Rimburg choreographed the action. Basil Joseph said the fights had to be exaggerated yet match international standards.</p>
                <p><b>Training.</b> Tovino Thomas trained extensively for the role.</p>
                <p><b>Remake rights.</b> The team has said it declined offers, to keep the film’s identity intact.</p>
                <p><a href="https://www.onmanorama.com/entertainment/interviews/2022/01/01/destined-produce-minnal-murali-sophia-paul-malayalam-cinema.html" target="_blank" rel="noreferrer">Producer Sophia Paul interview</a></p>
              </Note>
            </Reveal>
          </Side>
        </Grid>
      </Inner>
    </Band>
  )
}
