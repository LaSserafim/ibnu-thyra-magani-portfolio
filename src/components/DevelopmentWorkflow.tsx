import React from 'react';
import { PenTool, Layers, CheckSquare, ShieldCheck } from 'lucide-react';

interface DevelopmentWorkflowProps {
  theme: 'emerald' | 'cyan';
}

export const DevelopmentWorkflow: React.FC<DevelopmentWorkflowProps> = ({ theme }) => {
  const accentColor = theme === 'emerald' ? 'text-emerald-400' : 'text-cyan-400';

  const steps = [
    {
      num: '1',
      title: 'Define the Problem & Equations First',
      description:
        'AI coding models generate far more reliable code when the constraints are already solved. Before writing prompts, I research the domain literature, sketch out the data flow, and write down the exact mathematical formulas (such as CVA vector trigonometry or GBM stochastic equations).',
      icon: PenTool,
    },
    {
      num: '2',
      title: 'Keep the Architecture Minimal',
      description:
        'AI assistants tend to recommend bloated dependency trees (heavy 3D frameworks, excessive npm packages, unnecessary state managers). I deliberately constrain the stack to standard web APIs, vanilla JavaScript, and focused Python libraries so the final build remains lightweight and easy to audit.',
      icon: Layers,
    },
    {
      num: '3',
      title: 'Scaffold Fast, Then Manually Refactor',
      description:
        'I use LLMs (Claude, DeepSeek) to quickly scaffold boilerplate, API client bindings, and repetitive data mappings. Afterwards, I inspect every line, remove dead code, enforce strict TypeScript types, and eliminate unnecessary layers of abstraction.',
      icon: CheckSquare,
    },
    {
      num: '4',
      title: 'Calibrate with Real Data & Hardware',
      description:
        'LLMs cannot observe real-world hardware limits such as webcam coordinate jitter, trading API rate throttles, or sleeping network daemons. I test everything against physical webcams, live market feeds, and actual deployment environments.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="workflow" className="py-20 border-t border-neutral-900 bg-[#020508]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            02. Development Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
            How I Work with AI Tools
          </h2>
          <p className="text-sm text-neutral-400 font-body max-w-2xl">
            My engineering approach treats AI models as fast drafting assistants governed by strict human requirements,
            minimalist architecture, and manual verification.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xl font-bold font-mono ${accentColor}`}>
                    0{step.num}
                  </span>
                  <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-base font-bold font-heading text-white">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 font-body leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
