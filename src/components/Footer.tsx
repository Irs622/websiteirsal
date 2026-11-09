import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Instagram, Mail, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { SkillTag } from './SkillTag';

export function Footer() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const socialLinks = [
    { icon: <Github size={15} />, href: 'https://github.com/irsalshydiq', label: 'GitHub' },
    { icon: <Linkedin size={15} />, href: 'https://linkedin.com/in/LmIrsalshydiq', label: 'LinkedIn' },
    { icon: <Instagram size={15} />, href: 'https://instagram.com/irsalshydiq', label: 'Instagram' },
    { icon: <Mail size={15} />, href: 'mailto:Irsalshydiq@gmail.com', label: 'Email' }
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
      <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-24">
        {/* 5-Column Grid at Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-6 mb-16">
          {/* Column 1: Editorial Identity */}
          <div className="sm:col-span-2 md:col-span-1 space-y-3">
            <Link to="/" className="inline-block">
              <span className={`font-display text-[24px] tracking-[-0.4px] font-light ${
                isLight ? 'text-[#0c0a09]' : 'text-white'
              }`}>
                Irsal Shydiq
              </span>
            </Link>
            <p className="body-sm text-[14px] leading-relaxed text-[#777169] dark:text-[#a8a29e]">
              Multidisciplinary design and React engineering with editorial calm.
            </p>
            <div className="pt-1">
              <SkillTag size="sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1" />
                Available 2025
              </SkillTag>
            </div>
          </div>

          {/* Column 2: Navigation Index */}
          <div className="space-y-3">
            <h4 className="caption-uppercase text-[11px] font-semibold tracking-[0.96px] text-[#777169]">
              Index
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Overview', to: '/' },
                { label: 'Selected Works', to: '/portfolio' },
                { label: 'About & Career', to: '/about' },
                { label: 'Direct Dispatch', to: '/contact' }
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`body-sm text-[14px] hover:underline transition-colors ${
                      isLight ? 'hover:text-[#0c0a09]' : 'hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Design Disciplines */}
          <div className="space-y-3">
            <h4 className="caption-uppercase text-[11px] font-semibold tracking-[0.96px] text-[#777169]">
              Design
            </h4>
            <ul className="space-y-2 body-sm text-[14px] text-[#777169] dark:text-[#a8a29e]">
              <li>Design Systems</li>
              <li>Typographic Order</li>
              <li>UI/UX Ergonomics</li>
              <li>Figma Tokens</li>
              <li>User Research</li>
            </ul>
          </div>

          {/* Column 4: Engineering & Media */}
          <div className="space-y-3">
            <h4 className="caption-uppercase text-[11px] font-semibold tracking-[0.96px] text-[#777169]">
              Engineering
            </h4>
            <ul className="space-y-2 body-sm text-[14px] text-[#777169] dark:text-[#a8a29e]">
              <li>React 18/19</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Motion Ergonomics</li>
              <li>Audio & Video Edit</li>
            </ul>
          </div>

          {/* Column 5: Connect */}
          <div className="space-y-3">
            <h4 className="caption-uppercase text-[11px] font-semibold tracking-[0.96px] text-[#777169]">
              Connect
            </h4>
            <ul className="space-y-2">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`body-sm text-[14px] inline-flex items-center gap-1.5 transition-colors ${
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
          <p>© {new Date().getFullYear()} Irsal Shydiq. Editorial magazine format.</p>
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
