import './polyfills.js'; // Import polyfills first
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// Note: Fixed the capitalization of 'three' in the import path
// Don't try to extend THREE object, just export the loader if needed
export { GLTFLoader };

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
