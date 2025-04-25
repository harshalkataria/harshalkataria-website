// src/components/3d/environment/Ground.jsx
import React from 'react';
import { usePlane } from '@react-three/cannon';
import { theme } from '../../../utils/configLoader';

const Ground = () => {
  const [ref] = usePlane(() => ({ 
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    type: "Static",
    friction: 0.2,
    restitution: 0.0
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial 
        color={theme.colors.groundColor || "#606060"} 
        roughness={0.8} 
        metalness={0.2} 
      />
    </mesh>
  );
};

export default Ground;