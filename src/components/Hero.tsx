import React from 'react';
import { GithubIcon } from './icons/GithubIcon';
import { PROFILE_DATA } from '../data/portfolioData';

interface HeroProps {
  theme: 'emerald' | 'cyan';
}

export const Hero: React.FC<HeroProps> = ({ theme }) => {
  const accentColor = theme === 'emerald' ? 'text-emerald-400' : 'text-cyan-400';
  const buttonPrimary =
    theme === 'emerald'
      ? 'bg-emerald-500 text-black hover:bg-emerald-400'
      : 'bg-cyan-500 text-black hover:bg-cyan-400';

  return (
    <section id="top" className="relative pt-36 pb-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Focus Areas Tag */}
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-3">
          Data Science &bull; Probability &bull; FinTech &bull; Cryptography
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl font-bold font-heading text-white tracking-tight mb-6">
          Hi, I&apos;m {PROFILE_DATA.name}.
        </h1>

        {/* Bio Paragraph */}
        <p className="text-base sm:text-lg text-neutral-300 font-body leading-relaxed mb-8">
          I am a high school student and software developer at{' '}
          <span className="text-white font-medium">BINUS SCHOOL Semarang</span>{' '}
          (Cambridge International curriculum). My primary interests in information technology focus on{' '}
          <strong className="text-white font-semibold">data science</strong>,{' '}
          <strong className="text-white font-semibold">probability &amp; stochastic modeling</strong>,{' '}
          <strong className="text-white font-semibold">financial technology</strong>, and{' '}
          <strong className="text-white font-semibold">cryptography</strong>.
          Below is a technical breakdown of five software projects I recently built,
          including their architecture, live demos, repositories, and development workflows.
        </p>

        {/* Clean Project Categories Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className={`text-sm font-bold font-heading ${accentColor}`}>MediaSpine</div>
            <div className="text-xs text-neutral-400 mt-1">Computer Vision &bull; Posture</div>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className={`text-sm font-bold font-heading ${accentColor}`}>The Link Reaction</div>
            <div className="text-xs text-neutral-400 mt-1">Interactive Biology SVG</div>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className={`text-sm font-bold font-heading ${accentColor}`}>FutureAs</div>
            <div className="text-xs text-neutral-400 mt-1">Monte Carlo &bull; FastAPI</div>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className={`text-sm font-bold font-heading ${accentColor}`}>QUANT.IDX</div>
            <div className="text-xs text-neutral-400 mt-1">Orderbook &bull; OFI Engine</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer shadow-md ${buttonPrimary}`}
          >
            Explore Projects
          </a>

          <a
            href="https://github.com/LaSserafim"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl text-xs font-mono text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-all flex items-center gap-2 cursor-pointer"
          >
            <GithubIcon className="w-4 h-4" />
            <span>github.com/LaSserafim</span>
          </a>
        </div>

      </div>
    </section>
  );
};
