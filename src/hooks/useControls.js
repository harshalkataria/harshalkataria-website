import { useEffect, useState } from 'react';

export const useEngineControls = (onEngineStart, onEngineStop) => {
  const [engineRunning, setEngineRunning] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        if (engineRunning) {
          setEngineRunning(false);
          onEngineStop();
        } else {
          setEngineRunning(true);
          onEngineStart();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [engineRunning, onEngineStart, onEngineStop]);
  
  return engineRunning;
};
