import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../data/projects';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { GithubIcon } from './ui/Icons';

interface ProjectShowcaseProps {
  project: ProjectItem;
  index: number;
}

export function ProjectShowcase({ project, index }: ProjectShowcaseProps) {
  const isEven = index % 2 === 0;

  const orbColorMap: Record<string, string> = {
    mint: 'bg-[#a7e5d3]',
    peach: 'bg-[#f4c5a8]',
    lavender: 'bg-[#c8b8e0]',
    sky: 'bg-[#a8c8e8]',
    rose: 'bg-[#e8b8c4]'
  };

  return (
    <article
      id={project.slug}
      className="py-12 sm:py-16 border-b border-[#e7e5e4] last:border-b-0"
      aria-labelledby={`project-title-${project.id}`}
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
          isEven ? '' : 'lg:grid-flow-dense'
        }`}
      >
        {/* Visual Editorial Spread (5 columns) - Gradient Orb Card */}
        <div
          className={`lg:col-span-5 relative ${
            isEven ? 'lg:order-1' : 'lg:col-start-8 lg:order-2'
          }`}
        >
          <div className="relative overflow-hidden rounded-[24px] border border-[#e7e5e4] bg-[#fafafa] p-8 sm:p-10 min-h-[340px] sm:min-h-[380px] flex flex-col justify-between shadow-[0_4px_16px_rgba(0,0,0,0.04)] group transition-all duration-300 hover:border-[#d6d3d1]">
            {/* Soft Pastel Radial Gradient Orb */}
            <div
              className={`absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-50 transition-transform duration-500 group-hover:scale-110 pointer-events-none ${
                orbColorMap[project.accentOrb] || 'bg-[#c8b8e0]'
              }`}
            />

            {/* Header: Project Index & Category */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="caption-uppercase text-[#777169]">
                0{index + 1} • {project.year}
              </span>
              <Badge variant="default" size="sm">
                {project.category}
              </Badge>
            </div>

            {/* Center Typographic Editorial Identity (Waldenburg 300) */}
            <div className="relative z-10 my-8">
              <div className="caption-uppercase text-[#777169] mb-2">
                Case Study Overview
              </div>
              <h3 className="display-md text-[#0c0a09] group-hover:text-[#292524] transition-colors">
                {project.title}
              </h3>
              <p className="body-sm text-[#777169] mt-2 line-clamp-2">
                {project.subtitle}
              </p>
            </div>

            {/* Bottom Meta & Visual Indicator */}
            <div className="relative z-10 pt-4 border-t border-[#e7e5e4] flex items-center justify-between">
              <span className="text-[13px] font-medium text-[#0c0a09]">
                Role: {project.role}
              </span>
              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1 text-[13px] font-medium text-[#0c0a09] hover:underline"
                aria-label={`Read full case study for ${project.title}`}
              >
                <span>Read Story</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Narrative & Engineering Details (7 columns) */}
        <div
          className={`lg:col-span-7 space-y-6 ${
            isEven ? 'lg:order-2' : 'lg:col-start-1 lg:order-1'
          }`}
        >
          {/* Header & Role */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="caption-uppercase text-[#777169]">
                {project.year} • {project.category}
              </span>
              {project.achievement && (
                <span className="inline-flex items-center text-[12px] text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5 font-medium">
                  Published Research (2026)
                </span>
              )}
            </div>

            <h3
              id={`project-title-${project.id}`}
              className="display-lg text-[#0c0a09]"
            >
              {project.title}
            </h3>
            <p className="body-md text-[#777169] mt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Problem & Solution Cards (rounded.xl = 16px, p-6 = 24px) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#ffffff] border border-[#e7e5e4] rounded-[16px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <span className="caption-uppercase text-[#0c0a09] block mb-2 font-semibold">
                The Problem
              </span>
              <p className="body-sm text-[#4e4e4e] leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="bg-[#ffffff] border border-[#e7e5e4] rounded-[16px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <span className="caption-uppercase text-[#0c0a09] block mb-2 font-semibold">
                The Solution
              </span>
              <p className="body-sm text-[#4e4e4e] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Technical Contributions */}
          <div className="space-y-2 pt-1">
            <span className="caption-uppercase text-[#777169] block">
              Key Technical Contributions
            </span>
            <ul className="space-y-2">
              {project.technicalContribution.slice(0, 3).map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 body-sm text-[#4e4e4e]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0c0a09] mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Badges */}
          <div className="pt-2">
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="default" size="sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions & Links */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link to={`/projects/${project.slug}`}>
              <Button variant="primary" size="md" icon={<ArrowUpRight size={14} />}>
                View Case Study
              </Button>
            </Link>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 button-text text-[#4e4e4e] hover:text-[#0c0a09] transition-colors py-2 px-3 rounded-full hover:bg-black/[0.04]"
              >
                <GithubIcon size={14} />
                <span>Source Code</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 button-text text-[#4e4e4e] hover:text-[#0c0a09] transition-colors py-2 px-3 rounded-full hover:bg-black/[0.04]"
              >
                <ExternalLink size={14} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
