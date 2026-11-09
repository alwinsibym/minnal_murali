import styled from 'styled-components'

const Foot = styled.footer`padding: 2.5rem max(20px, env(safe-area-inset-right, 0px)) calc(110px + env(safe-area-inset-bottom, 0px)) max(20px, env(safe-area-inset-left, 0px)); background: var(--ink); color: #9aa6cf; font-size: .9rem; border-top: 1px solid rgba(82,200,255,.15); p { max-width: 1120px; margin: 0 auto; }`
export default function Footer() {
  return <Foot><p>This is an unofficial fan project and is not affiliated with Netflix, Weekend Blockbusters or anyone involved in the film. Film titles, music and images belong to their owners. Information was gathered from public sources and was current as of November 2026.</p></Foot>
}
