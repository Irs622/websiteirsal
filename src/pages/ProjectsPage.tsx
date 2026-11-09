import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { projectsContent } from '../data/projects';
import { ProjectShowcase } from '../components/ProjectShowcase';

export function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Selected Work & Systems | LM. Irsal Shydiq';
  }, []);

  const categories = [
    'All',
    'Accessible Tech',
    'AI & Web',
    'Full-Stack Systems',
    'Mobile & Native',
    'Applied Research'
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsContent.projects
      : projectsContent.projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-12 sm:py-20 px-6 sm:px-8 max-w-[1200px] mx-auto min-h-screen">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[13px] text-[#6e6b65] hover:text-[#141413] transition-colors py-1 px-2 -ml-2 rounded-sm hover:bg-[#f5f4f0]"
        >
          <ArrowLeft size={14} />
          <span>Return to Overview</span>
        </Link>
      </div>

      <header className="mb-12 space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 font-mono text-[12px] text-[#6e6b65]">
          <span>04</span>
          <span>&bull;</span>
          <span>SELECTED WORK &amp; CASE STUDIES</span>
        </div>

        <h1 className="display-mega text-[#141413]">
          {projectsContent.headline}
        </h1>

        <p className="body-md text-[17px] text-[#6e6b65] leading-relaxed">
          {projectsContent.subheadline}
        </p>
      </header>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 pb-8 border-b border-[#e5e2dc] mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`font-mono text-[12px] px-3.5 py-1.5 rounded-sm transition-colors cursor-pointer border ${
              selectedCategory === cat
                ? 'bg-[#141413] text-[#ffffff] border-[#141413]'
                : 'bg-[#ffffff] text-[#6e6b65] border-[#e5e2dc] hover:text-[#141413] hover:border-[#d0ccc3]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((project, index) => (
          <React.Fragment key={project.id}>
            {selectedCategory === 'All' && index === 3 && (
              <div className="pt-10 pb-2 flex items-center gap-3">
                <span className="caption-uppercase text-[#9c9890]">
                  TECHNICAL ARCHIVE &bull; PRODUCTION RELEASES (2024 — 2025)
                </span>
                <div className="h-[1px] flex-1 bg-[#eeebe6]" />
              </div>
            )}
            <ProjectShowcase
              project={project}
              index={index}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
