import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { projectsContent } from '../data/projects';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { GithubIcon } from '../components/ui/Icons';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();

  const project = projectsContent.projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (project) {
      document.title = `${project.title} — Architectural Case Study | LM. Irsal Shydiq`;
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-24 text-center bg-[#fbfbf9]">
        <h1 className="display-xl mb-3 text-[#141413]">Project not found</h1>
        <p className="body-md text-[#6e6b65] mb-6 max-w-md">
          The requested engineering project could not be located in the current publication index.
        </p>
        <Link to="/#projects">
          <Button variant="primary">Return to Projects Index</Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="py-12 sm:py-20 px-6 sm:px-8 max-w-[1100px] mx-auto min-h-screen">
      {/* Top Navigation Breadcrumb */}
      <div className="mb-8 sm:mb-12">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 font-mono text-[13px] text-[#6e6b65] hover:text-[#141413] transition-colors py-1 px-2 -ml-2 rounded-sm hover:bg-[#f5f4f0]"
        >
          <ArrowLeft size={14} />
          <span>Return to Selected Work</span>
        </Link>
      </div>

      {/* Case Study Header */}
      <header className="mb-12 sm:mb-16 space-y-5">
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-[12px] text-[#6e6b65]">
          <span className="text-[#141413] font-medium">{project.category}</span>
          <span>&bull;</span>
          <span>{project.year}</span>
          {project.achievement && (
            <>
              <span>&bull;</span>
              <span className="text-[#1e3a2b] bg-[#1e3a2b]/5 px-2 py-0.5 rounded-sm border border-[#1e3a2b]/20">
                {project.achievement}
              </span>
            </>
          )}
        </div>

        <h1 className="display-mega text-[#141413]">
          {project.title}
        </h1>

        <p className="display-md text-[#44423e] max-w-3xl">
          {project.subtitle}
        </p>

        {/* Project Meta Ledger */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-b border-[#e5e2dc] py-5 font-mono text-[12px]">
          <div>
            <span className="caption-uppercase block text-[#9c9890] text-[10px] mb-0.5">Role</span>
            <span className="text-[#141413]">{project.role}</span>
          </div>
          <div>
            <span className="caption-uppercase block text-[#9c9890] text-[10px] mb-0.5">Timeline</span>
            <span className="text-[#141413]">{project.year}</span>
          </div>
          <div>
            <span className="caption-uppercase block text-[#9c9890] text-[10px] mb-0.5">Discipline</span>
            <span className="text-[#141413]">{project.category}</span>
          </div>
          <div>
            <span className="caption-uppercase block text-[#9c9890] text-[10px] mb-0.5">Verification</span>
            <span className="text-[#1e3a2b] font-medium">Verified &amp; Deployed</span>
          </div>
        </div>
      </header>

      {/* Architectural Dossier Plate */}
      <div className="border border-[#e5e2dc] bg-[#ffffff] p-6 sm:p-8 rounded-sm mb-14 space-y-6">
        <div>
          <span className="caption-uppercase text-[#6e6b65] block mb-2">Executive Summary &amp; Thesis</span>
          <blockquote className="display-sm italic text-[#141413] leading-snug">
            "{project.summary}"
          </blockquote>
        </div>

        {project.specs && (
          <div className="pt-4 border-t border-[#eeebe6] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-[12px]">
            <div>
              <span className="caption-uppercase block text-[#9c9890] text-[10px] mb-0.5">Platform</span>
              <span className="text-[#141413] font-medium">{project.specs.platform}</span>
            </div>
            <div>
              <span className="caption-uppercase block text-[#9c9890] text-[10px] mb-0.5">Architecture</span>
              <span className="text-[#141413] font-medium">{project.specs.architecture}</span>
            </div>
            <div>
              <span className="caption-uppercase block text-[#9c9890] text-[10px] mb-0.5">Core Mechanism</span>
              <span className="text-[#141413] font-medium">{project.specs.keyMechanism}</span>
            </div>
            <div>
              <span className="caption-uppercase block text-[#9c9890] text-[10px] mb-0.5">Standard / Audit</span>
              <span className="text-[#1e3a2b] font-medium">{project.specs.verification}</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Narrative Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Problem, Architecture, Contributions (8 cols) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Problem Statement */}
          <section className="space-y-3">
            <h2 className="title-md text-[#141413] border-b border-[#eeebe6] pb-2 font-mono text-[13px] uppercase tracking-wider text-[#6e6b65]">
              01 &bull; The Problem &amp; Context
            </h2>
            <div className="bg-[#ffffff] border border-[#e5e2dc] rounded-sm p-6">
              <p className="body-md text-[16px] leading-relaxed text-[#44423e]">
                {project.problem}
              </p>
            </div>
          </section>

          {/* Architectural Solution */}
          <section className="space-y-3">
            <h2 className="title-md text-[#141413] border-b border-[#eeebe6] pb-2 font-mono text-[13px] uppercase tracking-wider text-[#6e6b65]">
              02 &bull; Architectural Solution
            </h2>
            <div className="bg-[#ffffff] border border-[#e5e2dc] rounded-sm p-6">
              <p className="body-md text-[16px] leading-relaxed text-[#44423e]">
                {project.solution}
              </p>
            </div>
          </section>

          {/* Engineering Contributions */}
          <section className="space-y-3">
            <h2 className="title-md text-[#141413] border-b border-[#eeebe6] pb-2 font-mono text-[13px] uppercase tracking-wider text-[#6e6b65]">
              03 &bull; Personal Engineering Contributions
            </h2>
            <div className="bg-[#ffffff] border border-[#e5e2dc] rounded-sm p-6">
              <ul className="space-y-3">
                {project.technicalContribution.map((contrib, i) => (
                  <li key={i} className="flex items-start gap-3 body-md text-[#44423e]">
                    <span className="text-[#9c9890] font-mono text-[12px] select-none mt-0.5">
                      [{i + 1}]
                    </span>
                    <span className="leading-relaxed">{contrib}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Right Sidebar: Tech Stack, Repositories, Navigation (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Artifacts & Repositories */}
          <div className="bg-[#ffffff] border border-[#e5e2dc] rounded-sm p-5 space-y-3">
            <span className="caption-uppercase text-[#6e6b65] block">Verified Artifacts</span>
            <div className="flex flex-col gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="primary" size="sm" className="w-full justify-between" icon={<GithubIcon size={14} />}>
                    View Source Code
                  </Button>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="secondary" size="sm" className="w-full justify-between" icon={<ExternalLink size={14} />}>
                    Open Live Deployment
                  </Button>
                </a>
              )}
              <a
                href={`mailto:ichalprov@gmail.com?subject=Technical%20Inquiry%20regarding%20${encodeURIComponent(project.title)}`}
                className="w-full"
              >
                <Button variant="ghost" size="sm" className="w-full justify-center">
                  Technical Inquiry
                </Button>
              </a>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="bg-[#ffffff] border border-[#e5e2dc] rounded-sm p-5 space-y-3">
            <span className="caption-uppercase text-[#6e6b65] block">Technologies Utilized</span>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="mono" size="sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Catalog Index Link */}
          <div className="bg-[#f5f4f0] border border-[#e5e2dc] rounded-sm p-5 space-y-2">
            <span className="caption-uppercase text-[#6e6b65] block">Portfolio Index</span>
            <p className="caption text-[#6e6b65]">
              Explore other engineered systems and accessible applications in this portfolio.
            </p>
            <div className="pt-2">
              <Link to="/#projects">
                <Button variant="outline" size="sm" className="w-full justify-center">
                  All Selected Work
                </Button>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
