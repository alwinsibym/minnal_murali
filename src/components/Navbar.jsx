import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  padding: 30px 6%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s ease;
  background: ${props => props.scrolled ? 'rgba(5, 6, 8, 0.8)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(20px)' : 'none'};
  border-bottom: ${props => props.scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'};
`;

const NavLogo = styled.img`
  height: 40px;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 40px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #a0a0a0;
  text-decoration: none;
  font-size: 0.85rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 400;
  transition: color 0.3s ease;
  
  &:hover {
    color: #fff;
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // We listen to the main container scroll
    const main = document.querySelector('main');
    const handleScroll = () => {
      if (main.scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    main?.addEventListener('scroll', handleScroll);
    return () => main?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Nav scrolled={scrolled}>
      <NavLogo src="assets/minnal-murali-61ec09d44cdd7.png" alt="Logo" onClick={() => document.querySelector('main').scrollTo({ top: 0, behavior: 'smooth' })} />
      <NavLinks>
        <NavLink href="#hero">Mission</NavLink>
        <NavLink href="#story">Origin</NavLink>
        <NavLink href="#cast">Heroes</NavLink>
        <NavLink href="https://www.imdb.com/title/tt10904462/" target="_blank">Intelligence (IMDb)</NavLink>
      </NavLinks>
      <div style={{ color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}>
        <i className="fas fa-bars"></i>
      </div>
    </Nav>
  );
};

export default Navbar;
