import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../data/projects';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { GithubIcon } from './ui/Icons';

interface ProjectShowcaseProps {
  project: ProjectItem;
  index: number;
}

export function ProjectShowcase({ project, index }: ProjectShowcaseProps) {
  // =========================================================================
  // COMPOSITION 1: Lead Accessibility Case Study (DengarBain)
  // Full-width editorial plate with visual a11y & audio sync architectural plate
  // =========================================================================
  if (project.slug === 'dengarbain') {
    return (
      <article
        id={project.slug}
        className="py-12 sm:py-16 border-b border-[#e5e2dc]"
        aria-labelledby={`project-title-${project.id}`}
      >
        {/* Running Meta Folio */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-2.5 border-b border-[#eeebe6] text-[12px] font-mono text-[#6e6b65]">
          <div className="flex items-center gap-2.5">
            <span className="text-[#141413] font-medium">01</span>
            <span className="text-[#d0ccc3]">&bull;</span>
            <span>FEATURED CASE STUDY &bull; ACCESSIBLE COMPUTING</span>
            <span className="text-[#d0ccc3]">&bull;</span>
            <span>2026</span>
          </div>
          <span className="text-[#1e3a2b] bg-[#1e3a2b]/5 px-2 py-0.5 rounded-sm border border-[#1e3a2b]/20 text-[11px]">
            WCAG 2.2 AAA Verified (7.2:1 Contrast)
          </span>
        </div>

        <div className="space-y-8">
          {/* Main Title & Editorial Summary */}
          <div className="max-w-3xl space-y-3">
            <h3
              id={`project-title-${project.id}`}
              className="display-xl text-[#141413] tracking-[-0.02em]"
            >
              {project.title} — {project.subtitle}
            </h3>
            <p className="text-[17px] sm:text-[18px] text-[#44423e] leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Authentic Architectural Specimen Plate: Accessibility & Audio Pipeline */}
          <div className="border border-[#e5e2dc] bg-[#ffffff] p-6 sm:p-8 rounded-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eeebe6] pb-3 text-[11px] font-mono text-[#6e6b65]">
              <span className="uppercase tracking-wider text-[#141413] font-medium">
                System Schematic: Dual-Stream Audio &amp; a11y DOM State Engine
              </span>
              <span>Client-Side PWA Architecture</span>
            </div>

            {/* Specimen Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-[12px]">
              {/* Channel 1: High-Contrast Specimen */}
              <div className="p-4 bg-[#fbfbf9] border border-[#e5e2dc] rounded-xs space-y-3">
                <span className="text-[10px] uppercase text-[#9c9890] block">
                  01 / Photopic Contrast Model
                </span>
                <div className="p-3 bg-[#141413] text-[#fbfbf9] rounded-xs space-y-1">
                  <div className="text-[13px] font-medium">7.2:1 Luminance Ratio</div>
                  <div className="text-[10px] text-[#d0ccc3]">Deep Ink on Warm Canvas</div>
                </div>
                <p className="text-[11px] text-[#6e6b65] leading-relaxed font-sans">
                  Exceeds the 7.0:1 threshold mandated by WCAG 2.2 AAA for enhanced readability under low-vision conditions.
                </p>
              </div>

              {/* Channel 2: Audio Sync */}
              <div className="p-4 bg-[#fbfbf9] border border-[#e5e2dc] rounded-xs space-y-3">
                <span className="text-[10px] uppercase text-[#9c9890] block">
                  02 / Web Audio API Synchronization
                </span>
                <div className="p-3 bg-[#ffffff] border border-[#e5e2dc] rounded-xs space-y-1.5 text-[11px] text-[#141413]">
                  <div className="flex justify-between items-center">
                    <span>Recitation Buffer</span>
                    <span className="text-[#1e3a2b]">44.1kHz / 16-bit</span>
                  </div>
                  <div className="h-[2px] bg-[#eeebe6] rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-[#141413]" />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-[#6e6b65]">
                    <span>Scrub Latency</span>
                    <span className="text-[#141413] font-medium">&lt; 15ms</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#6e6b65] leading-relaxed font-sans">
                  Zero-drift dual-channel playback maintaining exact phrase alignment between Arabic audio and Indonesian voiceover.
                </p>
              </div>

              {/* Channel 3: Screen-Reader DOM */}
              <div className="p-4 bg-[#fbfbf9] border border-[#e5e2dc] rounded-xs space-y-3">
                <span className="text-[10px] uppercase text-[#9c9890] block">
                  03 / ARIA Live Regions &amp; Focus
                </span>
                <div className="p-3 bg-[#ffffff] border border-[#e5e2dc] rounded-xs space-y-1 text-[11px] text-[#141413]">
                  <div className="text-[10px] text-[#9c9890]">aria-live="polite"</div>
                  <div className="text-[11px] font-medium">Deterministic Landmarks</div>
                  <div className="text-[10px] text-[#1e3a2b]">Focus Trap &amp; 48px Hit Targets</div>
                </div>
                <p className="text-[11px] text-[#6e6b65] leading-relaxed font-sans">
                  Audited with NVDA and TalkBack screen-readers for semantic navigation and non-visual cognitive clarity.
                </p>
              </div>
            </div>

            {/* Key Engineering Details */}
            <div className="pt-4 border-t border-[#eeebe6] grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className="caption-uppercase block mb-1.5 text-[#141413]">
                  The Usability Dilemma
                </span>
                <p className="text-[14px] text-[#44423e] leading-relaxed">
                  {project.problem}
                </p>
              </div>
              <div>
                <span className="caption-uppercase block mb-1.5 text-[#141413]">
                  Architectural Solution
                </span>
                <p className="text-[14px] text-[#44423e] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          </div>

          {/* Actions & Meta */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {project.techStack.map((t) => (
                <Badge key={t} variant="mono" size="sm">{t}</Badge>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link to={`/projects/${project.slug}`}>
                <Button variant="primary" size="sm" icon={<ArrowRight size={13} />}>
                  Read Case Study
                </Button>
              </Link>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="sm" icon={<GithubIcon size={13} />}>
                    Source Repository
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  // =========================================================================
  // COMPOSITION 2: Academic Publication & Spatial Graphics (AR Hijaiyah)
  // Asymmetric two-column composition with academic citation dossier
  // =========================================================================
  if (project.slug === 'ar-hijaiyah') {
    return (
      <article
        id={project.slug}
        className="py-12 sm:py-16 border-b border-[#e5e2dc]"
        aria-labelledby={`project-title-${project.id}`}
      >
        {/* Running Meta Folio */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-2.5 border-b border-[#eeebe6] text-[12px] font-mono text-[#6e6b65]">
          <div className="flex items-center gap-2.5">
            <span className="text-[#141413] font-medium">02</span>
            <span className="text-[#d0ccc3]">&bull;</span>
            <span>PEER-REVIEWED PUBLICATION &bull; APPLIED AI &amp; WEBGL</span>
            <span className="text-[#d0ccc3]">&bull;</span>
            <span>2026</span>
          </div>
          <span className="text-[#1e3a2b] bg-[#1e3a2b]/5 px-2 py-0.5 rounded-sm border border-[#1e3a2b]/20 text-[11px]">
            {project.achievement}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (7 cols): Research Narrative & Graphic Mechanics */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h3
                id={`project-title-${project.id}`}
                className="display-xl text-[#141413] tracking-[-0.02em]"
              >
                {project.title} — {project.subtitle}
              </h3>
              <p className="text-[17px] text-[#44423e] leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div className="space-y-4 pt-2 text-[14px]">
              <div className="border-l-2 border-[#141413] pl-4 py-1 space-y-1">
                <span className="caption-uppercase block text-[#141413]">Research Problem</span>
                <p className="text-[#44423e] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="border-l-2 border-[#141413] pl-4 py-1 space-y-1">
                <span className="caption-uppercase block text-[#141413]">Graphics &amp; Speech Implementation</span>
                <p className="text-[#44423e] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-1.5">
              {project.techStack.map((t) => (
                <Badge key={t} variant="mono" size="sm">{t}</Badge>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Link to={`/projects/${project.slug}`}>
                <Button variant="primary" size="sm" icon={<ArrowRight size={13} />}>
                  Read Research Case Study
                </Button>
              </Link>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="sm" icon={<GithubIcon size={13} />}>
                    Source Code
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Right Column (5 cols): Academic Citation & Performance Registry Plate */}
          <div className="lg:col-span-5 bg-[#ffffff] border border-[#e5e2dc] p-6 rounded-sm space-y-4 font-mono text-[12px]">
            <span className="caption-uppercase block text-[#9c9890] text-[10px]">
              Official Academic Registry
            </span>

            <div className="text-[14px] text-[#141413] font-medium leading-snug">
              Artificial: Jurnal Informatika dan Sistem Informasi
            </div>

            <div className="text-[11px] text-[#6e6b65] space-y-1.5 border-t border-[#eeebe6] pt-3">
              <div><strong className="text-[#141413]">Issuing Body:</strong> Informatics Engineering Department</div>
              <div><strong className="text-[#141413]">Affiliation:</strong> UIN Sunan Gunung Djati Bandung</div>
              <div><strong className="text-[#141413]">Status:</strong> Peer Review Accepted &bull; 2026 Volume</div>
            </div>

            <div className="border-t border-[#eeebe6] pt-3 text-[11px] text-[#44423e] space-y-2">
              <span className="caption-uppercase block text-[#9c9890] text-[10px]">
                Graphics &amp; Acoustic Benchmarks
              </span>
              <div className="flex justify-between py-1 border-b border-[#eeebe6]">
                <span className="text-[#6e6b65]">Mobile WebGL Frame Budget:</span>
                <span className="text-[#141413] font-medium">Sustained 60 FPS</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#eeebe6]">
                <span className="text-[#6e6b65]">glTF Mesh Polygon Count:</span>
                <span className="text-[#141413] font-medium">&lt; 2,400 vertices / glyph</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#6e6b65]">Phonetic Confidence Level:</span>
                <span className="text-[#1e3a2b] font-medium">&tau; &ge; 0.85 evaluation</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // =========================================================================
  // COMPOSITION 3: Systems Architecture & Enterprise (Fatayat NU Central Registry)
  // Structured systems architecture overview across 47 district branches
  // =========================================================================
  if (project.slug === 'fatayat-nu-management') {
    return (
      <article
        id={project.slug}
        className="py-12 sm:py-16 border-b border-[#e5e2dc]"
        aria-labelledby={`project-title-${project.id}`}
      >
        {/* Running Meta Folio */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-2.5 border-b border-[#eeebe6] text-[12px] font-mono text-[#6e6b65]">
          <div className="flex items-center gap-2.5">
            <span className="text-[#141413] font-medium">03</span>
            <span className="text-[#d0ccc3]">&bull;</span>
            <span>SYSTEMS ARCHITECTURE &bull; FULL-STACK PLATFORM</span>
            <span className="text-[#d0ccc3]">&bull;</span>
            <span>2026</span>
          </div>
          <span className="text-[#141413] font-mono text-[11px]">
            Active across 47 District Branches
          </span>
        </div>

        <div className="space-y-8">
          <div className="max-w-3xl space-y-3">
            <h3
              id={`project-title-${project.id}`}
              className="display-xl text-[#141413] tracking-[-0.02em]"
            >
              {project.title} — {project.subtitle}
            </h3>
            <p className="text-[17px] text-[#44423e] leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Relational Systems & RBAC Topology Plate */}
          <div className="p-6 sm:p-8 bg-[#ffffff] border border-[#e5e2dc] rounded-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eeebe6] pb-3 text-[11px] font-mono text-[#6e6b65]">
              <span className="uppercase tracking-wider text-[#141413] font-medium">
                Architecture Topology: Multi-Tier Regional Hierarchy
              </span>
              <span>47 District Branches &bull; Sukabumi Regency</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-[12px]">
              <div className="p-4 bg-[#fbfbf9] border border-[#e5e2dc] rounded-xs space-y-2">
                <span className="text-[10px] uppercase text-[#9c9890] block">01 / Relational Normalization</span>
                <div className="font-medium text-[#141413] text-[13px]">3NF Relational Model</div>
                <p className="text-[11px] text-[#6e6b65] font-sans leading-relaxed">
                  Hierarchical schema eliminating redundant member records across central, district, and sub-branch jurisdictions.
                </p>
              </div>

              <div className="p-4 bg-[#fbfbf9] border border-[#e5e2dc] rounded-xs space-y-2">
                <span className="text-[10px] uppercase text-[#9c9890] block">02 / Auth &amp; Policy Gates</span>
                <div className="font-medium text-[#141413] text-[13px]">Laravel Sanctum + RBAC</div>
                <p className="text-[11px] text-[#6e6b65] font-sans leading-relaxed">
                  Scoped bearer tokens and server-side policy gates ensuring district administrators only mutate local datasets.
                </p>
              </div>

              <div className="p-4 bg-[#fbfbf9] border border-[#e5e2dc] rounded-xs space-y-2">
                <span className="text-[10px] uppercase text-[#9c9890] block">03 / Ingestion Engine</span>
                <div className="font-medium text-[#141413] text-[13px]">Chunked Batch Streaming</div>
                <p className="text-[11px] text-[#6e6b65] font-sans leading-relaxed">
                  Stream processor parsing 500 records per transaction with atomic rollback guarantees on invalid fields.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#eeebe6] grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className="caption-uppercase block mb-1 text-[#141413]">
                  Operational Problem
                </span>
                <p className="text-[14px] text-[#44423e] leading-relaxed">
                  {project.problem}
                </p>
              </div>
              <div>
                <span className="caption-uppercase block mb-1 text-[#141413]">
                  Engineering Solution
                </span>
                <p className="text-[14px] text-[#44423e] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {project.techStack.map((t) => (
                <Badge key={t} variant="mono" size="sm">{t}</Badge>
              ))}
            </div>

            <Link to={`/projects/${project.slug}`}>
              <Button variant="primary" size="sm" icon={<ArrowRight size={13} />}>
                Read Systems Case Study
              </Button>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // =========================================================================
  // COMPOSITION 4: Additional Projects (4, 5, 6, 7)
  // Clean, rhythmic, open technical systems register (no repetitive boxes)
  // =========================================================================
  return (
    <article
      id={project.slug}
      className="py-8 sm:py-10 border-b border-[#e5e2dc] last:border-b-0"
      aria-labelledby={`project-title-${project.id}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
        {/* Left Column: Number & Metadata (3 cols) */}
        <div className="lg:col-span-3 space-y-1">
          <div className="flex items-center gap-2 font-mono text-[12px] text-[#6e6b65]">
            <span className="text-[#141413] font-medium">0{index + 1}</span>
            <span>&bull;</span>
            <span>{project.year}</span>
          </div>
          <div className="font-mono text-[11px] text-[#9c9890] uppercase tracking-wider">
            {project.category}
          </div>
          {project.achievement && (
            <div className="text-[11px] text-[#1e3a2b] font-mono pt-1">
              {project.achievement}
            </div>
          )}
        </div>

        {/* Middle Column: Title & Narrative (6 cols) */}
        <div className="lg:col-span-6 space-y-2">
          <h4
            id={`project-title-${project.id}`}
            className="font-display text-[22px] sm:text-[25px] text-[#141413] leading-snug"
          >
            {project.title}
          </h4>
          <p className="text-[13px] text-[#6e6b65]">
            {project.subtitle} &bull; {project.role}
          </p>
          <p className="text-[14px] text-[#44423e] leading-relaxed pt-1">
            {project.summary}
          </p>

          <div className="pt-2 flex flex-wrap gap-1.5">
            {project.techStack.map((t) => (
              <span key={t} className="font-mono text-[11px] px-2 py-0.5 bg-[#f5f4f0] text-[#6e6b65] border border-[#e5e2dc] rounded-xs">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Actions (3 cols) */}
        <div className="lg:col-span-3 flex lg:flex-col lg:items-end justify-start gap-2 pt-2 lg:pt-0">
          <Link to={`/projects/${project.slug}`}>
            <Button variant="primary" size="sm" icon={<ArrowRight size={12} />}>
              Case Study
            </Button>
          </Link>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="sm" icon={<GithubIcon size={12} />}>
                Source
              </Button>
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" icon={<ExternalLink size={12} />}>
                Live Demo
              </Button>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
