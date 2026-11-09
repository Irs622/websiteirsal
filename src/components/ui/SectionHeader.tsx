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
    <div className={`mb-12 sm:mb-16 ${align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'} ${className}`}>
      {/* Editorial Number & Label */}
      <div className="flex items-center gap-3 mb-4">
        <span className="label-editorial text-[#777169] tracking-[0.14em] font-medium">
          {number ? `${number} / ${label}` : label}
        </span>
        <div className="h-[1px] w-12 bg-[#E7E5E4]" />
      </div>

      {/* Main Display Headline (EB Garamond Light 300) */}
      <h2 className="display-section mb-4 text-[#0C0A09]">
        {headline}
      </h2>

      {/* Optional Subheadline */}
      {subheadline && (
        <p className="body-editorial text-[#777169] text-[17px] leading-relaxed">
          {subheadline}
        </p>
      )}
    </div>
  );
}
