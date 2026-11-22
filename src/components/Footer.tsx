import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/personal';
import { projectsContent } from '../data/projects';
import { artCredits } from '../data/art';
import './Footer.css';

const planeCards = projectsContent.projects.slice(0, 6);

const columns = [
  {
    title: 'Work',
    links: [
      { label: 'All work', to: '/projects' },
      { label: 'Experience', to: '/#experience' },
      { label: 'Expertise', to: '/#expertise' }
    ]
  },
  {
    title: 'Writing',
    links: [
      { label: 'Research', to: '/research' },
      { label: 'About', to: '/#about' },
      { label: 'Curriculum Vitae', to: '/cv' }
    ]
  },
  {
    title: 'Contact',
    external: [
      { label: 'Email', href: `mailto:${personalInfo.email}` },
      { label: 'GitHub', href: personalInfo.github },
      { label: 'LinkedIn', href: personalInfo.linkedin }
    ]
  }
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-label="Site footer">
      {/* Decorative 3D plane of project cards receding to the horizon */}
      <div className="footer-plane-wrap" aria-hidden="true">
        <div className="footer-plane">
          <div className="footer-plane-track">
            {[...planeCards, ...planeCards, ...planeCards, ...planeCards].map((p, i) => (
              <div key={i} className="footer-plane-card">
                <span className="footer-plane-tag">PROJECT · {p.category}</span>
                <span className="footer-plane-title">{p.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-plane-fade" />
      </div>

      <div className="footer-content">
        {/* Top line */}
        <div className="footer-top">
          <span className="footer-mark" aria-hidden="true" />
          <span className="footer-top-name">
            {personalInfo.name} · {personalInfo.location}
          </span>
          <button type="button" className="footer-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top <ArrowUp size={13} aria-hidden="true" />
          </button>
        </div>

        {/* Link columns */}
        <nav className="footer-columns" aria-label="Footer">
          {columns.map((col) => (
            <div key={col.title} className="footer-col">
              <h3 className="footer-col-title">{col.title}</h3>
              <ul>
                {col.links?.map((l) =>
                  l.to.startsWith('/#') ? (
                    <li key={l.label}>
                      <a href={l.to}>{l.label}</a>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <Link to={l.to}>{l.label}</Link>
                    </li>
                  )
                )}
                {col.external?.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                      {l.label} <ArrowUpRight size={11} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Huge wordmark */}
        <div className="footer-wordmark" aria-hidden="true">
          <span>Irsal Shydiq</span>
          <span>Software Engineer</span>
        </div>

        {/* Bottom row */}
        <div className="footer-bottom">
          <span>© {year} {personalInfo.name}</span>
          <span className="footer-bottom-art">{artCredits}</span>
          <span>irsalshydiqq.vercel.app</span>
        </div>
      </div>
    </footer>
  );
}
