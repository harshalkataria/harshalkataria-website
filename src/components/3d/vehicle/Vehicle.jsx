// src/components/3d/vehicle/Vehicle.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import * as THREE from 'three';
import VehicleModel from './VehicleModel';
import VehicleControls from './VehicleControls';
import { models } from '../../../utils/configLoader';

const Vehicle = () => {
  const carModel = useRef();
  const chassisRef = useRef();
  const position = models.vehicle.position || [0, 0, 0];
  const [isReady, setIsReady] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [useFallback, setUseFallback] = useState(false);
  
  // Create chassis physics body
  const [chassisBody, chassisApi] = useBox(() => ({
    mass: 1500,
    position,
    args: [2, 0.5, 4], // width, height, length
    allowSleep: false,
    type: 'Dynamic', // Change to Dynamic to allow movement
    userData: { id: 'vehicle' },
  }));

  // Store reference to chassisBody
  useEffect(() => {
    if (chassisBody.current) {
      chassisRef.current = chassisBody.current;
    }
  }, [chassisBody]);

  // Handle model ready state with improved retry mechanism
  useEffect(() => {
    // Check if model is ready
    if (carModel.current) {
      console.log('[Vehicle] Car model is ready');
      
      // Ensure model has geometry before considering it ready
      const hasGeometry = checkModelHasGeometry(carModel.current);
      
      if (hasGeometry) {
        console.log('[Vehicle] Car model has geometry, setting ready state');
        setIsReady(true);
      } else if (retryCount < 3) {
        // If model exists but has no geometry, retry after a delay
        console.warn('[Vehicle] Car model exists but has no geometry, retrying');
        const timer = setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, 500);
        
        return () => clearTimeout(timer);
      } else {
        // After 3 retries, use fallback model
        console.warn('[Vehicle] Car model still has no geometry after retries, using fallback');
        setUseFallback(true);
        setIsReady(true);
      }
    }
  }, [carModel.current, retryCount]);
  
  // Helper function to check if model has geometry
  const checkModelHasGeometry = (model) => {
    let hasGeometry = false;
    if (!model) return false;
    
    // Log the model structure to help debug
    console.log('[Vehicle] Checking model structure:', model);
    
    // Check if model has meshes with geometry
    model.traverse((child) => {
      if (child.isMesh && child.geometry) {
        hasGeometry = true;
        console.log('[Vehicle] Found geometry in child:', child.name || 'unnamed mesh');
      }
    });
    
    return hasGeometry;
  };

  // Basic rendering without movement - only run if model is ready
  useFrame(() => {
    if (!isReady || !chassisRef.current || !carModel.current) return;
    
    // Sync the model position with the physics body
    carModel.current.position.copy(chassisRef.current.position);
    carModel.current.quaternion.copy(chassisRef.current.quaternion);
  });
  
  return (
    <group>
      {/* Physics body - invisible box */}
      <mesh ref={chassisBody} castShadow>
        <boxGeometry args={[2, 0.5, 4]} />
        <meshBasicMaterial transparent opacity={0.0} />
      </mesh>
      
      {/* Visual model */}
      <VehicleModel modelRef={carModel} useFallback={useFallback} />
      
      {/* Controls */}
      <VehicleControls />
    </group>
  );
};

export default Vehicle;