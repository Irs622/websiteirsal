import React from 'react';

export type OrbColor = 'mint' | 'peach' | 'lavender' | 'sky' | 'rose';

interface AtmosphericOrbProps {
  color?: OrbColor;
  size?: number | string;
  className?: string;
  animation?: 'drift-1' | 'drift-2' | 'none';
  style?: React.CSSProperties;
}

export function AtmosphericOrb({
  color = 'lavender',
  size = 400,
  className = '',
  animation = 'drift-1',
  style = {}
}: AtmosphericOrbProps) {
  const colorMap: Record<OrbColor, string> = {
    mint: 'atmospheric-orb-mint',
    peach: 'atmospheric-orb-peach',
    lavender: 'atmospheric-orb-lavender',
    sky: 'atmospheric-orb-sky',
    rose: 'atmospheric-orb-rose'
  };

  const animClass = animation === 'drift-1' 
    ? 'animate-orb-drift-1' 
    : animation === 'drift-2' 
      ? 'animate-orb-drift-2' 
      : '';

  const sizeStyle = typeof size === 'number' 
    ? { width: `${size}px`, height: `${size}px` } 
    : { width: size, height: size };

  return (
    <div
      aria-hidden="true"
      className={`atmospheric-orb ${colorMap[color]} ${animClass} opacity-60 dark:opacity-25 ${className}`}
      style={{
        ...sizeStyle,
        ...style
      }}
    />
  );
}
