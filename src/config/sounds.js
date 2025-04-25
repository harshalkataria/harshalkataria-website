// src/config/sounds.js
// Sounds configuration

export const sounds = {
  // Engine start sound
  engineStart: {
    path: '/sounds/effects/engine-start.mp3',
    volume: 0.5,
    options: {}
  },

  // Engine loop sound
  engineLoop: {
    path: '/sounds/effects/engine-loop.mp3',
    volume: 0.3,
    options: {
      loop: true,
      sprite: {
        short: [0, 2000]
      },
      interrupt: true
    }
  }
};
