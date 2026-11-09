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
    mint: 'bg-[#A7E5D3]',
    peach: 'bg-[#F4C5A8]',
    lavender: 'bg-[#C8B8E0]',
    sky: 'bg-[#A8C8E8]',
    rose: 'bg-[#E8B8C4]'
  };

  return (
    <article
      id={project.slug}
      className="py-12 sm:py-16 border-b border-[#E7E5E4] last:border-b-0"
      aria-labelledby={`project-title-${project.id}`}
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
          isEven ? '' : 'lg:grid-flow-dense'
        }`}
      >
        {/* Visual Editorial Spread (5 columns) */}
        <div
          className={`lg:col-span-5 relative ${
            isEven ? 'lg:order-1' : 'lg:col-start-8 lg:order-2'
          }`}
        >
          <div className="relative overflow-hidden rounded-[24px] border border-[#E7E5E4] bg-[#FFFFFF] p-8 sm:p-10 min-h-[340px] sm:min-h-[380px] flex flex-col justify-between shadow-[0_2px_16px_rgba(0,0,0,0.03)] group transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#D6D3D1]">
            {/* Subtle atmospheric pastel glow */}
            <div
              className={`absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-40 transition-transform duration-500 group-hover:scale-110 pointer-events-none ${
                orbColorMap[project.accentOrb] || 'bg-[#C8B8E0]'
              }`}
            />

            {/* Header: Project Index & Category */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="label-editorial text-[#777169]">
                0{index + 1} • {project.year}
              </span>
              <Badge variant="neutral" size="sm">
                {project.category}
              </Badge>
            </div>

            {/* Center Typographic Editorial Identity */}
            <div className="relative z-10 my-8">
              <div className="text-[12px] font-mono tracking-wider text-[#777169] uppercase mb-2">
                Case Study Overview
              </div>
              <h3 className="font-display text-[32px] sm:text-[38px] font-light leading-[1.1] text-[#0C0A09] tracking-[-0.02em] group-hover:text-[#292524] transition-colors">
                {project.title}
              </h3>
              <p className="text-[14px] text-[#777169] mt-2 line-clamp-2">
                {project.subtitle}
              </p>
            </div>

            {/* Bottom Meta & Visual Indicator */}
            <div className="relative z-10 pt-4 border-t border-[#E7E5E4] flex items-center justify-between">
              <span className="text-[13px] font-medium text-[#0C0A09]">
                Role: {project.role}
              </span>
              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1 text-[13px] font-medium text-[#0C0A09] hover:underline"
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
              <span className="label-editorial text-[#777169]">
                {project.year} • {project.category}
              </span>
              {project.achievement && (
                <span className="inline-flex items-center text-[12px] text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
                  Published Research (2026)
                </span>
              )}
            </div>

            <h3
              id={`project-title-${project.id}`}
              className="font-display text-[30px] sm:text-[36px] font-light leading-tight text-[#0C0A09] tracking-[-0.015em]"
            >
              {project.title}
            </h3>
            <p className="text-[16px] text-[#777169] mt-1 font-normal">
              {project.subtitle}
            </p>
          </div>

          {/* Problem & Solution Story */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[16px] p-5">
              <span className="label-editorial text-[#0C0A09] block mb-2">
                The Problem
              </span>
              <p className="text-[14px] leading-relaxed text-[#4E4E4E]">
                {project.problem}
              </p>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[16px] p-5">
              <span className="label-editorial text-[#0C0A09] block mb-2">
                The Solution
              </span>
              <p className="text-[14px] leading-relaxed text-[#4E4E4E]">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Technical Contributions */}
          <div className="space-y-2 pt-1">
            <span className="label-editorial text-[#777169] block">
              Key Technical Contributions
            </span>
            <ul className="space-y-2">
              {project.technicalContribution.slice(0, 3).map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#4E4E4E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0C0A09] mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-2">
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="neutral" size="sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions & Links */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link to={`/projects/${project.slug}`}>
              <Button variant="primary" size="sm" icon={<ArrowUpRight size={14} />}>
                View Case Study
              </Button>
            </Link>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#4E4E4E] hover:text-[#0C0A09] transition-colors py-1.5 px-3 rounded-full hover:bg-black/[0.04]"
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
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#4E4E4E] hover:text-[#0C0A09] transition-colors py-1.5 px-3 rounded-full hover:bg-black/[0.04]"
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
