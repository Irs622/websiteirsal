import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/personal';
import { Button } from './ui/Button';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/#about' },
    { label: 'Experience', to: '/#experience' },
    { label: 'Projects', to: '/#projects' },
    { label: 'Research', to: '/#research' },
    { label: 'Contact', to: '/#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (to.startsWith('/#')) {
      const targetId = to.replace('/#', '');
      if (location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          history.pushState(null, '', `#${targetId}`);
        }
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F5F5F5]/90 backdrop-blur-md border-b border-[#E7E5E4] shadow-[0_2px_12px_rgba(0,0,0,0.02)]'
            : 'bg-[#F5F5F5]/60 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="max-w-[1200px] h-full mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Mark (Editorial Serif / Capitalized Identity) */}
          <Link
            to="/"
            className="group flex flex-col cursor-pointer"
            aria-label={`${personalInfo.name} - Home`}
          >
            <span className="font-display text-[20px] sm:text-[22px] tracking-[-0.01em] font-light text-[#0C0A09] group-hover:opacity-75 transition-opacity">
              {personalInfo.brandMark}
            </span>
            <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#777169] -mt-0.5">
              Bandung, ID
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 lg:gap-9"
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.to}
                onClick={(e) => handleNavClick(e, item.to)}
                className="text-[14px] font-medium tracking-[0.01em] text-[#4E4E4E] hover:text-[#0C0A09] transition-colors relative py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs: Get in Touch Pill */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`mailto:${personalInfo.email}?subject=Collaboration%20Inquiry%20%E2%80%94%20LM.%20Irsal%20Shydiq`}
              className="inline-block"
            >
              <Button variant="primary" size="sm" icon={<ArrowUpRight size={14} />}>
                Get in Touch
              </Button>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center border border-[#E7E5E4] bg-[#FFFFFF] text-[#0C0A09] hover:bg-[#FAFAFA] transition-colors"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden border-b border-[#E7E5E4] bg-[#F5F5F5] px-6 py-6 transition-all"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.to}
                  onClick={(e) => {
                    handleNavClick(e, item.to);
                    setMobileMenuOpen(false);
                  }}
                  className="text-[16px] font-medium text-[#0C0A09] py-1 border-b border-[#E7E5E4]/40"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3">
                <a
                  href={`mailto:${personalInfo.email}?subject=Collaboration%20Inquiry`}
                  className="block w-full"
                >
                  <Button variant="primary" size="md" className="w-full justify-center">
                    Get in Touch
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer matching exact header height */}
      <div className="h-20" />
    </>
  );
}
