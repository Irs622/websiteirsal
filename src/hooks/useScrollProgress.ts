import { RefObject, useEffect, useRef, useState } from 'react';

/**
 * Scroll progress (0..1) through a tall pinned section.
 *
 * The section is expected to be tall (e.g. 440vh) with a `position: sticky`
 * inner stage. Progress is 0 when the section's top reaches the top of the
 * viewport and 1 when its bottom does — i.e. the fraction of the section that
 * has scrolled past the top edge.
 *
 * Implementation: a single rAF-throttled scroll/resize listener reading
 * getBoundingClientRect(). Returns both a React state value (for rendering) and
 * a ref (for imperative reads inside animation loops without re-renders).
 */
export function useScrollProgress<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>
): { progress: number; progressRef: RefObject<number> } {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    let queued = false;

    const measure = () => {
      queued = false;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const raw = scrollable > 0 ? -rect.top / scrollable : 0;
      const clamped = Math.max(0, Math.min(1, raw));
      progressRef.current = clamped;
      setProgress(clamped);
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      rafId = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref]);

  return { progress, progressRef };
}
