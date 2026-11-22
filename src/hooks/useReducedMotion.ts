import { useEffect, useState } from 'react';

/** Tracks the user's prefers-reduced-motion setting, live. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handle = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handle);
    return () => mq.removeEventListener('change', handle);
  }, []);
  return reduced;
}
