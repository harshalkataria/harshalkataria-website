// src/utils/configLoader.js

// Simplified configuration loader
import { profile } from '../config/profile';
import { theme } from '../config/theme';
import { models } from '../config/models';
import { sounds } from '../config/sounds';

// Logger for config loading operations
const logConfig = (message) => {
  console.log(`[ConfigLoader] ${message}`);
};

// Export configurations directly
export { profile, theme, models, sounds };

// Log the configurations
logConfig('Using profile configuration');
logConfig('Using theme configuration');
logConfig('Using models configuration');
logConfig('Using sounds configuration');

// Sound utility functions
export const toggleSound = (enabled = true) => {
  sounds.enabled = enabled;
  console.log(`[ConfigLoader] Sound ${enabled ? 'enabled' : 'disabled'}`);
  return sounds.enabled;
};

export const setVolume = (newVolume = 0.5) => {
  // ... existing code ...
};