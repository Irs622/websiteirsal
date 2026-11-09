import React, { useEffect, useRef, useState } from 'react';
import { ExperienceItem } from '../data/experience';

interface ExperienceTimelineProps {
  items: ExperienceItem[];
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealedIndices, setRevealedIndices] = useState<Record<number, boolean>>({ 0: true });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handleMqChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handleMqChange);
    return () => mq.removeEventListener('change', handleMqChange);
  }, []);

  // IntersectionObserver for staggered entry reveal
  useEffect(() => {
    if (reducedMotion) {
      const all: Record<number, boolean> = {};
      items.forEach((_, idx) => {
        all[idx] = true;
      });
      setRevealedIndices(all);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idxAttr = entry.target.getAttribute('data-index');
          if (idxAttr !== null && entry.isIntersecting) {
            const idx = parseInt(idxAttr, 10);
            setRevealedIndices((prev) => (prev[idx] ? prev : { ...prev, [idx]: true }));
          }
        });
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.12
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items, reducedMotion]);

  // Continuous scroll-linked spine progress & active node tracking
  useEffect(() => {
    let rafId = 0;

    const updateOnScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate progress from when top of container hits 65% of viewport
      // to when bottom of container hits 45% of viewport
      const startTrigger = viewportHeight * 0.65;
      const endTrigger = viewportHeight * 0.45;
      const totalScrollable = rect.height - (startTrigger - endTrigger);
      const currentScrolled = startTrigger - rect.top;

      const rawProgress = totalScrollable > 0 ? currentScrolled / totalScrollable : 0;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));
      setScrollProgress(clampedProgress);

      // Determine which experience item is closest to the reading focal line (38% from top of viewport)
      const focalY = viewportHeight * 0.38;
      let closestIdx = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const itemRect = el.getBoundingClientRect();
        // Check if focal line is inside this item
        if (itemRect.top <= focalY && itemRect.bottom >= focalY) {
          closestIdx = idx;
          minDistance = 0;
        } else if (minDistance > 0) {
          const dist = Math.min(
            Math.abs(itemRect.top - focalY),
            Math.abs(itemRect.bottom - focalY)
          );
          if (dist < minDistance) {
            minDistance = dist;
            closestIdx = idx;
          }
        }
      });

      setActiveIndex(closestIdx);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateOnScroll);
    };

    updateOnScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items.length]);

  const scrollToItem = (idx: number) => {
    const target = itemRefs.current[idx];
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Top Interactive Chronological Index Bar (Sticky on Desktop & Mobile) */}
      <div className="sticky top-16 z-30 bg-[#fbfbf9] border-t border-b border-[#e5e2dc] py-3 mb-2 transition-colors">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 font-mono text-[11px] text-[#6e6b65] min-w-0">
            <span className="text-[#141413] font-medium shrink-0">
              CHRONOLOGY 0{activeIndex + 1} / 0{items.length}
            </span>
            <span className="text-[#d0ccc3] shrink-0">&bull;</span>
            <span className="truncate text-[#44423e]">
              {items[activeIndex]?.company}
            </span>
          </div>

          {/* Interactive Stepper Pills & Progress Readout */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5">
              {items.map((item, idx) => {
                const isActive = idx === activeIndex;
                const isPast = idx < activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToItem(idx)}
                    aria-label={`Jump to ${item.company}`}
                    className={`font-mono text-[11px] px-2 py-0.5 rounded-xs transition-all duration-300 cursor-pointer border ${
                      isActive
                        ? 'bg-[#141413] text-[#fbfbf9] border-[#141413]'
                        : isPast
                        ? 'bg-[#f5f4f0] text-[#141413] border-[#d0ccc3]'
                        : 'bg-transparent text-[#9c9890] border-transparent hover:text-[#141413]'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="w-14 sm:w-20 h-[2px] bg-[#e5e2dc] overflow-hidden rounded-full">
              <div
                className="h-full bg-[#141413] transition-transform duration-150 ease-out origin-left"
                style={{ transform: `scaleX(${scrollProgress})` }}
              />
            </div>
            <span className="font-mono text-[10px] text-[#6e6b65] w-7 text-right tabular-nums">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Main Chronological Timeline With Scroll-Driven Spine */}
      <div className="relative">
        {/* Continuous Vertical Hairline Track (Desktop & Mobile) */}
        <div
          aria-hidden="true"
          className="absolute left-[7px] md:left-[25%] top-0 bottom-0 w-[1px] bg-[#e5e2dc]"
        >
          {/* Live Scroll-Linked Ink Fill */}
          <div
            className="w-full bg-[#141413] origin-top transition-all duration-150 ease-out"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>

        <div className="divide-y divide-[#e5e2dc]">
          {items.map((item, idx) => {
            const isRevealed = !!revealedIndices[idx] || reducedMotion;
            const isActive = idx === activeIndex;
            const isPassed = idx <= activeIndex;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                data-index={idx}
                className="relative py-12 sm:py-14 pl-7 md:pl-0 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12"
              >
                {/* Timeline Axis Node Marker */}
                <button
                  type="button"
                  onClick={() => scrollToItem(idx)}
                  aria-label={`Focus ${item.company}`}
                  className="group absolute left-[7px] md:left-[25%] top-14 -translate-x-1/2 z-10 w-4 h-4 flex items-center justify-center cursor-pointer focus:outline-none"
                >
                  <span
                    className={`block rounded-full transition-all duration-500 ${
                      isActive
                        ? 'w-3 h-3 bg-[#141413] ring-4 ring-[#fbfbf9] shadow-[0_0_0_1px_#141413]'
                        : isPassed
                        ? 'w-2 h-2 bg-[#141413] ring-4 ring-[#fbfbf9]'
                        : 'w-2 h-2 bg-[#d0ccc3] ring-4 ring-[#fbfbf9] group-hover:bg-[#6e6b65]'
                    }`}
                  />
                </button>

                {/* Left Column: Sticky Period, Location & Role Type (3 cols = 25% width) */}
                <div className="md:col-span-3 md:pr-8">
                  <div
                    className={`md:sticky md:top-32 space-y-1.5 transition-all duration-500 ${
                      isRevealed
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-mono text-[11px] text-[#9c9890]">
                      <span>0{idx + 1}</span>
                      <span>/</span>
                      <span>0{items.length}</span>
                    </div>

                    <div
                      className={`font-mono text-[13px] transition-colors duration-300 ${
                        isActive ? 'text-[#141413] font-medium' : 'text-[#6e6b65]'
                      }`}
                    >
                      {item.period}
                    </div>

                    <div className="font-mono text-[11px] text-[#6e6b65]">
                      {item.location}
                    </div>

                    <div className="pt-2">
                      <span
                        className={`inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-xs border transition-colors duration-300 ${
                          isActive
                            ? 'text-[#1e3a2b] bg-[#1e3a2b]/8 border-[#1e3a2b]/25'
                            : 'text-[#6e6b65] bg-transparent border-[#e5e2dc]'
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Company, Role, Staggered Responsibilities & Tech Stack (9 cols) */}
                <div
                  className={`md:col-span-9 md:pl-8 space-y-5 transition-all duration-700 ease-out ${
                    isRevealed
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-6'
                  }`}
                >
                  <div className="space-y-1">
                    <h3
                      className={`font-display text-[26px] sm:text-[32px] leading-tight tracking-[-0.015em] transition-colors duration-300 ${
                        isActive ? 'text-[#141413]' : 'text-[#44423e]'
                      }`}
                    >
                      {item.company}
                    </h3>
                    <div className="text-[15px] sm:text-[16px] font-medium text-[#242321]">
                      {item.role}
                    </div>
                  </div>

                  {/* Staggered Responsibility List */}
                  <ul className="space-y-2.5 max-w-3xl">
                    {item.responsibilities.map((resp, i) => (
                      <li
                        key={i}
                        style={{
                          transitionDelay: reducedMotion ? '0ms' : `${100 + i * 75}ms`
                        }}
                        className={`flex items-start gap-3.5 text-[15px] leading-relaxed transition-all duration-500 ease-out ${
                          isRevealed
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 translate-x-3'
                        } ${isActive ? 'text-[#242321]' : 'text-[#6e6b65]'}`}
                      >
                        <span
                          className={`font-mono text-[11px] select-none mt-1 transition-colors duration-300 ${
                            isActive ? 'text-[#141413]' : 'text-[#9c9890]'
                          }`}
                        >
                          —
                        </span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Staggered Tech Stack Pills */}
                  {item.techStack && (
                    <div
                      style={{
                        transitionDelay: reducedMotion
                          ? '0ms'
                          : `${150 + item.responsibilities.length * 65}ms`
                      }}
                      className={`pt-4 flex flex-wrap gap-1.5 border-t border-[#eeebe6] transition-all duration-500 ${
                        isRevealed
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-2'
                      }`}
                    >
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className={`font-mono text-[11px] px-2.5 py-0.5 rounded-xs border transition-colors duration-300 ${
                            isActive
                              ? 'bg-[#ffffff] text-[#141413] border-[#d0ccc3]'
                              : 'bg-[#f5f4f0] text-[#6e6b65] border-[#e5e2dc]'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
