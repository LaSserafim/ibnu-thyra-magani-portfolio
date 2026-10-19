import React from 'react';
import { Mail, ArrowUp, ExternalLink } from 'lucide-react';
import { PROJECTS_DATA, PROFILE_DATA } from '../data/portfolioData';
import { GithubIcon } from './icons/GithubIcon';

interface FooterProps {
  theme: 'emerald' | 'cyan';
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const buttonPrimary =
    theme === 'emerald'
      ? 'bg-emerald-500 text-black hover:bg-emerald-400'
      : 'bg-cyan-500 text-black hover:bg-cyan-400';

  return (
    <footer id="contact" className="py-16 border-t border-neutral-900 bg-[#020406]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Contact Banner */}
        <div className="p-6 sm:p-7 rounded-2xl bg-neutral-950/70 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-md">
            <h3 className="text-xl font-bold font-heading text-white">
              Get in Touch
            </h3>
            <p className="text-sm text-neutral-400 font-body">
              Feel free to reach out regarding project details, technical collaboration, or university admissions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:ibnuthyra488@gmail.com"
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-medium flex items-center gap-2 transition-all cursor-pointer ${buttonPrimary}`}
            >
              <Mail className="w-4 h-4" />
              <span>ibnuthyra488@gmail.com</span>
            </a>

            <a
              href="https://github.com/LaSserafim"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Repositories Quick Links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400 pt-4 border-t border-neutral-900">
          <div className="space-y-1">
            <div className="text-neutral-300 font-medium">Projects on GitHub:</div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {PROJECTS_DATA.map((p) => (
                <a
                  key={p.id}
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{p.title}</span>
                  <ExternalLink className="w-2.5 h-2.5 text-neutral-500" />
                </a>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer text-xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Note */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-neutral-500 pt-2">
          <div>
            &copy; {new Date().getFullYear()} {PROFILE_DATA.name} &bull; {PROFILE_DATA.school}
          </div>
          <div>
            Cambridge International Curriculum
          </div>
        </div>

      </div>
    </footer>
  );
};
