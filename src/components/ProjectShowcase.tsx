import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../data/projects';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { GithubIcon } from './ui/Icons';
import { ProjectMockupPreview } from './ProjectMockupPreview';

interface ProjectShowcaseProps {
  project: ProjectItem;
  index: number;
}

export function ProjectShowcase({ project, index }: ProjectShowcaseProps) {
  const isEven = index % 2 === 0;

  return (
    <article
      id={project.slug}
      className="py-12 sm:py-16 border-b border-[#e5e2dc] last:border-b-0"
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Top Editorial Index Folio */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-[#eeebe6] text-[12px] font-mono text-[#6e6b65]">
        <div className="flex items-center gap-3">
          <span className="text-[#141413] font-medium">
            № 0{index + 1}
          </span>
          <span className="text-[#d0ccc3]">/</span>
          <span>{project.category}</span>
          <span className="text-[#d0ccc3]">/</span>
          <span>{project.year}</span>
        </div>

        {project.achievement && (
          <span className="text-[#1e3a2b] bg-[#1e3a2b]/5 px-2 py-0.5 rounded-sm border border-[#1e3a2b]/20 text-[11px]">
            {project.achievement}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Narrative & Engineering Case (7 cols) */}
        <div className={`space-y-6 ${isEven ? 'lg:col-span-7' : 'lg:col-span-7 lg:order-2'}`}>
          <div>
            <h3
              id={`project-title-${project.id}`}
              className="display-lg text-[#141413]"
            >
              {project.title}
            </h3>
            <p className="body-md text-[#6e6b65] mt-1 text-[16px]">
              {project.subtitle}
            </p>
          </div>

          {/* Integrated Problem & Solution Context */}
          <div className="space-y-3 pt-1">
            <p className="body-md text-[#44423e] leading-relaxed">
              <strong className="font-medium text-[#141413]">The Challenge: </strong>
              {project.problem}
            </p>
            <p className="body-md text-[#44423e] leading-relaxed">
              <strong className="font-medium text-[#141413]">Engineering Solution: </strong>
              {project.solution}
            </p>
          </div>

          {/* Key Contributions Ledger */}
          <div className="pt-2 border-t border-[#eeebe6] space-y-2">
            <span className="caption-uppercase block text-[#6e6b65]">
              Personal Engineering Contributions
            </span>
            <ul className="space-y-1.5">
              {project.technicalContribution.slice(0, 3).map((contrib, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 body-sm text-[#44423e] leading-relaxed"
                >
                  <span className="text-[#9c9890] font-mono text-[11px] select-none mt-0.5">
                    &bull;
                  </span>
                  <span>{contrib}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Specs Summary */}
          {project.specs && (
            <div className="pt-2 border-t border-[#eeebe6] grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px] font-mono text-[#6e6b65]">
              <div>
                <span className="block text-[#9c9890] text-[10px] uppercase">Architecture</span>
                <span className="text-[#242321]">{project.specs.architecture}</span>
              </div>
              <div>
                <span className="block text-[#9c9890] text-[10px] uppercase">Verification</span>
                <span className="text-[#242321]">{project.specs.verification}</span>
              </div>
            </div>
          )}

          {/* Tech Stack Badges */}
          <div className="pt-2 flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="mono" size="sm">
                {tech}
              </Badge>
            ))}
          </div>

          {/* Action Links */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <Link to={`/projects/${project.slug}`}>
              <Button variant="primary" size="sm" icon={<ArrowRight size={13} />}>
                Read Case Study
              </Button>
            </Link>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="sm" icon={<GithubIcon size={13} />}>
                  Source Repository
                </Button>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="sm" icon={<ExternalLink size={13} />}>
                  Live Demo
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Technical Architecture Specification Plate (5 cols) */}
        <div className={`${isEven ? 'lg:col-span-5' : 'lg:col-span-5 lg:order-1'}`}>
          <div className="border border-[#e5e2dc] bg-[#ffffff] p-2.5 sm:p-3 rounded-sm">
            <ProjectMockupPreview
              slug={project.slug}
              title={project.title}
              category={project.category}
            />
            <div className="pt-2.5 px-1 flex items-center justify-between text-[11px] font-mono text-[#6e6b65] border-t border-[#eeebe6] mt-2">
              <span>Plate 0{index + 1} // System Specification</span>
              <Link
                to={`/projects/${project.slug}`}
                className="hover:text-[#141413] hover:underline"
              >
                Inspect Spec &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
