import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ProjectGallery } from '../components/projects/ProjectGallery';

export function ProjectsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Selected Work & Systems | LM. Irsal Shydiq';
  }, []);

  return (
    <div className="py-12 sm:py-20 px-6 sm:px-8 max-w-[1320px] mx-auto min-h-screen">
      <div className="mb-10 sm:mb-14">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[12px] text-[#6b6b66] hover:text-[#0b0b0b] transition-colors py-2"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Return to Overview</span>
        </Link>
      </div>
      <ProjectGallery heading="h1" />
    </div>
  );
}
