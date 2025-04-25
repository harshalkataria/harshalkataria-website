import { useEffect } from 'react';
import useSound from 'use-sound';
import { sounds } from '../config/sounds';

export const useEngineSound = () => {
  const [playEngineStart] = useSound(sounds.engineStart.path, { 
    volume: sounds.engineStart.volume,
    ...sounds.engineStart.options
  });
  
  const [playEngineLoop, { stop: stopEngineLoop }] = useSound(sounds.engineLoop.path, { 
    volume: sounds.engineLoop.volume,
    ...sounds.engineLoop.options
  });

  useEffect(() => {
    return () => {
      stopEngineLoop();
    };
  }, [stopEngineLoop]);

  return {
    playEngineStart,
    playEngineLoop,
    stopEngineLoop
  };
};
