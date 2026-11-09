import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Instagram, Mail, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { SkillTag } from './SkillTag';

export function Footer() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const socialLinks = [
    { icon: <Github size={16} />, href: 'https://github.com/irsalshydiq', label: 'GitHub', username: '@irsalshydiq' },
    { icon: <Linkedin size={16} />, href: 'https://linkedin.com/in/LmIrsalshydiq', label: 'LinkedIn', username: 'LmIrsalshydiq' },
    { icon: <Instagram size={16} />, href: 'https://instagram.com/irsalshydiq', label: 'Instagram', username: '@irsalshydiq' },
    { icon: <Mail size={16} />, href: 'mailto:Irsalshydiq@gmail.com', label: 'Email', username: 'Irsalshydiq@gmail.com' }
  ];

  return (
    <footer
      className={`
        border-t transition-colors duration-200 mt-auto
        ${isLight
          ? 'bg-[#f5f5f5] border-[#e7e5e4] text-[#4e4e4e]'
          : 'bg-[#0c0a09] border-[#292524] text-[#a8a29e]'
        }
      `}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-16">
          {/* Column 1: Editorial Identity */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-block">
              <span className={`font-display text-[26px] tracking-[-0.5px] font-light ${
                isLight ? 'text-[#0c0a09]' : 'text-white'
              }`}>
                Irsal Shydiq
              </span>
            </Link>
            <p className="body-sm max-w-sm">
              Multidisciplinary designer and React developer. Crafting thoughtful editorial web experiences, design systems, and digital products.
            </p>
            <div className="pt-2">
              <SkillTag size="sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1" />
                Available for Q1–Q2 2025 projects
              </SkillTag>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="caption-uppercase text-[11px] font-semibold tracking-[0.96px] text-[#777169] dark:text-[#777169]">
              Index
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Overview', to: '/' },
                { label: 'Selected Works', to: '/portfolio' },
                { label: 'About & Career', to: '/about' },
                { label: 'Contact', to: '/contact' }
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`body-sm hover:underline transition-colors ${
                      isLight ? 'hover:text-[#0c0a09]' : 'hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Disciplines */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="caption-uppercase text-[11px] font-semibold tracking-[0.96px] text-[#777169] dark:text-[#777169]">
              Disciplines
            </h4>
            <ul className="space-y-2 body-sm text-[#777169] dark:text-[#a8a29e]">
              <li>UI/UX Design</li>
              <li>React Architecture</li>
              <li>Design Systems</li>
              <li>Event Photography</li>
              <li>Visual Editorial</li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="caption-uppercase text-[11px] font-semibold tracking-[0.96px] text-[#777169] dark:text-[#777169]">
              Connect
            </h4>
            <ul className="space-y-2">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`body-sm inline-flex items-center gap-1.5 transition-colors ${
                      isLight ? 'hover:text-[#0c0a09]' : 'hover:text-white'
                    }`}
                  >
                    <span className="opacity-70">{item.icon}</span>
                    <span>{item.label}</span>
                    <ArrowUpRight size={12} className="opacity-40" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hairline Divider & Bottom Metadata */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isLight ? 'border-[#e7e5e4] text-[#777169]' : 'border-[#292524] text-[#777169]'
        }`}>
          <p>© {new Date().getFullYear()} Irsal Shydiq. Designed with editorial simplicity.</p>
          <div className="flex items-center gap-4">
            <span className="font-display italic text-[14px]">Waldenburg 300 / Inter</span>
            <span>•</span>
            <span>Bandung, ID</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
