import React from 'react';

export interface SectionHeaderProps {
  number?: string;
  label: string;
  headline: string;
  subheadline?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  number,
  label,
  headline,
  subheadline,
  align = 'left',
  className = ''
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 sm:mb-14 ${align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'} ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="caption-uppercase">
          {number ? `№ ${number} — ${label}` : label}
        </span>
      </div>

      <h2 className="display-lg text-[#141413] tracking-[-0.01em]">
        {headline}
      </h2>

      {subheadline && (
        <p className="body-md text-[#6e6b65] mt-2 max-w-2xl text-[15px] sm:text-[16px] leading-relaxed">
          {subheadline}
        </p>
      )}
    </div>
  );
}
