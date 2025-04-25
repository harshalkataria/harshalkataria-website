// src/hooks/useModel.js
import { useRef, useEffect, useState, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Cache for loaded models to prevent duplicate loading
const modelCache = new Map();

export const useModel = (modelPath, options = {}) => {
  const modelRef = useRef();
  const [loadingState, setLoadingState] = useState('initializing');
  const loadAttemptedRef = useRef(false);
  const cleanupRef = useRef(false);

  // Only log once per path
  useEffect(() => {
    if (!loadAttemptedRef.current) {
      console.log(`[useModel] Attempting to load model from path: ${modelPath}`);
      loadAttemptedRef.current = true;
    }

    // Cleanup function
    return () => {
      cleanupRef.current = true;

      // Clean up model resources when component unmounts
      if (modelRef.current) {
        console.log(`[useModel] Cleaning up model resources for: ${modelPath}`);
        // We don't actually dispose the model here to prevent issues with the cache
        // Just remove our reference to it
        modelRef.current = null;
      }
    };
  }, [modelPath]);

  // Memoize options to prevent unnecessary re-renders
  const memoizedOptions = useMemo(() => ({
    rotation: options.rotation || [0, 0, 0],
    scale: options.scale || 1,
    position: options.position || [0, 0, 0]
  }), [
    options.rotation?.[0], options.rotation?.[1], options.rotation?.[2],
    options.scale,
    options.position?.[0], options.position?.[1], options.position?.[2]
  ]);

  // Check if model is already in cache
  const cachedModel = useMemo(() => {
    const cacheKey = `${modelPath}-${JSON.stringify(memoizedOptions)}`;
    return modelCache.get(cacheKey);
  }, [modelPath, memoizedOptions]);

  // Use cached model if available
  useEffect(() => {
    if (cachedModel && loadingState === 'initializing') {
      console.log(`[useModel] Using cached model for: ${modelPath}`);
      modelRef.current = cachedModel.clone();
      setLoadingState('loaded');
    }
  }, [cachedModel, modelPath, loadingState]);

  // Add error handling to useGLTF - only load if not cached
  const { scene, errors } = useGLTF(modelPath, undefined, true);

  useEffect(() => {
    // Skip if already loaded or cleanup has started
    if (loadingState === 'loaded' || cleanupRef.current || cachedModel) return;

    console.log(`[useModel] Loading state: ${loadingState}, Scene available: ${!!scene}`);

    if (errors) {
      console.error(`[useModel] GLTF loading errors:`, errors);
      setLoadingState('error');
      return;
    }

    if (!scene) {
      console.warn(`[useModel] No scene available for ${modelPath}`);
      setLoadingState('waiting');
      return;
    }

    try {
      console.log(`[useModel] Cloning scene for ${modelPath}`);
      const clonedScene = scene.clone();

      // Apply rotation if provided
      if (memoizedOptions.rotation) {
        console.log(`[useModel] Applying rotation: ${JSON.stringify(memoizedOptions.rotation)}`);
        clonedScene.rotation.set(...memoizedOptions.rotation);
      }

      // Apply scale if provided
      if (memoizedOptions.scale) {
        console.log(`[useModel] Applying scale: ${memoizedOptions.scale}`);
        clonedScene.scale.set(
          memoizedOptions.scale,
          memoizedOptions.scale,
          memoizedOptions.scale
        );
      }

      // Apply position if provided
      if (memoizedOptions.position) {
        clonedScene.position.set(...memoizedOptions.position);
      }

      // Apply shadows to all meshes
      console.log(`[useModel] Applying shadows to meshes`);
      clonedScene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          // Optimize materials
          if (child.material) {
            child.material.needsUpdate = true;
            child.material.toneMapped = true;
          }
        }
      });

      // Cache the model for future use
      const cacheKey = `${modelPath}-${JSON.stringify(memoizedOptions)}`;
      modelCache.set(cacheKey, clonedScene.clone());

      // Assign the cloned scene to the ref
      modelRef.current = clonedScene;
      console.log(`[useModel] Model ${modelPath} loaded successfully`);
      setLoadingState('loaded');
    } catch (error) {
      console.error(`[useModel] Error processing model:`, error);
      setLoadingState('error');
    }
  }, [scene, errors, modelPath, memoizedOptions, loadingState, cachedModel]);

  return { ref: modelRef, state: loadingState };
};

// Add a preload function to preload models
useModel.preload = (path) => {
  useGLTF.preload(path);
};