import React from 'react';

export type GlowColor = 'mint' | 'peach' | 'lavender' | 'sky' | 'rose';

export interface AtmosphericGlowProps {
  color?: GlowColor;
  size?: number | string;
  className?: string;
  animation?: 'drift-1' | 'drift-2' | 'none';
  style?: React.CSSProperties;
}

export function AtmosphericGlow({
  color = 'lavender',
  size = 460,
  className = '',
  animation = 'drift-1',
  style = {}
}: AtmosphericGlowProps) {
  const colorClasses: Record<GlowColor, string> = {
    mint: 'orb-mint',
    peach: 'orb-peach',
    lavender: 'orb-lavender',
    sky: 'orb-sky',
    rose: 'orb-rose'
  };

  const animClass =
    animation === 'drift-1'
      ? 'animate-float-1'
      : animation === 'drift-2'
      ? 'animate-float-2'
      : '';

  const sizeStyle =
    typeof size === 'number'
      ? { width: `${size}px`, height: `${size}px` }
      : { width: size, height: size };

  return (
    <div
      aria-hidden="true"
      className={`atmospheric-orb ${colorClasses[color]} ${animClass} pointer-events-none select-none ${className}`}
      style={{
        ...sizeStyle,
        ...style
      }}
    />
  );
}
