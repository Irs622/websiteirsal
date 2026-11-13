import React, { useEffect, useId, useRef } from 'react';
import { MATERIAL_PALETTES, mountProjectMaterial } from './ProjectMaterial';

export function ProjectCover({ index }: { index: number }) {
  const root = useRef<HTMLSpanElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const id = useId().replace(/:/g, '');
  const [base, cool, warm] = MATERIAL_PALETTES[index % MATERIAL_PALETTES.length];

  useEffect(() => {
    if (canvas.current && root.current) return mountProjectMaterial(canvas.current, root.current, index);
  }, [index]);

  return <span ref={root} className="work-material" aria-hidden="true">
    <svg className="work-material-fallback" viewBox="0 0 480 600" preserveAspectRatio="xMidYMid slice" focusable="false">
      <defs>
        <linearGradient id={`${id}-ground`} x2="1" y2="1">
          <stop stopColor={base} /><stop offset="1" stopColor={cool} />
        </linearGradient>
        <linearGradient id={`${id}-fold`} x1="0" x2="1" y1=".3" y2=".7">
          <stop stopColor={base} /><stop offset=".24" stopColor={cool} />
          <stop offset=".43" stopColor="#f5f4ef" /><stop offset=".5" stopColor={warm} />
          <stop offset=".64" stopColor="#66736f" /><stop offset=".76" stopColor={cool} />
          <stop offset="1" stopColor={base} />
        </linearGradient>
      </defs>
      <path fill={`url(#${id}-ground)`} d="M0 0h480v600H0z" />
      <g transform={`translate(240 300) rotate(${index * 13 - 24}) translate(-240 -300)`} fill="none" stroke={`url(#${id}-fold)`} strokeWidth="175">
        <path d="M-160-100C520 0-100 220 280 350S750 600 310 800" />
        <path d="M-300 60C330 150-210 390 100 540S590 780 160 980" />
      </g>
    </svg>
    <canvas ref={canvas} className="work-material-canvas" />
  </span>;
}
