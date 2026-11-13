import React, { useId } from 'react';

// Original material studies, not screenshots of the projects or their interfaces.
const finishes = [
  ['#a5ada3', '#d9dfcd', '#8faaa3', '#f3eee1', '#727b75'],
  ['#9caebc', '#d8dbec', '#a6bcce', '#f1e8da', '#778b9c'],
  ['#c6c7c0', '#e8dfec', '#b7c9cd', '#f7edce', '#929a9a'],
  ['#b6a8ca', '#e2c7e5', '#9dbed5', '#f7e1de', '#9484b0'],
  ['#bcb3a4', '#ede0c4', '#c6cbb8', '#fff0d7', '#9c9688'],
  ['#9cb8b2', '#dce8d2', '#a9c8d1', '#f4efd9', '#72938e'],
  ['#939aab', '#d9d7e5', '#a1b6bf', '#e8e3da', '#6c7689']
];

export function ProjectCover({ index }: { index: number }) {
  const id = useId().replace(/:/g, '');
  const [ground, pearl, cool, light, shade] = finishes[index % finishes.length];
  const curves = index % 2 === 0 ? [
    'M-140-100C420 40-140 170 230 390S630 510 380 780',
    'M80-100C580 90-90 260 310 490S680 550 540 780',
    'M340-100C20 100 690 130 330 440S150 610 520 800'
  ] : [
    'M-100-80C490 110-160 270 250 420S620 580 300 800',
    'M460-100C20 100 640 200 270 420S120 650 510 780',
    'M160-100C-80 150 580 250 180 510S300 680 140 800'
  ];
  return <svg className="work-cover-art" viewBox="0 0 480 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={`${id}-ground`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={ground} /><stop offset="1" stopColor={shade} /></linearGradient>
      <linearGradient id={`${id}-foil`} x1="0" y1=".2" x2="1" y2=".7">
        <stop stopColor={shade} /><stop offset=".18" stopColor={cool} /><stop offset=".34" stopColor={pearl} /><stop offset=".43" stopColor={light} /><stop offset=".48" stopColor="#ffffff" /><stop offset=".51" stopColor={shade} /><stop offset=".57" stopColor={pearl} /><stop offset=".73" stopColor={cool} /><stop offset=".86" stopColor={light} /><stop offset="1" stopColor={ground} />
      </linearGradient>
      <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="0"><stop stopColor={shade} /><stop offset=".45" stopColor={pearl} /><stop offset=".51" stopColor={light} /><stop offset=".56" stopColor={shade} /><stop offset="1" stopColor={cool} /></linearGradient>
      <radialGradient id={`${id}-light`} cx=".3" cy=".1" r=".9"><stop stopColor={light} stopOpacity=".58" /><stop offset="1" stopColor={ground} stopOpacity="0" /></radialGradient>
    </defs>
    <path fill={`url(#${id}-ground)`} d="M0 0H480V620H0Z" />
    <g transform={`rotate(${(index % 3 - 1) * 12} 240 310)`} fill="none">
      {curves.map((d, i) => <g key={i}>
        <path d={d} stroke={shade} strokeWidth={154 - i * 24} opacity=".35" transform="translate(8 12)" />
        <path d={d} stroke={`url(#${id}-foil)`} strokeWidth={142 - i * 24} />
        <path d={d} stroke={`url(#${id}-edge)`} strokeWidth={27 - i * 6} transform="translate(16 0)" opacity=".85" />
        <path d={d} stroke={light} strokeWidth="1.2" transform="translate(23 0)" opacity=".65" />
      </g>)}
    </g>
    <path fill={`url(#${id}-light)`} d="M0 0H480V620H0Z" />
  </svg>;
}
