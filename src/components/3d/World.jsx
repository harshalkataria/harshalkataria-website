// src/components/3d/World.jsx
import React from 'react';
import { useBox, usePlane } from '@react-three/cannon';

const World = () => {
  // Create a physics plane for the ground with better friction
  const [ref] = usePlane(() => ({ 
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    type: "Static",
    friction: 0.2,  // Increased friction for better traction
    restitution: 0.0  // No bounce
  }));

  // Create physics boxes for obstacles - positioned farther away
  const [box1] = useBox(() => ({ 
    mass: 100,
    position: [20, 0.5, 20],
    args: [1, 1, 1],
  }));
  
  const [box2] = useBox(() => ({ 
    mass: 100,
    position: [-20, 0.5, -20],
    args: [1, 1, 1],
  }));

  return (
    <group>
      {/* Ground - lighter color for better visibility */}
      <mesh ref={ref} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#606060" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Obstacles - moved far away */}
      <mesh ref={box1} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ff4040" />
      </mesh>
      
      <mesh ref={box2} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ff4040" />
      </mesh>
    </group>
  );
};

export default World;