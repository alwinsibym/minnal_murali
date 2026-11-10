import styled from 'styled-components'
import Band, { Inner, Eyebrow, Title } from './Band'
import { motion } from 'framer-motion'
import Reveal, { useReveal } from './Reveal'
import { cast, crew, img } from '../data/film'

const Layout = styled.div`display: grid; grid-template-columns: minmax(0, 1fr); gap: 3rem;`
const Grid = styled.ul`list-style: none; margin: 2rem 0 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 12px;`
const Card = styled(motion.li)`
  position: relative; padding: 1.2rem 1.3rem; min-width: 0; overflow: hidden;
  background: linear-gradient(160deg, rgba(28,47,122,.45), rgba(13,20,49,.7));
  border: 1px solid ${(p) => (p.$lead ? 'var(--gold)' : 'rgba(154,166,207,.25)')};
  transition: transform .3s ease, border-color .3s;
  &:hover { transform: translateY(-4px); border-color: var(--volt); }
  &::after { content: ''; position: absolute; right: -30px; top: -30px; width: 90px; height: 90px; background: ${(p) => (p.$lead ? 'var(--crimson)' : 'transparent')}; opacity: .35; transform: rotate(45deg); }
  b { display: block; font-family: var(--display); font-weight: 400; font-size: 1.7rem; letter-spacing: .04em; line-height: 1.1; overflow-wrap: anywhere; position: relative; z-index: 1; }
  span { display: block; margin-top: .3rem; font-family: var(--mono); font-size: .78rem; color: #9aa6cf; overflow-wrap: anywhere; position: relative; z-index: 1; }
`
const Split = styled.div`display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); gap: clamp(1.5rem, 4vw, 3rem); align-items: start; @media (max-width: 820px) { grid-template-columns: minmax(0, 1fr); }`
const Still = styled.figure`
  margin: 0; position: relative; overflow: hidden; aspect-ratio: 16 / 10; clip-path: polygon(0 0, 100% 0, 100% 88%, 92% 100%, 0 100%);
  img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 30%; filter: saturate(1.1) contrast(1.05); }
  figcaption { position: absolute; left: 0; bottom: 0; padding: 6px 12px; font-family: var(--mono); font-size: .68rem; letter-spacing: .1em; text-transform: uppercase; background: rgba(7,11,28,.78); color: var(--gold); }
`
const Table = styled.div`overflow-x: auto; table { width: 100%; min-width: 360px; border-collapse: collapse; } th, td { text-align: left; padding: .65rem 1rem .65rem 0; border-bottom: 1px solid rgba(154,166,207,.22); vertical-align: top; } th { width: 9.5rem; font-family: var(--mono); font-weight: 500; font-size: .7rem; letter-spacing: .12em; text-transform: uppercase; color: #9aa6cf; }`

export default function Cast() {
  const rv = useReveal()
  return (
    <Band id="cast" $tone="dark" $flip>
      <Inner>
        <Layout>
          <div>
            <Reveal><Eyebrow>Cast</Eyebrow><Title>The <span>village</span> and the storm</Title></Reveal>
            <Grid>
              {cast.map((c, i) => (
                <Card key={c.actor} $lead={c.lead} {...rv(i * 0.05)}><b>{c.actor}</b><span>{c.role}</span></Card>
              ))}
            </Grid>
          </div>
          <Split>
            <Reveal x={-40} y={0}>
              <Still><img src={img('jaison-celebration.jpg')} alt="Jaison in a red shirt smiling as villagers clap" loading="lazy" /><figcaption>Film still · Jaison</figcaption></Still>
            </Reveal>
            <Reveal delay={0.1}>
              <Eyebrow>Crew</Eyebrow>
              <Table><table><tbody>{crew.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody></table></Table>
            </Reveal>
          </Split>
        </Layout>
      </Inner>
    </Band>
  )
}
