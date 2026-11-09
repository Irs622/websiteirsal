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
    sm: 'text-[11px] px-2.5 py-0.5',
    md: 'text-[12px] px-3 py-1'
  };

  const variantClasses = {
    default: 'bg-[#FFFFFF] text-[#292524] border border-[#E7E5E4]',
    neutral: 'bg-[#FAFAFA] text-[#777169] border border-[#E7E5E4]',
    subtle: 'bg-black/[0.03] text-[#4E4E4E] border border-transparent'
  };

  return (
    <span
      className={`inline-flex items-center font-normal tracking-wide rounded-full ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
