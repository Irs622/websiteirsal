import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface GlassInputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  name?: string;
  className?: string;
  label?: string;
}

export function GlassInput({
  type = 'text',
  placeholder,
  value,
  onChange,
  multiline = false,
  rows = 4,
  required = false,
  name,
  className = '',
  label
}: GlassInputProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // ElevenLabs text-input spec:
  // Background surface-card (#ffffff), text ink (#0c0a09), rounded.md (8px),
  // padding 12px 16px, height 44px for input, 1px hairline-strong (#d6d3d1) border.
  // On focus, border thickens to 2px ink.
  const baseClasses = `
    w-full px-4 text-[15px] rounded-[8px]
    transition-all duration-150 outline-none
    ${isLight
      ? 'bg-white text-[#0c0a09] placeholder:text-[#a8a29e] border border-[#d6d3d1] focus:border-[#0c0a09] focus:ring-1 focus:ring-[#0c0a09]'
      : 'bg-[#1c1917] text-white placeholder:text-[#777169] border border-[#3e3835] focus:border-white focus:ring-1 focus:ring-white'
    }
  `;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className={`block text-[13px] font-medium tracking-[0.15px] mb-1.5 ${isLight ? 'text-[#292524]' : 'text-[#d6d3d1]'}`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {multiline ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          className={`${baseClasses} py-3 resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`${baseClasses} h-[44px]`}
        />
      )}
    </div>
  );
}

export const TextInput = GlassInput;
