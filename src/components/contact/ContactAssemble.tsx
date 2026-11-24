import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../../data/personal';
import { inkPassages } from '../../data/ink';
import { artBySlug, artSrc1200, artSrcset } from '../../data/art';
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

// Objects that stay in colour and remain draggable at the end.
// Selected from flowers well-centered within the landscape crop.
const COLOR_IDS = new Set(['0105', '0104', '0107']); // roses, anemone, carnation

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
  const webp = artSrc1200(contactPainting, 'webp');
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative w-full overflow-hidden py-24 sm:py-32 px-6 sm:px-8 border-b border-[#e2e2de] flex items-center justify-center min-h-[520px]"
    >
      {/* Full-bleed stage: the still life fills the whole section edge-to-edge. */}
      <div className="absolute inset-0 w-full h-full" aria-hidden="true">
        <picture>
          <source srcSet={artSrcset(contactPainting, 'avif')} sizes="100vw" type="image/avif" />
          <source srcSet={artSrcset(contactPainting, 'webp')} sizes="100vw" type="image/webp" />
          <img
            src={webp}
            alt="Still life by Jan van Huysum (public domain)"
            className="w-full h-full object-cover object-[center_42%]"
            loading="lazy"
            decoding="async"
          />
        </picture>
        {/* Light radial scrim concentrated behind the heading. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 62% 46% at 50% 48%, rgba(244,244,242,0.82) 0%, rgba(244,244,242,0.46) 55%, rgba(244,244,242,0.1) 100%)'
          }}
        />
      </div>

      {/* Centered heading over full bleed artwork */}
      <Heading />
    </section>
  );
}

/* ---------- draggable colour detail ---------- */
function DetailChip({ obj }: { obj: ContactObject }) {
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const start = useRef({ x: 0, y: 0 });

  const onDown = (e: React.PointerEvent) => {
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

  return (
    <img
      src={obj.file}
      alt=""
      aria-hidden="true"
      draggable={false}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      className="absolute pointer-events-auto"
      style={{
        left: `${obj.x * 100}%`,
        top: `${obj.y * 100}%`,
        width: `${obj.w * 100}%`,
        height: `${obj.h * 100}%`,
        transform: `translate(${drag.x}px, ${drag.y}px)`,
        transition: dragging ? 'none' : 'transform 0.55s cubic-bezier(0.22,1,0.36,1)',
        cursor: dragging ? 'grabbing' : 'grab',
        zIndex: 25
      }}
    />
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
  const webp = artSrc1200(contactPainting, 'webp');
  const ratio = artBySlug[contactPainting]?.ratio ?? 0.76;

  const paintingIn = easeInOut(phase(progress, 0.55, 0.75));
  const boxOut = 1 - phase(progress, 0.55, 0.72);
  const gray = phase(progress, 0.78, 1);
  const hint = phase(progress, 0.8, 0.92);

  return (
    <section ref={sectionRef} id="contact" aria-label="Contact" className="relative" style={{ height: '440vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#f4f4f2]">
        <InkCanvas passages={inkPassages} reduced={false} active />

        {/* Full-bleed assemble stage — ink + scrim fill the screen, while the
            reconstructed painting stays contained so the still life is never
            cropped. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center"
        >
          {/* Full-bleed painting layer: width fills the whole viewport, height
              follows the master's portrait ratio (overflowing top/bottom) and
              is centred, so the still life fills the screen edge-to-edge while
              the cut-out fractional coordinates stay exact. */}
          <div
            className="absolute left-0 w-full"
            style={{
              aspectRatio: String(ratio),
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          >
            {/* reconstructed painting beneath */}
            <picture>
              <source srcSet={artSrcset(contactPainting, 'avif')} sizes="100vw" type="image/avif" />
              <source srcSet={artSrcset(contactPainting, 'webp')} sizes="100vw" type="image/webp" />
              <img
                src={webp}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: paintingIn, filter: `grayscale(${gray})` }}
                draggable={false}
              />
            </picture>

            {/* flying cut-out objects */}
            {contactObjects.map((obj, i) => {
              const isColor = COLOR_IDS.has(obj.id);
              const t = easeInOut(phase(progress, 0.2 + i * 0.012, 0.56));
              const sxScatter = (hash(i, 1) - 0.5) * 820;
              const syScatter = (hash(i, 2) - 0.5) * 680;
              const rot = (hash(i, 3) - 0.5) * 44;

              // Once settled, colour exceptions become draggable chips on top.
              if (isColor && progress > 0.75) {
                return <DetailChip key={obj.id} obj={obj} />;
              }

              // Non-colour objects fade as the full painting takes over.
              const fade = isColor ? 1 : 1 - phase(progress, 0.74, 0.9);

              return (
                <div
                  key={obj.id}
                  className="absolute"
                  style={{
                    left: `${obj.x * 100}%`,
                    top: `${obj.y * 100}%`,
                    width: `${obj.w * 100}%`,
                    height: `${obj.h * 100}%`,
                    transform: `translate(${sxScatter * (1 - t)}px, ${syScatter * (1 - t)}px) rotate(${rot * (1 - t)}deg) scale(${0.55 + 0.45 * t})`,
                    opacity: fade * Math.min(1, t * 1.6),
                    zIndex: isColor ? 20 : 10
                  }}
                >
                  <img src={obj.file} alt="" draggable={false} className="w-full h-full object-contain" />
                  <span
                    className="annotation-tag"
                    style={{ position: 'absolute', top: 0, left: 0, opacity: boxOut * t }}
                  >
                    {obj.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 border border-[#3d4bff]"
                    style={{ opacity: boxOut * t }}
                  />
                </div>
              );
            })}
          </div>

          {/* Light legibility scrim — concentrated behind the centered text,
              fading to clear at the edges so the still life and detection
              boxes stay crisp. */}
          <div
            className="absolute inset-0"
            style={{
              opacity: paintingIn,
              background:
                'radial-gradient(ellipse 60% 44% at 50% 46%, rgba(244,244,242,0.78) 0%, rgba(244,244,242,0.42) 55%, rgba(244,244,242,0) 100%)'
            }}
          />
        </div>

        {/* centered heading over everything */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
