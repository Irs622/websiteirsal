import React from 'react';
import { ArrowUp, ArrowUpRight, Mail } from 'lucide-react';
import { personalInfo } from '../data/personal';
import { GithubIcon, LinkedinIcon } from './ui/Icons';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E7E5E4] bg-[#F5F5F5] text-[#4E4E4E] transition-colors mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 py-16 sm:py-20">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#E7E5E4]">
          {/* Identity */}
          <div className="space-y-1">
            <h3 className="font-display text-[22px] font-light text-[#0C0A09] tracking-[-0.01em]">
              {personalInfo.name}
            </h3>
            <p className="text-[14px] text-[#777169]">
              {personalInfo.professionalTitle}
            </p>
            <p className="text-[13px] text-[#777169] pt-1">
              Bandung, Indonesia • Open to technical collaborations
            </p>
          </div>

          {/* Social and Contact Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-[14px]">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#4E4E4E] hover:text-[#0C0A09] transition-colors"
            >
              <GithubIcon size={15} />
              <span>GitHub</span>
              <ArrowUpRight size={13} className="opacity-50" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#4E4E4E] hover:text-[#0C0A09] transition-colors"
            >
              <LinkedinIcon size={15} />
              <span>LinkedIn</span>
              <ArrowUpRight size={13} className="opacity-50" />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-1.5 text-[#4E4E4E] hover:text-[#0C0A09] transition-colors"
            >
              <Mail size={15} />
              <span>{personalInfo.email}</span>
            </a>
          </div>
        </div>

        {/* Bottom Metadata & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#777169]">
          <p>
            © {currentYear} {personalInfo.name}. All rights reserved. Editorial digital identity.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[#4E4E4E] hover:text-[#0C0A09] transition-colors cursor-pointer group"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp
              size={14}
              className="transition-transform group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
