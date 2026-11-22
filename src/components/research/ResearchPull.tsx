import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { researchContent } from '../../data/research';
import { artBySlug, artSrc, artSrc1200, artSrcset } from '../../data/art';
import { noWidows } from '../../utils/noWidows';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useScrollProgress } from '../../hooks/useScrollProgress';

const PAINTING = 'de-heem-festoon';
const REF_W = 1920;
const REF_H = 1080;

interface Rect { x: number; y: number; w: number; h: number }

// Three salient regions in the 1920×1080 reference space.
const BOXES: Rect[] = [
  { x: 300, y: 150, w: 360, h: 300 },
  { x: 980, y: 360, w: 340, h: 280 },
  { x: 620, y: 700, w: 360, h: 250 }
];

// Thumbnail slots inside the right-hand panel.
const SLOTS: Rect[] = [
  { x: 1170, y: 165, w: 210, h: 150 },
  { x: 1170, y: 450, w: 210, h: 150 },
  { x: 1170, y: 735, w: 210, h: 150 }
];

const PANEL_X = 1120;

const ITEMS = researchContent.interests.slice(0, 3).map((it, i) => ({
  ...it,
  // deterministic "detector" confidence score
  score: (0.82 + ((it.description.length * 7 + i * 13) % 16) / 100).toFixed(2)
}));

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const phase = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpRect = (a: Rect, b: Rect, t: number): Rect => ({
  x: lerp(a.x, b.x, t),
  y: lerp(a.y, b.y, t),
  w: lerp(a.w, b.w, t),
  h: lerp(a.h, b.h, t)
});

