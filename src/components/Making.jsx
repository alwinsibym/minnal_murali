import styled from 'styled-components'
import Band, { Inner, Eyebrow, Title } from './Band'
import Reveal from './Reveal'
import { timeline, crew, img } from '../data/film'

const Grid = styled.div`display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: clamp(1.5rem, 5vw, 4rem); margin-top: 2rem; align-items: start; @media (max-width: 820px) { grid-template-columns: minmax(0, 1fr); }`
const Line = styled.ol`list-style: none; margin: 0; padding: 0; border-left: 1px solid rgba(82,200,255,.4);
  li { position: relative; padding: 0 0 1.4rem 1.6rem; }
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
const Crew = styled.div`margin-top: clamp(2.5rem, 6vw, 4rem);`
const Table = styled.div`overflow-x: auto; margin-top: 1rem; table { width: 100%; min-width: 360px; border-collapse: collapse; } th, td { text-align: left; padding: .65rem 1rem .65rem 0; border-bottom: 1px solid rgba(154,166,207,.22); vertical-align: top; } th { width: 11rem; font-family: var(--mono); font-weight: 500; font-size: .7rem; letter-spacing: .12em; text-transform: uppercase; color: #9aa6cf; }`

export default function Making() {
  return (
    <Band id="making" $tone="dark" $flip ghost="Making" floaters={[
      { kind: 'pole', size: 80, color: '#1c2f7a', depth: 0.2, top: '10%', right: '1%' },
      { kind: 'bolt', size: 120, color: 'var(--volt)', rot: 14, depth: 0.7, bob: 12, top: '6%', right: '8%' },
      { kind: 'church', size: 220, color: '#16225a', depth: 0.2, bottom: '-1%', left: '1%' },
      { kind: 'crow', size: 70, color: '#9aa6cf', rot: -6, depth: 1, bob: 12, top: '44%', left: '40%' },
    ]}>
      <Inner>
        <Reveal><Eyebrow>Behind the scenes</Eyebrow><Title>Three years, <span>one pandemic</span></Title></Reveal>
        <Grid>
          <Line>{timeline.map(([d, t], i) => <Reveal as="li" key={d + i} delay={Math.min(i * 0.04, 0.25)} y={16}><time>{d}</time><p>{t}</p></Reveal>)}</Line>
          <Side>
            <Reveal x={40} y={0}><Pic><img src={img('village-strike.jpg')} alt="Lightning striking a Kerala village at night" loading="lazy" /><figcaption>Fan artwork · the strike</figcaption></Pic></Reveal>
            <Reveal delay={0.1}>
              <Note>
                <p><b>Writing.</b> Arun Anirudhan and Justin Mathew wrote the screenplay. Basil Joseph conceived the idea with Anirudhan, and the film draws inspiration from <i>My Dear Kuttichathan</i> (1984).</p>
                <p><b>Locations.</b> Alappuzha and Wayanad in Kerala, and Hassan in Karnataka. Much of the climax was shot at Hemavati Reservoir with Shettihalli Rosary Church in the background.</p>
                <p><b>Stunts.</b> Hollywood stunt coordinator Vlad Rimburg supervised the action. Basil Joseph said the fights had to be exaggerated yet match international standards.</p>
                <p><a href="https://www.onmanorama.com/entertainment/interviews/2022/01/01/destined-produce-minnal-murali-sophia-paul-malayalam-cinema.html" target="_blank" rel="noreferrer">Producer Sophia Paul interview</a></p>
              </Note>
            </Reveal>
          </Side>
        </Grid>
        <Crew id="crew">
          <Reveal><Eyebrow>Crew</Eyebrow></Reveal>
          <Reveal delay={0.05}><Table><table><tbody>{crew.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody></table></Table></Reveal>
        </Crew>
      </Inner>
    </Band>
  )
}
