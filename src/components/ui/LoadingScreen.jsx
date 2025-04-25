import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  color: white;
`;

const ProgressBar = styled.div`
  width: 300px;
  height: 5px;
  background-color: #333333;
  border-radius: 3px;
  margin: 20px 0;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background-color: #ffffff;
  border-radius: 3px;
`;

const StatusText = styled.div`
  font-size: 16px;
  margin-top: 10px;
  color: #cccccc;
`;

const ProgressText = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const LoadingScreen = ({ progress, status }) => {
  return (
    <LoadingContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ProgressText>{progress}%</ProgressText>
      <ProgressBar>
        <ProgressFill
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 50 }}
        />
      </ProgressBar>
      <StatusText>{status}</StatusText>
    </LoadingContainer>
  );
};

export default LoadingScreen; 