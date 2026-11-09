import React from 'react';

interface ProjectMockupPreviewProps {
  slug: string;
  title: string;
  category: string;
  accentOrb?: string;
}

export function ProjectMockupPreview({
  slug,
  title,
  category
}: ProjectMockupPreviewProps) {
  // Render authentic architectural specification and technical plate
  const renderSpecificationPlate = () => {
    switch (slug) {
      case 'dengarbain':
        return (
          <div className="w-full h-full flex flex-col justify-between p-5 bg-[#141413] text-[#f5f4f0] rounded-sm border border-[#2e2d29] font-mono text-[11px] leading-relaxed select-text">
            {/* Plate Folio */}
            <div className="flex items-center justify-between pb-3 border-b border-[#2e2d29] text-[#9c9890]">
              <span className="text-[#f5f4f0] font-medium tracking-wide">
                SPEC // ARCH-01
              </span>
              <span>AUDIO-FIRST PWA</span>
            </div>

            {/* Pipeline & States */}
            <div className="my-4 space-y-3">
              <div className="text-[#9c9890] text-[10px] uppercase tracking-wider">
                Audio State Machine &amp; Synchronization
              </div>
              <div className="p-2.5 bg-[#1c1c1a] border border-[#2e2d29] rounded-sm space-y-1.5 text-[11px]">
                <div className="text-[#e5e2dc]">
                  <span className="text-[#9c9890]">[AudioContext]</span> &rarr; HTML5 Audio Buffer &rarr; 48 kHz Web Audio Node
                </div>
                <div className="text-[#9c9890]">
                  State: <span className="text-[#f5f4f0]">BUFFERED</span> &bull; Latency: <span className="text-[#f5f4f0]">&lt; 40ms</span> &bull; Sync: Dual-Channel
                </div>
              </div>

              {/* ARIA Declarations */}
              <div className="space-y-1 text-[11px]">
                <div className="text-[#9c9890] text-[10px] uppercase tracking-wider">
                  Accessibility Interface Contract
                </div>
                <div className="text-[#e5e2dc] pl-2 border-l border-[#2e2d29] space-y-0.5">
                  <div>role="region" aria-live="polite"</div>
                  <div>aria-label="Hadith Audio Player with synchronized text"</div>
                  <div className="text-[#9c9890]">Keyboard: [Space: Play/Pause] [J/K: Seek -/+5s]</div>
                </div>
              </div>
            </div>

            {/* Verification Footer */}
            <div className="pt-3 border-t border-[#2e2d29] flex items-center justify-between text-[#9c9890] text-[10px]">
              <span>WCAG 2.2 AAA Audit: PASSED</span>
              <span className="text-[#f5f4f0]">Offline Service Worker: Ready</span>
            </div>
          </div>
        );

      case 'ar-hijaiyah':
        return (
          <div className="w-full h-full flex flex-col justify-between p-5 bg-[#141413] text-[#f5f4f0] rounded-sm border border-[#2e2d29] font-mono text-[11px] leading-relaxed select-text">
            <div className="flex items-center justify-between pb-3 border-b border-[#2e2d29] text-[#9c9890]">
              <span className="text-[#f5f4f0] font-medium tracking-wide">
                SPEC // ARCH-02
              </span>
              <span>WEBGL &amp; SPEECH EVAL</span>
            </div>

            <div className="my-4 space-y-3">
              <div className="text-[#9c9890] text-[10px] uppercase tracking-wider">
                Graphics &amp; Speech Pipeline
              </div>
              <div className="p-2.5 bg-[#1c1c1a] border border-[#2e2d29] rounded-sm space-y-1.5 text-[11px]">
                <div className="text-[#e5e2dc]">
                  <span className="text-[#9c9890]">[Three.js]</span> WebGLRenderer &bull; 60 FPS mobile target
                </div>
                <div className="text-[#9c9890]">
                  Mesh topology: Low-poly glTF &bull; Vertices: &lt; 2,400 &bull; 360&deg; Orbit
                </div>
              </div>

              <div className="space-y-1 text-[11px]">
                <div className="text-[#9c9890] text-[10px] uppercase tracking-wider">
                  Speech Verification Algorithm
                </div>
                <div className="text-[#e5e2dc] pl-2 border-l border-[#2e2d29] space-y-0.5">
                  <div>WebSpeech API &rarr; phoneme match against acoustic model</div>
                  <div>Confidence threshold &tau; &ge; 0.85 &rarr; Dispatch PASS event</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#2e2d29] flex items-center justify-between text-[#9c9890] text-[10px]">
              <span className="text-[#f5f4f0]">Artificial: JISI Accepted</span>
              <span>Peer-reviewed (2026)</span>
            </div>
          </div>
        );

      case 'fatayat-nu-management':
        return (
          <div className="w-full h-full flex flex-col justify-between p-5 bg-[#141413] text-[#f5f4f0] rounded-sm border border-[#2e2d29] font-mono text-[11px] leading-relaxed select-text">
            <div className="flex items-center justify-between pb-3 border-b border-[#2e2d29] text-[#9c9890]">
              <span className="text-[#f5f4f0] font-medium tracking-wide">
                SPEC // ARCH-03
              </span>
              <span>SYSTEM ARCHITECTURE &amp; RBAC</span>
            </div>

            <div className="my-4 space-y-3">
              <div className="text-[#9c9890] text-[10px] uppercase tracking-wider">
                Hierarchical Relational Schema
              </div>
              <div className="p-2.5 bg-[#1c1c1a] border border-[#2e2d29] rounded-sm space-y-1 text-[11px]">
                <div className="text-[#e5e2dc]">
                  Root &rarr; PW (Provinsi) &rarr; PC (Kabupaten) &rarr; PAC (47 Districts)
                </div>
                <div className="text-[#9c9890]">
                  Index: (district_id, member_uuid, verification_status)
                </div>
              </div>

              <div className="space-y-1 text-[11px]">
                <div className="text-[#9c9890] text-[10px] uppercase tracking-wider">
                  Security &amp; Processing Model
                </div>
                <div className="text-[#e5e2dc] pl-2 border-l border-[#2e2d29] space-y-0.5">
                  <div>Auth: Laravel Sanctum token guard with tiered policies</div>
                  <div>Batching: Stream-based chunk processing for CSV imports</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#2e2d29] flex items-center justify-between text-[#9c9890] text-[10px]">
              <span>Scope: 47 District Branches</span>
              <span className="text-[#f5f4f0]">3NF Normalized MySQL</span>
            </div>
          </div>
        );

      case 'hadith-arbain-mobile':
        return (
          <div className="w-full h-full flex flex-col justify-between p-5 bg-[#141413] text-[#f5f4f0] rounded-sm border border-[#2e2d29] font-mono text-[11px] leading-relaxed select-text">
            <div className="flex items-center justify-between pb-3 border-b border-[#2e2d29] text-[#9c9890]">
              <span className="text-[#f5f4f0] font-medium tracking-wide">
                SPEC // ARCH-04
              </span>
              <span>ANDROID RUNTIME &amp; ROOM</span>
            </div>

            <div className="my-4 space-y-3">
              <div className="text-[#9c9890] text-[10px] uppercase tracking-wider">
                Kotlin MVVM &amp; Media Lifecycle
              </div>
              <div className="p-2.5 bg-[#1c1c1a] border border-[#2e2d29] rounded-sm space-y-1.5 text-[11px]">
                <div className="text-[#e5e2dc]">
                  ViewModel &rarr; StateFlow &rarr; Foreground Audio Service
                </div>
                <div className="text-[#9c9890]">
                  Engine: android.speech.tts.TextToSpeech (Bilingual dynamic switch)
                </div>
              </div>

              <div className="space-y-1 text-[11px]">
                <div className="text-[#9c9890] text-[10px] uppercase tracking-wider">
                  Offline Persistence Layer
                </div>
                <div className="text-[#e5e2dc] pl-2 border-l border-[#2e2d29] space-y-0.5">
                  <div>Room ORM SQLite &bull; Prepopulated Arabic &amp; Indonesian text</div>
                  <div>Zero network requirement &bull; Instant cold-start rendering</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#2e2d29] flex items-center justify-between text-[#9c9890] text-[10px]">
              <span>Android API 24–34</span>
              <span className="text-[#f5f4f0]">Material 3 Accessible</span>
            </div>
          </div>
        );

      case 'kamus-cerdas-indo-sunda':
        return (
          <div className="w-full h-full flex flex-col justify-between p-5 bg-[#141413] text-[#f5f4f0] rounded-sm border border-[#2e2d29] font-mono text-[11px] leading-relaxed select-text">
            <div className="flex items-center justify-between pb-3 border-b border-[#2e2d29] text-[#9c9890]">
              <span className="text-[#f5f4f0] font-medium tracking-wide">
                SPEC // ARCH-05
              </span>
              <span>FASTAPI &amp; DEPLOYMENT</span>
            </div>

            <div className="my-4 space-y-3">
              <div className="text-[#9c9890] text-[10px] uppercase tracking-wider">
                Endpoint Specification &amp; Search
              </div>
              <div className="p-2.5 bg-[#1c1c1a] border border-[#2e2d29] rounded-sm space-y-1.5 text-[11px]">
                <div className="text-[#e5e2dc]">
                  GET /v1/lexicon/search?q=&#123;query&#125;&amp;lang=&#123;id|su&#125;
                </div>
                <div className="text-[#9c9890]">
                  Algorithm: Bi-directional morphological substring &amp; fuzzy indexing
                </div>
              </div>

              <div className="space-y-1 text-[11px]">
                <div className="text-[#9c9890] text-[10px] uppercase tracking-wider">
                  Automated DevOps Pipeline
                </div>
                <div className="text-[#e5e2dc] pl-2 border-l border-[#2e2d29] space-y-0.5">
                  <div>GitHub Actions &rarr; Docker build &rarr; Nginx reverse proxy</div>
                  <div>Automated Android APK artifact build &amp; signing</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#2e2d29] flex items-center justify-between text-[#9c9890] text-[10px]">
              <span>Linux VPS Deployment</span>
              <span className="text-[#f5f4f0]">Google Play Console Live</span>
            </div>
          </div>
        );

      case 'library-of-focus':
      default:
        return (
          <div className="w-full h-full flex flex-col justify-between p-5 bg-[#141413] text-[#f5f4f0] rounded-sm border border-[#2e2d29] font-mono text-[11px] leading-relaxed select-text">
            <div className="flex items-center justify-between pb-3 border-b border-[#2e2d29] text-[#9c9890]">
              <span className="text-[#f5f4f0] font-medium tracking-wide">
                SPEC // ARCH-06
              </span>
              <span>CANVAS TELEMETRY ENGINE</span>
            </div>

            <div className="my-4 space-y-3">
              <div className="text-[#9c9890] text-[10px] uppercase tracking-wider">
                Experimental Measurement Loop
              </div>
              <div className="p-2.5 bg-[#1c1c1a] border border-[#2e2d29] rounded-sm space-y-1.5 text-[11px]">
                <div className="text-[#e5e2dc]">
                  HTML5 Canvas 60Hz RequestAnimationFrame Render Loop
                </div>
                <div className="text-[#9c9890]">
                  Deterministic collision detection &bull; Zero GC allocation spikes
                </div>
              </div>

              <div className="space-y-1 text-[11px]">
                <div className="text-[#9c9890] text-[10px] uppercase tracking-wider">
                  Telemetry Dataset Capture
                </div>
                <div className="text-[#e5e2dc] pl-2 border-l border-[#2e2d29] space-y-0.5">
                  <div>[timestamp_ms, path_deviation_vector, latency, error_count]</div>
                  <div>Direct structured CSV/JSON telemetry export for psychologists</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#2e2d29] flex items-center justify-between text-[#9c9890] text-[10px]">
              <span>Faculty of Psychology</span>
              <span className="text-[#f5f4f0]">Exhibition Demonstrated</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-[280px] sm:h-[310px] flex items-center justify-center">
      {renderSpecificationPlate()}
    </div>
  );
}
