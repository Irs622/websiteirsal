import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/personal';
import { GithubIcon, LinkedinIcon } from './ui/Icons';
import { Badge } from './ui/Badge';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e7e5e4] bg-[#f5f5f5] text-[#4e4e4e] transition-colors mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 pt-16 pb-12">
        {/* 5-Column Grid at Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-6 pb-12 border-b border-[#e7e5e4]">
          {/* Column 1: Editorial Identity */}
          <div className="sm:col-span-2 md:col-span-1 space-y-3">
            <Link to="/" className="inline-block">
              <span className="font-display text-[22px] tracking-[-0.4px] font-light text-[#0c0a09]">
                {personalInfo.name}
              </span>
            </Link>
            <p className="body-sm text-[#777169]">
              Engineering thoughtful digital experiences across software, AI, and accessible technology.
            </p>
            <div className="pt-1">
              <Badge variant="default" size="sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block mr-1.5" />
                Available 2026
              </Badge>
            </div>
          </div>

          {/* Column 2: Navigation Index */}
          <div className="space-y-3">
            <h4 className="caption-uppercase text-[#777169]">
              Index
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Overview', to: '/' },
                { label: 'About & Career', to: '/about' },
                { label: 'Experience', to: '/experience' },
                { label: 'Selected Works', to: '/projects' },
                { label: 'Research', to: '/research' },
                { label: 'Direct Dispatch', to: '/contact' }
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="body-sm text-[#4e4e4e] hover:text-[#0c0a09] hover:underline transition-colors block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Disciplines */}
          <div className="space-y-3">
            <h4 className="caption-uppercase text-[#777169]">
              Engineering
            </h4>
            <ul className="space-y-2 body-sm text-[#777169]">
              <li>Full-Stack Web</li>
              <li>Android & Kotlin</li>
              <li>Applied AI & LLMs</li>
              <li>Cloud & DevOps</li>
              <li>Accessibility (a11y)</li>
            </ul>
          </div>

          {/* Column 4: Selected Works */}
          <div className="space-y-3">
            <h4 className="caption-uppercase text-[#777169]">
              Featured
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'DengarBain', to: '/projects/dengarbain' },
                { label: 'AR Hijaiyah', to: '/projects/ar-hijaiyah' },
                { label: 'Fatayat NU System', to: '/projects/fatayat-nu-management' },
                { label: "Hadith Arba'in App", to: '/projects/hadith-arbain-mobile' },
                { label: 'Kamus Cerdas', to: '/projects/kamus-cerdas-indo-sunda' }
              ].map((proj) => (
                <li key={proj.to}>
                  <Link
                    to={proj.to}
                    className="body-sm text-[#4e4e4e] hover:text-[#0c0a09] transition-colors block py-0.5"
                  >
                    {proj.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Connect */}
          <div className="space-y-3">
            <h4 className="caption-uppercase text-[#777169]">
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="body-sm text-[#4e4e4e] hover:text-[#0c0a09] inline-flex items-center gap-1.5 transition-colors py-0.5"
                >
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                  <ArrowUpRight size={12} className="opacity-40" />
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="body-sm text-[#4e4e4e] hover:text-[#0c0a09] inline-flex items-center gap-1.5 transition-colors py-0.5"
                >
                  <LinkedinIcon size={14} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} className="opacity-40" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="body-sm text-[#4e4e4e] hover:text-[#0c0a09] inline-flex items-center gap-1.5 transition-colors py-0.5"
                >
                  <span>{personalInfo.email}</span>
                </a>
              </li>
              <li className="pt-2 text-[12px] text-[#777169]">
                Bandung, West Java, ID
              </li>
            </ul>
          </div>
        </div>

        {/* Hairline Divider & Bottom Metadata */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#777169]">
          <p>© {currentYear} {personalInfo.name}. Editorial magazine format.</p>
          <div className="flex items-center gap-4">
            <span className="font-display italic text-[14px]">Waldenburg 300 / Inter</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#4e4e4e] hover:text-[#0c0a09] transition-colors cursor-pointer group"
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
      </div>
    </footer>
  );
}
