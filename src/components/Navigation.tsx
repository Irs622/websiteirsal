import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { GlassButton } from './GlassButton';

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Overview' },
    { path: '/portfolio', label: 'Works' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isLight = theme === 'light';

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 h-16
          transition-all duration-200
          ${isScrolled ? 'shadow-sm' : ''}
          ${isLight
            ? 'bg-[#f5f5f5]/90 backdrop-blur-md border-b border-[#e7e5e4]'
            : 'bg-[#0c0a09]/90 backdrop-blur-md border-b border-[#292524]'
          }
        `}
      >
        <div className="max-w-[1200px] h-full mx-auto px-6 flex items-center justify-between">
          {/* Brand Wordmark (Editorial Serif Display) */}
          <Link
            to="/"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className={`font-display text-[22px] tracking-[-0.4px] font-light transition-opacity ${
              isLight ? 'text-[#0c0a09] group-hover:opacity-80' : 'text-white group-hover:opacity-80'
            }`}>
              Irsal Shydiq
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#f4c5a8]" title="Design & Code" />
          </Link>

          {/* Desktop Navigation Menu (Inter 15px / 500) */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    text-[15px] font-medium tracking-[0.01em] transition-colors relative py-1
                    ${active
                      ? isLight ? 'text-[#0c0a09]' : 'text-white'
                      : isLight ? 'text-[#777169] hover:text-[#0c0a09]' : 'text-[#a8a29e] hover:text-white'
                    }
                  `}
                >
                  {item.label}
                  {active && (
                    <span
                      className={`
                        absolute bottom-0 left-0 right-0 h-[1.5px] rounded-full
                        ${isLight ? 'bg-[#0c0a09]' : 'bg-white'}
                      `}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Theme toggle + Primary ink pill CTA */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`
                w-9 h-9 rounded-full flex items-center justify-center
                border transition-all duration-150 cursor-pointer
                ${isLight
                  ? 'bg-[#f0efed] border-[#e7e5e4] text-[#292524] hover:bg-[#e7e5e4]'
                  : 'bg-[#292524] border-[#3e3835] text-white hover:bg-[#3e3835]'
                }
              `}
              aria-label="Toggle theme"
            >
              {isLight ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            {/* Desktop Ink Pill CTA */}
            <div className="hidden sm:block">
              <Link to="/contact">
                <GlassButton variant="primary" size="default">
                  <span>Get in touch</span>
                  <ArrowUpRight size={15} className="opacity-80" />
                </GlassButton>
              </Link>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`
                md:hidden w-9 h-9 rounded-full flex items-center justify-center
                border transition-all duration-150
                ${isLight
                  ? 'bg-[#f0efed] border-[#e7e5e4] text-[#0c0a09]'
                  : 'bg-[#292524] border-[#3e3835] text-white'
                }
              `}
              aria-label="Open Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div
            className={`
              md:hidden border-b px-6 py-6 transition-all animate-in fade-in slide-in-from-top-2
              ${isLight
                ? 'bg-[#f5f5f5] border-[#e7e5e4] text-[#0c0a09]'
                : 'bg-[#0c0a09] border-[#292524] text-white'
              }
            `}
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    text-[16px] font-medium py-1.5 transition-colors
                    ${isActive(item.path)
                      ? isLight ? 'text-[#0c0a09] font-semibold' : 'text-white font-semibold'
                      : isLight ? 'text-[#777169]' : 'text-[#a8a29e]'
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <Link to="/contact" className="block w-full">
                  <GlassButton variant="primary" className="w-full justify-center">
                    Get in touch
                  </GlassButton>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer matching exact 64px navbar height */}
      <div className="h-16" />
    </>
  );
}
