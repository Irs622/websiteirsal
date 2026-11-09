import React from 'react';

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'card' | 'subtle' | 'outline' | 'flat' | 'inset';
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
    card: 'bg-[#ffffff] border border-[#e5e2dc] rounded-sm hover:border-[#d0ccc3]',
    subtle: 'bg-[#f5f4f0] border border-[#e5e2dc] rounded-sm',
    outline: 'bg-transparent border border-[#e5e2dc] rounded-sm',
    flat: 'bg-[#ffffff] border-none',
    inset: 'bg-[#eeebe6]/60 border border-[#e5e2dc] rounded-sm'
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4 sm:p-5',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8'
  };

  return (
    <div
      className={`transition-colors duration-150 ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
