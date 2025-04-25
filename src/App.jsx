// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoaderCircle from './components/ui/LoaderCircle';
import Home from './pages/Home';
import Professional from './pages/Professional';
import Cricket from './pages/Cricket';
import Robotics from './pages/Robotics';
import Contact from './pages/Contact';
import Header from './components/layout/Header';

function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  // Initial loading animation - just a brief loading to ensure app initialization
  useEffect(() => {
    console.log('[App] Starting initial loading animation');
    // Show initial loader for a short time (750ms)
    const timer = setTimeout(() => {
      console.log('[App] Initial loading complete');
      setInitialLoading(false);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Preload the model - this helps ensure the model is ready when Experience mounts
  useEffect(() => {
    try {
      // Trigger model preloading
      const preloadModel = async () => {
        // Dynamic import to avoid circular dependencies
        const { useModel } = await import('./hooks/useModel');
        useModel.preload('/models/car_fixed.glb');
        console.log('[App] Model preloading initiated');
      };
      
      preloadModel();
    } catch (error) {
      console.error('[App] Error preloading model:', error);
    }
  }, []);

  return (
    <>
      {initialLoading ? (
        <LoaderCircle />
      ) : (
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/professional" element={<Professional />} />
            <Route path="/cricket" element={<Cricket />} />
            <Route path="/robotics" element={<Robotics />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;