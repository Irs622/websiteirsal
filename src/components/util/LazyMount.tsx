import React, { useEffect, useRef, useState } from 'react';

/** Mounts its children only once the placeholder nears the viewport, so heavy
    (code-split) sections stay out of the initial load. Reserves `minHeight`
    to avoid layout shift before mount. */
export function LazyMount({
  children,
  minHeight,
  rootMargin = '800px'
}: {
  children: React.ReactNode;
  minHeight?: string | number;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return <div ref={ref} style={show ? undefined : { minHeight }}>{show ? children : null}</div>;
}
