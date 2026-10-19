import React, { useState } from 'react';
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Wrench,
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { GithubIcon } from './icons/GithubIcon';

interface ProjectsSectionProps {
  theme: 'emerald' | 'cyan';
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ theme }) => {
  // Store expanded project IDs in local state
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({
    mediaspine: true, // first project expanded by default for immediate preview
  });

  const toggleExpand = (id: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const badgeColor =
    theme === 'emerald'
      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
      : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';

  return (
    <section id="projects" className="py-20 border-t border-neutral-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            01. Case Studies
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
            Featured Projects
          </h2>
          <p className="text-sm text-neutral-400 font-body max-w-2xl">
            Detailed breakdown of five applications engineered recently, covering architecture,
            technical implementation, live links, and real AI tool workflows.
          </p>
        </div>

        {/* Project Cards List */}
        <div className="space-y-8">
          {PROJECTS_DATA.map((project) => {
            const isExpanded = !!expandedProjects[project.id];

            return (
              <article
                key={project.id}
                className="rounded-2xl bg-neutral-950/70 border border-neutral-800/80 overflow-hidden transition-all duration-200"
              >
                {/* Project Header Bar */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded text-xs font-mono border ${badgeColor}`}>
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-neutral-500">{project.year}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                            theme === 'emerald'
                              ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30'
                              : 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30'
                          }`}
                        >
                          <span>Live Site</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        title="View GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm text-neutral-400 font-body mt-1">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-neutral-300 font-body leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded text-xs font-mono bg-neutral-900 text-neutral-300 border border-neutral-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Expand / Collapse Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => toggleExpand(project.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Technical Details' : 'Show Technical Details & Code'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded In-Place Technical Breakdown */}
                {isExpanded && (
                  <div className="border-t border-neutral-800/80 bg-neutral-900/30 p-6 sm:p-7 space-y-6">
                    {/* Key Engineering Features */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                        Key Features &amp; Implementation
                      </h4>
                      <ul className="space-y-1.5">
                        {project.keyFeatures.map((feat, idx) => (
                          <li key={idx} className="text-xs sm:text-sm text-neutral-300 font-body flex items-start gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${theme === 'emerald' ? 'bg-emerald-400' : 'bg-cyan-400'}`} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* How I Built This Using AI (Authentic Breakdown) */}
                    <div className="p-4 sm:p-5 rounded-xl bg-black/60 border border-neutral-800 space-y-3">
                      <div className="flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-amber-400" />
                        <h4 className="text-xs font-mono text-white uppercase tracking-wider font-semibold">
                          How I Used AI on This Project
                        </h4>
                      </div>

                      <div className="space-y-3 text-xs sm:text-sm font-body text-neutral-300 leading-relaxed">
                        <div>
                          <strong className="text-neutral-200 font-semibold block mb-0.5">
                            Prompting &amp; Scaffolding:
                          </strong>
                          <p>{project.howBuiltWithAi.promptingAndScaffolding}</p>
                        </div>
                        <div>
                          <strong className="text-neutral-200 font-semibold block mb-0.5">
                            Manual Engineering &amp; Refinement:
                          </strong>
                          <p>{project.howBuiltWithAi.humanEngineeringAndRefinement}</p>
                        </div>
                      </div>
                    </div>

                    {/* Code Snippet (if available) */}
                    {project.codeSnippet && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                          <span>Snippet: {project.codeSnippet.filename}</span>
                          <span className="text-[11px] text-neutral-500 font-body">
                            {project.codeSnippet.explanation}
                          </span>
                        </div>
                        <div className="p-4 rounded-xl bg-[#03060a] border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
                          <pre>
                            <code>{project.codeSnippet.code}</code>
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
