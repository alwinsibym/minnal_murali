import React, { Suspense } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Cast from './components/Cast';
import Story from './components/Story';
import Navbar from './components/Navbar';
import ThreeBackground from './components/ThreeBackground';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-red: #e50914;
    --lightning-blue: #00d4ff;
    --bg-dark: #050608;
    --text-white: #ffffff;
    --text-gray: #a0a0a0;
  }

  * {
    margin: 0; padding: 0; box-sizing: border-box;
  }

  body {
    background: var(--bg-dark);
    color: var(--text-white);
    font-family: 'Outfit', sans-serif;
    overflow-x: hidden;
    /* Hide scrollbar but keep functionality */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  body::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }

  h1, h2 {
    font-family: 'Bebas Neue', cursive;
    letter-spacing: 4px;
    text-transform: uppercase;
  }
`;

const MainContainer = styled.main`
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <ThreeBackground />
      <MainContainer>
        <div id="hero" style={{ scrollSnapAlign: 'start' }}>
          <Hero />
        </div>
        <div id="story" style={{ scrollSnapAlign: 'start' }}>
          <Story />
        </div>
        <div id="cast" style={{ scrollSnapAlign: 'start' }}>
          <Cast />
        </div>
      </MainContainer>
    </>
  );
}

export default App;
