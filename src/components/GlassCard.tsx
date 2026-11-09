import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { AtmosphericOrb, OrbColor } from './AtmosphericOrb';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: (e?: any) => void | Promise<void>;
  orbVariant?: OrbColor;
  variant?: 'card' | 'orb-card' | 'flat';
}

export function GlassCard({
  children,
  className = '',
  hover = false,
  onClick,
  orbVariant,
  variant = 'card'
}: CardProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Base card shape & border tokens:
  // rounded.xl is 16px; rounded.xxl is 24px (for orb cards)
  const isOrbCard = variant === 'orb-card' || !!orbVariant;
  const roundedClass = isOrbCard ? 'rounded-[24px]' : 'rounded-[16px]';
  const paddingClass = className.includes('p-') ? '' : isOrbCard ? 'p-8' : 'p-6';

  let backgroundClass = '';
  if (isOrbCard) {
    backgroundClass = isLight
      ? 'bg-[#fafafa] border-[#e7e5e4]'
      : 'bg-[#141210] border-[#292524]';
  } else if (variant === 'flat') {
    backgroundClass = isLight
      ? 'bg-[#f5f5f5] border-transparent'
      : 'bg-[#0c0a09] border-transparent';
  } else {
    // Pure white card (#ffffff) with 1px hairline border (#e7e5e4)
    backgroundClass = isLight
      ? 'bg-[#ffffff] border-[#e7e5e4]'
      : 'bg-[#1c1917] border-[#292524]';
  }

  const hoverClass = hover
    ? isLight
      ? 'hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 cursor-pointer'
      : 'hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 cursor-pointer'
    : '';

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden
        border
        transition-all duration-200
        ${roundedClass}
        ${paddingClass}
        ${backgroundClass}
        ${hoverClass}
        ${className}
      `}
    >
      {orbVariant && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <AtmosphericOrb
            color={orbVariant}
            size={280}
            className="opacity-70 dark:opacity-20"
          />
        </div>
      )}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}

export const Card = GlassCard;
export const EditorialCard = GlassCard;
