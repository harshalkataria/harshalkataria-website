// src/config/models.js
// Models configuration 

export const models = {
  // Vehicle model
  vehicle: {
    // Path is relative to the public directory
    path: '/models/car_fixed.glb', // Use the personal model directly
    position: [0, 0, 0],
    rotation: [0, Math.PI, 0],
    scale: 1,

    // Fallback options in case the model fails to load
    fallback: {
      useSimplifiedModel: true,
      color: 0x444444,
      wheelColor: 0x222222
    }
  }
};
