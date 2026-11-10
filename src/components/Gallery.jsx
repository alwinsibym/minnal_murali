import styled from 'styled-components'
import Band, { Inner, Eyebrow, Title } from './Band'
import { motion } from 'framer-motion'
import Reveal, { useReveal } from './Reveal'
import { gallery, img } from '../data/film'

const Grid = styled.div`display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 12px; margin-top: 2rem; @media (max-width: 720px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }`
const Item = styled(motion.figure)`
  margin: 0; position: relative; overflow: hidden; min-height: 200px; background: #0d1431;
  grid-column: span ${(p) => (p.$wide ? 6 : 2)}; aspect-ratio: ${(p) => (p.$wide ? '21 / 9' : '4 / 3')};
  @media (max-width: 720px) { grid-column: span ${(p) => (p.$wide ? 2 : 1)}; aspect-ratio: ${(p) => (p.$wide ? '16 / 10' : '1')}; min-height: 0; }
  img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(.85) contrast(1.1); transition: filter .6s, transform .8s; }
  &:hover img { filter: grayscale(0) saturate(1.2); transform: scale(1.05); }
  figcaption { position: absolute; left: 0; bottom: 0; padding: 6px 12px; font-family: var(--mono); font-size: .66rem; letter-spacing: .1em; text-transform: uppercase; background: rgba(7,11,28,.82); color: var(--gold); }
`
const Note = styled.p`margin-top: 1.4rem; max-width: 66ch; font-size: .92rem; color: #46527f;`

export default function Gallery() {
  const rv = useReveal()
  return (
    <Band id="gallery" $tone="light" ghost="Art" floaters={[
      { kind: 'scissors', size: 110, color: 'var(--crimson)', rot: 22, depth: 0.5, bob: 8, top: '2%', right: '6%' },
      { kind: 'tape', size: 130, color: '#0d1431', rot: -10, depth: 0.4, bottom: '10%', right: '2%' },
      { kind: 'bolt', size: 64, color: 'var(--gold)', rot: -14, depth: 0.8, bob: 10, top: '30%', left: '-1%' },
    ]}>
      <Inner>
        <Reveal><Eyebrow $light>Photos</Eyebrow><Title $light>Fan art and <span>stills</span></Title></Reveal>
        <Grid>
          {gallery.map((g, i) => (
            <Item key={g.src} $wide={g.wide} {...rv(i * 0.06)}><img src={img(g.src)} alt={g.alt} loading="lazy" /><figcaption>{g.credit}</figcaption></Item>
          ))}
        </Grid>
        <Note>Images belong to their artists and the film’s makers. Hover or tap an image to see it in full colour.</Note>
      </Inner>
    </Band>
  )
}
