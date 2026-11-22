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
    'inline-flex items-center justify-center button-text transition-colors duration-150 cursor-pointer rounded-full select-none disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-[#0b0b0b] focus-visible:outline-offset-2';

  const sizeClasses = {
    sm: 'text-[13px] h-8 px-3.5 gap-1.5',
    md: 'text-[14px] h-9 px-5 gap-2',
    lg: 'text-[15px] h-11 px-6 gap-2.5'
  };

  const variantClasses = {
    primary:
      'bg-[#0b0b0b] text-[#ffffff] hover:bg-[#242321] active:bg-[#000000] border border-[#0b0b0b]',
    outline:
      'bg-[#ffffff] text-[#0b0b0b] border border-[#0b0b0b] hover:bg-[#0b0b0b] hover:text-[#ffffff]',
    secondary:
      'bg-[#ffffff] text-[#0b0b0b] border border-[#d4d4cf] hover:border-[#0b0b0b]',
    ghost:
      'bg-transparent text-[#1a1a18] hover:text-[#0b0b0b] hover:bg-[#ecece8]'
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
