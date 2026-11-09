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

  // Badge pill geometry: rounded.pill (9999px), background surface-strong (#f0efed), text ink (#0c0a09)
  const sizeClasses = size === 'sm' 
    ? 'px-2.5 py-1 text-[11px] tracking-[0.8px]' 
    : 'px-3.5 py-1.5 text-[12px] tracking-[0.96px]';

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full
        font-medium
        border
        transition-colors duration-150
        ${sizeClasses}
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