/* ---------- static fallback (mobile / reduced motion) ---------- */
function ResearchList() {
  const webp = artSrc1200(PAINTING, 'webp');
  return (
    <section id="research" aria-label="Research" className="px-6 sm:px-8 py-20 sm:py-28 border-b border-[#e2e2de]">
      <div className="max-w-[1320px] mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#6b6b66] mb-3">
          {researchContent.sectionNumber} · {researchContent.sectionTitle}
        </p>
        <h2 className="display-lg mb-10">Read the research</h2>
        <ul className="divide-y divide-[#e2e2de] border-t border-[#e2e2de]">
          {ITEMS.map((it, i) => (
            <li key={it.topic} className="flex items-center gap-5 py-5">
              <span
                className="shrink-0 w-[96px] h-[70px] bg-[#ecece8] bg-cover bg-center"
                style={{ backgroundImage: `url(${webp})`, backgroundPosition: `${20 + i * 30}% ${20 + i * 25}%` }}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#6b6b66]">
                  {it.category} · {it.score}
                </p>
                <h3 className="display-sm mt-0.5 truncate">{it.topic}</h3>
              </div>
              <Link
                to="/research"
                className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-[#0b0b0b] px-3.5 py-1.5 text-[13px] hover:bg-[#0b0b0b] hover:text-[#f4f4f2] transition-colors"
              >
                Read <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- pinned pull sequence ---------- */
export function ResearchPull() {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const on = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  if (reduced || isMobile) return <ResearchList />;
  return <ResearchStage />;
}

function ResearchStage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { progress } = useScrollProgress(sectionRef);
  const [vp, setVp] = useState({ w: 1280, h: 800 });

  useEffect(() => {
    const measure = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const s = Math.max(vp.w / REF_W, vp.h / REF_H);
  const ox = (vp.w - REF_W * s) / 2;
  const oy = (vp.h - REF_H * s) / 2;

  const webp = artSrc(PAINTING, 'webp');

  // Phase values
  const gray = phase(progress, 0.15, 0.35);
  const boxIn = phase(progress, 0.15, 0.33);
  const zoom = 1 + 0.25 * easeInOut(phase(progress, 0.35, 0.55));
  const move = easeInOut(phase(progress, 0.55, 0.78));
  const panelIn = easeInOut(phase(progress, 0.55, 0.74));
  const lineDraw = phase(progress, 0.58, 0.82);
  const textIn = phase(progress, 0.8, 1);

  return (
    <section
      ref={sectionRef}
      id="research"
      aria-label="Research"
      className="relative border-b border-[#e2e2de]"
      style={{ height: '440vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0b0b0b]">
        {/* reference-space stage */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0"
          style={{
            width: REF_W,
            height: REF_H,
            transformOrigin: 'top left',
            transform: `translate(${ox}px, ${oy}px) scale(${s})`
          }}
        >
          {/* full-bleed painting, desaturating */}
          <picture>
            <source srcSet={artSrcset(PAINTING, 'avif')} sizes="100vw" type="image/avif" />
            <source srcSet={artSrcset(PAINTING, 'webp')} sizes="100vw" type="image/webp" />
            <img
              src={webp}
              alt=""
              className="absolute inset-0 object-cover"
              style={{ width: REF_W, height: REF_H, filter: `grayscale(${gray})` }}
              draggable={false}
            />
          </picture>

          {/* white panel sliding from the right */}
          <div
            className="absolute top-0 bg-[#f4f4f2]"
            style={{
              left: PANEL_X,
              width: REF_W - PANEL_X,
              height: REF_H,
              transform: `translateX(${(1 - panelIn) * (REF_W - PANEL_X)}px)`
            }}
          />

          {/* connector lines box → slot */}
          <svg
            className="absolute inset-0"
            width={REF_W}
            height={REF_H}
            style={{ overflow: 'visible' }}
          >
            {BOXES.map((b, i) => {
              const sl = SLOTS[i];
              const x1 = b.x + b.w / 2;
              const y1 = b.y + b.h / 2;
              const x2 = sl.x + sl.w / 2;
              const y2 = sl.y + sl.h / 2;
              const len = Math.hypot(x2 - x1, y2 - y1);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#3d4bff"
                  strokeWidth={2}
                  style={{ strokeDasharray: len, strokeDashoffset: len * (1 - lineDraw) }}
                />
              );
            })}
          </svg>

          {/* region chips (crop → thumbnail) */}
          {BOXES.map((b, i) => {
            const rect = lerpRect(b, SLOTS[i], move);
            const sx = rect.w / b.w;
            const sy = rect.h / b.h;
            return (
              <div
                key={i}
                className="absolute overflow-hidden"
                style={{
                  left: rect.x,
                  top: rect.y,
                  width: rect.w,
                  height: rect.h,
                  outline: `2px solid rgba(61,75,255,${boxIn})`
                }}
              >
                <img
                  src={webp}
                  alt=""
                  className="absolute max-w-none"
                  style={{
                    width: REF_W * sx,
                    height: REF_H * sy,
                    left: -b.x * sx,
                    top: -b.y * sy,
                    transform: `scale(${zoom})`,
                    transformOrigin: 'center'
                  }}
                  draggable={false}
                />
                {/* label */}
                <span
                  className="annotation-tag"
                  style={{ position: 'absolute', top: 0, left: 0, opacity: boxIn }}
                >
                  {ITEMS[i].category} {ITEMS[i].score}
                </span>
              </div>
            );
          })}

          {/* released list: titles + pills next to slots */}
          {ITEMS.map((it, i) => {
            const sl = SLOTS[i];
            return (
              <div
                key={`t-${i}`}
                className="absolute"
                style={{
                  left: sl.x + sl.w + 40,
                  top: sl.y + 8,
                  width: REF_W - (sl.x + sl.w + 40) - 60,
                  opacity: textIn,
                  transform: `translateY(${(1 - textIn) * 16}px)`
                }}
              >
                <p className="font-mono uppercase tracking-[0.08em] text-[#6b6b66]" style={{ fontSize: 15 }}>
                  {it.category} · {it.score}
                </p>
                <h3 className="font-light text-[#0b0b0b]" style={{ fontSize: 38, lineHeight: 1.08, letterSpacing: '-0.02em' }}>
                  {noWidows(it.topic)}
                </h3>
              </div>
            );
          })}
        </div>

        {/* gradient scrim so the white headline stays legible over the painting */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-full sm:w-3/4 h-64 z-[5] pointer-events-none"
          style={{
            opacity: 1 - boxIn,
            background:
              'linear-gradient(135deg, rgba(11,11,11,0.72) 0%, rgba(11,11,11,0.4) 38%, transparent 68%)'
          }}
        />

        {/* headline (screen space) */}
        <div className="absolute top-0 left-0 p-8 sm:p-12 z-10" style={{ opacity: 1 - textIn }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/80 mb-3">
            {researchContent.sectionNumber} · {researchContent.sectionTitle}
          </p>
          <h2 className="display-xl text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.5)]">
            Read the research
          </h2>
        </div>

        {/* real link overlay once released (keyboard/pointer accessible) */}
        <div
          className="absolute inset-0 z-20"
          style={{ pointerEvents: textIn > 0.6 ? 'auto' : 'none', opacity: textIn }}
        >
          <Link
            to="/research"
            className="absolute bottom-8 right-8 inline-flex items-center gap-1.5 rounded-full bg-[#0b0b0b] text-[#f4f4f2] px-5 py-2.5 text-[14px] hover:bg-[#242321] transition-colors"
          >
            Read the research <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
