import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface SkillTagProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

export function SkillTag({ children, icon, className = '', size = 'md' }: SkillTagProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // ElevenLabs badge-pill: background surface-strong (#f0efed), text ink (#0c0a09),
  // type caption-uppercase (12px / 600 / 0.96px), rounded.pill (9999px), padding 4px × 10px.
  const paddingClass = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-[12px]';

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full font-semibold
        tracking-[0.96px] uppercase
        border transition-colors duration-150 select-none
        ${paddingClass}
        ${isLight 
          ? 'bg-[#f0efed] border-[#e7e5e4] text-[#0c0a09]' 
          : 'bg-[#292524] border-[#3e3835] text-[#f5f5f5]'
        }
        ${className}
      `}
    >
      {icon && <span className="opacity-70 flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

export const BadgePill = SkillTag;
export const Tag = SkillTag;
