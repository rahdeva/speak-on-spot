import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { PracticeTimer } from './components/PracticeTimer';
import { Features } from './components/Features';
import { FloatingShapes } from './components/FloatingShapes';

export default function App() {
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    // Set page title
    document.title = 'SpeakOnSpot - Impromptu Speaking Practice';
    
    // Set favicon (using emoji)
    const favicon = document.querySelector("link[rel*='icon']") || document.createElement('link');
    favicon.type = 'image/svg+xml';
    favicon.rel = 'icon';
    favicon.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎤</text></svg>";
    document.head.appendChild(favicon);
  }, []);

  const handleStartPractice = () => {
    setIsTimerActive(true);
  };

  const handleReset = () => {
    setIsTimerActive(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingShapes />
      
      <div className="relative z-10">
        {!isTimerActive ? (
          <>
            <Hero onStartPractice={handleStartPractice} />
            <Features />
          </>
        ) : (
          <PracticeTimer onReset={handleReset} />
        )}
      </div>
    </div>
  );
}