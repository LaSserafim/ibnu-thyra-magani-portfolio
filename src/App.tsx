import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { WebGPURenderer } from './components/WebGPURenderer';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { DevelopmentWorkflow } from './components/DevelopmentWorkflow';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';

export function App() {
  const [theme, setTheme] = useState<'emerald' | 'cyan'>('emerald');
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Gentle one-time reveal without scroll-jacking
    const ctx = gsap.context(() => {
      gsap.from('main', {
        opacity: 0,
        y: 15,
        duration: 0.7,
        ease: 'power2.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`min-h-screen relative bg-[#030508] text-[#F1F5F9] selection:bg-${
        theme === 'emerald' ? 'emerald-500/20' : 'cyan-500/20'
      } selection:text-${theme === 'emerald' ? 'emerald-300' : 'cyan-300'}`}
    >
      {/* Dynamic Interactive WebGPU Generative Background */}
      <WebGPURenderer theme={theme} />

      {/* Navigation Header */}
      <Navbar theme={theme} setTheme={setTheme} />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        {/* Hero Section */}
        <Hero theme={theme} />

        {/* 5 Featured Projects with In-Place Technical Details */}
        <ProjectsSection theme={theme} />

        {/* Real Engineering Workflow with AI */}
        <DevelopmentWorkflow theme={theme} />

        {/* About: School, Competitions, Target Programs (No scores/GPAs) */}
        <AboutSection theme={theme} />
      </main>

      {/* Clean Footer */}
      <Footer theme={theme} />
    </div>
  );
}

export default App;
