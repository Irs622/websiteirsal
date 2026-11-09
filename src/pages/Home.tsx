import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Mail,
  MapPin,
  FileText,
  Award,
  GraduationCap
} from 'lucide-react';
import { personalInfo } from '../data/personal';
import { aboutContent } from '../data/about';
import { expertiseContent } from '../data/skills';
import { experienceContent } from '../data/experience';
import { projectsContent } from '../data/projects';
import { researchContent } from '../data/research';
import { leadershipContent } from '../data/leadership';
import { educationContent } from '../data/education';

import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ProjectShowcase } from '../components/ProjectShowcase';
import { GithubIcon, LinkedinIcon } from '../components/ui/Icons';

import portraitImg from '../assets/irsal-portrait.png';

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', `#${id}`);
    }
  };

  const projectCategories = [
    { id: 'all', label: 'All Work', count: projectsContent.projects.length },
    { id: 'Accessible Tech', label: 'Accessible Tech', count: projectsContent.projects.filter(p => p.category === 'Accessible Tech').length },
    { id: 'Full-Stack Systems', label: 'Full-Stack Systems', count: projectsContent.projects.filter(p => p.category === 'Full-Stack Systems').length },
    { id: 'AI & Web', label: 'AI & Web', count: projectsContent.projects.filter(p => p.category === 'AI & Web').length },
    { id: 'Mobile & Native', label: 'Mobile & Native', count: projectsContent.projects.filter(p => p.category === 'Mobile & Native').length },
    { id: 'Applied Research', label: 'Applied Research', count: projectsContent.projects.filter(p => p.category === 'Applied Research').length },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projectsContent.projects
    : projectsContent.projects.filter(p => p.category === selectedCategory);

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
              <p className="text-[15px] sm:text-[16px] text-[#44423e] max-w-xl leading-relaxed">
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

                <a
                  href={`mailto:${personalInfo.email}?subject=Collaboration%20Inquiry%20%E2%80%94%20LM.%20Irsal%20Shydiq`}
                  className="inline-block"
                >
                  <Button
                    variant="outline"
                    size="md"
                    icon={<FileText size={14} />}
                  >
                    Request CV
                  </Button>
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
        className="py-20 sm:py-24 px-6 sm:px-8 border-b border-[#e5e2dc]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number="01"
            label={aboutContent.sectionTitle}
            headline={aboutContent.headline}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Editorial Narrative & Guiding Thesis (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <blockquote className="display-md italic text-[#141413] border-l-2 border-[#141413] pl-5 py-1 leading-snug">
                "{personalInfo.brandStatement}"
              </blockquote>

              <div className="space-y-4 pt-2">
                {aboutContent.narrative.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-[16px] leading-[1.75] text-[#44423e]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Research & Technical Interests */}
              <div className="pt-4 border-t border-[#eeebe6]">
                <span className="caption-uppercase block mb-2.5 text-[#141413]">
                  Core Engineering &amp; Research Focus
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {aboutContent.coreInterests.map((interest) => (
                    <Badge key={interest} variant="mono" size="md">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Open Academic & Professional Dossier Margin (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border-t border-[#e5e2dc] divide-y divide-[#eeebe6]">
                <div className="py-4 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#6e6b65]">
                    <span className="text-[#141413] font-medium flex items-center gap-1.5">
                      <GraduationCap size={14} />
                      Academic Base
                    </span>
                    <span>Class of 2027</span>
                  </div>
                  <h4 className="title-sm text-[#141413]">Informatics Engineering</h4>
                  <p className="caption text-[#6e6b65]">
                    UIN Sunan Gunung Djati Bandung &bull; Cumulative GPA: 3.30 / 4.00
                  </p>
                </div>

                <div className="py-4 space-y-1">
                  <span className="caption-uppercase text-[10px] text-[#9c9890] block">Fellowship</span>
                  <div className="flex items-center gap-2 text-[13px] font-medium text-[#1e3a2b]">
                    <Award size={15} />
                    <span>LPDP Scholarship Awardee</span>
                  </div>
                  <p className="caption text-[#6e6b65] text-[12px]">Ministry of Religious Affairs (Kemenag RI)</p>
                </div>

                <div className="py-4 space-y-1">
                  <span className="caption-uppercase text-[10px] text-[#9c9890] block">Current Production Role</span>
                  <span className="font-medium text-[#141413] text-[14px] block">Software Engineer Intern</span>
                  <span className="caption text-[#6e6b65] text-[12px] block">PT Inpartner Optima Integra &bull; Jakarta / Hybrid</span>
                </div>

                <div className="py-4 space-y-1">
                  <span className="caption-uppercase text-[10px] text-[#9c9890] block">Prior Production Role</span>
                  <span className="font-medium text-[#141413] text-[14px] block">Full Stack Developer Intern</span>
                  <span className="caption text-[#6e6b65] text-[12px] block">WALHI Jawa Barat &bull; Laravel, Docker, Linux VPS</span>
                </div>

                <div className="py-4 space-y-1">
                  <span className="caption-uppercase text-[10px] text-[#9c9890] block">Engineering Focus</span>
                  <span className="text-[13px] text-[#44423e] block">Full-Stack Web, Native Android, Accessible Systems (WCAG 2.2 AAA)</span>
                  <span className="caption text-[#6e6b65] text-[11px] font-mono block">Bandung, West Java, Indonesia &bull; UTC+7</span>
                </div>
              </div>
            </div>
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
                className="py-8 sm:py-9 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline"
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

                <div className="md:col-span-7 flex flex-wrap gap-2 pt-1 md:pt-0">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[12px] px-2.5 py-1 bg-[#ffffff] border border-[#e5e2dc] rounded-xs text-[#242321]"
                    >
                      {skill}
                    </span>
                  ))}
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

          {/* Open Chronological Engineering Timeline */}
          <div className="border-t border-[#e5e2dc] divide-y divide-[#e5e2dc]">
            {experienceContent.items.map((item) => (
              <div
                key={item.id}
                className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10"
              >
                {/* Left Column: Timeline & Location (3 cols) */}
                <div className="md:col-span-3 space-y-1">
                  <div className="font-mono text-[12px] text-[#141413] font-medium">
                    {item.period}
                  </div>
                  <div className="font-mono text-[11px] text-[#6e6b65]">
                    {item.location}
                  </div>
                  <div className="pt-2 text-[11px] font-mono uppercase tracking-wider text-[#1e3a2b]">
                    {item.type}
                  </div>
                </div>

                {/* Right Column: Organization, Role & Impact (9 cols) */}
                <div className="md:col-span-9 space-y-4">
                  <div>
                    <h3 className="font-display text-[24px] sm:text-[28px] text-[#141413] leading-snug">
                      {item.company}
                    </h3>
                    <div className="text-[15px] font-medium text-[#44423e] mt-0.5">
                      {item.role}
                    </div>
                  </div>

                  <ul className="space-y-2 max-w-3xl">
                    {item.responsibilities.map((resp, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-[15px] leading-relaxed text-[#44423e]"
                      >
                        <span className="font-mono text-[11px] text-[#9c9890] select-none mt-1">
                          —
                        </span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {item.techStack && (
                    <div className="pt-3 flex flex-wrap gap-1.5 border-t border-[#eeebe6]">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[11px] px-2 py-0.5 bg-[#f5f4f0] text-[#6e6b65] border border-[#e5e2dc] rounded-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
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
          <SectionHeader
            number="04"
            label={projectsContent.sectionTitle}
            headline={projectsContent.headline}
            subheadline={projectsContent.subheadline}
          />

          {/* Editorial Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-[#e5e2dc]">
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-[12px] font-mono px-3 py-1.5 rounded-xs transition-colors cursor-pointer flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-[#141413] text-white font-medium'
                    : 'bg-[#ffffff] text-[#6e6b65] border border-[#e5e2dc] hover:text-[#141413]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1 rounded-xs ${
                    selectedCategory === cat.id
                      ? 'bg-white/20 text-white'
                      : 'bg-[#eeebe6] text-[#6e6b65]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredProjects.map((project, index) => (
              <React.Fragment key={project.id}>
                {selectedCategory === 'all' && index === 3 && (
                  <div className="pt-12 pb-4 flex items-center gap-4">
                    <span className="caption-uppercase text-[#9c9890] tracking-wider">
                      TECHNICAL ARCHIVE &bull; PRODUCTION RELEASES (2024 — 2025)
                    </span>
                    <div className="h-[1px] flex-1 bg-[#e5e2dc]" />
                  </div>
                )}
                <ProjectShowcase
                  project={project}
                  index={index}
                />
              </React.Fragment>
            ))}
          </div>
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
      <section
        id="education"
        aria-label="Education and Certifications"
        className="py-20 sm:py-24 px-6 sm:px-8 border-b border-[#e5e2dc]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number="06"
            label={educationContent.sectionTitle}
            headline={educationContent.headline}
            subheadline={educationContent.subheadline}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* University Education (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <span className="caption-uppercase block text-[#6e6b65]">
                University Education
              </span>

              <div className="bg-[#ffffff] border border-[#e5e2dc] rounded-sm p-6 space-y-4">
                <div>
                  <h3 className="display-sm text-[#141413]">
                    {educationContent.education.institution}
                  </h3>
                  <p className="body-strong text-[#242321] mt-1">
                    {educationContent.education.degree}
                  </p>
                  <p className="caption text-[#6e6b65]">
                    {educationContent.education.field}
                  </p>
                </div>

                <div className="py-3 border-t border-b border-[#eeebe6] grid grid-cols-2 gap-4 text-[13px] font-mono">
                  <div>
                    <span className="caption-uppercase block text-[#9c9890] text-[10px]">Timeline</span>
                    <span className="text-[#141413]">
                      {educationContent.education.status}
                    </span>
                  </div>
                  <div>
                    <span className="caption-uppercase block text-[#9c9890] text-[10px]">GPA</span>
                    <span className="text-[#141413]">
                      {educationContent.education.gpa}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="caption-uppercase block text-[#9c9890] text-[10px]">Fellowship</span>
                  <p className="text-[12px] text-[#1e3a2b] bg-[#1e3a2b]/5 border border-[#1e3a2b]/20 rounded-sm p-2 font-mono">
                    {educationContent.education.scholarship}
                  </p>
                </div>

                {educationContent.education.notes && (
                  <p className="caption text-[#6e6b65] leading-relaxed text-[12px]">
                    {educationContent.education.notes}
                  </p>
                )}
              </div>
            </div>

            {/* Verified Certifications Catalog (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <span className="caption-uppercase block text-[#6e6b65]">
                Verified Technical Credentials (2025 – 2026)
              </span>

              <div className="border border-[#e5e2dc] bg-[#ffffff] rounded-sm divide-y divide-[#eeebe6]">
                {educationContent.certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="p-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 hover:bg-[#fbfbf9] transition-colors"
                  >
                    <div>
                      <h4 className="title-sm text-[#141413] text-[15px]">
                        {cert.name}
                      </h4>
                      <p className="caption text-[12px] text-[#6e6b65]">
                        {cert.credentialFocus}
                      </p>
                    </div>

                    <div className="text-left sm:text-right font-mono text-[11px] text-[#6e6b65] shrink-0">
                      <span>{cert.issuer} &bull; {cert.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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
      <section
        id="contact"
        aria-label="Contact and Collaboration"
        className="py-24 sm:py-32 px-6 sm:px-8"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-4xl space-y-6">
            <span className="caption-uppercase text-[#6e6b65] block">
              08 &bull; INQUIRIES &amp; DISPATCH
            </span>

            <h2 className="display-mega text-[#141413] tracking-[-0.025em]">
              Initiate dialogue or engineering inquiry.
            </h2>

            <p className="text-[18px] sm:text-[20px] text-[#44423e] max-w-2xl leading-relaxed">
              I am currently open to software engineering internships, technical collaborations, and research inquiries across full-stack systems and accessible technology.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${personalInfo.email}?subject=Project%20Inquiry%20%E2%80%94%20LM.%20Irsal%20Shydiq`}
                className="inline-block"
              >
                <Button
                  variant="primary"
                  size="md"
                  icon={<ArrowUpRight size={14} />}
                >
                  Send Direct Email
                </Button>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  variant="outline"
                  size="md"
                  icon={<LinkedinIcon size={14} />}
                >
                  LinkedIn Profile
                </Button>
              </a>

              <div className="pl-0 sm:pl-4 font-mono text-[13px] text-[#6e6b65]">
                <span>{personalInfo.email}</span>
                <span className="mx-2 text-[#d0ccc3]">&bull;</span>
                <span>Bandung, Indonesia (UTC+7)</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
