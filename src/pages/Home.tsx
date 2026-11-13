import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowUpRight,
  Mail,
  MapPin,
  FileText,
  Download,
  Award,
  GraduationCap
} from 'lucide-react';
import { personalInfo } from '../data/personal';
import { aboutContent } from '../data/about';
import { expertiseContent } from '../data/skills';
import { experienceContent } from '../data/experience';

import { researchContent } from '../data/research';
import { leadershipContent } from '../data/leadership';
import { EducationRecord } from '../components/EducationRecord';

import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SectionHeader } from '../components/ui/SectionHeader';
import { SelectedWork } from '../components/SelectedWork';
import { ContactSignoff } from '../components/ContactSignoff';
import { ExperienceTimeline } from '../components/ExperienceTimeline';
import { AboutEngineerAnatomy } from '../components/AboutEngineerAnatomy';
import { GithubIcon, LinkedinIcon } from '../components/ui/Icons';

import portraitImg from '../assets/irsal-portrait.png';

export function Home() {


  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', `#${id}`);
    }
  };


  return (
    <div className="relative">
      {/* ======================================================== */}
      {/* SECTION 1: HERO (ART-DIRECTED EDITORIAL MASTHEAD)        */}
      {/* ======================================================== */}
      <section
        id="hero"
        aria-label="Introduction"
        className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 px-6 sm:px-8 border-b border-[#e5e2dc]"
      >
        <div className="max-w-[1200px] mx-auto w-full">
          {/* Top Running Masthead Folio */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 sm:pb-8 mb-8 sm:mb-12 border-b border-[#eeebe6] text-[11px] font-mono text-[#6e6b65] uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="text-[#141413] font-medium">LM. IRSAL SHYDIQ</span>
              <span className="text-[#d0ccc3]">&bull;</span>
              <span className="inline-flex items-center gap-1">
                <MapPin size={11} className="text-[#141413]" />
                Bandung, Indonesia (UTC+7)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a2b]" />
              <span className="text-[#1e3a2b]">Available for engineering roles &bull; 2026</span>
            </div>
          </div>

          {/* Main Asymmetric Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column (8 cols): Large Monumental Headline & Narrative */}
            <div className="lg:col-span-8 space-y-6">
              {/* Master Headline: EB Garamond with controlled line breaks */}
              <h1 className="display-mega text-[#141413] tracking-[-0.025em]">
                Building technology<br className="hidden sm:inline" /> with purpose.
              </h1>

              {/* Supporting Editorial Statement */}
              <p className="text-[19px] sm:text-[22px] font-display italic text-[#242321] max-w-2xl leading-snug">
                Software engineer working across web architectures, native systems, and accessible computing interfaces.
              </p>

              {/* Human-Crafted Context Paragraph */}
              <p className="text-[15px] sm:text-[16px] text-[#44423e] max-w-2xl leading-relaxed text-justify">
                Informatics Engineering student at UIN Sunan Gunung Djati Bandung and LPDP Scholar. Currently interning as a Software Engineer at PT Inpartner Optima Integra, focusing on resilient web applications and assistive technology.
              </p>

              {/* Typographic Metadata Coordinates (Open, no clunky boxes) */}
              <div className="pt-2 border-t border-[#eeebe6] flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[12px] text-[#6e6b65]">
                <span className="text-[#141413] font-medium">UIN Sunan Gunung Djati Bandung '27</span>
                <span className="text-[#d0ccc3]">&bull;</span>
                <span>LPDP Scholar Kemenag RI</span>
                <span className="text-[#d0ccc3]">&bull;</span>
                <span>Software Engineer Intern @ Inpartner</span>
              </div>

              {/* Direct Actions & Channels */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => scrollToSection('projects')}
                  icon={<ArrowDown size={14} />}
                >
                  Explore Selected Work
                </Button>

                <Link to="/cv" className="inline-block">
                  <Button
                    variant="outline"
                    size="md"
                    icon={<FileText size={14} />}
                  >
                    Curriculum Vitae
                  </Button>
                </Link>

                <a
                  href="/cv-irsal-shydiq.pdf"
                  download="LM_Irsal_Shydiq_CV.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-mono text-[#6e6b65] hover:text-[#141413] border border-[#e5e2dc] rounded-sm bg-white hover:bg-[#f5f4f0] transition-colors"
                  title="Download Official CV (PDF)"
                >
                  <Download size={13} />
                  <span>PDF</span>
                </a>
              </div>

              {/* Direct Channel Coordinates */}
              <div className="flex flex-wrap items-center gap-4 pt-1 text-[13px] font-mono text-[#6e6b65]">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#141413] transition-colors"
                >
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                  <ArrowUpRight size={11} className="opacity-40" />
                </a>
                <span className="text-[#d0ccc3]">&bull;</span>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#141413] transition-colors"
                >
                  <LinkedinIcon size={14} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={11} className="opacity-40" />
                </a>
                <span className="text-[#d0ccc3]">&bull;</span>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-[#141413] transition-colors"
                >
                  <Mail size={13} />
                  <span>{personalInfo.email}</span>
                </a>
              </div>
            </div>

            {/* Right Column (4 cols): Art-Directed Monochrome Editorial Portrait */}
            <div className="lg:col-span-4 pt-2">
              <div className="border border-[#e5e2dc] bg-[#ffffff] p-2.5 rounded-sm max-w-sm">
                <div className="aspect-[3/4] overflow-hidden bg-[#eeebe6] rounded-xs">
                  <img
                    src={portraitImg}
                    alt="LM. Irsal Shydiq — Software Engineer and LPDP Scholar in Bandung, Indonesia"
                    className="w-full h-full object-cover object-top filter grayscale contrast-[1.08] brightness-[0.98]"
                    loading="eager"
                  />
                </div>
                <div className="pt-2.5 px-1 flex items-center justify-between text-[11px] font-mono text-[#6e6b65] border-t border-[#eeebe6] mt-2">
                  <span className="text-[#141413] font-medium">LM. Irsal Shydiq</span>
                  <span>Bandung, West Java &bull; '27</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: ABOUT (EDITORIAL BIOGRAPHY & ACADEMIC DOSSIER) */}
      {/* ======================================================== */}
      <section
        id="about"
        aria-label="About LM. Irsal Shydiq"
        className="py-14 sm:py-16 px-6 sm:px-8 border-b border-[#e5e2dc]"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Section Header, Guiding Thesis & Editorial Narrative (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2 text-[11px] font-mono text-[#6e6b65] tracking-wider uppercase">
                  <span className="text-[#141413] font-medium">01</span>
                  <span className="text-[#d0ccc3]">&bull;</span>
                  <span>{aboutContent.sectionTitle}</span>
                </div>
                <h2 className="display-lg text-[#141413] tracking-[-0.01em]">
                  {aboutContent.headline}
                </h2>
              </div>

              <blockquote className="text-[17px] sm:text-[18.5px] font-display italic text-[#141413] border-l-2 border-[#141413] pl-4 py-0.5 leading-snug">
                "{personalInfo.brandStatement}"
              </blockquote>

              <div className="space-y-3">
                {aboutContent.narrative.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-[15px] leading-[1.65] text-[#44423e] text-justify"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Right: Isometric Anatomy Rig (6 cols) */}
            <div className="lg:col-span-6">
              <AboutEngineerAnatomy />
            </div>
          </div>

          {/* Full-Width Single-Row Dossier Bar spanning Left to Right */}
          <div className="mt-8 pt-6 border-t border-[#e5e2dc] grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {aboutContent.snapshot.map((item) => (
              <div key={item.label} className="space-y-0.5">
                <span className="caption-uppercase text-[10px] text-[#9c9890] block">
                  {item.label}
                </span>
                <span className="font-medium text-[#141413] text-[14px] block">
                  {item.value}
                </span>
                <span className="caption text-[#6e6b65] text-[12px] block">
                  {item.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: EXPERTISE (STRUCTURED TYPOGRAPHIC LIST)       */}
      {/* ======================================================== */}
      <section
        id="expertise"
        aria-label="Technical Expertise"
        className="py-20 sm:py-24 px-6 sm:px-8 border-b border-[#e5e2dc]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number="02"
            label={expertiseContent.sectionTitle}
            headline={expertiseContent.headline}
            subheadline={expertiseContent.subheadline}
          />

          {/* Open Editorial Technical Ledger (Structured Typographic List) */}
          <div className="border-t border-[#e5e2dc] divide-y divide-[#e5e2dc]">
            {expertiseContent.categories.map((category, idx) => (
              <div
                key={category.id}
                className="py-8 sm:py-9 grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
              >
                <div className="md:col-span-1 font-mono text-[12px] text-[#9c9890]">
                  0{idx + 1}
                </div>

                <div className="md:col-span-4 space-y-1">
                  <h3 className="font-display text-[22px] sm:text-[24px] text-[#141413] leading-snug">
                    {category.name}
                  </h3>
                  <p className="text-[13px] text-[#6e6b65] leading-relaxed max-w-sm">
                    {category.tagline}
                  </p>
                </div>

                <div className="md:col-span-7 pt-1 md:pt-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 w-full md:max-w-[340px] md:ml-auto">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-[9px] sm:text-[9.5px] px-1.5 py-0.5 bg-[#ffffff] border border-[#e5e2dc] rounded-xs text-[#242321] text-center flex items-center justify-center"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: EXPERIENCE (REFINED CHRONOLOGICAL LAYOUT)     */}
      {/* ======================================================== */}
      <section
        id="experience"
        aria-label="Professional Experience"
        className="py-20 sm:py-24 px-6 sm:px-8 border-b border-[#e5e2dc]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number="03"
            label={experienceContent.sectionTitle}
            headline={experienceContent.headline}
            subheadline={experienceContent.subheadline}
          />

          {/* Interactive Scroll-Driven Chronological Engineering Timeline */}
          <ExperienceTimeline items={experienceContent.items} />
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 5: SELECTED WORK (CURATED BODY OF WORK)           */}
      {/* ======================================================== */}
      <section
        id="projects"
        aria-label="Selected Engineering Projects"
        className="py-20 sm:py-24 px-6 sm:px-8 border-b border-[#e5e2dc]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SelectedWork />
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 6: RESEARCH (ACADEMIC MONOGRAPH LAYOUT)           */}
      {/* ======================================================== */}
      <section
        id="research"
        aria-label="Research and Technical Inquiries"
        className="py-20 sm:py-24 px-6 sm:px-8 border-b border-[#e5e2dc]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number="05"
            label={researchContent.sectionTitle}
            headline={researchContent.headline}
            subheadline={researchContent.subheadline}
          />

          {/* Featured Academic Pre-Print Plate */}
          <div className="mb-14 border border-[#e5e2dc] bg-[#ffffff] p-6 sm:p-10 rounded-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#eeebe6] font-mono text-[11px]">
              <span className="caption-uppercase text-[#6e6b65]">
                Active Research Investigation &bull; Monograph Abstract
              </span>
              <span className="text-[#1e3a2b] bg-[#1e3a2b]/5 px-2 py-0.5 rounded-sm border border-[#1e3a2b]/20">
                {researchContent.featuredDirection.status}
              </span>
            </div>

            <h3 className="display-md text-[#141413] leading-snug">
              "{researchContent.featuredDirection.title}"
            </h3>

            <p className="text-[16px] text-[#44423e] leading-relaxed max-w-4xl">
              {researchContent.featuredDirection.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#eeebe6]">
              <div>
                <span className="caption-uppercase block mb-1 text-[#141413]">
                  Empirical Methodology
                </span>
                <p className="text-[14px] text-[#44423e] leading-relaxed">
                  {researchContent.featuredDirection.methodology}
                </p>
              </div>
              <div>
                <span className="caption-uppercase block mb-1 text-[#141413]">
                  Target Findings &amp; Outcomes
                </span>
                <p className="text-[14px] text-[#44423e] leading-relaxed">
                  {researchContent.featuredDirection.anticipatedOutcomes}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#eeebe6] flex flex-wrap gap-1.5">
              {researchContent.featuredDirection.keywords.map((kw) => (
                <Badge key={kw} variant="mono" size="sm">
                  {kw}
                </Badge>
              ))}
            </div>
          </div>

          {/* Secondary Areas of Inquiry */}
          <div className="border-t border-[#e5e2dc] divide-y divide-[#eeebe6]">
            {researchContent.interests.map((item) => (
              <div
                key={item.topic}
                className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline"
              >
                <div className="md:col-span-4 space-y-0.5">
                  <h4 className="title-sm text-[#141413]">
                    {item.topic}
                  </h4>
                  <span className="caption text-[11px] font-mono text-[#6e6b65] block">
                    {item.category}
                  </span>
                </div>
                <div className="md:col-span-8">
                  <p className="text-[14px] text-[#44423e] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 7: EDUCATION & CREDENTIALS                       */}
      {/* ======================================================== */}
      <EducationRecord />

      {/* ======================================================== */}
      {/* SECTION 8: LEADERSHIP (COMPACT EDITORIAL ENTRIES)        */}
      {/* ======================================================== */}
      <section
        id="leadership"
        aria-label="Leadership and Community"
        className="py-20 sm:py-24 px-6 sm:px-8 border-b border-[#e5e2dc]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number="07"
            label={leadershipContent.sectionTitle}
            headline={leadershipContent.headline}
            subheadline={leadershipContent.subheadline}
          />

          <div className="border-t border-[#e5e2dc] divide-y divide-[#eeebe6]">
            {leadershipContent.roles.map((role) => (
              <div
                key={role.organization}
                className="py-8 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <h3 className="display-sm text-[#141413]">
                      {role.organization}
                    </h3>
                    <p className="body-strong text-[#242321] mt-0.5">
                      {role.role}
                    </p>
                    <p className="caption text-[#6e6b65] text-[12px] mt-0.5">
                      {role.scope}
                    </p>
                  </div>
                  <span className="font-mono text-[12px] text-[#6e6b65]">
                    {role.period}
                  </span>
                </div>

                <ul className="space-y-1.5 max-w-3xl pt-1">
                  {role.contributions.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[#44423e]"
                    >
                      <span className="text-[#9c9890] font-mono text-[11px] select-none mt-0.5">
                        &bull;
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {role.tags.map((tag) => (
                    <Badge key={tag} variant="mono" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 9: CONTACT (STRONG CLOSING COMPOSITION)          */}
      {/* ======================================================== */}
      <ContactSignoff />
    </div>
  );
}
