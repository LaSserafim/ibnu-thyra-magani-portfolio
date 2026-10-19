import React, { useState, useEffect } from 'react';
import { GithubIcon } from './icons/GithubIcon';

interface NavbarProps {
  theme: 'emerald' | 'cyan';
  setTheme: (theme: 'emerald' | 'cyan') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, setTheme }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const accentColor = theme === 'emerald' ? 'text-emerald-400' : 'text-cyan-400';
  const accentBorder = theme === 'emerald' ? 'border-emerald-500/30' : 'border-cyan-500/30';
  const accentBg = theme === 'emerald' ? 'bg-emerald-500/10' : 'bg-cyan-500/10';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030508]/90 backdrop-blur-md border-b border-neutral-800/80 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Personal Brand */}
          <a
            href="#top"
            className="group flex items-center gap-3 cursor-pointer select-none"
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs border transition-all ${accentBorder} ${accentBg} ${accentColor}`}
            >
              ITM
            </div>
            <div>
              <span className="font-heading text-sm font-bold tracking-tight text-white group-hover:text-neutral-200 transition-colors">
                Ibnu Thyra Magani
              </span>
              <p className="text-[11px] font-mono text-neutral-400">
                BINUS SCHOOL Semarang
              </p>
            </div>
          </a>

          {/* Clean Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-neutral-400">
            <a href="#projects" className="hover:text-white transition-colors cursor-pointer">
              Projects
            </a>
            <a href="#workflow" className="hover:text-white transition-colors cursor-pointer">
              Development Workflow
            </a>
            <a href="#about" className="hover:text-white transition-colors cursor-pointer">
              Technical Interests
            </a>
            <a href="#contact" className="hover:text-white transition-colors cursor-pointer">
              Contact
            </a>
          </nav>

          {/* Theme Switcher & GitHub */}
          <div className="flex items-center gap-3">
            <div className="flex items-center p-0.5 rounded-lg bg-neutral-900 border border-neutral-800">
              <button
                type="button"
                onClick={() => setTheme('emerald')}
                title="Green Theme"
                className={`px-2.5 py-1 text-[11px] font-mono rounded-md transition-all cursor-pointer ${
                  theme === 'emerald'
                    ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Green
              </button>
              <button
                type="button"
                onClick={() => setTheme('cyan')}
                title="Blue Theme"
                className={`px-2.5 py-1 text-[11px] font-mono rounded-md transition-all cursor-pointer ${
                  theme === 'cyan'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Blue
              </button>
            </div>

            <a
              href="https://github.com/LaSserafim"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
