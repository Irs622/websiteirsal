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
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const navLinks = [
    { label: 'About', to: '/#about' },
    { label: 'Experience', to: '/#experience' },
    { label: 'Work', to: '/#projects' },
    { label: 'Research', to: '/#research' },
    { label: 'Education', to: '/#education' },
    { label: 'CV', to: '/cv' },
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
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#fbfbf9]/95 backdrop-blur-md border-b border-[#e5e2dc]'
            : 'bg-[#fbfbf9]/75 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="max-w-[1200px] h-full mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Mark (Editorial Serif) */}
          <Link
            to="/"
            className="group flex items-baseline gap-2 cursor-pointer"
            aria-label={`${personalInfo.name} — Home`}
          >
            <span className="font-display text-[20px] sm:text-[22px] font-normal tracking-[-0.01em] text-[#141413]">
              {personalInfo.brandMark}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-6 lg:gap-8"
          >
            {navLinks.map((item) =>
              item.to.startsWith('/#') ? (
                <a
                  key={item.label}
                  href={item.to}
                  onClick={(e) => handleNavClick(e, item.to)}
                  className="nav-link text-[#6e6b65] hover:text-[#141413] transition-colors py-1 text-[14px]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className="nav-link text-[#6e6b65] hover:text-[#141413] transition-colors py-1 text-[14px]"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link to="/cv" className="inline-block">
              <Button variant="ghost" size="sm">
                Curriculum Vitae
              </Button>
            </Link>
            <a
              href={`mailto:${personalInfo.email}?subject=Collaboration%20Inquiry%20%E2%80%94%20LM.%20Irsal%20Shydiq`}
              className="inline-block"
            >
              <Button variant="outline" size="sm" icon={<ArrowUpRight size={13} />}>
                Get in Touch
              </Button>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-sm flex items-center justify-center border border-[#e5e2dc] bg-[#ffffff] text-[#141413] hover:bg-[#f5f4f0] transition-colors"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden border-b border-[#e5e2dc] bg-[#fbfbf9] px-6 py-6"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((item) =>
                item.to.startsWith('/#') ? (
                  <a
                    key={item.label}
                    href={item.to}
                    onClick={(e) => {
                      handleNavClick(e, item.to);
                      setMobileMenuOpen(false);
                    }}
                    className="nav-link text-[#141413] py-2 border-b border-[#eeebe6] text-[15px]"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="nav-link text-[#141413] py-2 border-b border-[#eeebe6] text-[15px]"
                  >
                    {item.label}
                  </Link>
                )
              )}
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

      {/* Spacer matching exact 64px header height */}
      <div className="h-16" />
    </>
  );
}
