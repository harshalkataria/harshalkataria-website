// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Experience from '../components/3d/Experience';
import Overlay from '../components/ui/Overlay';
import Instructions from '../components/ui/Instructions';

const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden; /* Prevent scrolling */
  display: flex;
  flex-direction: column;
`;

const ExperienceContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const ContentOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  pointer-events: none; /* Allow clicks to pass through to the 3D scene except where explicitly enabled */
`;

const Home = () => {
  const [experienceReady, setExperienceReady] = useState(false);

  // Handle when Experience signals it's fully loaded
  const handleExperienceLoaded = () => {
    console.log('[Home] Experience has finished loading');
    setExperienceReady(true);
  };

  return (
    <HomeContainer>
      {/* Experience container always renders Experience - it has its own LoadingScreen */}
      <ExperienceContainer>
        <Experience onLoaded={handleExperienceLoaded} />
      </ExperienceContainer>
      
      {/* Content overlay only shows when experience is ready */}
      <ContentOverlay>
        {experienceReady && (
          <>
            <Overlay />
            <Instructions>
              Press SPACE to toggle the engine sound on/off<br />
              Use mouse to rotate the camera view
            </Instructions>
          </>
        )}
      </ContentOverlay>
    </HomeContainer>
  );
};

export default Home;