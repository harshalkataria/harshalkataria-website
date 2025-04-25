// src/components/debug/ModelChecker.jsx
import { useEffect, useState } from 'react';

const ModelChecker = ({ modelPath, onComplete }) => {
  const [checked, setChecked] = useState(false);
  
  useEffect(() => {
    // Only check once per path to avoid duplicate requests
    if (checked || !modelPath) return;
    
    const checkFile = async () => {
      console.log(`[ModelChecker] Checking if file exists: ${modelPath}`);
      
      try {
        // Use fetch with HEAD method to check if file exists without downloading it
        const response = await fetch(modelPath, { method: 'HEAD' });
        
        if (response.ok) {
          console.log(`[ModelChecker] ✓ File exists: ${modelPath}`);
          // Also check content type to ensure it's a GLB file
          const contentType = response.headers.get('content-type');
          if (contentType && (contentType.includes('model/gltf-binary') || contentType.includes('application/octet-stream'))) {
            console.log(`[ModelChecker] ✓ Content type is correct: ${contentType}`);
          } else {
            console.warn(`[ModelChecker] ⚠ Unexpected content type: ${contentType}`);
          }
        } else {
          console.error(`[ModelChecker] ✗ File does not exist: ${modelPath} (${response.status})`);
          // Attempt to provide a helpful message based on server response
          console.error(`[ModelChecker] Server response: ${response.statusText}`);
        }
        
        // Mark as checked to prevent duplicate checks
        setChecked(true);
        
        // Call onComplete callback if provided
        if (onComplete && typeof onComplete === 'function') {
          console.log(`[ModelChecker] Calling onComplete callback`);
          onComplete();
        }
      } catch (error) {
        console.error(`[ModelChecker] ✗ Error checking file: ${modelPath}`, error);
        setChecked(true); // Still mark as checked to prevent infinite retries
        
        // Still call onComplete even if there was an error to prevent blocking
        if (onComplete && typeof onComplete === 'function') {
          console.log(`[ModelChecker] Calling onComplete callback after error`);
          onComplete();
        }
      }
    };
    
    checkFile();
  }, [modelPath, checked, onComplete]);
  
  return null;
};

export default ModelChecker;