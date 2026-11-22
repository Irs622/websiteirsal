import React, { useEffect, useRef } from 'react';

interface InkCanvasProps {
  passages: string[];
  reduced: boolean;
  /** When false the rAF loop is paused (section offscreen / tab hidden). */
  active: boolean;
}

interface Word {
  x: number;
  y: number;
  text: string;
}

const BASE_OPACITY = 0.08;
const REVEAL_RADIUS = 180;
const FONT = '10px "Geist Mono", ui-monospace, monospace';
const LINE_H = 15;

/* Decorative background "ink": short philosophy passages laid out in loose
   cloud blobs in tiny mono. Text within REVEAL_RADIUS of the cursor fades up;
   everything else sits near BASE_OPACITY. aria-hidden; pauses when offscreen or
   the tab is hidden; DPR capped at 2. Renders a single static frame under
   reduced motion. */
export function InkCanvas({ passages, reduced, active }: InkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wordsRef = useRef<Word[]>([]);
  const pointerRef = useRef({ x: -9999, y: -9999 });
  const sizeRef = useRef({ w: 0, h: 0 });
  const rafRef = useRef(0);

  // Layout words into cloud blobs sized to the canvas.
  const layout = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    sizeRef.current = { w, h };

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const words: Word[] = [];
    const blobWidth = Math.min(260, w * 0.3);
    passages.forEach((passage, pi) => {
      // Deterministic blob anchor spread across the canvas.
      const rx = (Math.sin(pi * 12.9898) * 43758.5453) % 1;
      const ry = (Math.sin(pi * 78.233) * 43758.5453) % 1;
      const ax = (Math.abs(rx) * 0.8 + 0.1) * (w - blobWidth);
      const ay = (Math.abs(ry) * 0.78 + 0.08) * (h - 120);
      const tokens = passage.split(/\s+/);
      let lineX = ax;
      let lineY = ay;
      let lineStart = ax + Math.sin(pi) * 10;
      lineX = lineStart;
      // crude mono width estimate: 6px per char at 10px
      tokens.forEach((t) => {
        const wWidth = (t.length + 1) * 6;
        if (lineX + wWidth > ax + blobWidth) {
          lineY += LINE_H;
          lineStart = ax + Math.sin(pi + lineY * 0.02) * 14;
          lineX = lineStart;
        }
        words.push({ x: lineX, y: lineY, text: t });
        lineX += wWidth;
      });
    });
    wordsRef.current = words;
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const { w, h } = sizeRef.current;
    ctx.clearRect(0, 0, w, h);
    ctx.font = FONT;
    ctx.textBaseline = 'top';
    const { x: px, y: py } = pointerRef.current;
    for (const word of wordsRef.current) {
      let opacity = BASE_OPACITY;
      if (!reduced) {
        const dx = word.x - px;
        const dy = word.y - py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REVEAL_RADIUS) {
          const t = 1 - dist / REVEAL_RADIUS;
          opacity = BASE_OPACITY + t * t * (0.82 - BASE_OPACITY);
        }
      }
      ctx.fillStyle = `rgba(11, 11, 11, ${opacity.toFixed(3)})`;
      ctx.fillText(word.text, word.x, word.y);
    }
  };

  useEffect(() => {
    layout();
    draw();

    const onResize = () => {
      layout();
      draw();
    };
    window.addEventListener('resize', onResize);

    if (reduced) {
      return () => window.removeEventListener('resize', onResize);
    }

    const canvas = canvasRef.current;
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas?.getBoundingClientRect();
      if (!rect) return;
      pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onPointerLeave = () => {
      pointerRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);

    let running = true;
    const loop = () => {
      if (!running) return;
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };

    if (active) rafRef.current = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, active, passages]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
