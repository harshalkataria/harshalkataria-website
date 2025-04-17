import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, useState, useEffect } from 'react';
import Home from './pages/Home';
import Professional from './pages/Professional';
import Cricket from './pages/Cricket';
import Robotics from './pages/Robotics';
import Contact from './pages/Contact';
import Header from './components/layout/Header';
import Loader from './components/ui/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/professional" element={<Professional />} />
          <Route path="/cricket" element={<Cricket />} />
          <Route path="/robotics" element={<Robotics />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
