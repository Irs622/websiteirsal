import React from 'react';
import { Check } from 'lucide-react';
import { GlassButton } from './GlassButton';
import { useTheme } from '../contexts/ThemeContext';

export interface PricingTier {
  name: string;
  tagline: string;
  price: string;
  cadence?: string;
  features: string[];
  ctaText: string;
  featured?: boolean;
  onSelect?: () => void;
}

export function PricingTierCard({
  name,
  tagline,
  price,
  cadence = "per engagement",
  features,
  ctaText,
  featured = false,
  onSelect
}: PricingTier) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Featured tier inverts:
  // In light theme: featured is dark (#0c0a09) with text #ffffff.
  // Standard is white (#ffffff) with text #0c0a09.
  const isDarkCard = featured && isLight;

  return (
    <div
      className={`
        rounded-[16px] p-8 md:p-10 border transition-all duration-200 flex flex-col justify-between
        ${isDarkCard
          ? 'bg-[#0c0a09] text-white border-[#292524] shadow-lg'
          : isLight
            ? 'bg-white text-[#0c0a09] border-[#e7e5e4] shadow-sm hover:shadow-md'
            : 'bg-[#1c1917] text-white border-[#292524]'
        }
      `}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className={`caption-uppercase text-[11px] font-semibold tracking-[0.96px] ${
            isDarkCard ? 'text-[#a8a29e]' : 'text-[#777169]'
          }`}>
            {name}
          </span>
          {featured && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/10 text-white border border-white/20">
              Recommended
            </span>
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="font-display font-light text-3xl md:text-4xl">
              {price}
            </span>
            <span className={`text-xs ${isDarkCard ? 'text-[#a8a29e]' : 'text-[#777169]'}`}>
              / {cadence}
            </span>
          </div>
          <p className={`body-sm mt-2 ${isDarkCard ? 'text-[#d6d3d1]' : 'text-[#4e4e4e] dark:text-[#a8a29e]'}`}>
            {tagline}
          </p>
        </div>

        <div className={`pt-6 pb-8 border-t space-y-3 ${isDarkCard ? 'border-white/10' : 'border-[#e7e5e4] dark:border-[#292524]'}`}>
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                isDarkCard ? 'bg-white/15 text-white' : 'bg-[#f0efed] dark:bg-[#292524] text-[#0c0a09] dark:text-white'
              }`}>
                <Check size={11} />
              </span>
              <span className={isDarkCard ? 'text-[#d6d3d1]' : 'text-[#4e4e4e] dark:text-[#a8a29e]'}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <GlassButton
          variant={isDarkCard ? 'secondary' : featured ? 'primary' : 'outline'}
          size="default"
          onClick={onSelect}
          className={`w-full justify-center ${
            isDarkCard ? 'bg-white text-[#0c0a09] hover:bg-[#f0efed] border-transparent' : ''
          }`}
        >
          {ctaText}
        </GlassButton>
      </div>
    </div>
  );
}
