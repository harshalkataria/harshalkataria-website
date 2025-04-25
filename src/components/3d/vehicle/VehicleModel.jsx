import React, { useEffect, memo, useState, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useModel } from '../../../hooks/useModel';
import { models } from '../../../utils/configLoader';

// Use memo to prevent unnecessary re-renders
const VehicleModel = memo(({ modelRef, useFallback }) => {
  console.log('[VehicleModel] Rendering with path:', models.vehicle.path);
  const [loadRetry, setLoadRetry] = useState(0);
  const internalModelRef = useRef();
  
  // Force direct loading of the model
  const gltf = useGLTF(models.vehicle.path);
  
  // Debug: Log the full structure of the GLTF file
  useEffect(() => {
    if (gltf) {
      console.log('[VehicleModel] GLTF File Contents:', gltf);
      
      // Inspect the scene graph structure
      if (gltf.scene) {
        console.log('[VehicleModel] Scene children count:', gltf.scene.children.length);
        
        // Log each direct child of the scene
        gltf.scene.children.forEach((child, index) => {
          console.log(`[VehicleModel] Scene child ${index}:`, child.type, child.name);
        });
        
        // Count meshes
        let meshCount = 0;
        gltf.scene.traverse(node => {
          if (node.isMesh) meshCount++;
        });
        console.log(`[VehicleModel] Total mesh count in scene: ${meshCount}`);
      } else {
        console.warn('[VehicleModel] GLTF file has no scene property');
      }
    }
  }, [gltf]);
  
  // Set correct properties for model positioning and scaling
  const modelConfig = {
    rotation: models.vehicle.rotation || [0, Math.PI, 0],
    scale: models.vehicle.scale || 1,
    position: models.vehicle.position || [0, 0, 0]
  };
  
  // Call useModel hook as a secondary loading method
  const { ref: model, state: loadingState } = useModel(models.vehicle.path, modelConfig);
  
  // Effect to directly handle the GLTF model
  useEffect(() => {
    if (gltf && gltf.scene && !useFallback) {
      console.log('[VehicleModel] Direct GLTF model loaded:', gltf);
      
      // Clone the scene to avoid reference issues
      const clonedScene = gltf.scene.clone();
      
      // Apply transformations
      if (modelConfig.rotation) {
        clonedScene.rotation.set(...modelConfig.rotation);
      }
      
      if (typeof modelConfig.scale === 'number') {
        clonedScene.scale.set(modelConfig.scale, modelConfig.scale, modelConfig.scale);
      }
      
      if (modelConfig.position) {
        clonedScene.position.set(...modelConfig.position);
      }
      
      // Apply shadows and optimize materials
      clonedScene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          if (child.material) {
            child.material.needsUpdate = true;
          }
          
          console.log('[VehicleModel] Processed mesh:', child.name || 'unnamed mesh');
        }
      });
      
      // Store in the internal ref and pass to the external ref
      internalModelRef.current = clonedScene;
      
      if (modelRef) {
        console.log('[VehicleModel] Setting external ref with direct GLTF model');
        modelRef.current = clonedScene;
      }
    }
  }, [gltf, modelConfig, modelRef, useFallback]);
  
  // Log loading state changes and handle model setup
  useEffect(() => {
    console.log('[VehicleModel] Loading state changed:', loadingState);
    
    // When model is loaded via useModel hook
    if (loadingState === 'loaded' && model.current && !useFallback && !internalModelRef.current) {
      console.log('[VehicleModel] Model loaded successfully via useModel hook');
      
      // Ensure model is properly positioned and configured
      processModel(model.current);
      
      // Pass to the external ref if not already set
      if (modelRef && !modelRef.current) {
        console.log('[VehicleModel] Setting external ref with useModel model');
        modelRef.current = model.current;
      }
    } else if (loadingState === 'error' && !useFallback) {
      console.error('[VehicleModel] Failed to load model:', models.vehicle.path);
      
      // Retry loading a few times if there's an error
      if (loadRetry < 3) {
        const retryDelay = 1000 * (loadRetry + 1); // Increasing delay with each retry
        console.log(`[VehicleModel] Will retry loading in ${retryDelay}ms (attempt ${loadRetry + 1}/3)`);
        
        const timer = setTimeout(() => {
          setLoadRetry(prev => prev + 1);
        }, retryDelay);
        
        return () => clearTimeout(timer);
      }
    }
  }, [loadingState, model, modelConfig, modelRef, loadRetry, useFallback]);
  
  // Helper function to process a model (apply transformations, shadows, etc.)
  const processModel = (modelObj) => {
    if (!modelObj) return;
    
    // Ensure model is properly positioned
    if (modelConfig.position) {
      modelObj.position.set(...modelConfig.position);
    }
    
    // Ensure model is properly rotated
    if (modelConfig.rotation) {
      modelObj.rotation.set(...modelConfig.rotation);
    }
    
    // Ensure model is properly scaled
    if (typeof modelConfig.scale === 'number') {
      modelObj.scale.set(modelConfig.scale, modelConfig.scale, modelConfig.scale);
    }
    
    // Traverse all child meshes to ensure shadows are enabled
    modelObj.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Ensure materials are properly updated
        if (child.material) {
          child.material.needsUpdate = true;
        }
      }
    });
  };
  
  // Create a fallback model (simple box) if loading fails or useFallback is true
  useEffect(() => {
    if (useFallback && !modelRef.current) {
      console.log('[VehicleModel] Creating fallback model');
      const fallbackModel = createFallbackModel();
      
      if (modelRef) {
        modelRef.current = fallbackModel;
      }
    }
  }, [useFallback, modelRef]);
  
  // Create a fallback model (simple box) if loading fails
  const createFallbackModel = () => {
    console.log('[VehicleModel] Creating fallback box model');
    const group = new THREE.Group();
    
    // Create a simple car shape using the fallback options from config
    const fallbackColor = models.vehicle.fallback?.color || 0x444444;
    const wheelColor = models.vehicle.fallback?.wheelColor || 0x222222;
    
    // Car body
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.5, 4),
      new THREE.MeshStandardMaterial({ color: fallbackColor })
    );
    body.castShadow = true;
    body.receiveShadow = true;
    
    // Car cabin/top
    const cabin = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.5, 2),
      new THREE.MeshStandardMaterial({ color: fallbackColor })
    );
    cabin.position.set(0, 0.5, 0);
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    
    // Add wheels (simple cylinders)
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 32);
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: wheelColor });
    
    // Front left wheel
    const wheelFL = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelFL.position.set(-1, -0.3, 1.2);
    wheelFL.rotation.set(Math.PI/2, 0, 0);
    
    // Front right wheel
    const wheelFR = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelFR.position.set(1, -0.3, 1.2);
    wheelFR.rotation.set(Math.PI/2, 0, 0);
    
    // Rear left wheel
    const wheelRL = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelRL.position.set(-1, -0.3, -1.2);
    wheelRL.rotation.set(Math.PI/2, 0, 0);
    
    // Rear right wheel
    const wheelRR = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelRR.position.set(1, -0.3, -1.2);
    wheelRR.rotation.set(Math.PI/2, 0, 0);
    
    // Add all parts to the group
    group.add(body, cabin, wheelFL, wheelFR, wheelRL, wheelRR);
    
    // Position the group according to model config
    if (modelConfig.position) {
      group.position.set(...modelConfig.position);
    }
    
    // Apply rotation
    if (modelConfig.rotation) {
      group.rotation.set(...modelConfig.rotation);
    }
    
    return group;
  };
  
  // Render the model if available from direct loading, useModel hook, or a new group
  return (
    <>
      {internalModelRef.current ? (
        <primitive object={internalModelRef.current} />
      ) : model.current ? (
        <primitive object={model.current} />
      ) : (
        <primitive object={new THREE.Group()} />
      )}
    </>
  );
});

// Preload the model
useGLTF.preload(models.vehicle.path);

export default VehicleModel;
