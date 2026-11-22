import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../../data/personal';
import { inkPassages } from '../../data/about';
import { artBySlug, artSrc } from '../../data/art';
import { contactObjects, contactPainting, ContactObject } from '../../data/contactObjects';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { InkCanvas } from '../hero/InkCanvas';

const mailtoHref = `mailto:${personalInfo.email}?subject=Let%27s%20build%20something%20%E2%80%94%20LM.%20Irsal%20Shydiq`;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const phase = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const hash = (i: number, s: number) => {
  const v = Math.sin(i * 53.17 + s * 19.3) * 43758.5453;
  return v - Math.floor(v);
};

const COLOR_EXCEPTIONS = 3; // objects that stay colour + draggable

/* ---------- shared heading block ---------- */
function Heading() {
  return (
    <div className="relative z-30 text-center px-6 pointer-events-none">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#6b6b66] mb-4">
        09 · Inquiries &amp; Dispatch
      </p>
      <h2 className="display-xl max-w-[16ch] mx-auto">Let&apos;s build something with purpose</h2>
      <p className="mt-4 max-w-[52ch] mx-auto text-[15px] sm:text-[16px] text-[#1a1a18] leading-relaxed">
        Open to software engineering internships, technical collaboration, and research inquiries.
      </p>
      <div className="pointer-events-auto mt-6 inline-flex">
        <a
          href={mailtoHref}
          className="inline-flex items-center gap-2 rounded-full bg-[#0b0b0b] text-[#f4f4f2] px-6 py-3 text-[15px] hover:bg-[#242321] transition-colors"
        >
          Get in touch <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

/* ---------- static fallback ---------- */
function ContactStatic() {
  const webp = artSrc(contactPainting, 'webp');
  const avif = artSrc(contactPainting, 'avif');
  const ratio = artBySlug[contactPainting]?.ratio ?? 0.8;
  return (
    <section id="contact" aria-label="Contact" className="px-6 sm:px-8 py-20 sm:py-28">
      <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <Heading />
        <div className="rounded-2xl overflow-hidden border border-[#e2e2de]" style={{ aspectRatio: String(ratio) }}>
          <picture>
            <source srcSet={avif} type="image/avif" />
            <img src={webp} alt="Still life by Jan Davidsz. de Heem (public domain)" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </picture>
        </div>
      </div>
    </section>
  );
}

/* ---------- draggable colour detail ---------- */
function DetailChip({
  obj,
  webp,
  settle,
  draggable
}: {
  obj: ContactObject;
  webp: string;
  settle: number;
  draggable: boolean;
}) {
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const start = useRef({ x: 0, y: 0 });

  const onDown = (e: React.PointerEvent) => {
    if (!draggable) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setDragging(true);
    start.current = { x: e.clientX - drag.x, y: e.clientY - drag.y };
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDrag({ x: e.clientX - start.current.x, y: e.clientY - start.current.y });
  };
  const onUp = () => {
    if (!dragging) return;
    setDragging(false);
    setDrag({ x: 0, y: 0 }); // spring back
  };

  const sx = 1 / obj.w;
  const sy = 1 / obj.h;

  return (
    <div
      aria-hidden="true"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      className="absolute overflow-hidden"
      style={{
        left: `${obj.x * 100}%`,
        top: `${obj.y * 100}%`,
        width: `${obj.w * 100}%`,
        height: `${obj.h * 100}%`,
        transform: `translate(${drag.x}px, ${drag.y}px)`,
        transition: dragging ? 'none' : 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
        cursor: draggable ? (dragging ? 'grabbing' : 'grab') : 'default',
        opacity: settle,
        zIndex: 20
      }}
    >
      <img
        src={webp}
        alt=""
        draggable={false}
        className="absolute max-w-none"
        style={{ width: `${sx * 100}%`, height: `${sy * 100}%`, left: `${-obj.x * sx * 100}%`, top: `${-obj.y * sy * 100}%` }}
      />
    </div>
  );
}

/* ---------- pinned assemble stage ---------- */
export function ContactAssemble() {
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

  if (reduced || isMobile) return <ContactStatic />;
  return <ContactStage />;
}

function ContactStage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { progress } = useScrollProgress(sectionRef);
  const webp = artSrc(contactPainting, 'webp');
  const avif = artSrc(contactPainting, 'avif');
  const ratio = artBySlug[contactPainting]?.ratio ?? 0.8;

  const paintingIn = easeInOut(phase(progress, 0.55, 0.75));
  const boxOut = 1 - phase(progress, 0.55, 0.72);
  const gray = phase(progress, 0.75, 1);
  const hint = phase(progress, 0.78, 0.92);

  return (
    <section ref={sectionRef} id="contact" aria-label="Contact" className="relative" style={{ height: '440vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#f4f4f2]">
        <InkCanvas passages={inkPassages} reduced={false} active />

        {/* assemble card */}
        <div
          aria-hidden="true"
          className="relative rounded-2xl overflow-hidden"
          style={{ height: '72vh', width: `calc(72vh * ${ratio})`, maxWidth: '92vw' }}
        >
          {/* reconstructed painting beneath */}
          <picture>
            <source srcSet={avif} type="image/avif" />
            <img
              src={webp}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: paintingIn, filter: `grayscale(${gray})` }}
              draggable={false}
            />
          </picture>

          {/* flying detail objects */}
          {contactObjects.map((obj, i) => {
            const isColor = i < COLOR_EXCEPTIONS;
            const t = easeInOut(phase(progress, 0.2 + i * 0.012, 0.55));
            const sxScatter = (hash(i, 1) - 0.5) * 760;
            const syScatter = (hash(i, 2) - 0.5) * 620;
            const rot = (hash(i, 3) - 0.5) * 40;
            // after reconstruction, non-colour objects fade into the painting
            const settle = isColor ? 1 : 1 - phase(progress, 0.74, 0.9);
            const sx = 1 / obj.w;
            const sy = 1 / obj.h;

            if (isColor && progress > 0.74) {
              return <DetailChip key={obj.label} obj={obj} webp={webp} settle={1} draggable={hint > 0.2} />;
            }

            return (
              <div
                key={obj.label}
                className="absolute overflow-hidden"
                style={{
                  left: `${obj.x * 100}%`,
                  top: `${obj.y * 100}%`,
                  width: `${obj.w * 100}%`,
                  height: `${obj.h * 100}%`,
                  transform: `translate(${sxScatter * (1 - t)}px, ${syScatter * (1 - t)}px) rotate(${rot * (1 - t)}deg) scale(${0.6 + 0.4 * t})`,
                  opacity: settle * Math.min(1, t * 1.5),
                  outline: `2px solid rgba(61,75,255,${boxOut * t})`,
                  zIndex: 10
                }}
              >
                <img
                  src={webp}
                  alt=""
                  draggable={false}
                  className="absolute max-w-none"
                  style={{ width: `${sx * 100}%`, height: `${sy * 100}%`, left: `${-obj.x * sx * 100}%`, top: `${-obj.y * sy * 100}%` }}
                />
                <span className="annotation-tag" style={{ position: 'absolute', top: 0, left: 0, opacity: boxOut * t }}>
                  01{String(i + 1).padStart(2, '0')} {obj.label}
                </span>
              </div>
            );
          })}

          {/* scrim for text legibility */}
          <div className="absolute inset-0 bg-[#f4f4f2]/35" style={{ opacity: paintingIn }} />
        </div>

        {/* centered heading over everything */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Heading />
        </div>

        {/* drag hint */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6b6b66]"
          style={{ opacity: hint }}
          aria-hidden="true"
        >
          Drag the details
        </div>
      </div>
    </section>
  );
}
