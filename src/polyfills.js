// This file provides polyfills for Node.js built-in modules
import { Buffer } from 'buffer';

window.Buffer = Buffer;
window.process = { env: {} };
window.global = window; 