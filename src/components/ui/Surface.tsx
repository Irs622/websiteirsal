import React from 'react';

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'card' | 'subtle' | 'outline' | 'flat';
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
    card: 'bg-[#FFFFFF] border border-[#E7E5E4] shadow-[0_2px_12px_rgba(0,0,0,0.03)]',
    subtle: 'bg-[#FAFAFA] border border-[#E7E5E4]',
    outline: 'bg-transparent border border-[#E7E5E4]',
    flat: 'bg-[#FFFFFF] border-none'
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-10'
  };

  return (
    <div
      className={`rounded-[20px] transition-all duration-200 ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
