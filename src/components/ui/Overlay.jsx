// src/components/ui/Overlay.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { profile, theme } from '../../utils/configLoader';
import SocialLinks from './SocialLinks';

const OverlayContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 10%;
  z-index: 50;
  pointer-events: none;
`;

const TextContent = styled.div`
  pointer-events: none;
  padding: 0;
  margin-bottom: 1.5rem;
  max-width: 800px;
`;

const Title = styled(motion.h1)`
  font-size: 5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-shadow: 
    0 0 10px rgba(0, 0, 0, 0.8),
    2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: -0.02em;
`;

const Subtitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 400;
  color: #ffffff;
  margin: 0.5rem 0 0;
  text-shadow: 
    0 0 10px rgba(0, 0, 0, 0.8),
    2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const SocialLinksWrapper = styled(motion.div)`
  margin-top: 1rem;
  pointer-events: auto;
  padding: 0;
  background-color: transparent;
`;

const Overlay = () => {
  return (
    <OverlayContainer>
      <TextContent>
        <Title
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {profile.name}
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {profile.title}
        </Subtitle>
      </TextContent>
      
      <SocialLinksWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <SocialLinks size="2rem" />
      </SocialLinksWrapper>
    </OverlayContainer>
  );
};

export default Overlay;