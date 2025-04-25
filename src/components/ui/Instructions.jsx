// src/components/ui/Instructions.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../utils/configLoader';

const InstructionsContainer = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.5);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  color: ${props => props.theme?.colors?.text || '#ffffff'};
  font-size: 0.9rem;
  text-align: center;
  z-index: 30;
  pointer-events: none; /* Allow mouse events to pass through */
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`;

const Instructions = ({ children }) => {
  return (
    <InstructionsContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1 }}
    >
      {children}
    </InstructionsContainer>
  );
};

export default Instructions;