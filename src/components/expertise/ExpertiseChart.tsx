import React, { useEffect, useRef, useState } from 'react';
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';
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

// Precompute per-category data.
const CATEGORY_DATA = expertiseContent.categories.map((cat) => ({
  id: cat.id,
  name: cat.name,
  tagline: cat.tagline,
  bars: cat.skills.map((skill) => ({ name: skill, count: projectCount(skill) }))
}));

function RotatedTick({ x, y, payload }: any) {
  return (
    <text
      x={x}
      y={y + 10}
      textAnchor="end"
      transform={`rotate(-40, ${x}, ${y + 10})`}
      fontSize={10}
      fontFamily='"Geist Mono", ui-monospace, monospace'
      fill="#6b6b66"
    >
      {payload.value}
    </text>
  );
}

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

        <div className="h-[320px] w-full" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              key={category.id}
              data={category.bars}
              margin={{ top: 24, right: 8, bottom: 56, left: 0 }}
              barCategoryGap="22%"
            >
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={{ stroke: '#e2e2de' }}
                interval={0}
                height={56}
                tick={<RotatedTick />}
              />
              <YAxis hide domain={[0, maxCount]} />
              <Bar
                dataKey="count"
                radius={[2, 2, 0, 0]}
                isAnimationActive={inView && !reduced}
                animationDuration={900}
              >
                {category.bars.map((b) => (
                  <Cell key={b.name} fill="#d4d4cf" />
                ))}
                <LabelList
                  dataKey="count"
                  position="top"
                  fontSize={11}
                  fontFamily='"Geist Mono", ui-monospace, monospace'
                  fill="#0b0b0b"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
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
