import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/personal';
import { Button } from './ui/Button';

const navLinks = [
  { label: 'About', to: '/#about' },
  { label: 'Experience', to: '/#experience' },
  { label: 'Work', to: '/#projects' },
  { label: 'Research', to: '/#research' },
  { label: 'Education', to: '/#education' },
  { label: 'CV', to: '/cv' },
  { label: 'Contact', to: '/#contact' }
];

const mailtoHref = `mailto:${personalInfo.email}?subject=Collaboration%20Inquiry%20%E2%80%94%20LM.%20Irsal%20Shydiq`;

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close overlay on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Focus trap + Esc + scroll lock while the overlay is open
  useEffect(() => {
    if (!menuOpen) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    const getFocusable = () =>
      Array.from(
        overlay.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        )
      );

    getFocusable()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      prevFocus?.focus?.();
    };
  }, [menuOpen]);

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
    setMenuOpen(false);
  };

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-[#0b0b0b] text-[#f4f4f2]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-8 h-8 flex items-center justify-between gap-4 font-mono text-[10px] sm:text-[11px] tracking-[0.1em] uppercase">
          <span className="flex items-center gap-2 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3d4bff] shrink-0" />
            <span className="truncate">Available for engineering roles · 2026</span>
          </span>
          <span className="flex items-center gap-4 shrink-0">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#c9c9c4] hover:text-[#f4f4f2] transition-colors"
            >
              GitHub <ArrowUpRight size={11} aria-hidden="true" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#c9c9c4] hover:text-[#f4f4f2] transition-colors"
            >
              LinkedIn <ArrowUpRight size={11} aria-hidden="true" />
            </a>
          </span>
        </div>
      </div>

      {/* Sticky header */}
      <header
        className={`sticky top-0 z-50 transition-colors duration-200 ${
          isScrolled
            ? 'bg-[#f4f4f2]/95 backdrop-blur-md border-b border-[#e2e2de]'
            : 'bg-[#f4f4f2]/80 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-6 sm:px-8 h-20 grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Left: hanging ribbon mark + name + 2-line descriptor */}
          <div className="relative flex items-center min-w-0">
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 w-2.5 h-10 bg-[#0b0b0b]"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)' }}
            />
            <Link
              to="/"
              className="pl-6 flex flex-col leading-none min-w-0"
            >
              <span className="text-[15px] sm:text-[16px] font-medium tracking-[-0.01em] text-[#0b0b0b] truncate">
                {personalInfo.name}
              </span>
              <span className="sr-only"> — Home</span>
              <span aria-hidden="true" className="mt-1.5 font-mono text-[9.5px] sm:text-[10px] tracking-[0.08em] uppercase text-[#6b6b66] leading-[1.4]">
                Software Engineer
                <br />
                LPDP Scholar
              </span>
            </Link>
          </div>

          {/* Center: black pill with Menu trigger + Home */}
          <div className="flex justify-center">
            <div className="inline-flex items-center rounded-full bg-[#0b0b0b] text-[#f4f4f2] p-1">
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={menuOpen}
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-[#f4f4f2] focus-visible:outline-offset-1"
              >
                <Menu size={14} aria-hidden="true" />
                Menu
              </button>
              <Link
                to="/"
                className="rounded-full px-3.5 py-1.5 text-[13px] hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-[#f4f4f2] focus-visible:outline-offset-1"
              >
                Home
              </Link>
            </div>
          </div>

          {/* Right: CV outline pill + Get in touch black pill */}
          <div className="hidden md:flex items-center gap-2.5 justify-end">
            <Link to="/cv" className="inline-block">
              <Button variant="outline" size="sm">
                CV
              </Button>
            </Link>
            <a href={mailtoHref} className="inline-block">
              <Button variant="primary" size="sm" icon={<ArrowUpRight size={13} />}>
                Get in touch
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      {menuOpen && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] bg-[#f4f4f2] flex flex-col"
        >
          <div className="max-w-[1320px] w-full mx-auto px-6 sm:px-8 flex items-center justify-between h-20 border-b border-[#e2e2de]">
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#6b6b66]">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#0b0b0b] px-3.5 py-1.5 text-[13px] text-[#0b0b0b] hover:bg-[#0b0b0b] hover:text-[#f4f4f2] transition-colors"
            >
              Close <X size={14} aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Primary"
            className="flex-1 max-w-[1320px] w-full mx-auto px-6 sm:px-8 py-10 sm:py-16 overflow-y-auto"
          >
            <ul className="flex flex-col">
              {navLinks.map((item, idx) => {
                const isHash = item.to.startsWith('/#');
                return (
                  <li key={item.label} className="border-b border-[#e2e2de]">
                    {isHash ? (
                      <a
                        href={item.to}
                        onClick={(e) => handleNavClick(e, item.to)}
                        className="group flex items-baseline gap-4 py-4 sm:py-5 text-[#0b0b0b] hover:text-[#3d4bff] transition-colors"
                      >
                        <span className="font-mono text-[11px] text-[#6b6b66] w-8 shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="display-lg">{item.label}</span>
                      </a>
                    ) : (
                      <Link
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-baseline gap-4 py-4 sm:py-5 text-[#0b0b0b] hover:text-[#3d4bff] transition-colors"
                      >
                        <span className="font-mono text-[11px] text-[#6b6b66] w-8 shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="display-lg">{item.label}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href={mailtoHref} className="inline-block">
                <Button variant="primary" size="md" icon={<ArrowUpRight size={14} />}>
                  Get in touch
                </Button>
              </a>
              <Link to="/cv" onClick={() => setMenuOpen(false)} className="inline-block">
                <Button variant="outline" size="md">
                  Curriculum Vitae
                </Button>
              </Link>
            </div>

            <div className="mt-8 font-mono text-[11px] text-[#6b6b66] tracking-[0.04em]">
              {personalInfo.location} · {personalInfo.email}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
