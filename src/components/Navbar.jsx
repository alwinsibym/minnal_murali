import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { img } from '../data/film'

const Bar = styled.header`
  position: fixed; inset: 0 0 auto 0; z-index: 50;
  padding: calc(10px + env(safe-area-inset-top, 0px)) max(16px, env(safe-area-inset-right, 0px)) 10px max(16px, env(safe-area-inset-left, 0px));
  display: flex; align-items: center; gap: 1.5rem;
  background: ${(p) => (p.$solid ? 'rgba(7,11,28,.82)' : 'linear-gradient(rgba(7,11,28,.7), transparent)')};
  backdrop-filter: ${(p) => (p.$solid ? 'blur(14px)' : 'none')};
  border-bottom: 1px solid ${(p) => (p.$solid ? 'rgba(82,200,255,.18)' : 'transparent')};
  transition: background .3s, border-color .3s;
`
const Brand = styled.a`
  display: flex; align-items: center; flex: none;
  img { height: 30px; width: auto; }
`
const Links = styled.nav`
  display: flex; gap: 1.4rem; margin-left: auto; margin-right: 150px; overflow-x: auto; scrollbar-width: none; min-width: 0;
  &::-webkit-scrollbar { display: none; }
  a { font-family: var(--mono); font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; text-decoration: none; color: #9aa6cf; white-space: nowrap; padding: 8px 0; transition: color .2s; }
  a:hover, a[aria-current='true'] { color: #fff; }
  a[aria-current='true'] { box-shadow: 0 2px 0 var(--gold); }
  @media (max-width: 720px) { margin-right: 0; }
`
const sections = [['story', 'Story'], ['cast', 'Cast'], ['trailer', 'Trailer'], ['making', 'Making'], ['reception', 'Reception'], ['watch', 'Watch'], ['gallery', 'Gallery'], ['links', 'Links']]

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [current, setCurrent] = useState('')
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setCurrent(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    sections.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])
  return (
    <Bar $solid={solid}>
      <Brand href="#top" aria-label="Minnal Murali, back to top"><img src={img('wordmark.png')} alt="Minnal Murali" /></Brand>
      <Links aria-label="Sections">
        {sections.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={current === id}>{label}</a>)}
      </Links>
    </Bar>
  )
}
