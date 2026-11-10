import { useState } from 'react'
import styled from 'styled-components'
import { Play } from 'lucide-react'
import Band, { Inner, Eyebrow, Title } from './Band'
import Reveal from './Reveal'
import { trailers } from '../data/film'

const Head = styled.div`max-width: 60ch;`
const Player = styled.div`
  position: relative; aspect-ratio: 16 / 9; margin-top: 2rem; background: #070b1c; overflow: hidden;
  box-shadow: 0 0 0 1px rgba(232,177,58,.7), 14px 14px 0 -2px rgba(200,33,58,.9);
  iframe, button { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
  button { cursor: pointer; padding: 0; background: #070b1c; display: grid; place-items: center; }
  button img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: saturate(1.15) brightness(.8); transition: transform .6s, filter .6s; }
  button:hover img { transform: scale(1.04); filter: saturate(1.3) brightness(.95); }
  .play { position: relative; display: grid; place-items: center; width: 84px; height: 84px; border-radius: 50%; background: var(--crimson); color: #fff; box-shadow: 0 0 0 8px rgba(200,33,58,.3), 0 0 40px rgba(200,33,58,.6); }
  .cap { position: absolute; left: 0; bottom: 0; padding: 8px 14px; font-family: var(--mono); font-size: .72rem; letter-spacing: .1em; text-transform: uppercase; background: rgba(7,11,28,.82); color: #e9eefc; }
`
const More = styled.p`margin-top: 2.2rem; color: #2a3563; a { color: var(--crimson); text-underline-offset: 3px; }`

export default function Trailer() {
  const [playing, setPlaying] = useState(false)
  const t = trailers[0]
  return (
    <Band id="trailer" $tone="light" ghost="Action" floaters={[
      { kind: 'tape', size: 150, color: 'var(--crimson)', rot: 12, depth: 0.4, bob: 6, top: '4%', right: '3%' },
      { kind: 'bolt', size: 90, color: 'var(--gold)', rot: -12, depth: 0.6, bob: 12, bottom: '12%', left: '-1%' },
      { kind: 'crow', size: 80, color: '#0d1431', rot: 8, depth: 1, bob: 12, bottom: '6%', right: '12%' },
    ]}>
      <Inner>
        <Reveal><Head><Eyebrow $light>Trailer</Eyebrow><Title $light>Watch the <span>first strike</span></Title></Head></Reveal>
        <Reveal delay={0.1}>
          <Player>
            {playing ? (
              <iframe src={`https://www.youtube-nocookie.com/embed/${t.id}?autoplay=1&rel=0`} title="Minnal Murali official trailer" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
            ) : (
              <button type="button" onClick={() => setPlaying(true)} aria-label="Play the official trailer">
                <img src={`https://i.ytimg.com/vi/${t.id}/hqdefault.jpg`} alt="" loading="lazy" />
                <span className="play"><Play size={34} fill="currentColor" aria-hidden /></span>
                <span className="cap">{t.title} · {t.note}</span>
              </button>
            )}
          </Player>
        </Reveal>
        <Reveal delay={0.15}>
          <More>A bonus trailer followed on 1 December 2021. <a href="https://www.onmanorama.com/entertainment/entertainment-news/2021/12/01/minnal-murali-bonus-trailer-superhero-noble-deed.html" target="_blank" rel="noreferrer">Read about it on Onmanorama</a>. <a href="https://www.youtube.com/results?search_query=minnal+murali" target="_blank" rel="noreferrer">More videos on YouTube</a>.</More>
        </Reveal>
      </Inner>
    </Band>
  )
}
