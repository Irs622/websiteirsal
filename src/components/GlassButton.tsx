import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  onClick?: (e?: any) => void | Promise<void>;
}

export function GlassButton({
  children,
  variant = 'primary',
  size = 'default',
  onClick,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const { theme } = useTheme();

  const isLight = theme === 'light';

  // Sizing
  const sizeClasses = {
    default: 'h-10 px-5 text-[15px]',
    sm: 'h-8 px-4 text-[13px]',
    lg: 'h-12 px-6 text-[16px]'
  }[size];

  // Variants following ElevenLabs editorial specifications
  let variantClasses = '';

  if (variant === 'primary') {
    // Ink Primary pill (#292524) -> Active/Hover (#0c0a09)
    variantClasses = isLight
      ? 'bg-[#292524] hover:bg-[#0c0a09] active:bg-[#0c0a09] text-white border border-[#292524] shadow-sm hover:shadow active:scale-[0.99]'
      : 'bg-white hover:bg-[#f0efed] active:bg-[#e7e5e4] text-[#0c0a09] border border-white shadow-sm hover:shadow active:scale-[0.99]';
  } else if (variant === 'secondary' || variant === 'outline') {
    // Outline pill with 1px hairline-strong border (#d6d3d1)
    variantClasses = isLight
      ? 'bg-transparent hover:bg-[#ffffff] active:bg-[#f0efed] text-[#0c0a09] border border-[#d6d3d1] hover:border-[#a8a29e] active:scale-[0.99]'
      : 'bg-transparent hover:bg-[#1c1917] active:bg-[#292524] text-white border border-[#3e3835] hover:border-[#777169] active:scale-[0.99]';
  } else if (variant === 'text') {
    variantClasses = isLight
      ? 'bg-transparent text-[#0c0a09] hover:text-[#4e4e4e] p-0 h-auto font-medium'
      : 'bg-transparent text-white hover:text-[#a8a29e] p-0 h-auto font-medium';
  }

  const baseClasses = variant === 'text'
    ? 'inline-flex items-center gap-2 transition-colors duration-150 cursor-pointer'
    : `inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 cursor-pointer select-none ${sizeClasses}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Export aliases for consistency with ElevenLabs naming
export const Button = GlassButton;
export const InkButton = GlassButton;
