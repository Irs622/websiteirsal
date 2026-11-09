import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'default' | 'neutral' | 'subtle';
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
    sm: 'text-[11px] px-2.5 py-0.5 tracking-[0.6px]',
    md: 'text-[12px] px-2.5 py-1 tracking-[0.96px]'
  };

  const variantClasses = {
    default: 'bg-[#f0efed] text-[#0c0a09] border border-[#e7e5e4]',
    neutral: 'bg-[#fafafa] text-[#777169] border border-[#e7e5e4]',
    subtle: 'bg-black/[0.03] text-[#4e4e4e] border border-transparent'
  };

  return (
    <span
      className={`inline-flex items-center font-semibold uppercase rounded-full caption-uppercase ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
