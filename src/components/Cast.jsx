import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CastSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 80px 6%;
  background: var(--bg-dark);
  position: relative;
`;

const SectionHeader = styled.div`
  margin-bottom: 50px;
`;

const Title = styled.h2`
  font-size: 5rem;
  color: #fff;
  margin-bottom: 10px;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 2px;
  height: 60%;
  width: 100%;
`;

const CharCard = styled(motion.div)`
  flex: 1;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background: #000;
  transition: flex 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    flex: 2;
  }
`;

const CharImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) brightness(0.6);
  transition: all 0.8s ease;

  ${CharCard}:hover & {
    filter: grayscale(0) brightness(1) scale(1.05);
  }
`;

const CharInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 40px;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;

  ${CharCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CharName = styled.h3`
  font-family: 'Bebas Neue';
  font-size: 2.5rem;
  letter-spacing: 2px;
  color: #fff;
`;

const CharRole = styled.p`
  font-size: 0.8rem;
  letter-spacing: 4px;
  color: var(--primary-red);
  text-transform: uppercase;
  margin-top: 5px;
`;

const CastData = [
  { name: "Tovino Thomas", role: "Jaison / Minnal Murali", img: "assets/3BqRwLPqsSgGwbQszv9dUkUrypA.jpg" },
  { name: "Guru Somasundaram", role: "Shibu", img: "assets/karthik-s-minnal-final-2.jpg" },
  { name: "Femina George", role: "Bruce Lee Biji", img: "assets/abhi-vpm-minnal-2-copy.jpg" },
  { name: "Shelly Kishore", role: "Usha", img: "assets/E-gPPEeVIAodK8z.jpeg" }
];

const Cast = () => {
  return (
    <CastSection>
      <SectionHeader>
        <Title>The Heroes & Villains</Title>
        <div style={{ width: '60px', height: '4px', background: 'var(--primary-red)' }}></div>
      </SectionHeader>
      
      <CardContainer>
        {CastData.map((char, index) => (
          <CharCard key={index} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1, duration: 0.8 }}>
            <CharImage src={char.img} alt={char.name} />
            <CharInfo>
              <CharName>{char.name}</CharName>
              <CharRole>{char.role}</CharRole>
            </CharInfo>
          </CharCard>
        ))}
      </CardContainer>
    </CastSection>
  );
};

export default Cast;
