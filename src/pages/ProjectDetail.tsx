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
      document.title = `${project.title} — Case Study | LM. Irsal Shydiq`;
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="display-secondary mb-3">Project not found</h1>
        <p className="body-editorial text-[#777169] mb-8 max-w-md">
          The requested engineering project could not be located in the current publication index.
        </p>
        <Link to="/#projects">
          <Button variant="primary">Return to Projects Index</Button>
        </Link>
      </div>
    );
  }

  const orbColorMap: Record<string, string> = {
    mint: 'bg-[#A7E5D3]',
    peach: 'bg-[#F4C5A8]',
    lavender: 'bg-[#C8B8E0]',
    sky: 'bg-[#A8C8E8]',
    rose: 'bg-[#E8B8C4]'
  };

  return (
    <article className="py-12 sm:py-20 px-6 sm:px-8 max-w-[1100px] mx-auto">
      {/* Top Navigation Breadcrumb */}
      <div className="mb-10 sm:mb-14">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-[14px] text-[#777169] hover:text-[#0C0A09] transition-colors py-1.5 px-3 -ml-3 rounded-full hover:bg-black/[0.03]"
        >
          <ArrowLeft size={16} />
          <span>Back to Selected Work</span>
        </Link>
      </div>

      {/* Case Study Header */}
      <header className="mb-14 sm:mb-20 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="neutral" size="md">
            {project.category}
          </Badge>
          <span className="text-[14px] text-[#777169]">{project.year}</span>
          {project.achievement && (
            <span className="inline-flex items-center text-[12px] text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-0.5">
              {project.achievement}
            </span>
          )}
        </div>

        <h1 className="display-hero text-[#0C0A09]">
          {project.title}
        </h1>

        <p className="display-subhead text-[#4E4E4E] max-w-3xl leading-relaxed">
          {project.subtitle}
        </p>

        {/* Project Meta Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-b border-[#E7E5E4] py-6">
          <div>
            <span className="label-editorial block text-[#777169] mb-1">Role</span>
            <span className="text-[15px] font-medium text-[#0C0A09]">{project.role}</span>
          </div>
          <div>
            <span className="label-editorial block text-[#777169] mb-1">Timeline</span>
            <span className="text-[15px] font-medium text-[#0C0A09]">{project.year}</span>
          </div>
          <div>
            <span className="label-editorial block text-[#777169] mb-1">Discipline</span>
            <span className="text-[15px] font-medium text-[#0C0A09]">{project.category}</span>
          </div>
          <div>
            <span className="label-editorial block text-[#777169] mb-1">Status</span>
            <span className="text-[15px] font-medium text-emerald-700">Completed & Verified</span>
          </div>
        </div>
      </header>

      {/* Visual Editorial Spread Header */}
      <div className="relative overflow-hidden rounded-[24px] border border-[#E7E5E4] bg-[#FFFFFF] p-8 sm:p-14 mb-16 shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
        <div
          className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-35 pointer-events-none ${
            orbColorMap[project.accentOrb] || 'bg-[#C8B8E0]'
          }`}
        />
        <div className="relative z-10 max-w-2xl">
          <span className="label-editorial text-[#777169] block mb-3">Executive Summary</span>
          <p className="font-display text-[26px] sm:text-[32px] font-light leading-snug text-[#0C0A09]">
            "{project.summary}"
          </p>
        </div>
      </div>

      {/* Main Narrative Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left Column: Problem, Solution, Contributions (8 cols) */}
        <div className="lg:col-span-8 space-y-12">
          {/* Problem Section */}
          <section className="space-y-4">
            <h2 className="display-section text-[#0C0A09]">
              The Challenge &amp; Context
            </h2>
            <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 sm:p-8">
              <p className="body-editorial text-[17px] leading-relaxed text-[#292524]">
                {project.problem}
              </p>
            </div>
          </section>

          {/* Solution Section */}
          <section className="space-y-4">
            <h2 className="display-section text-[#0C0A09]">
              The Architectural Solution
            </h2>
            <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 sm:p-8">
              <p className="body-editorial text-[17px] leading-relaxed text-[#292524]">
                {project.solution}
              </p>
            </div>
          </section>

          {/* Technical Contributions */}
          <section className="space-y-4">
            <h2 className="display-section text-[#0C0A09]">
              Key Engineering Contributions
            </h2>
            <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 sm:p-8 space-y-4">
              <ul className="space-y-3">
                {project.technicalContribution.map((contrib, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#4E4E4E]">
                    <span className="w-2 h-2 rounded-full bg-[#0C0A09] mt-2 shrink-0" />
                    <span>{contrib}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Right Sidebar: Tech Stack, Links & Meta (4 cols) */}
        <aside className="lg:col-span-4 space-y-8">
          {/* External Links */}
          <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 space-y-4">
            <span className="label-editorial text-[#777169] block">Verified Artifacts</span>
            <div className="flex flex-col gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="primary" size="md" className="w-full justify-between" icon={<GithubIcon size={15} />}>
                    View Repository
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
                  <Button variant="secondary" size="md" className="w-full justify-between" icon={<ExternalLink size={15} />}>
                    Open Live Deployment
                  </Button>
                </a>
              )}
              <a
                href={`mailto:ichalprov@gmail.com?subject=Question%20regarding%20${encodeURIComponent(project.title)}`}
                className="w-full"
              >
                <Button variant="outline" size="md" className="w-full justify-center">
                  Discuss This Project
                </Button>
              </a>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-6 space-y-4">
            <span className="label-editorial text-[#777169] block">Technologies Utilized</span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="neutral" size="md">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="bg-[#FAFAFA] border border-[#E7E5E4] rounded-[18px] p-6">
            <span className="label-editorial text-[#777169] block mb-3">Portfolio Index</span>
            <p className="text-[13px] text-[#777169] mb-4">
              Explore other engineered systems and accessible applications in this catalog.
            </p>
            <Link to="/#projects">
              <Button variant="outline" size="sm" className="w-full justify-center">
                All Projects
              </Button>
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
