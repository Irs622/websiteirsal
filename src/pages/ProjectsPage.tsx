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
          className="inline-flex items-center gap-2 text-[14px] text-[#777169] hover:text-[#0C0A09] transition-colors py-1.5 px-3 -ml-3 rounded-full hover:bg-black/[0.03]"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      <header className="mb-14 space-y-4 max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="label-editorial text-[#777169]">
            {projectsContent.sectionNumber} / {projectsContent.sectionTitle}
          </span>
          <div className="h-[1px] w-12 bg-[#E7E5E4]" />
        </div>

        <h1 className="display-hero text-[#0C0A09]">
          {projectsContent.headline}
        </h1>

        <p className="body-editorial text-[18px] text-[#777169] leading-relaxed">
          {projectsContent.subheadline}
        </p>
      </header>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 pb-10 border-b border-[#E7E5E4] mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-[13px] px-4 py-2 rounded-full border transition-all cursor-pointer font-medium ${
              selectedCategory === cat
                ? 'bg-[#0C0A09] text-[#F5F5F5] border-[#0C0A09]'
                : 'bg-[#FFFFFF] text-[#4E4E4E] border-[#E7E5E4] hover:border-[#D6D3D1]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((project, index) => (
          <ProjectShowcase
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
