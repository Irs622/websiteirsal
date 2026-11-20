import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data/personal';
import './Footer.css';

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  // Scroll-scrubbed cinematic reveal: as the footer passes through the viewport
  // a 0→1 progress value is written to --reveal, driving the poster's scale
  // and staged directory entrance. Honours prefers-reduced-motion. rAF-throttled.
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.style.setProperty('--reveal', '1');
      el.style.setProperty('--curtain', '1');
      setRevealed(true);
      return;
    }

    const art = el.querySelector<HTMLElement>('.hermes-artwork-wrap');

    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight || 1;
      const rect = el.getBoundingClientRect();
      // 0 when the footer's top edge sits at the viewport bottom,
      // 1 once it has risen to the viewport top (artwork fills the screen).
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / vh));
      el.style.setProperty('--reveal', progress.toFixed(3));

      // Subtle blur-in driven by the artwork's own entry as it rises into view
      if (art) {
        const a = art.getBoundingClientRect();
        const curtain = (vh - a.top) / (vh * 0.9);
        el.style.setProperty('--curtain', Math.min(1, Math.max(0, curtain)).toFixed(3));
      }

      // Trip the staged content entrance a touch after the dark field appears.
      if (progress > 0.18) setRevealed(true);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`hermes-wrapper${revealed ? ' is-revealed' : ''}`}
      aria-label="Site Footer and Directory"
    >
      {/* ======================================================== */}
      {/* STAGE 0: LEAD-IN — soft cream→forest noir leading edge    */}
      {/* ======================================================== */}
      <div className="hermes-leadin" aria-hidden="true" />

      {/* ======================================================== */}
      {/* STAGE 1: CURTAIN REVEAL — Full Bleed Artwork              */}
      {/* ======================================================== */}
      <div className="hermes-footer-reveal">
        {/* Top Visual Artwork Area (curtain) */}
        <div className="hermes-artwork-wrap">
          {/* Full bleed image */}
          <img
            src="/hermes/footer-kairos.jpg"
            alt="North Silence · Kairos — Field Studies in Silence · LM. Irsal Shydiq"
            className="hermes-artwork-img"
            loading="lazy"
          />

          <div className="hermes-artwork-vignette" aria-hidden="true" />
          <div className="hermes-noise-overlay" aria-hidden="true" />
          <div className="hermes-artwork-fade" aria-hidden="true" />
        </div>

        {/* Colophon & Dispatch */}
        <div className="hermes-directory-wrap">
          {/* 08 · INQUIRIES & DISPATCH */}
          <div className="hermes-dispatch" id="contact">

            <div className="hermes-dispatch-label">
              <span>08</span>
              <span aria-hidden="true">&bull;</span>
              <span>INQUIRIES &amp; DISPATCH</span>
            </div>

            <h2 className="hermes-dispatch-title">
              Initiate dialogue<br />
              <em>or engineering inquiry.</em>
            </h2>

            <p className="hermes-dispatch-sub">
              Open to software engineering internships, technical collaborations, and research in full-stack systems and accessible technology.
            </p>

            <div className="hermes-dispatch-readout">
              <span>TX/RX &bull; LIVE DISPATCH FIELD &bull; NORTH SILENCE // KAIROS</span>
              <span>LATENCY &lt; 12MS &bull; UTC+7</span>
            </div>

            <div className="hermes-dispatch-channel">
              <span>PRIMARY DISPATCH CHANNEL &bull; DIRECT INBOX TRANSMISSION</span>
              <span className="hermes-dispatch-status">
                <span className="hermes-dispatch-dot" />
                Available for 2026 roles
              </span>
            </div>

            <a
              className="hermes-dispatch-email"
              href={`mailto:${personalInfo.email}?subject=Project%20Inquiry%20%E2%80%94%20LM.%20Irsal%20Shydiq`}
              aria-label={`Send dispatch email to ${personalInfo.email}`}
            >
              <span>{personalInfo.email}</span>
              <span className="hermes-dispatch-pill">
                Send Dispatch <ArrowUpRight size={13} />
              </span>
            </a>
          </div>

          {/* Bottom Colophon Bar */}
          <div className="hermes-bottom-bar">
            {/* Social Icons */}
            <div className="hermes-social-row">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hermes-social-link"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hermes-social-link"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="hermes-social-link"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>

            {/* Colophon Text */}
            <div className="hermes-colophon-legal">
              <p>&copy; {currentYear}, {personalInfo.name}</p>
              <span className="opacity-40">&bull;</span>
              <p className="opacity-70">Open Source</p>
              <span className="opacity-40">&bull;</span>
              <p className="opacity-70">MIT License</p>
              <span className="opacity-40">&bull;</span>
              <p className="opacity-70">Terms &amp; Privacy</p>
            </div>

            {/* Back to top */}
            <div>
              <button
                type="button"
                onClick={scrollToTop}
                className="hermes-back-top-btn group"
                aria-label="Back to top"
              >
                <span>Back to top</span>
                <ArrowUp
                  size={13}
                  className="transition-transform duration-200 group-hover:-translate-y-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
