import React from 'react';

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'card' | 'subtle' | 'orb-card' | 'outline' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Surface({
  children,
  variant = 'card',
  padding = 'md',
  className = '',
  ...props
}: SurfaceProps) {
  const variantClasses = {
    card: 'bg-[#ffffff] border border-[#e7e5e4] rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:border-[#d6d3d1]',
    subtle: 'bg-[#fafafa] border border-[#e7e5e4] rounded-[16px]',
    'orb-card': 'bg-[#fafafa] border border-[#e7e5e4] rounded-[24px]',
    outline: 'bg-transparent border border-[#e7e5e4] rounded-[16px]',
    flat: 'bg-[#ffffff] border-none rounded-[16px]'
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-6',
    lg: 'p-6 sm:p-8'
  };

  return (
    <div
      className={`transition-all duration-200 ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
