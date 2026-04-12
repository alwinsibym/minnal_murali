import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StorySection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10%;
  background: transparent;
  position: relative;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  align-items: center;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const TextContainer = styled(motion.div)`
  border-left: 2px solid var(--primary-red);
  padding-left: 50px;
  
  @media (max-width: 1024px) {
    border-left: none;
    padding-left: 0;
  }
`;

const StoryTitle = styled.h2`
  font-size: 5rem;
  line-height: 0.9;
  margin-bottom: 40px;
  color: #fff;
`;

const StoryText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-gray);
  margin-bottom: 30px;
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0,0,0,0.8);
`;

const StoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Story = () => {
  return (
    <StorySection>
      <ContentGrid>
        <TextContainer
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <StoryTitle>The Bolt of <span style={{ color: 'var(--primary-red)' }}>Fate</span></StoryTitle>
          <StoryText>
            An extraordinary lightning strike in the small village of Kurukkanmoola changes the lives of two men forever. Jaison, a simple tailor, finds himself blessed with incredible speed and strength.
          </StoryText>
          <StoryText>
            But powers aren't always a gift. While one man chooses the path of the hero, another is driven into the abyss of revenge and madness.
          </StoryText>
        </TextContainer>
        
        <ImageContainer
          initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <StoryImage src="assets/minnalmurali-20211224142436-17951.jpg" alt="Origin Moment" />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(229, 9, 20, 0.2), transparent)' }}></div>
        </ImageContainer>
      </ContentGrid>
    </StorySection>
  );
};

export default Story;
