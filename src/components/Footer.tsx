import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/personal';
import { GithubIcon, LinkedinIcon } from './ui/Icons';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e5e2dc] bg-[#f5f4f0] text-[#6e6b65] mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#e5e2dc]">
          {/* Identity & Focus (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <Link to="/" className="inline-block">
              <span className="font-display text-[22px] font-normal tracking-[-0.01em] text-[#141413]">
                {personalInfo.name}
              </span>
            </Link>
            <p className="body-sm text-[#6e6b65] max-w-sm">
              Informatics Engineering at UIN Sunan Gunung Djati Bandung &bull; LPDP Scholar. Building full-stack web platforms, native systems, and accessible computing interfaces.
            </p>
            <div className="pt-1 text-[12px] font-mono text-[#1e3a2b] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a2b]" />
              <span>Available for engineering roles &bull; 2026</span>
            </div>
          </div>

          {/* Directory Index (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="caption-uppercase block text-[#9c9890]">Directory</span>
            <ul className="space-y-1.5 text-[14px]">
              {[
                { label: 'Overview', to: '/' },
                { label: 'About & Academic Base', to: '/about' },
                { label: 'Work History', to: '/experience' },
                { label: 'Selected Work', to: '/projects' },
                { label: 'Applied Research', to: '/research' },
                { label: 'Inquiries & Contact', to: '/contact' }
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[#6e6b65] hover:text-[#141413] transition-colors py-0.5 block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Channels (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <span className="caption-uppercase block text-[#9c9890]">Dispatch &amp; Repositories</span>
            <ul className="space-y-2 text-[14px]">
              <li>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#44423e] hover:text-[#141413] inline-flex items-center gap-2 transition-colors py-0.5"
                >
                  <GithubIcon size={14} />
                  <span>github.com/irs622</span>
                  <ArrowUpRight size={12} className="opacity-40" />
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#44423e] hover:text-[#141413] inline-flex items-center gap-2 transition-colors py-0.5"
                >
                  <LinkedinIcon size={14} />
                  <span>linkedin.com/in/irsalshydiq</span>
                  <ArrowUpRight size={12} className="opacity-40" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-[#44423e] hover:text-[#141413] inline-flex items-center gap-2 transition-colors py-0.5"
                >
                  <span className="font-mono text-[13px]">{personalInfo.email}</span>
                </a>
              </li>
              <li className="pt-2 text-[12px] font-mono text-[#9c9890]">
                Bandung, West Java, Indonesia &bull; UTC+7
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] font-mono text-[#9c9890]">
          <p>&copy; {currentYear} {personalInfo.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Typeset in EB Garamond &amp; Inter</span>
            <span>&bull;</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#44423e] hover:text-[#141413] transition-colors cursor-pointer group"
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp
                size={13}
                className="transition-transform group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
