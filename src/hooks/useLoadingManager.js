import { useState, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { models } from '../utils/configLoader';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// Helper function to check if file exists
const checkFileExists = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error(`[LoadingManager] Error checking file: ${url}`, error);
    return false;
  }
};

export const useLoadingManager = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing...');
  const [isLoading, setIsLoading] = useState(true);
  const loadingAttemptedRef = useRef(false);
  const loadingTimeoutRef = useRef(null);

  // Preload the model
  useEffect(() => {
    // Preload the vehicle model
    useGLTF.preload(models.vehicle.path);

    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  // Load models
  useEffect(() => {
    // Prevent duplicate loading attempts
    if (loadingAttemptedRef.current) return;
    loadingAttemptedRef.current = true;

    console.log("[LoadingManager] Starting asset loading process");
    console.log("[LoadingManager] Using vehicle model config:", models.vehicle);

    // Create a THREE.js LoadingManager to track progress
    const manager = new THREE.LoadingManager();

    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      console.log(`[LoadingManager] Loading progress: ${itemsLoaded}/${itemsTotal}`);
      const newProgress = Math.round((itemsLoaded / itemsTotal) * 100);
      setProgress(newProgress);
      setStatus(`Loading vehicle model (${itemsLoaded}/${itemsTotal})`);
    };

    manager.onLoad = () => {
      console.log('[LoadingManager] Vehicle model loaded successfully');
      setStatus('Loading environment...');

      // Simulate environment loading with a shorter timeout
      loadingTimeoutRef.current = setTimeout(() => {
        setStatus('Environment loaded');

        // Complete loading with a shorter timeout
        loadingTimeoutRef.current = setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }, 500);
    };

    manager.onError = (url) => {
      console.log(`[LoadingManager] Error loading: ${url}`);
      // Continue with loading process despite errors
      setStatus('Error loading vehicle model');
      loadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    const loadVehicleModel = async () => {
      const vehiclePath = models.vehicle.path;

      // Check if vehicle model exists
      const exists = await checkFileExists(vehiclePath);

      if (exists) {
        console.log(`[LoadingManager] Loading vehicle model: ${vehiclePath}`);
        try {
          // Setup DRACO loader for compressed models
          const dracoLoader = new DRACOLoader();
          dracoLoader.setDecoderPath('/draco/');

          const loader = new GLTFLoader(manager);
          loader.setDRACOLoader(dracoLoader);

          loader.load(
            vehiclePath,
            (gltf) => {
              console.log(`[LoadingManager] Successfully loaded vehicle model`);

              // Optimize the model
              gltf.scene.traverse((child) => {
                if (child.isMesh) {
                  // Optimize materials
                  if (child.material) {
                    child.material.needsUpdate = true;
                  }
                }
              });
            },
            // Progress callback
            (xhr) => {
              const percentage = Math.round((xhr.loaded / xhr.total) * 100);
              console.log(`[LoadingManager] Vehicle model: ${percentage}% loaded`);
            },
            // Error callback
            (error) => {
              console.error(`[LoadingManager] Error loading vehicle model`, error);
              manager.onError(vehiclePath);
            }
          );
        } catch (error) {
          console.error(`[LoadingManager] Exception loading vehicle model`, error);
          manager.onError(vehiclePath);
        }
      } else {
        console.warn(`[LoadingManager] Vehicle model does not exist: ${vehiclePath}`);
        manager.onError(vehiclePath);
      }
    };

    // Start loading process
    loadVehicleModel();

    // Safety timeout in case loading gets stuck
    loadingTimeoutRef.current = setTimeout(() => {
      console.log('[LoadingManager] Loading timeout reached, forcing completion');
      setIsLoading(false);
    }, 10000); // 10 second timeout

    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  return { progress, status, isLoading };
}; 