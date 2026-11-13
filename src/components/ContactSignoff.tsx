import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/personal';
import './ContactSignoff.css';

export function ContactSignoff() {
  const root = useRef<HTMLElement>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>();
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  useEffect(() => {
    const element = root.current;
    if (!element || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (element.getBoundingClientRect().top < innerHeight) return;
    element.dataset.reveal = 'pending';
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        element.dataset.reveal = 'visible';
        observer.disconnect();
      }
    }, { threshold: .12 });
    observer.observe(element);
    return () => { observer.disconnect(); delete element.dataset.reveal; };
  }, []);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const copyEmail = async () => {
    clearTimeout(resetTimer.current);
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
    resetTimer.current = setTimeout(() => setCopyStatus('idle'), 3000);
  };

  return (
    <section ref={root} id="contact" className="contact-signoff" aria-labelledby="contact-signoff-title">
      <div className="contact-signoff-inner">
        <div className="contact-signoff-label"><span>08</span><span aria-hidden="true">/</span><span>Inquiries &amp; dispatch</span></div>
        <div className="contact-signoff-intro contact-signoff-reveal">
          <h2 id="contact-signoff-title">Initiate dialogue<br /><em>or engineering inquiry.</em></h2>
          <p>Open to software engineering internships, technical collaborations, and research in full-stack systems and accessible technology.</p>
        </div>
        <div className="contact-signoff-dispatch contact-signoff-reveal">
          <span className="contact-signoff-note">A conversation starts here</span>
          <a className="contact-signoff-email" href={`mailto:${personalInfo.email}?subject=Project%20Inquiry%20%E2%80%94%20LM.%20Irsal%20Shydiq`}>
            <span>{personalInfo.email}</span><ArrowUpRight aria-hidden="true" strokeWidth={1} />
          </a>
        </div>
        <div className="contact-signoff-meta contact-signoff-reveal">
          <p>{personalInfo.location}<span aria-hidden="true">·</span>UTC+7</p>
          <div className="contact-signoff-links">
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={12} aria-hidden="true" /></a>
            <button type="button" onClick={copyEmail}>{copyStatus === 'copied' ? 'Email copied' : 'Copy email'}</button>
          </div>
        </div>
        <span className="contact-signoff-feedback" role="status" aria-atomic="true">{copyStatus === 'copied' ? 'Email address copied to clipboard.' : copyStatus === 'error' ? 'Could not copy. Select the email address above or open it in your mail app.' : ''}</span>
      </div>
    </section>
  );
}
