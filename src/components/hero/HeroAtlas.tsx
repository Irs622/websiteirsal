import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { personalInfo } from '../../data/personal';
import { inkPassages } from '../../data/ink';
import { artSrc, artBySlug } from '../../data/art';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { atlasItems } from './atlasData';
import { AtlasCard } from './AtlasCard';
import { DetectionTile } from './DetectionTile';
import { InkCanvas } from './InkCanvas';
import { useDetectionBoxes } from './useDetectionBoxes';
import { Button } from '../ui/Button';

const DETECT_SLUG = 'ruysch-flowers';
const DRIFT_X = -0.11;
const DRIFT_Y = -0.07;
const MARGIN = 1;

function hash(x: number, y: number, seed = 0): number {
  const s = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
  return s - Math.floor(s);
}

function scrollToProjects() {
  const el = document.getElementById('projects');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    history.pushState(null, '', '#projects');
  }
}

/* ------------------------------------------------------------------ */
/* Hero overlay (shared by atlas + static fallback)                    */
/* ------------------------------------------------------------------ */
function HeroOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end">
      {/* scrim for text contrast over the atlas */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#f4f4f2] via-[#f4f4f2]/80 to-transparent"
      />
      <div className="relative px-6 sm:px-8 pb-14 max-w-[1320px] w-full mx-auto">
        <p className="accent-italic text-[18px] sm:text-[20px] text-[#3d4bff] mb-3">
          {personalInfo.professionalTitle}
        </p>
        <h1 className="display-mega max-w-[14ch]">{personalInfo.heroHeadline}</h1>
        <p className="mt-4 max-w-[52ch] text-[15px] sm:text-[16px] text-[#1a1a18] leading-relaxed">
          {personalInfo.heroSubheadline}
        </p>
        <div className="pointer-events-auto mt-6">
          <Button variant="primary" size="lg" onClick={scrollToProjects} icon={<ArrowDown size={15} />}>
            Explore selected work
          </Button>
        </div>
      </div>
      <div className="relative px-6 sm:px-8 pb-5 max-w-[1320px] w-full mx-auto flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.1em] text-[#6b6b66]">
        <span>© 2026 {personalInfo.name}</span>
        <span className="inline-flex items-center gap-1">Scroll <ArrowDown size={11} aria-hidden="true" /></span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Static fallback (reduced motion): plain scattered grid              */
/* ------------------------------------------------------------------ */
function HeroStatic() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[80svh] border-b border-[#e2e2de]"
    >
      <div className="px-6 sm:px-8 pt-10 pb-[42vh] max-w-[1320px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {atlasItems.map((item) => (
            <AtlasCard key={item.tag} item={item} width={260} />
          ))}
        </div>
      </div>
      <HeroOverlay />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Draggable infinite atlas                                            */
/* ------------------------------------------------------------------ */
export function HeroAtlas() {
  const reduced = useReducedMotion();
  if (reduced) return <HeroStatic />;
  return <HeroAtlasInteractive />;
}

