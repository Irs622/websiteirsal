import React, { useId, useState } from 'react';
import { projectsContent } from '../data/projects';
import { ProjectShowcase } from './ProjectShowcase';
import './SelectedWork.css';

const categories = ['All work', ...new Set(projectsContent.projects.map(project => project.category))];

export function SelectedWork({ standalone = false }: { standalone?: boolean }) {
  const [category, setCategory] = useState('All work');
  const resultsId = `work-results-${useId()}`;
  const projects = projectsContent.projects.filter(project => category === 'All work' || project.category === category);
  const Heading = standalone ? 'h1' : 'h2';

  return (
    <div className="selected-work">
      <header className="work-header">
        <p className="work-section-label"><span>{projectsContent.sectionNumber}</span><span aria-hidden="true">•</span>{projectsContent.sectionTitle}</p>
        <div className="work-header-grid">
          <Heading className="work-headline">Selected engineering<br className="work-desktop-break" /> projects and <em>case studies.</em></Heading>
          <p className="work-introduction">{projectsContent.subheadline}</p>
        </div>
      </header>
      <div className="work-index-bar">
        <div className="work-filters" role="group" aria-label="Filter projects by discipline">
          {categories.map(item => (
            <button key={item} type="button" aria-pressed={category === item} aria-controls={resultsId} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
        <p className="work-result-count" role="status" aria-atomic="true">{String(projects.length).padStart(2, '0')} {projects.length === 1 ? 'project' : 'projects'}</p>
      </div>
      <div id={resultsId} className="work-stack" style={{ '--stack-count': projects.length } as React.CSSProperties}>
        {projects.map((project, index) => (
          <ProjectShowcase key={project.id} project={project} index={projectsContent.projects.indexOf(project)} stackIndex={index} id={`${resultsId}-${project.slug}`} />
        ))}
      </div>
      <div className="work-colophon"><span>Selected work / {projects.length} studies</span><span>2025 — 2026</span></div>
    </div>
  );
}
