import React from 'react';

export interface SectionHeaderProps {
  number?: string;
  label: string;
  headline: string;
  subheadline?: string;
  className?: string;
}

export function SectionHeader({
  number,
  label,
  headline,
  subheadline,
  className = ''
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 sm:mb-16 max-w-3xl ${className}`}>
      <div className="flex items-center gap-2 mb-3 text-[11px] font-mono text-[#6e6b65] tracking-wider uppercase">
        {number && <span className="text-[#141413] font-medium">{number}</span>}
        {number && <span className="text-[#d0ccc3]">&bull;</span>}
        <span>{label}</span>
      </div>

      <h2 className="display-lg text-[#141413] tracking-[-0.01em]">
        {headline}
      </h2>

      {subheadline && (
        <p className="body-md text-[#6e6b65] mt-2 max-w-2xl text-[16px] leading-relaxed">
          {subheadline}
        </p>
      )}
    </div>
  );
}
