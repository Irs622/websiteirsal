import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, Sparkles } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { SkillTag } from './SkillTag';
import { useTheme } from '../contexts/ThemeContext';

interface AudioWaveformCardProps {
  title?: string;
  speaker?: string;
  category?: string;
  duration?: string;
  sampleText?: string;
  className?: string;
}

export function AudioWaveformCard({
  title = "Design Methodology & Creative Audio Note",
  speaker = "Irsal Shydiq — Editorial Voice",
  category = "Audio Note • 48kHz",
  duration = "0:42",
  sampleText = "“Design should feel like a quiet print magazine: modest in gesture, uncompromising in typographic craft, and deeply humane.”",
  className = ""
}: AudioWaveformCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Waveform bars simulation
  const barHeights = [
    24, 38, 55, 30, 42, 68, 85, 45, 60, 75,
    92, 64, 48, 70, 88, 52, 35, 62, 80, 58,
    40, 65, 82, 45, 30, 55, 72, 48, 35, 20
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1.5));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <GlassCard className={`p-6 md:p-8 ${className}`}>
      {/* Top Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SkillTag size="sm">
            <Volume2 size={12} className="text-[#777169]" />
            <span className="caption-uppercase text-[11px]">{category}</span>
          </SkillTag>
        </div>
        <span className="caption-uppercase text-[11px] text-[#777169]">
          {duration}
        </span>
      </div>

      {/* Quote / Transcript */}
      <p className="font-display italic text-lg md:text-xl text-[#0c0a09] dark:text-white leading-relaxed mb-6 font-light">
        {sampleText}
      </p>

      {/* Play Controls & Waveform Visualization */}
      <div className="pt-5 border-t border-[#e7e5e4] dark:border-[#292524] flex items-center gap-4">
        {/* Play/Pause Button (32px circular plate) */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause audio preview" : "Play audio preview"}
          className={`
            w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0
            transition-all duration-150 cursor-pointer shadow-sm
            ${isPlaying
              ? 'bg-[#0c0a09] text-white dark:bg-white dark:text-[#0c0a09]'
              : isLight
                ? 'bg-[#292524] text-white hover:bg-[#0c0a09]'
                : 'bg-white text-[#0c0a09] hover:bg-[#f0efed]'
            }
          `}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>

        {/* Waveform Glyph Bars */}
        <div className="flex-1 flex items-center gap-1 h-12 overflow-hidden px-1">
          {barHeights.map((height, i) => {
            const barProgress = (i / barHeights.length) * 100;
            const isFilled = barProgress <= progress;

            return (
              <span
                key={i}
                className="w-1 rounded-full transition-all duration-200"
                style={{
                  height: isPlaying ? `${Math.max(15, (height * (0.6 + Math.random() * 0.5)))}%` : `${height}%`,
                  backgroundColor: isFilled
                    ? isLight ? '#0c0a09' : '#ffffff'
                    : isLight ? '#e7e5e4' : '#292524'
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Voice Metadata Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 text-xs text-[#777169]">
        <span>{speaker}</span>
        <span className="flex items-center gap-1">
          <Sparkles size={11} className="text-[#f4c5a8]" />
          <span>Interactive Audio Synthesis Preview</span>
        </span>
      </div>
    </GlassCard>
  );
}
