import React, { useEffect, useRef, useState } from 'react';
import { aboutContent } from '../../data/about';
import { personalInfo } from '../../data/personal';
import { projectsContent } from '../../data/projects';
import { researchContent } from '../../data/research';
import { educationContent } from '../../data/education';
import { artBySlug, artSrc1200, artSrcset } from '../../data/art';
import { noWidows } from '../../utils/noWidows';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { CountUp } from '../ui/CountUp';

const SPECIMEN = 'van-huysum-still-life';

interface Crop {
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

// Crop regions aligned to real flowers (van Huysum master 2400×3148),
// labelled by project disciplines.
const CROPS: Crop[] = [
  { label: 'OBJ_01 ACCESSIBLE TECH', x: 0.231, y: 0.073, w: 0.207, h: 0.190 }, // tulip
  { label: 'OBJ_02 AI & WEB', x: 0.577, y: 0.032, w: 0.217, h: 0.137 }, // poppy
  { label: 'OBJ_03 FULL-STACK', x: 0.138, y: 0.513, w: 0.273, h: 0.192 }, // roses
  { label: 'OBJ_04 MOBILE', x: 0.509, y: 0.690, w: 0.258, h: 0.140 } // grapes
];

const distinctTech = new Set(
  projectsContent.projects.flatMap((p) => p.techStack)
).size;

const STATS = [
  { end: projectsContent.projects.length, label: 'Shipped projects' },
  { end: researchContent.interests.length, label: 'Research areas' },
  { end: educationContent.certifications.length, label: 'Certifications' },
  { end: distinctTech, label: 'Technologies' }
];

function StatCard({ end, label, className = '' }: { end: number; label: string; className?: string }) {
  return (
    <div
      className={`bg-white border border-[#e2e2de] px-4 py-3.5 min-w-[112px] shadow-[0_2px_10px_rgba(11,11,11,0.04)] ${className}`}
    >
      <div className="font-sans font-light text-[34px] leading-none tracking-[-0.02em] text-[#0b0b0b] tabular-nums">
        <CountUp end={end} />
      </div>
      <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#6b6b66]">
        {label}
      </div>
    </div>
  );
}

function Specimen() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  const piece = artBySlug[SPECIMEN];
  const webp = artSrc1200(SPECIMEN, 'webp');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const centers = CROPS.map((c) => ({ x: (c.x + c.w / 2) * 100, y: (c.y + c.h / 2) * 100 }));
  const linePath = centers.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: String(piece?.ratio ?? 0.76) }}>
      {/* Grayscale base */}
      <picture>
        <source srcSet={artSrcset(SPECIMEN, 'avif')} sizes="(max-width: 1024px) 100vw, 50vw" type="image/avif" />
        <source srcSet={artSrcset(SPECIMEN, 'webp')} sizes="(max-width: 1024px) 100vw, 50vw" type="image/webp" />
        <img
          src={webp}
          alt={`${piece?.title} by ${piece?.artist} (detail), used as a decorative specimen plate`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover grayscale"
          draggable={false}
        />
      </picture>

      {/* Colour crops (same image, clipped to each region) */}
      {CROPS.map((c) => (
        <img
          key={c.label}
          src={webp}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
          style={{
            clipPath: `inset(${c.y * 100}% ${(1 - (c.x + c.w)) * 100}% ${(1 - (c.y + c.h)) * 100}% ${c.x * 100}%)`
          }}
        />
      ))}

      {/* Connector lines */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <path
          d={linePath}
          fill="none"
          stroke="#3d4bff"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: reduced || drawn ? 0 : 1,
            transition: reduced ? 'none' : 'stroke-dashoffset 1.3s ease'
          }}
        />
      </svg>

      {/* Blue detection boxes + labels */}
      {CROPS.map((c) => (
        <div
          key={`box-${c.label}`}
          aria-hidden="true"
          className="absolute annotation-frame"
          style={{
            left: `${c.x * 100}%`,
            top: `${c.y * 100}%`,
            width: `${c.w * 100}%`,
            height: `${c.h * 100}%`
          }}
        >
          <span className="annotation-tag annotation-tag--tl">{c.label}</span>
        </div>
      ))}
    </div>
  );
}

export function AboutSpecimen() {
  return (
    <section
      id="about"
      aria-label="About"
      className="relative px-6 sm:px-8 py-20 sm:py-28 border-b border-[#e2e2de]"
    >
      <div className="max-w-[1320px] mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* Left: pills + headline + bio */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="rounded-full border border-[#d4d4cf] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#6b6b66]">
              {aboutContent.sectionNumber} · {aboutContent.sectionTitle}
            </span>
            <span className="rounded-full border border-[#d4d4cf] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#6b6b66]">
              {personalInfo.location} · UTC+7
            </span>
          </div>

          <h2 className="display-xl max-w-[18ch]">{noWidows(aboutContent.headline)}</h2>

          <div className="mt-6 space-y-4 max-w-[54ch]">
            {aboutContent.narrative.map((p, i) => (
              <p key={i} className="text-[15px] sm:text-[16px] leading-relaxed text-[#1a1a18]">
                {noWidows(p)}
              </p>
            ))}
          </div>

          {/* Mobile stat grid */}
          <div className="mt-10 grid grid-cols-2 gap-3 lg:hidden">
            {STATS.map((s) => (
              <StatCard key={s.label} end={s.end} label={s.label} />
            ))}
          </div>
        </div>

        {/* Right: specimen plate with corner stat cards */}
        <div className="relative">
          <Specimen />

          {/* Corner stat cards (desktop) */}
          <StatCard
            {...STATS[0]}
            className="hidden lg:block absolute -top-5 -left-5 z-10"
          />
          <StatCard
            {...STATS[1]}
            className="hidden lg:block absolute -top-5 -right-5 z-10"
          />
          <StatCard
            {...STATS[2]}
            className="hidden lg:block absolute -bottom-5 -left-5 z-10"
          />
          <StatCard
            {...STATS[3]}
            className="hidden lg:block absolute -bottom-5 -right-5 z-10"
          />
        </div>
      </div>
    </section>
  );
}
