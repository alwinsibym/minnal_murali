import React from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: transparent;
`;

const ContentBox = styled(motion.div)`
  perspective: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

const Logo = styled(motion.img)`
  width: 550px;
  max-width: 90vw;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.8));
  cursor: pointer;
`;

const Subtitle = styled(motion.p)`
  font-size: 0.8rem;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: #a0a0a0;
  margin-top: 30px;
  font-weight: 300;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 50px;
`;

const MainButton = styled(motion.a)`
  padding: 16px 40px;
  background: var(--primary-red);
  color: white;
  text-decoration: none;
  font-weight: 800;
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-radius: 2px;
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background: #ff0000;
    box-shadow: 0 0 30px rgba(229, 9, 20, 0.5);
  }
`;

const IMDbButton = styled(MainButton)`
  background: #f5c518;
  color: #000;
  
  &:hover {
    background: #ffd700;
    box-shadow: 0 0 30px rgba(245, 197, 24, 0.5);
  }
`;

const Hero = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <HeroSection onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <ContentBox style={{ rotateX, rotateY }}>
        <Logo 
          src="assets/minnal-murali-61ec09d44cdd7.png" 
          alt="Minnal Murali Original Logo"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          A BASIL JOSEPH FILM • PRODUCED BY SOPHIA PAUL • SCORE BY SUSHIN SHYAM
        </Subtitle>
        
        <ButtonContainer>
          <MainButton 
            href="https://www.netflix.com/title/81497215" 
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-play"></i> Watch on Netflix
          </MainButton>
          <IMDbButton 
            href="https://www.imdb.com/title/tt10904462/" 
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fab fa-imdb"></i> IMDb Insight
          </IMDbButton>
        </ButtonContainer>
      </ContentBox>
    </HeroSection>
  );
};

export default Hero;
