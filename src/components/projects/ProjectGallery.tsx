import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Bookmark } from 'lucide-react';
import { projectsContent, ProjectItem } from '../../data/projects';
import { noWidows } from '../../utils/noWidows';

const ALL = 'All work';

function ProjectCard({ project }: { project: ProjectItem }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group relative flex flex-col bg-white border border-[#e2e2de] no-underline text-[#0b0b0b] transition-[border-color,box-shadow] hover:border-[#3d4bff] hover:shadow-[0_10px_40px_rgba(11,11,11,0.08)] focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-[#3d4bff] focus-visible:outline-offset-2"
    >
      {/* tag + bookmark */}
      <div className="absolute top-0 left-0 z-10">
        <span className="annotation-tag">PROJECT · {project.category}</span>
      </div>
      <div className="absolute top-2.5 right-2.5 z-10 text-[#9a9a94] group-hover:text-[#3d4bff] transition-colors">
        <Bookmark size={15} aria-hidden="true" />
      </div>

      {/* thumbnail */}
      <div className="relative overflow-hidden bg-[#ecece8]" style={{ aspectRatio: '4 / 3' }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover transition-[transform,opacity] duration-500 group-hover:scale-[1.03] ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-br from-[#f4f4f2] to-[#e7e7e3] transition-transform duration-500 group-hover:scale-[1.03]">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#9a9a94]">
              {project.year}
            </span>
            <span className="font-sans font-light text-[22px] leading-[1.1] tracking-[-0.02em] text-[#0b0b0b] max-w-[90%]">
              {noWidows(project.title)}
            </span>
          </div>
        )}
      </div>

      {/* meta */}
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3 className="font-medium text-[15px] leading-tight truncate">{project.title}</h3>
          <p className="mt-1 font-mono text-[11px] text-[#6b6b66]">
            {project.year} · {project.role}
          </p>
        </div>
        <span className="shrink-0 self-end rounded-full border border-[#d4d4cf] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.06em] text-[#6b6b66]">
          {project.category}
        </span>
      </div>
    </Link>
  );
}

export function ProjectGallery({ heading = 'h2' }: { heading?: 'h1' | 'h2' }) {
  const [filter, setFilter] = useState(ALL);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    projectsContent.projects.forEach((p) =>
      counts.set(p.category, (counts.get(p.category) ?? 0) + 1)
    );
    return [
      { label: ALL, count: projectsContent.projects.length },
      ...Array.from(counts, ([label, count]) => ({ label, count }))
    ];
  }, []);

  const visible = projectsContent.projects.filter(
    (p) => filter === ALL || p.category === filter
  );
  const Heading = heading;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div className="max-w-[48ch]">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#6b6b66] mb-3">
            {projectsContent.sectionNumber} · {projectsContent.sectionTitle}
          </p>
          <Heading className="display-lg">{noWidows('Selected work')}</Heading>
          <p className="mt-3 text-[14px] sm:text-[15px] text-[#6b6b66] leading-relaxed">
            {noWidows(projectsContent.subheadline)}
          </p>
        </div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[#0b0b0b] hover:text-[#3d4bff] transition-colors shrink-0"
        >
          View all <ArrowUpRight size={13} aria-hidden="true" />
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter projects by discipline">
        {categories.map((c) => {
          const selected = c.label === filter;
          return (
            <button
              key={c.label}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(c.label)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.05em] border transition-colors ${
                selected
                  ? 'bg-[#0b0b0b] text-[#f4f4f2] border-[#0b0b0b]'
                  : 'bg-white text-[#6b6b66] border-[#d4d4cf] hover:border-[#0b0b0b] hover:text-[#0b0b0b]'
              }`}
            >
              {c.label}
              <span className={selected ? 'text-[#9a9a94]' : 'text-[#b4b4ae]'}>
                {String(c.count).padStart(2, '0')}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}
