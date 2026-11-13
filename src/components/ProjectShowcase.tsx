import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectItem } from '../data/projects';
import { ProjectCover } from './ProjectCover';

interface ProjectShowcaseProps {
  project: ProjectItem;
  index: number;
  stackIndex?: number;
  id?: string;
}

export function ProjectShowcase({ project, index, stackIndex = 0, id = project.slug }: ProjectShowcaseProps) {
  const titleId = `${id}-title`;
  const details = project.specs
    ? [project.specs.platform, project.specs.architecture, project.specs.keyMechanism]
    : project.techStack.slice(0, 3);

  return (
    <article id={id} className="work-case" aria-labelledby={titleId} style={{ '--card-index': stackIndex } as React.CSSProperties}>
      <Link to={`/projects/${project.slug}`} className="work-cover" aria-label={`View ${project.title} case study`}>
        <ProjectCover index={index} />
        <span className="work-cover-view" aria-hidden="true">View</span>
      </Link>
      <span className="work-case-number">[{String(index + 1).padStart(2, '0')}]</span>
      <header className="work-case-heading">
        <h3 id={titleId} className="work-case-title"><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3>
        <p className="work-case-category">{project.category} / {project.year}</p>
        <p className="work-case-subtitle">{project.subtitle}</p>
        <p className="work-role">{project.role}</p>
      </header>
      <div className="work-case-details">
        <h4 className="work-details-title">Engineering</h4>
        <ul className="work-specifications">{details.map(detail => <li key={detail}>{detail}</li>)}</ul>
        <p className="work-technologies">{project.techStack.join(' / ')}</p>
        <Link className="work-case-link" to={`/projects/${project.slug}`} aria-label={`Read ${project.title} case study`}>Read case study</Link>
      </div>
    </article>
  );
}
