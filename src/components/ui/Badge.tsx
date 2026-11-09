import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'default' | 'neutral' | 'accent' | 'mono';
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}: BadgeProps) {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-[12px] px-2.5 py-0.5'
  };

  const variantClasses = {
    default: 'bg-[#f5f4f0] text-[#141413] border border-[#e5e2dc]',
    neutral: 'bg-transparent text-[#6e6b65] border border-[#e5e2dc]',
    accent: 'bg-[#1e3a2b]/5 text-[#1e3a2b] border border-[#1e3a2b]/20',
    mono: 'font-mono text-[11px] bg-[#f5f4f0] text-[#44423e] border border-[#e5e2dc]'
  };

  return (
    <span
      className={`inline-flex items-center font-normal rounded-sm transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
