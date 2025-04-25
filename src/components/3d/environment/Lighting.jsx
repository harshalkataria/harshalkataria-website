// src/components/3d/environment/Lighting.jsx
import React from 'react';

const Lighting = () => {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={2.0} 
        castShadow 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048} 
      />
      <spotLight
        position={[0, 15, 0]}
        angle={0.6}
        penumbra={0.5}
        intensity={1.5}
        castShadow
        color="#ffffff"
      />
    </>
  );
};

export default Lighting;