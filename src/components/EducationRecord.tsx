import React, { useId, useLayoutEffect, useRef, useState } from 'react';
import { educationContent } from '../data/education';
import { SectionHeader } from './ui/SectionHeader';
import './EducationRecord.css';

const { education, certifications } = educationContent;
const years = [...new Set(certifications.map(cert => cert.year))].sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
const initialYear = years[0] ?? '';
const count = (value: number) => String(value).padStart(2, '0');

export function EducationRecord() {
  const [year, setYear] = useState(initialYear);
  const [activeName, setActiveName] = useState<string | null>(certifications.find(cert => cert.year === initialYear)?.name ?? null);
  const list = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const id = useId();
  const displayed = certifications.filter(cert => cert.year === year);

  useLayoutEffect(() => {
    const element = list.current;
    const marker = indicator.current;
    if (!element || !marker) return;
    const measure = () => {
      const active = element.querySelector<HTMLButtonElement>('[aria-expanded="true"]');
      marker.style.opacity = active ? '1' : '0';
      if (active) {
        marker.style.transform = `translateY(${active.offsetTop + 18}px)`;
        marker.style.height = `${Math.max(28, active.offsetHeight - 36)}px`;
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    element.querySelectorAll('.education-credential').forEach(row => observer.observe(row));
    return () => observer.disconnect();
  }, [activeName, year]);

  const selectYear = (nextYear: string) => {
    if (nextYear === year) return;
    setYear(nextYear);
    setActiveName(certifications.find(cert => cert.year === nextYear)?.name ?? null);
  };

  return (
    <section id="education" className="education-record" aria-label="Education and credentials">
      <div className="education-record-inner">
        <SectionHeader number={educationContent.sectionNumber} label={educationContent.sectionTitle} headline={educationContent.headline} subheadline={educationContent.subheadline} />
        <div className="education-record-grid">
          <article className="education-academic" aria-labelledby={`${id}-institution`}>
            <div className="education-column-label"><span>Academic record</span><span>{education.period}</span></div>
            <h3 id={`${id}-institution`}>{education.institution}</h3>
            <p className="education-degree">{education.degree}</p>
            <p className="education-field">{education.field}</p>
            <dl className="education-facts">
              <div><dt>Timeline</dt><dd>{education.status}</dd></div>
              <div><dt>GPA</dt><dd>{education.gpa}</dd></div>
            </dl>
            <div className="education-fellowship"><span className="education-small-label">Scholarship</span><p>{education.scholarship}</p></div>
            {education.notes && <p className="education-notes">{education.notes}</p>}
          </article>
          <div className="education-credentials">
            <div className="education-credentials-heading">
              <h3>Credential index</h3>
              <div className="education-years" role="group" aria-label="Filter credentials by year">
                {years.map(item => <button key={item} type="button" aria-pressed={item === year} aria-controls={`${id}-credentials`} onClick={() => selectYear(item)}>{item}<span>{count(certifications.filter(cert => cert.year === item).length)}</span></button>)}
              </div>
            </div>
            <div ref={list} id={`${id}-credentials`} className="education-credential-list">
              <span ref={indicator} className="education-active-line" aria-hidden="true" />
              <div key={year} className="education-cohort">
                {displayed.map(cert => {
                  const index = certifications.indexOf(cert);
                  const expanded = activeName === cert.name;
                  const triggerId = `${id}-credential-${index}`;
                  const panelId = `${triggerId}-detail`;
                  return <article className="education-credential" key={cert.name} data-expanded={expanded}>
                    <h4><button type="button" id={triggerId} className="education-credential-trigger" aria-expanded={expanded} aria-controls={panelId} onClick={() => setActiveName(expanded ? null : cert.name)}>
                      <span className="education-credential-number">{count(index + 1)}</span>
                      <span className="education-credential-summary"><span className="education-credential-name">{cert.name}</span><span className="education-credential-issuer">{cert.issuer} <span aria-hidden="true">/</span> {cert.year}</span></span>
                      <span className="education-credential-toggle" aria-hidden="true" />
                    </button></h4>
                    <div id={panelId} className="education-credential-panel" role="region" aria-labelledby={triggerId} aria-hidden={!expanded}>
                      <div className="education-credential-panel-inner"><div className="education-credential-focus"><span className="education-small-label">Competency focus</span><p>{cert.credentialFocus}</p></div></div>
                    </div>
                  </article>;
                })}
              </div>
            </div>
            <p className="education-credential-count" role="status" aria-atomic="true">{count(displayed.length)} / {count(certifications.length)} credentials<span aria-hidden="true">·</span>{year}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
