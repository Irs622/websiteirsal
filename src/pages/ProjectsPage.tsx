import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SelectedWork } from '../components/SelectedWork';

export function ProjectsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Selected Work & Systems | LM. Irsal Shydiq';
  }, []);

  return (
    <div className="py-12 sm:py-20 px-6 sm:px-8 max-w-[1200px] mx-auto min-h-screen">
      <div className="mb-10 sm:mb-14">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[12px] text-[#6e6b65] hover:text-[#141413] transition-colors py-2 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Return to Overview</span>
        </Link>
      </div>
      <SelectedWork standalone />
    </div>
  );
}
