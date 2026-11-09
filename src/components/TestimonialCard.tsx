import React from 'react';
import { GlassCard } from './GlassCard';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatar,
  className = ""
}: TestimonialCardProps) {
  return (
    <GlassCard className={`p-8 md:p-10 flex flex-col justify-between ${className}`}>
      <div className="mb-8">
        <span className="font-display text-4xl text-[#777169] opacity-40 select-none block mb-2 leading-none">
          “
        </span>
        <blockquote className="font-display font-light text-xl md:text-2xl text-[#0c0a09] dark:text-white leading-relaxed">
          {quote}
        </blockquote>
      </div>

      <div className="flex items-center gap-3.5 pt-6 border-t border-[#e7e5e4] dark:border-[#292524]">
        {avatar ? (
          <img
            src={avatar}
            alt={author}
            className="w-10 h-10 rounded-full object-cover border border-[#e7e5e4] dark:border-[#3e3835]"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#f0efed] dark:bg-[#292524] border border-[#e7e5e4] dark:border-[#3e3835] flex items-center justify-center font-medium text-xs text-[#0c0a09] dark:text-white">
            {author.split(' ').map(n => n[0]).join('')}
          </div>
        )}
        <div>
          <p className="body-sm font-medium text-[#0c0a09] dark:text-white leading-tight">
            {author}
          </p>
          <p className="caption text-[#777169] text-xs">
            {role}{company ? ` • ${company}` : ''}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
