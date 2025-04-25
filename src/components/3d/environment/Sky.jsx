// src/components/3d/environment/Sky.jsx
import React from 'react';
import { Sky as DreiSky, Stars } from '@react-three/drei';

const Sky = () => {
  return (
    <>
      <DreiSky sunPosition={[100, 20, 100]} />
      <Stars radius={100} depth={50} count={5000} factor={4} />
    </>
  );
};

export default Sky;