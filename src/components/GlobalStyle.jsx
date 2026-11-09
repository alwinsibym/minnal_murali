import { createGlobalStyle } from 'styled-components'
import { theme } from '../theme'

const grain = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .1  0 0 0 0 .15  0 0 0 0 .3  0 0 0 .09 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`

export default createGlobalStyle`
  :root {
    --ink: ${theme.ink}; --storm: ${theme.storm}; --royal: ${theme.royal};
    --crimson: ${theme.crimson}; --gold: ${theme.gold}; --volt: ${theme.volt};
    --paper: ${theme.paper}; --paper-deep: ${theme.paperDeep};
    --display: 'Bebas Neue', 'Arial Narrow', Impact, sans-serif;
    --body: 'Outfit', system-ui, -apple-system, 'Segoe UI', sans-serif;
    --mono: 'IBM Plex Mono', ui-monospace, Menlo, Consolas, monospace;
    --ml: 'Noto Sans Malayalam', 'Nirmala UI', sans-serif;
    --grain: ${grain};
    color-scheme: dark;
  }
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; overflow-x: clip; }
  main { overflow-x: clip; }
  body {
    margin: 0; background: var(--ink); color: ${theme.text};
    font-family: var(--body); font-size: 1.0625rem; line-height: 1.65;
    -webkit-font-smoothing: antialiased;
  }
  img { max-width: 100%; display: block; }
  a { color: inherit; }
  h1, h2, h3, p { margin: 0; }
  h1, h2 { font-family: var(--display); font-weight: 400; text-transform: uppercase; letter-spacing: .03em; text-wrap: balance; }
  :focus-visible { outline: 2px solid var(--volt); outline-offset: 3px; }
  ::selection { background: var(--crimson); color: #fff; }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } * { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
`
