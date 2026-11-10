import styled from 'styled-components'
import { ArrowUpRight } from 'lucide-react'
import Band, { Inner, Eyebrow, Title } from './Band'
import Reveal from './Reveal'
import Obj from './Objects'
import { img } from '../data/film'
import { photo } from '../data/photos'

const Quotes = styled.div`display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; margin-top: 2rem;`
const Quote = styled.a`
  cursor: ${(p) => (p.href ? 'pointer' : 'default')};
  position: relative; display: flex; flex-direction: column; gap: .8rem; padding: 1.4rem 1.4rem 1.2rem; text-decoration: none; color: #0d1431; background: #fff; min-width: 0;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%); box-shadow: inset 0 0 0 1px #b7c0dd;
  transition: transform .25s, box-shadow .25s; &:hover { transform: translateY(-4px); box-shadow: inset 0 0 0 2px var(--crimson); }
  q { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.45rem; line-height: 1.25; font-style: italic; quotes: '“' '”'; }
  span { margin-top: auto; font-family: var(--mono); font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; color: #46527f; display: flex; justify-content: space-between; gap: 1rem; align-items: center; }
  b { color: var(--crimson); font-weight: 500; }
`
const Bento = styled.div`
  display: grid; gap: 14px; margin-top: clamp(2rem, 5vw, 3rem); grid-template-columns: repeat(12, minmax(0, 1fr));
  @media (max-width: 860px) { grid-template-columns: minmax(0, 1fr); }
`
const cell = (span) => `grid-column: span ${span}; @media (max-width: 860px) { grid-column: auto; }`
const Director = styled.div`
  ${cell(7)} position: relative; min-height: 360px; display: grid; grid-template-columns: minmax(0, 1fr); align-content: end; padding: 1.6rem; overflow: hidden; color: #e9eefc;
  background: radial-gradient(90% 90% at 80% 10%, #28409a, transparent 60%), linear-gradient(160deg, #0d1431, #070b1c);
  clip-path: polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%);
  .photo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: saturate(1.1) contrast(1.08) brightness(.8); }
  .shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(7,11,28,.1), rgba(7,11,28,.92) 78%); }
  .trophy { position: absolute; right: 6%; top: 10%; opacity: .95; filter: drop-shadow(0 0 28px rgba(232,177,58,.6)); }
  .rays { position: absolute; right: -10%; top: -20%; width: 70%; aspect-ratio: 1; background: repeating-conic-gradient(from 0deg, rgba(232,177,58,.16) 0 6deg, transparent 6deg 16deg); border-radius: 50%; mask-image: radial-gradient(circle, #000 20%, transparent 70%); -webkit-mask-image: radial-gradient(circle, #000 20%, transparent 70%); }
  > div { position: relative; z-index: 2; }
  small { font-family: var(--mono); font-size: .7rem; letter-spacing: .14em; text-transform: uppercase; color: var(--gold); }
  h3 { font-family: var(--display); font-weight: 400; font-size: clamp(2.4rem, 6vw, 4rem); line-height: .95; letter-spacing: .03em; text-transform: uppercase; margin: .3rem 0 .6rem; }
  p { max-width: 50ch; color: #d3dcf7; font-size: .98rem; }
`
const Ledger = styled.div`
  ${cell(5)} padding: 1.4rem 1.5rem; background: #0d1431; color: #e9eefc; position: relative; overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%);
  h3 { font-family: var(--mono); font-weight: 500; font-size: .74rem; letter-spacing: .14em; text-transform: uppercase; color: var(--gold); }
  ul { list-style: none; margin: .8rem 0 0; padding: 0; display: grid; gap: 0; }
  li { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 1rem; padding: .6rem 0; border-bottom: 1px solid rgba(154,166,207,.22); font-size: .95rem; }
  li span { color: #9aa6cf; font-family: var(--mono); font-size: .72rem; text-align: right; }
  .star { position: absolute; right: -14px; top: -14px; opacity: .2; transform: rotate(14deg); }
`
const Tile = styled.figure`
  ${(p) => cell(p.$span)} margin: 0; position: relative; overflow: hidden; min-height: 220px; background: #0d1431;
  img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: grayscale(.8) contrast(1.1); transition: filter .6s, transform .8s; }
  &:hover img { filter: grayscale(0) saturate(1.2); transform: scale(1.05); }
  figcaption { position: absolute; left: 0; bottom: 0; padding: 6px 12px; font-family: var(--mono); font-size: .66rem; letter-spacing: .1em; text-transform: uppercase; background: rgba(7,11,28,.85); color: var(--gold); }
`
const Out = styled.a`${cell(4)} display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.2rem; text-decoration: none; color: #0d1431; background: #fff; box-shadow: inset 0 0 0 1px #b7c0dd; transition: transform .2s, box-shadow .2s; &:hover { transform: translateX(4px); box-shadow: inset 4px 0 0 var(--crimson), inset 0 0 0 1px var(--crimson); } span { font-family: var(--mono); font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; color: #46527f; display: block; } b { font-weight: 500; }`

