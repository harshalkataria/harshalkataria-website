import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Experience from '../components/3d/Experience';
import { motion } from 'framer-motion';

const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 10%;
  pointer-events: none;
`;

const Title = styled(motion.h1)`
  font-size: 5rem;
  font-weight: 700;
  color: white;
  margin: 0;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 400;
  color: white;
  margin: 1rem 0;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
`;

const Home = () => {
  return (
    <HomeContainer>
      <Experience />
      <Overlay>
        <Title
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Harshal Kataria
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Software Engineer | Robotics Enthusiast | Cricketer
        </Subtitle>
      </Overlay>
    </HomeContainer>
  );
};

export default Home; 