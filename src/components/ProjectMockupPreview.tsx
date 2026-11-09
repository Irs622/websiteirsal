import React from 'react';
import { Volume2, Play, CheckCircle2, Eye, Mic, ShieldCheck, Database, Layers } from 'lucide-react';

interface ProjectMockupPreviewProps {
  slug: string;
  title: string;
  category: string;
  accentOrb: string;
}

export function ProjectMockupPreview({
  slug,
  title,
  category,
  accentOrb
}: ProjectMockupPreviewProps) {
  const orbGradientMap: Record<string, string> = {
    mint: 'from-[#a7e5d3]/40 via-[#a7e5d3]/10 to-transparent',
    peach: 'from-[#f4c5a8]/40 via-[#f4c5a8]/10 to-transparent',
    lavender: 'from-[#c8b8e0]/40 via-[#c8b8e0]/10 to-transparent',
    sky: 'from-[#a8c8e8]/40 via-[#a8c8e8]/10 to-transparent',
    rose: 'from-[#e8b8c4]/40 via-[#e8b8c4]/10 to-transparent'
  };

  // Render authentic interactive/visual preview based on project slug
  const renderPreviewContent = () => {
    switch (slug) {
      case 'dengarbain':
        return (
          <div className="w-full h-full flex flex-col justify-between p-5 bg-[#0c0a09] text-white rounded-[16px] border border-[#292524] shadow-xl">
            {/* Audio Header */}
            <div className="flex items-center justify-between border-b border-[#292524] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a] animate-pulse" />
                <span className="text-[11px] font-mono tracking-wider uppercase text-[#a8a29e]">
                  Audio-First PWA • 48 kHz
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#1c1917] text-[#a7e5d3] border border-[#292524]">
                ARIA Accessible
              </span>
            </div>

            {/* Audio Waveform Visualization */}
            <div className="my-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#a8a29e]">
                <span className="font-serif italic text-white text-[15px]">Hadith 01 — Actions by Intentions</span>
                <span className="font-mono text-[11px]">02:14 / 04:30</span>
              </div>

              {/* Dynamic Soundwave Bars */}
              <div className="h-12 flex items-center justify-between gap-1 px-1 bg-[#141210] rounded-lg border border-[#292524]/60">
                {[40, 65, 80, 45, 90, 75, 30, 85, 100, 60, 40, 70, 95, 55, 30, 65, 80, 50, 90, 70, 40, 85, 60, 45, 30].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-full bg-gradient-to-t from-[#a7e5d3] to-[#c8b8e0] opacity-80"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              <div className="w-full bg-[#292524] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#a7e5d3] h-full w-[54%]" />
              </div>
            </div>

            {/* Controls & Tactile Nav indicator */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white text-[#0c0a09] flex items-center justify-center font-bold">
                  <Play size={14} className="fill-current translate-x-0.5" />
                </div>
                <div className="text-[11px] text-[#a8a29e]">
                  <span className="text-white font-medium block">Tactile Shortcut: Spacebar</span>
                  Screen Reader Synced
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#a8a29e] bg-[#1c1917] px-2.5 py-1 rounded-full border border-[#292524]">
                <Volume2 size={12} className="text-[#a7e5d3]" />
                <span>1.0x Speed</span>
              </div>
            </div>
          </div>
        );

      case 'ar-hijaiyah':
        return (
          <div className="w-full h-full flex flex-col justify-between p-5 bg-[#0f1117] text-white rounded-[16px] border border-[#1e2230] shadow-xl relative overflow-hidden">
            {/* Top HUD */}
            <div className="flex items-center justify-between border-b border-[#1e2230] pb-2 text-[11px] font-mono">
              <span className="text-[#a8c8e8] flex items-center gap-1.5">
                <Layers size={13} />
                WebGL 3D Engine
              </span>
              <span className="text-[#16a34a] font-mono">60 FPS • Mobile Optimized</span>
            </div>

            {/* Center 3D Wireframe Representation */}
            <div className="relative my-3 flex flex-col items-center justify-center">
              {/* Coordinate grid circle */}
              <div className="w-28 h-28 rounded-full border border-dashed border-[#a8c8e8]/30 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border border-[#c8b8e0]/20 animate-spin" style={{ animationDuration: '12s' }} />
                <span className="text-5xl font-serif text-white drop-shadow-[0_0_12px_rgba(168,200,232,0.6)]">
                  ب
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#a8c8e8] mt-2">
                Character Mesh: Ba' (Vertex Count: 1,420)
              </span>
            </div>

            {/* Speech Recognition Feedback */}
            <div className="bg-[#161a26] border border-[#242b3d] rounded-lg p-2.5 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <Mic size={14} className="text-[#f4c5a8]" />
                <span className="font-mono text-[#e7e5e4]">Speech Intent: /baː/</span>
              </div>
              <div className="flex items-center gap-1 text-[#16a34a] font-mono">
                <CheckCircle2 size={13} />
                <span>Match: 98.4%</span>
              </div>
            </div>
          </div>
        );

      case 'fatayat-nu':
        return (
          <div className="w-full h-full flex flex-col justify-between p-5 bg-white text-[#0c0a09] rounded-[16px] border border-[#e7e5e4] shadow-xl">
            {/* SaaS Header */}
            <div className="flex items-center justify-between border-b border-[#e7e5e4] pb-2.5">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#16a34a]" />
                <span className="text-[12px] font-semibold tracking-tight text-[#0c0a09]">
                  Fatayat NU Central Registry
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#f0efed] text-[#4e4e4e] font-medium">
                Multi-Tier RBAC
              </span>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-3 gap-2 my-3">
              <div className="bg-[#fafafa] border border-[#e7e5e4] p-2 rounded-lg text-center">
                <div className="text-[10px] text-[#777169] uppercase font-mono">Members</div>
                <div className="text-[15px] font-bold text-[#0c0a09]">12,480+</div>
              </div>
              <div className="bg-[#fafafa] border border-[#e7e5e4] p-2 rounded-lg text-center">
                <div className="text-[10px] text-[#777169] uppercase font-mono">Branches</div>
                <div className="text-[15px] font-bold text-[#0c0a09]">34 Reg</div>
              </div>
              <div className="bg-[#fafafa] border border-[#e7e5e4] p-2 rounded-lg text-center">
                <div className="text-[10px] text-[#777169] uppercase font-mono">Verified</div>
                <div className="text-[15px] font-bold text-[#16a34a]">99.8%</div>
              </div>
            </div>

            {/* Data Row Mockup */}
            <div className="bg-[#fafafa] border border-[#e7e5e4] rounded-lg p-2.5 text-[11px] space-y-1.5 font-mono">
              <div className="flex items-center justify-between text-[#777169] text-[10px] border-b border-[#e7e5e4] pb-1">
                <span>MEMBER IDENTIFIER</span>
                <span>LEVEL &amp; STATUS</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-sans font-medium text-[#0c0a09]">PAC Bandung Wetan</span>
                <span className="text-[#16a34a] font-sans text-[10px] bg-[#16a34a]/10 px-1.5 py-0.5 rounded">
                  ✓ Verified
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-sans font-medium text-[#0c0a09]">PAC Coblong</span>
                <span className="text-[#16a34a] font-sans text-[10px] bg-[#16a34a]/10 px-1.5 py-0.5 rounded">
                  ✓ Verified
                </span>
              </div>
            </div>
          </div>
        );

      case 'edukasi-rambu':
        return (
          <div className="w-full h-full flex flex-col justify-between p-5 bg-[#0f172a] text-white rounded-[16px] border border-[#1e293b] shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-2 text-[11px] font-mono">
              <span className="text-[#f4c5a8] flex items-center gap-1.5">
                <Eye size={13} />
                CV Traffic Sign Detector
              </span>
              <span className="text-[#16a34a]">96.8% Accuracy</span>
            </div>

            {/* Bounding Box HUD */}
            <div className="relative my-3 p-4 border border-dashed border-[#f4c5a8]/50 rounded-lg bg-[#1e293b]/50 text-center">
              <div className="inline-block px-2 py-0.5 bg-[#f4c5a8] text-[#0c0a09] text-[10px] font-bold rounded mb-1">
                STOP SIGN • DETECTED
              </div>
              <div className="text-[12px] font-sans text-[#e2e8f0]">
                "Regulatory Sign: Full Stop Required"
              </div>
              <div className="text-[10px] font-mono text-[#94a3b8] mt-1">
                Bounding Box [x: 124, y: 88, w: 210, h: 210]
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#94a3b8] bg-[#020617] px-3 py-1.5 rounded-lg border border-[#1e293b]">
              <span>Audio Feedback Prompt:</span>
              <span className="text-[#f4c5a8]">Triggered (TTS ID)</span>
            </div>
          </div>
        );

      case 'gema':
        return (
          <div className="w-full h-full flex flex-col justify-between p-5 bg-[#18181b] text-white rounded-[16px] border border-[#27272a] shadow-xl">
            <div className="flex items-center justify-between border-b border-[#27272a] pb-2 text-[11px] font-mono">
              <span className="text-[#c8b8e0] flex items-center gap-1.5">
                <Mic size={13} />
                Gema Accessibility Assistant
              </span>
              <span className="text-[#a7e5d3]">Haptic Engine ON</span>
            </div>

            <div className="my-4 text-center space-y-2">
              <div className="text-[11px] uppercase tracking-wider text-[#a1a1aa] font-mono">
                Realtime Voice Parsing
              </div>
              <div className="text-[15px] font-serif italic text-white px-4 py-2 bg-[#27272a] rounded-lg border border-[#3f3f46]">
                "Buka materi bab satu dan bacakan perlahan"
              </div>
              <div className="text-[11px] text-[#a7e5d3] font-mono">
                Command: NAVIGATE_MODULE(1) &amp; READ_TTS
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#a1a1aa] pt-2 border-t border-[#27272a]">
              <span>Latency: 42ms</span>
              <span className="text-white">WCAG AAA Compliance</span>
            </div>
          </div>
        );

      case 'sembako-mobile':
        return (
          <div className="w-full h-full flex flex-col justify-between p-5 bg-white text-[#0c0a09] rounded-[16px] border border-[#e7e5e4] shadow-xl">
            <div className="flex items-center justify-between border-b border-[#e7e5e4] pb-2 text-[11px]">
              <span className="font-semibold text-[#0c0a09]">Sembako Mart Mobile</span>
              <span className="font-mono text-[10px] text-[#16a34a] bg-[#16a34a]/10 px-2 py-0.5 rounded-full">
                SQLite Offline Cache
              </span>
            </div>

            <div className="space-y-2 my-2 text-[12px]">
              <div className="p-2 rounded-lg bg-[#fafafa] border border-[#e7e5e4] flex items-center justify-between">
                <div>
                  <div className="font-medium text-[#0c0a09]">Beras Premium 5kg</div>
                  <div className="text-[10px] text-[#777169]">Stock: 48 units • Synced</div>
                </div>
                <div className="font-semibold text-[#0c0a09]">Rp 74.000</div>
              </div>
              <div className="p-2 rounded-lg bg-[#fafafa] border border-[#e7e5e4] flex items-center justify-between">
                <div>
                  <div className="font-medium text-[#0c0a09]">Minyak Goreng 2L</div>
                  <div className="text-[10px] text-[#777169]">Stock: 32 units • Synced</div>
                </div>
                <div className="font-semibold text-[#0c0a09]">Rp 36.500</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#777169] pt-2 border-t border-[#e7e5e4]">
              <span>Sync Engine: Active</span>
              <span className="text-[#0c0a09] font-medium">Auto-retry on reconnect</span>
            </div>
          </div>
        );

      case 'kamus-cerdas':
      default:
        return (
          <div className="w-full h-full flex flex-col justify-between p-5 bg-[#0c0a09] text-white rounded-[16px] border border-[#292524] shadow-xl">
            <div className="flex items-center justify-between border-b border-[#292524] pb-2 text-[11px] font-mono">
              <span className="text-[#a7e5d3] flex items-center gap-1.5">
                <Database size={13} />
                Binary Index Trie Search
              </span>
              <span className="text-[#a8c8e8]">&lt; 8ms Lookup</span>
            </div>

            <div className="my-3 space-y-2">
              <div className="bg-[#1c1917] p-2.5 rounded-lg border border-[#292524] font-mono text-xs">
                <span className="text-[#777169]">query: </span>
                <span className="text-[#a7e5d3]">"istishab"</span>
                <div className="text-[11px] text-[#a8a29e] mt-1 font-sans">
                  "Menetapkan hukum asal suatu perkara hingga terdapat dalil yang mengubahnya."
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-[10px] font-mono bg-[#1c1917] text-[#a8c8e8] px-2 py-0.5 rounded border border-[#292524]">
                  Trie Prefix Match
                </span>
                <span className="text-[10px] font-mono bg-[#1c1917] text-[#f4c5a8] px-2 py-0.5 rounded border border-[#292524]">
                  Offline SQLite
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#777169] pt-2 border-t border-[#292524]">
              <span>Audio Pronunciation: Ready</span>
              <span className="text-white">Full Offline Support</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full h-[320px] sm:h-[350px] p-4 flex items-center justify-center">
      {/* Background ambient glow matching project token */}
      <div
        className={`absolute inset-0 rounded-[24px] bg-gradient-to-br ${
          orbGradientMap[accentOrb] || 'from-stone-200/40 to-transparent'
        } pointer-events-none`}
      />
      <div className="relative z-10 w-full h-full max-w-md">
        {renderPreviewContent()}
      </div>
    </div>
  );
}
