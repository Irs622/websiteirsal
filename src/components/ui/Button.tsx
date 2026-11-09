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
    'inline-flex items-center justify-center button-text transition-colors duration-150 cursor-pointer rounded-sm select-none disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-1.5 focus-visible:outline-[#141413] focus-visible:outline-offset-2';

  const sizeClasses = {
    sm: 'text-[13px] h-8 px-3 gap-1.5',
    md: 'text-[14px] h-9 px-4 gap-2',
    lg: 'text-[15px] h-11 px-5 gap-2.5'
  };

  const variantClasses = {
    primary:
      'bg-[#141413] text-[#ffffff] hover:bg-[#242321] active:bg-[#000000] border border-[#141413]',
    outline:
      'bg-transparent text-[#141413] border border-[#141413] hover:bg-[#141413] hover:text-[#ffffff]',
    secondary:
      'bg-[#f5f4f0] text-[#141413] border border-[#e5e2dc] hover:bg-[#eeebe6] hover:border-[#d0ccc3]',
    ghost:
      'bg-transparent text-[#44423e] hover:text-[#141413] hover:bg-[#f5f4f0]'
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
