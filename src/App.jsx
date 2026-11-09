import GlobalStyle from './components/GlobalStyle'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Story from './components/Story'
import Cast from './components/Cast'
import Trailer from './components/Trailer'
import Making from './components/Making'
import Reception from './components/Reception'
import Watch from './components/Watch'
import Gallery from './components/Gallery'
import Links from './components/Links'
import Footer from './components/Footer'
import AudioPlayer from './components/AudioPlayer'

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Cast />
        <Trailer />
        <Making />
        <Reception />
        <Watch />
        <Gallery />
        <Links />
      </main>
      <Footer />
      <AudioPlayer />
    </>
  )
}
