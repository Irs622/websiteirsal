import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../data/projects';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { GithubIcon } from './ui/Icons';

interface ProjectShowcaseProps {
  project: ProjectItem;
  index: number;
}

export function ProjectShowcase({ project, index }: ProjectShowcaseProps) {
  // COMPOSITION 1: Lead Accessibility Case Study (DengarBain)
  if (project.slug === 'dengarbain') {
    return (
      <article
        id={project.slug}
        className="py-10 sm:py-14 border-b border-[#e5e2dc]"
        aria-labelledby={`project-title-${project.id}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-2.5 border-b border-[#eeebe6] text-[12px] font-mono text-[#6e6b65]">
          <div className="flex items-center gap-2.5">
            <span className="text-[#141413] font-medium">№ 01</span>
            <span className="text-[#d0ccc3]">&bull;</span>
            <span>ACCESSIBLE COMPUTING &bull; LEAD STUDY</span>
            <span className="text-[#d0ccc3]">&bull;</span>
            <span>2026</span>
          </div>
          <span className="text-[#1e3a2b] bg-[#1e3a2b]/5 px-2 py-0.5 rounded-sm border border-[#1e3a2b]/20 text-[11px]">
            WCAG 2.2 AAA Verified
          </span>
        </div>

        <div className="space-y-6">
          <div className="max-w-3xl">
            <h3
              id={`project-title-${project.id}`}
              className="display-xl text-[#141413] tracking-[-0.015em]"
            >
              {project.title} — {project.subtitle}
            </h3>
            <p className="body-lg text-[#6e6b65] mt-2">
              {project.summary}
            </p>
          </div>

          {/* 3-Column Editorial Architecture Ledger */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#eeebe6]">
            <div className="space-y-2">
              <span className="caption-uppercase block text-[#141413]">
                01 / The Usability Barrier
              </span>
              <p className="body-sm text-[#44423e] leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="space-y-2">
              <span className="caption-uppercase block text-[#141413]">
                02 / Architecture &amp; Audio Sync
              </span>
              <p className="body-sm text-[#44423e] leading-relaxed">
                {project.solution}
              </p>
            </div>

            <div className="space-y-2">
              <span className="caption-uppercase block text-[#141413]">
                03 / Verification &amp; Standards
              </span>
              <p className="body-sm text-[#44423e] leading-relaxed">
                Tested against NVDA (desktop) and TalkBack (Android). Enforces 7.2:1 contrast ratio exceeding WCAG 2.2 AAA standards, with minimum 48px touch targets and full keyboard focus trapping.
              </p>
            </div>
          </div>

          {/* Key Contributions */}
          <div className="p-4 bg-[#ffffff] border border-[#e5e2dc] rounded-sm space-y-2">
            <span className="caption-uppercase block text-[#6e6b65]">
              Personal Engineering Contributions
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.technicalContribution.map((contrib, i) => (
                <li key={i} className="flex items-start gap-2 body-sm text-[#44423e]">
                  <span className="text-[#9c9890] font-mono text-[11px] mt-0.5">&bull;</span>
                  <span>{contrib}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Metadata & Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {project.techStack.map(t => (
                <Badge key={t} variant="mono" size="sm">{t}</Badge>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link to={`/projects/${project.slug}`}>
                <Button variant="primary" size="sm" icon={<ArrowRight size={13} />}>
                  Read Full Case Study
                </Button>
              </Link>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="sm" icon={<GithubIcon size={13} />}>
                    Source Repository
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  // COMPOSITION 2: Academic Publication & Spatial Graphics (AR Hijaiyah)
  if (project.slug === 'ar-hijaiyah') {
    return (
      <article
        id={project.slug}
        className="py-10 sm:py-14 border-b border-[#e5e2dc]"
        aria-labelledby={`project-title-${project.id}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-2.5 border-b border-[#eeebe6] text-[12px] font-mono text-[#6e6b65]">
          <div className="flex items-center gap-2.5">
            <span className="text-[#141413] font-medium">№ 02</span>
            <span className="text-[#d0ccc3]">&bull;</span>
            <span>ACADEMIC PUBLICATION &bull; APPLIED AI &amp; WEBGL</span>
            <span className="text-[#d0ccc3]">&bull;</span>
            <span>2026</span>
          </div>
          <span className="text-[#1e3a2b] bg-[#1e3a2b]/5 px-2 py-0.5 rounded-sm border border-[#1e3a2b]/20 text-[11px]">
            {project.achievement}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-8 space-y-4">
            <h3
              id={`project-title-${project.id}`}
              className="display-xl text-[#141413] tracking-[-0.015em]"
            >
              {project.title} — {project.subtitle}
            </h3>
            <p className="body-md text-[#44423e] leading-relaxed text-[16px]">
              {project.summary}
            </p>

            <div className="space-y-3 pt-2 text-[14px]">
              <div className="border-l border-[#141413] pl-3.5 py-0.5 space-y-1">
                <span className="caption-uppercase block text-[#141413]">Research Problem</span>
                <p className="text-[#44423e] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="border-l border-[#141413] pl-3.5 py-0.5 space-y-1">
                <span className="caption-uppercase block text-[#141413]">Graphics &amp; Speech Implementation</span>
                <p className="text-[#44423e] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-1.5">
              {project.techStack.map(t => (
                <Badge key={t} variant="mono" size="sm">{t}</Badge>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Link to={`/projects/${project.slug}`}>
                <Button variant="primary" size="sm" icon={<ArrowRight size={13} />}>
                  Read Research Case Study
                </Button>
              </Link>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="sm" icon={<GithubIcon size={13} />}>
                    Source Code
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Academic Citation & Technical Budget */}
          <div className="lg:col-span-4 bg-[#ffffff] border border-[#e5e2dc] p-5 rounded-sm space-y-3 font-mono text-[12px]">
            <span className="caption-uppercase block text-[#9c9890] text-[10px]">Academic Registry</span>
            <div className="text-[#141413] font-medium leading-snug">
              Artificial: Jurnal Informatika dan Sistem Informasi
            </div>
            <div className="text-[#6e6b65] text-[11px] space-y-1 border-t border-[#eeebe6] pt-2">
              <div>Department: Informatics Engineering</div>
              <div>Affiliation: UIN Sunan Gunung Djati Bandung</div>
              <div>Peer Review: Accepted (2026 Publication)</div>
            </div>
            <div className="border-t border-[#eeebe6] pt-2 text-[11px] text-[#44423e] space-y-0.5">
              <span className="caption-uppercase block text-[#9c9890] text-[10px]">Target Performance</span>
              <div>Render: WebGL 60 FPS mobile budget</div>
              <div>Mesh: Low-poly glTF (&lt; 2,400 vertices)</div>
              <div>Recognition: Web Speech API (&tau; &ge; 0.85)</div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // COMPOSITION 3: Systems Architecture & Enterprise (Fatayat NU Management System)
  if (project.slug === 'fatayat-nu-management') {
    return (
      <article
        id={project.slug}
        className="py-10 sm:py-14 border-b border-[#e5e2dc]"
        aria-labelledby={`project-title-${project.id}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-2.5 border-b border-[#eeebe6] text-[12px] font-mono text-[#6e6b65]">
          <div className="flex items-center gap-2.5">
            <span className="text-[#141413] font-medium">№ 03</span>
            <span className="text-[#d0ccc3]">&bull;</span>
            <span>SYSTEMS ARCHITECTURE &bull; FULL-STACK PLATFORM</span>
            <span className="text-[#d0ccc3]">&bull;</span>
            <span>2026</span>
          </div>
          <span className="text-[#6e6b65] font-mono text-[11px]">
            Deployed across 47 District Branches
          </span>
        </div>

        <div className="space-y-6">
          <div className="max-w-3xl">
            <h3
              id={`project-title-${project.id}`}
              className="display-xl text-[#141413] tracking-[-0.015em]"
            >
              {project.title} — {project.subtitle}
            </h3>
            <p className="body-md text-[#44423e] mt-2 text-[16px] leading-relaxed">
              {project.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#eeebe6]">
            <div className="space-y-2">
              <span className="caption-uppercase block text-[#141413]">
                Operational Dilemma &amp; Data Fragmentation
              </span>
              <p className="body-sm text-[#44423e] leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="space-y-2">
              <span className="caption-uppercase block text-[#141413]">
                Relational Architecture &amp; Access Controls
              </span>
              <p className="body-sm text-[#44423e] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#ffffff] border border-[#e5e2dc] rounded-sm space-y-2 font-mono text-[12px]">
            <span className="caption-uppercase block text-[#9c9890] text-[10px]">
              Core Architectural Decisions
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[#44423e]">
              <div>
                <span className="block text-[#141413] font-medium">Data Model</span>
                <span>3NF Normalized MySQL with regional hierarchy indexes</span>
              </div>
              <div>
                <span className="block text-[#141413] font-medium">Security &amp; Auth</span>
                <span>Laravel Sanctum tokens with granular Gate policies</span>
              </div>
              <div>
                <span className="block text-[#141413] font-medium">Batch Ingestion</span>
                <span>Chunked CSV stream parser (500 records/batch)</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {project.techStack.map(t => (
                <Badge key={t} variant="mono" size="sm">{t}</Badge>
              ))}
            </div>

            <Link to={`/projects/${project.slug}`}>
              <Button variant="primary" size="sm" icon={<ArrowRight size={13} />}>
                Read Systems Case Study
              </Button>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // COMPOSITION 4: Technical Systems Register (Hadith Arba'in, Kamus Cerdas, Library of Focus)
  return (
    <article
      id={project.slug}
      className="py-10 sm:py-12 border-b border-[#e5e2dc] last:border-b-0"
      aria-labelledby={`project-title-${project.id}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-2 border-b border-[#eeebe6] text-[12px] font-mono text-[#6e6b65]">
        <div className="flex items-center gap-2.5">
          <span className="text-[#141413] font-medium">№ 0{index + 1}</span>
          <span className="text-[#d0ccc3]">&bull;</span>
          <span>{project.category}</span>
          <span className="text-[#d0ccc3]">&bull;</span>
          <span>{project.year}</span>
        </div>
        {project.achievement && (
          <span className="text-[#1e3a2b] bg-[#1e3a2b]/5 px-2 py-0.5 rounded-sm border border-[#1e3a2b]/20 text-[11px]">
            {project.achievement}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 space-y-2">
          <h3
            id={`project-title-${project.id}`}
            className="display-lg text-[#141413]"
          >
            {project.title}
          </h3>
          <p className="caption text-[#6e6b65] text-[13px]">
            {project.subtitle} &bull; {project.role}
          </p>
          <div className="pt-2 flex flex-wrap gap-1.5">
            {project.techStack.map(t => (
              <Badge key={t} variant="mono" size="sm">{t}</Badge>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 space-y-3">
          <p className="body-sm text-[#44423e] leading-relaxed">
            <strong className="text-[#141413] font-medium">The Challenge: </strong>
            {project.problem}
          </p>
          <p className="body-sm text-[#44423e] leading-relaxed">
            <strong className="text-[#141413] font-medium">Engineering Implementation: </strong>
            {project.solution}
          </p>

          <div className="pt-2 flex items-center gap-3">
            <Link to={`/projects/${project.slug}`}>
              <Button variant="primary" size="sm" icon={<ArrowRight size={13} />}>
                Inspect Case Study
              </Button>
            </Link>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="sm" icon={<GithubIcon size={13} />}>
                  Source Code
                </Button>
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" icon={<ExternalLink size={13} />}>
                  Live Demo
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
