import React from 'react';
import { Award, Compass, MapPin } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface AboutSectionProps {
  theme: 'emerald' | 'cyan';
}

export const AboutSection: React.FC<AboutSectionProps> = ({ theme }) => {

  return (
    <section id="about" className="py-20 border-t border-neutral-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            03. Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
            About Me
          </h2>
          <p className="text-sm text-neutral-400 font-body max-w-2xl">
            Education, competition achievements, and future academic interests.
          </p>
        </div>

        {/* Education & Bio Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold font-heading text-white">
                {PROFILE_DATA.name}
              </h3>
              <p className="text-xs font-mono text-neutral-400">
                {PROFILE_DATA.title}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>{PROFILE_DATA.location}</span>
            </div>
          </div>

          <p className="text-sm text-neutral-300 font-body leading-relaxed">
            I am currently a student at <strong className="text-white">{PROFILE_DATA.school}</strong>,
            studying under the {PROFILE_DATA.curriculum}. My main interests lie at the intersection of
            applied mathematics, computer systems, and interactive educational visualizations. I focus on writing
            clean, understandable software that solves real practical problems.
          </p>
        </div>

        {/* Competitions Card */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Competition Awards</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROFILE_DATA.competitions.map((comp) => (
              <div
                key={comp.title}
                className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold font-heading text-white">
                    {comp.title}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 shrink-0">
                    {comp.result}
                  </span>
                </div>
                <div className="text-xs font-mono text-neutral-400">{comp.field}</div>
                <p className="text-xs text-neutral-300 font-body leading-relaxed pt-1">
                  {comp.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Target Higher Education Card */}
        <div className="p-6 rounded-2xl bg-neutral-950/60 border border-neutral-800 space-y-4">
          <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-2">
            <Compass className={`w-4 h-4 ${theme === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'}`} />
            <span>Target Undergraduate Programs (English-Track STEM)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-body">
            {PROFILE_DATA.targetPrograms.map((prog) => (
              <div
                key={prog.institution}
                className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-1"
              >
                <div className="font-semibold text-white font-heading">{prog.institution}</div>
                <div className="text-[11px] font-mono text-neutral-400">{prog.program}</div>
                <div className="text-[11px] text-neutral-500">{prog.field}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
