import React, { useEffect, useRef, useState } from 'react';
import { personalInfo } from '../data/personal';

/* Brief (≤1s) preloader: the name in mono with a counter 0→100, then fades out.
   Skipped entirely under prefers-reduced-motion (renders nothing). Locks scroll
   while visible and unmounts itself so it never traps focus or interaction. */
const DURATION = 820;

export function Preloader() {
  const [count, setCount] = useState(0);
  const [hiding, setHiding] = useState(false);
  const [gone, setGone] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setGone(true);
      return;
    }

    document.body.style.overflow = 'hidden';
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      setCount(Math.round(p * 100));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setHiding(true);
        window.setTimeout(() => setGone(true), 420);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (gone) document.body.style.overflow = '';
  }, [gone]);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f4f4f2] transition-opacity duration-[400ms] ease-out ${
        hiding ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-[#0b0b0b]">
        {personalInfo.name}
      </div>
      <div className="mt-3 font-mono text-[11px] tabular-nums text-[#9a9a94]">
        {String(count).padStart(3, '0')}
      </div>
      <div className="mt-4 h-[2px] w-40 overflow-hidden bg-[#e2e2de]">
        <div
          className="h-full bg-[#0b0b0b] origin-left"
          style={{ transform: `scaleX(${count / 100})` }}
        />
      </div>
    </div>
  );
}
