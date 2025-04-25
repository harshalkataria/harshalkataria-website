// src/components/3d/vehicle/VehicleControls.jsx
import React from 'react';
import { useEngineControls } from '../../../hooks/useControls';
import { useEngineSound } from '../../../hooks/useSound';

const VehicleControls = () => {
  const { playEngineStart, playEngineLoop, stopEngineLoop } = useEngineSound();
  
  const handleEngineStart = () => {
    playEngineStart();
    setTimeout(() => {
      playEngineLoop({ id: 'short' });
    }, 1000);
    console.log("Engine started");
  };
  
  const handleEngineStop = () => {
    stopEngineLoop();
    console.log("Engine stopped");
  };
  
  const engineRunning = useEngineControls(handleEngineStart, handleEngineStop);
  
  return null; // This component doesn't render anything, it just handles controls
};

export default VehicleControls;