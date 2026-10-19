import React from 'react';
import { Database, TrendingUp, Lock, PieChart, Compass, MapPin } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface AboutSectionProps {
  theme: 'emerald' | 'cyan';
}

export const AboutSection: React.FC<AboutSectionProps> = ({ theme }) => {
  const accentColor = theme === 'emerald' ? 'text-emerald-400' : 'text-cyan-400';
  const badgeColor =
    theme === 'emerald'
      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
      : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';

  const interestIcons = [
    Database,   // Data Science
    TrendingUp, // Probability
    PieChart,   // FinTech
    Lock,       // Cryptography
  ];

  return (
    <section id="about" className="py-20 border-t border-neutral-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            03. Focus &amp; Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
            Technical Interests
          </h2>
          <p className="text-sm text-neutral-400 font-body max-w-2xl">
            My engineering and research interests center on data-intensive systems, probabilistic modeling,
            market microstructure, and cryptographic protocols.
          </p>
        </div>

        {/* 4 Technical Interests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PROFILE_DATA.technicalInterests.map((interest, idx) => {
            const Icon = interestIcons[idx] || Database;
            return (
              <div
                key={interest.title}
                className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono border ${badgeColor}`}>
                      {interest.tag}
                    </span>
                    <Icon className={`w-4 h-4 ${accentColor}`} />
                  </div>

                  <h3 className="text-lg font-bold font-heading text-white">
                    {interest.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 font-body leading-relaxed">
                    {interest.summary}
                  </p>
                </div>

                {/* Subtopic tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-900">
                  {interest.topics.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-900 text-neutral-400 border border-neutral-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bio & Education Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold font-heading text-white">
                {PROFILE_DATA.name}
              </h3>
              <p className="text-xs font-mono text-neutral-400">
                {PROFILE_DATA.title} &bull; {PROFILE_DATA.school}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>{PROFILE_DATA.location}</span>
            </div>
          </div>

          <p className="text-sm text-neutral-300 font-body leading-relaxed">
            Studying under the {PROFILE_DATA.curriculum} at {PROFILE_DATA.school}. I focus on building
            functional web platforms and computational pipelines, combining rigorous mathematical formulas
            with clean software architecture.
          </p>
        </div>

        {/* Target Higher Education Card */}
        <div className="p-6 rounded-2xl bg-neutral-950/60 border border-neutral-800 space-y-4">
          <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-2">
            <Compass className={`w-4 h-4 ${accentColor}`} />
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
