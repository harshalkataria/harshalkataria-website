// src/components/3d/Experience.jsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Grid } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import Vehicle from './vehicle/Vehicle';
import Ground from './environment/Ground';
import Lighting from './environment/Lighting';
import Sky from './environment/Sky';
import ModelChecker from '../debug/ModelChecker';
import LoadingScreen from '../ui/LoadingScreen';
import { models } from '../../utils/configLoader';
import { useLoadingManager } from '../../hooks/useLoadingManager';
import { theme } from '../../utils/configLoader';

const Experience = ({ onLoaded }) => {
  const { progress, status, isLoading } = useLoadingManager();
  const canvasRef = useRef(null);
  const [canvasVisible, setCanvasVisible] = useState(false);
  const [modelCheckComplete, setModelCheckComplete] = useState(false);
  const [renderAttempt, setRenderAttempt] = useState(0);
  
  // Check model validity before proceeding
  useEffect(() => {
    // Trigger model checking only once
    if (!modelCheckComplete) {
      console.log('[Experience] Checking model path:', models.vehicle.path);
      
      // After a short delay, mark model check as complete
      // This gives ModelChecker time to validate the model
      const timer = setTimeout(() => {
        setModelCheckComplete(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [modelCheckComplete]);
  
  // Handle WebGL context creation
  const handleCreated = useCallback(({ gl, scene }) => {
    console.log('[Experience] WebGL context created');
    
    // Configure renderer for better performance
    // Use newer THREE output encoding if available
    gl.outputEncoding = THREE.sRGBEncoding || THREE.LinearSRGBColorSpace;
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Store the gl context in the ref for cleanup
    if (canvasRef.current) {
      canvasRef.current.__gl = gl;
    }
  }, []);
  
  // Handle WebGL context loss
  const handleContextLost = useCallback((event) => {
    console.warn('[Experience] WebGL context lost, attempting recovery');
    event.preventDefault();
    
    // Try to recover by incrementing the render attempt
    // This will cause the Canvas to be unmounted and remounted
    setRenderAttempt(prev => prev + 1);
  }, []);
  
  // Notify parent component when loading is complete
  useEffect(() => {
    if (!isLoading && modelCheckComplete) {
      console.log('[Experience] Loading complete, showing canvas');
      // Add a small delay before showing the canvas
      const timer = setTimeout(() => {
        setCanvasVisible(true);
        // Notify parent that experience is fully loaded
        if (onLoaded) onLoaded();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, modelCheckComplete, onLoaded]);
  
  // Add a cleanup function to handle WebGL context loss
  useEffect(() => {
    return () => {
      // Clean up WebGL context when component unmounts
      try {
        if (canvasRef.current && canvasRef.current.__gl) {
          const gl = canvasRef.current.__gl;
          if (gl) {
            console.log('[Experience] Cleaning up WebGL renderer');
            gl.forceContextLoss();
            gl.dispose();
          }
        }
      } catch (error) {
        console.error('[Experience] Error during WebGL cleanup:', error);
      }
    };
  }, []);
  
  // Add event listener for webglcontextlost event
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const domElement = canvas.__gl?.domElement;
      if (domElement) {
        console.log('[Experience] Adding context lost listener');
        domElement.addEventListener('webglcontextlost', handleContextLost);
        
        return () => {
          console.log('[Experience] Removing context lost listener');
          domElement.removeEventListener('webglcontextlost', handleContextLost);
        };
      }
    }
  }, [canvasRef.current, handleContextLost]);
  
  return (
    <>
      <AnimatePresence>
        {/* Show loading screen while checking model or loading assets */}
        {(isLoading || !modelCheckComplete) && (
          <LoadingScreen progress={progress} status={status || 'Validating 3D models...'} />
        )}
      </AnimatePresence>
      
      {/* Only check model once before loading */}
      {!modelCheckComplete && <ModelChecker modelPath={models.vehicle.path} onComplete={() => setModelCheckComplete(true)} />}
      
      {/* Only render Canvas when loading is complete and model check is done */}
      {!isLoading && modelCheckComplete && (
        <Canvas 
          key={`canvas-${renderAttempt}`}
          ref={canvasRef}
          shadows
          gl={{ 
            powerPreference: 'high-performance',
            antialias: true,
            stencil: false,
            depth: true,
            alpha: false,
            preserveDrawingBuffer: true,
            failIfMajorPerformanceCaveat: false // Don't fail on low performance
          }}
          dpr={[1, 1.5]}
          frameloop="demand"
          performance={{ min: 0.5 }}
          onCreated={handleCreated}
        >
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[5, 3, 5]} />
            <OrbitControls 
              target={[0, 0, 0]} 
              maxPolarAngle={Math.PI / 2} 
              enableDamping={true}
            />
            
            <Lighting />
            <Environment preset="sunset" />
            <Sky />
            
            <Grid 
              infiniteGrid 
              cellSize={1}
              cellThickness={0.5}
              cellColor={theme.colors.groundColor || "#6f6f6f"}
              sectionSize={5}
              sectionThickness={1}
              sectionColor={theme.colors.accent || "#9d4b4b"}
              fadeDistance={50}
            />
            
            <Physics
              defaultContactMaterial={{
                friction: 0.2,
                restitution: 0.1,
              }}
              gravity={[0, -9.81, 0]}
            >
              <Ground />
              <Vehicle />
            </Physics>
          </Suspense>
        </Canvas>
      )}
    </>
  );
};

export default Experience;