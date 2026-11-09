import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'right',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center button-text transition-all duration-150 cursor-pointer rounded-full select-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#0c0a09] focus-visible:outline-offset-2';

  const sizeClasses = {
    sm: 'text-[13px] h-8 px-3.5 gap-1.5',
    md: 'text-[15px] h-10 px-5 gap-2',
    lg: 'text-[15px] h-11 px-6 gap-2.5'
  };

  const variantClasses = {
    primary:
      'bg-[#292524] text-[#ffffff] hover:bg-[#0c0a09] active:bg-[#0c0a09] border border-[#292524]',
    outline:
      'bg-transparent text-[#0c0a09] border border-[#d6d3d1] hover:border-[#0c0a09] hover:bg-[#ffffff]',
    secondary:
      'bg-[#ffffff] text-[#0c0a09] border border-[#e7e5e4] hover:bg-[#fafafa] hover:border-[#d6d3d1]',
    ghost:
      'bg-transparent text-[#4e4e4e] hover:text-[#0c0a09] hover:bg-black/[0.03]'
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