function HeroAtlasInteractive() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const boxes = useDetectionBoxes(artSrc(DETECT_SLUG, 'webp'));
  const detectRatio = artBySlug[DETECT_SLUG]?.ratio ?? 0.78;

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
  );
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [base, setBase] = useState({ c: 0, r: 0 });

  // motion state (refs — no re-render per frame)
  const panX = useRef(0);
  const panY = useRef(0);
  const vx = useRef(0);
  const vy = useRef(0);
  const baseColRef = useRef(0);
  const baseRowRef = useRef(0);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const startPtr = useRef({ x: 0, y: 0 });
  const startPan = useRef({ x: 0, y: 0 });
  const lastPtr = useRef({ x: 0, y: 0 });
  const activeRef = useRef(true);
  const rafRef = useRef(0);

  const cfg = isMobile
    ? { cellW: 240, cellH: 290, tiers: [120, 190, 260] }
    : { cellW: 440, cellH: 360, tiers: [200, 280, 420] };

  // Track viewport + mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onMq = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onMq);

    const measure = () => {
      const el = sectionRef.current;
      if (el) setDims({ w: el.clientWidth, h: el.clientHeight });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => {
      mq.removeEventListener('change', onMq);
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Pause when offscreen or tab hidden
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting && !document.hidden;
        if (activeRef.current) startLoop();
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    const onVis = () => {
      activeRef.current = !document.hidden && !!sectionRef.current;
      if (activeRef.current) startLoop();
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startLoop = () => {
    cancelAnimationFrame(rafRef.current);
    const { cellW, cellH } = cfg;
    const step = () => {
      if (!activeRef.current) return;
      if (!draggingRef.current) {
        vx.current *= 0.93;
        vy.current *= 0.93;
        panX.current += vx.current + DRIFT_X;
        panY.current += vy.current + DRIFT_Y;
      }
      const bc = Math.floor(-panX.current / cellW) - MARGIN;
      const br = Math.floor(-panY.current / cellH) - MARGIN;
      if (bc !== baseColRef.current || br !== baseRowRef.current) {
        baseColRef.current = bc;
        baseRowRef.current = br;
        setBase({ c: bc, r: br });
      }
      if (layerRef.current) {
        const tx = panX.current + baseColRef.current * cellW;
        const ty = panY.current + baseRowRef.current * cellH;
        layerRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    startLoop();
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  // Pointer drag
  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    movedRef.current = false;
    startPtr.current = { x: e.clientX, y: e.clientY };
    startPan.current = { x: panX.current, y: panY.current };
    lastPtr.current = { x: e.clientX, y: e.clientY };
    vx.current = 0;
    vy.current = 0;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - startPtr.current.x;
    const dy = e.clientY - startPtr.current.y;
    panX.current = startPan.current.x + dx;
    panY.current = startPan.current.y + dy;
    vx.current = e.clientX - lastPtr.current.x;
    vy.current = e.clientY - lastPtr.current.y;
    lastPtr.current = { x: e.clientX, y: e.clientY };
    if (Math.abs(dx) + Math.abs(dy) > 6) movedRef.current = true;
  };
  const endDrag = () => {
    draggingRef.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const impulse = 8;
    switch (e.key) {
      case 'ArrowLeft': vx.current += impulse; break;
      case 'ArrowRight': vx.current -= impulse; break;
      case 'ArrowUp': vy.current += impulse; break;
      case 'ArrowDown': vy.current -= impulse; break;
      default: return;
    }
    e.preventDefault();
  };

  const onNavigate = (e: React.MouseEvent) => {
    if (movedRef.current) e.preventDefault();
  };

  // Build visible cells
  const { cellW, cellH, tiers } = cfg;
  const cols = dims.w ? Math.ceil(dims.w / cellW) + 2 * MARGIN + 1 : 0;
  const rows = dims.h ? Math.ceil(dims.h / cellH) + 2 * MARGIN + 1 : 0;

  const cells: React.ReactNode[] = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const c = base.c + i;
      const r = base.r + j;
      const tierH = hash(c, r, 1);
      const tier = tierH < 0.15 ? 2 : tierH < 0.55 ? 1 : 0;
      const cardW = tiers[tier];
      const jx = (hash(c, r, 3) - 0.5) * cellW * 0.26;
      const jy = (hash(c, r, 4) - 0.5) * cellH * 0.26;
      const left = i * cellW + jx;
      const top = j * cellH + jy;
      const isDetect = boxes.length > 0 && hash(c, r, 5) < 0.09;

      cells.push(
        <div key={`${c}:${r}`} className="absolute" style={{ left, top }}>
          {isDetect ? (
            <DetectionTile
              box={boxes[Math.floor(hash(c, r, 6) * boxes.length)]}
              src={artSrc(DETECT_SLUG, 'webp')}
              ratio={detectRatio}
              width={Math.min(cardW, Math.round(cfg.cellW * 0.52))}
            />
          ) : (
            <AtlasCard
              item={atlasItems[Math.floor(hash(c, r, 2) * atlasItems.length)]}
              width={cardW}
              onNavigate={onNavigate}
            />
          )}
        </div>
      );
    }
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Introduction — draggable project atlas"
      className="relative h-[calc(100svh-7rem)] min-h-[560px] overflow-hidden border-b border-[#e2e2de] bg-[#f4f4f2]"
    >
      <InkCanvas passages={inkPassages} reduced={false} active />

      {/* Pannable surface */}
      <div
        role="application"
        aria-label="Project atlas. Drag to pan, or use arrow keys."
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onKeyDown={onKeyDown}
        className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing touch-pan-y select-none focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-[#3d4bff] focus-visible:outline-offset-[-2px]"
      >
        <div ref={layerRef} className="absolute top-0 left-0 will-change-transform">
          {cells}
        </div>
      </div>

      <HeroOverlay />
    </section>
  );
}