const critics = [
  ['“Tovino Thomas is identified by his innocent appearance and Everyman-ness, not muscle.”', 'The News Minute', 'Sowmya Rajendran · 4 stars', null],
  ['Guru Somasundaram is magnetic in a marvellous origins story that has the soul of a solid drama', 'Film Companion', 'Review headline', 'https://www.filmcompanion.in/reviews/malayalam-review/minnal-murali-movie-netflix-tovino-thomas-basil-joseph-guru-somasundaram-is-magnetic-in-a-marvellous-origins-story-that-has-the-soul-of-a-solid-drama'],
  ['The simple brilliance of Minnal Murali', 'The Kathmandu Post', 'Review headline', 'https://kathmandupost.com/38/2022/01/14/the-simple-brilliance-of-minnal-murali'],
]
const keralaState = [['Visual effects', 'Andrew D’Cruz'], ['Sound mixing', 'Justin Jose'], ['Costume design', 'Melwy J.'], ['Male playback singer', 'Pradeep Kumar']]
const siima = [['Best Film', 'Weekend Blockbusters'], ['Best Actor', 'Tovino Thomas'], ['Best Actor, Negative Role', 'Guru Somasundaram'], ['Best Male Playback', 'Mithun Jayaraj']]

export default function Reception() {
  const dir = photo('director-award')
  const night = photo('awards-night')
  return (
    <Band id="reception" $tone="light" ghost="Awards" floaters={[
      { kind: 'trophy', size: 120, color: 'var(--gold)', rot: 12, depth: 0.5, bob: 8, top: '1%', right: '3%' },
      { kind: 'star', size: 46, color: 'var(--crimson)', rot: 14, depth: 0.8, bob: 10, top: '26%', left: '-1%' },
      { kind: 'bolt', size: 70, color: 'var(--gold)', rot: -12, depth: 0.6, bob: 10, bottom: '6%', right: '-1%' },
    ]}>
      <Inner>
        <Reveal><Eyebrow $light>Reception and awards</Eyebrow><Title $light>What critics <span>said</span></Title></Reveal>
        <Reveal delay={0.05}>
          <Quotes>
            {critics.map(([q, who, meta, href]) => (
              <Quote key={who} as={href ? 'a' : 'div'} href={href || undefined} target={href ? '_blank' : undefined} rel={href ? 'noreferrer' : undefined}>
                <q>{q.replace(/^“|”$/g, '')}</q>
                <span><b>{who}</b><i style={{ fontStyle: 'normal' }}>{meta}</i>{href && <ArrowUpRight size={16} aria-hidden />}</span>
              </Quote>
            ))}
          </Quotes>
        </Reveal>

        <Bento>
          <Director>
              {dir ? <img className="photo" src={dir} alt="Basil Joseph with the Best Direction award" loading="lazy" /> : (<><div className="rays" /><div className="trophy"><Obj kind="trophy" size={130} color="var(--gold)" /></div></>)}
              <div className="shade" />
              <div>
                <small>Director’s corner · Asian Academy Creative Awards 2022</small>
                <h3>Basil Joseph</h3>
                <p>Won Best Direction (Fiction) for Minnal Murali at the ceremony held at Chijmes Hall in Singapore on 8 December 2022, the first in-person edition in two years. He was also nominated for Best Director at SIIMA, and the film took Second Best Film at the Kerala Film Critics Association Awards.</p>
              </div>
            </Director>
          <Ledger>
            <Obj kind="star" size={120} color="var(--gold)" className="star" />
            <h3>Kerala State Film Awards · 52nd</h3>
            <ul>{keralaState.map(([k, v]) => <li key={k}>{k}<span>{v}</span></li>)}</ul>
            <h3 style={{ marginTop: '1.4rem' }}>SIIMA · 10th · Malayalam</h3>
            <ul>{siima.map(([k, v]) => <li key={k}>{k}<span>{v}</span></li>)}</ul>
          </Ledger>
          {night ? <Tile $span={6}><img src={night} alt="Minnal Murali team at an awards night" loading="lazy" /><figcaption>Awards night</figcaption></Tile> : <Tile $span={6}><img src={img('costume-city.jpg')} alt="Minnal Murali standing above a misty city" loading="lazy" /><figcaption>The suit · fan artwork</figcaption></Tile>}
          <Tile $span={6}><img src={img('village-strike.jpg')} alt="Lightning striking the village" loading="lazy" style={{ objectPosition: '50% 30%' }} /><figcaption>The strike · fan artwork</figcaption></Tile>
          <Out href="https://www.imdb.com/title/tt7268738/awards/" target="_blank" rel="noreferrer"><div><span>IMDb</span><b>Full awards list</b></div><ArrowUpRight size={20} aria-hidden /></Out>
          <Out href="https://www.imdb.com/title/tt7268738/reviews" target="_blank" rel="noreferrer"><div><span>IMDb</span><b>User reviews and rating</b></div><ArrowUpRight size={20} aria-hidden /></Out>
          <Out href="https://www.rottentomatoes.com/m/minnal_murali" target="_blank" rel="noreferrer"><div><span>Rotten Tomatoes</span><b>Critic and audience scores</b></div><ArrowUpRight size={20} aria-hidden /></Out>
        </Bento>
      </Inner>
    </Band>
  )
}
