import React, { useEffect, useRef, useState } from 'react';
import { expertiseContent } from '../../data/skills';
import { projectsContent } from '../../data/projects';
import { noWidows } from '../../utils/noWidows';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function normalize(s: string): string {
  return s.toLowerCase().replace(/\.js/g, '').replace(/[^a-z0-9]+/g, '');
}

/** How many projects list a given skill in their techStack (normalised match). */
function projectCount(skill: string): number {
  const target = normalize(skill);
  return projectsContent.projects.filter((p) =>
    p.techStack.some((t) => {
      const n = normalize(t);
      return n === target || (target.length >= 4 && (n.includes(target) || target.includes(n)));
    })
  ).length;
}

// Pixel height of the plotted bar area (labels sit in a band below).
const BAR_AREA = 230;

// Precompute per-category data.
const CATEGORY_DATA = expertiseContent.categories.map((cat) => ({
  id: cat.id,
  name: cat.name,
  tagline: cat.tagline,
  bars: cat.skills.map((skill) => ({ name: skill, count: projectCount(skill) }))
}));

export function ExpertiseChart() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(CATEGORY_DATA[0].id);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const category = CATEGORY_DATA.find((c) => c.id === active) ?? CATEGORY_DATA[0];
  const maxCount = Math.max(1, ...CATEGORY_DATA.flatMap((c) => c.bars.map((b) => b.count)));

  return (
    <div ref={ref} className="bg-white border border-[#e2e2de] rounded-2xl p-5 sm:p-8">
      {/* Tabs */}
      <div role="tablist" aria-label="Skill categories" className="flex flex-wrap gap-2 mb-6">
        {CATEGORY_DATA.map((cat) => {
          const selected = cat.id === active;
          return (
            <button
              key={cat.id}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`panel-${cat.id}`}
              id={`tab-${cat.id}`}
              onClick={() => setActive(cat.id)}
              className={`rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em] border transition-colors ${
                selected
                  ? 'bg-[#0b0b0b] text-[#f4f4f2] border-[#0b0b0b]'
                  : 'bg-white text-[#6b6b66] border-[#d4d4cf] hover:border-[#0b0b0b] hover:text-[#0b0b0b]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`panel-${category.id}`} aria-labelledby={`tab-${category.id}`}>
        <p className="max-w-[60ch] text-[14px] leading-relaxed text-[#6b6b66] mb-6">
          {noWidows(category.tagline)}
        </p>

        <div className="w-full" aria-hidden="true">
          {/* bar area */}
          <div
            key={category.id}
            className="flex items-end gap-1.5 sm:gap-3 border-b border-[#e2e2de]"
            style={{ height: BAR_AREA + 28 }}
          >
            {category.bars.map((b, i) => {
              const target = (b.count / maxCount) * BAR_AREA;
              return (
                <div
                  key={b.name}
                  className="flex-1 min-w-0 flex flex-col items-center justify-end"
                >
                  <span className="font-mono text-[11px] text-[#0b0b0b] mb-1.5 tabular-nums">
                    {b.count}
                  </span>
                  <div
                    className="w-full max-w-[44px] rounded-t-sm bg-[#d4d4cf]"
                    style={{
                      height: Math.max(2, inView ? target : 0),
                      transition: reduced
                        ? 'none'
                        : `height 700ms cubic-bezier(0.22,1,0.36,1) ${i * 45}ms`
                    }}
                  />
                </div>
              );
            })}
          </div>
          {/* rotated technology labels */}
          <div className="flex gap-1.5 sm:gap-3">
            {category.bars.map((b) => (
              <div key={b.name} className="flex-1 min-w-0 flex justify-center h-16">
                <span
                  className="mt-2 font-mono text-[10px] leading-none text-[#6b6b66] whitespace-nowrap origin-top-right"
                  style={{ transform: 'rotate(-40deg)' }}
                >
                  {b.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Screen-reader data table */}
      <table className="sr-only">
        <caption>Technologies by number of projects using them, grouped by category.</caption>
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Technology</th>
            <th scope="col">Projects using it</th>
          </tr>
        </thead>
        <tbody>
          {CATEGORY_DATA.flatMap((cat) =>
            cat.bars.map((b) => (
              <tr key={`${cat.id}-${b.name}`}>
                <td>{cat.name}</td>
                <td>{b.name}</td>
                <td>{b.count}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
