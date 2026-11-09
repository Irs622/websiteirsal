import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'secondary';
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
    'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer rounded-full select-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#0C0A09] focus-visible:outline-offset-2';

  const sizeClasses = {
    sm: 'text-[13px] px-3.5 py-1.5 gap-1.5',
    md: 'text-[14px] px-5 py-2.5 gap-2',
    lg: 'text-[15px] px-6 py-3 gap-2.5'
  };

  const variantClasses = {
    primary:
      'bg-[#0C0A09] text-[#F5F5F5] hover:bg-[#292524] active:bg-[#000000] border border-[#0C0A09]',
    outline:
      'bg-transparent text-[#0C0A09] border border-[#D6D3D1] hover:border-[#0C0A09] hover:bg-[#FFFFFF]',
    secondary:
      'bg-[#FFFFFF] text-[#0C0A09] border border-[#E7E5E4] hover:bg-[#FAFAFA] hover:border-[#D6D3D1]',
    ghost:
      'bg-transparent text-[#4E4E4E] hover:text-[#0C0A09] hover:bg-black/[0.03]'
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
