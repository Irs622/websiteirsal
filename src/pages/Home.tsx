import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Mail,
  MapPin,
  FileText,
  Award,
  GraduationCap,
  Sparkles,
  BookOpen
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
import { Surface } from '../components/ui/Surface';
import { SectionHeader } from '../components/ui/SectionHeader';
import { AtmosphericGlow } from '../components/ui/AtmosphericGlow';
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
    { id: 'all', label: 'All Works', count: projectsContent.projects.length },
    { id: 'Accessible Tech', label: 'Accessible Tech', count: projectsContent.projects.filter(p => p.category === 'Accessible Tech').length },
    { id: 'Full-Stack Systems', label: 'Full-Stack Systems', count: projectsContent.projects.filter(p => p.category === 'Full-Stack Systems').length },
    { id: 'AI & Web', label: 'AI & Web', count: projectsContent.projects.filter(p => p.category === 'AI & Web').length },
    { id: 'Applied Research', label: 'Applied Research', count: projectsContent.projects.filter(p => p.category === 'Applied Research').length },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projectsContent.projects
    : projectsContent.projects.filter(p => p.category === selectedCategory);

  return (
    <div className="relative overflow-hidden selection:bg-[#e7e5e4] selection:text-[#0c0a09]">
      {/* ======================================================== */}
      {/* SECTION 1: HERO (hero-band)                              */}
      {/* ======================================================== */}
      <section
        id="hero"
        aria-label="Introduction"
        className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-20 sm:pb-28 px-6 sm:px-8 border-b border-[#e7e5e4] bg-[#f5f5f5]"
      >
        {/* Soft Pastel Atmospheric Gradient Orbs drifting behind hero */}
        <AtmosphericGlow
          color="mint"
          size={580}
          className="-top-24 -left-20 opacity-40"
          animation="drift-1"
        />
        <AtmosphericGlow
          color="lavender"
          size={600}
          className="top-1/4 -right-28 opacity-45"
          animation="drift-2"
        />
        <AtmosphericGlow
          color="peach"
          size={460}
          className="bottom-6 left-1/3 opacity-35"
          animation="drift-1"
        />

        <div className="relative z-10 max-w-[1240px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column (7 cols): Editorial Typography & Direct CTAs */}
            <div className="lg:col-span-7 space-y-7">
              {/* Eyebrow: Location & Academic Fellowship */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-[#777169]">
                <span className="caption-uppercase text-[#0c0a09] font-medium tracking-[0.2em]">
                  EDITORIAL IDENTITY
                </span>
                <span className="text-[#d6d3d1]">•</span>
                <span className="inline-flex items-center gap-1.5 body-sm text-[#777169]">
                  <MapPin size={13} className="text-[#0c0a09]" />
                  {personalInfo.location}
                </span>
                <span className="text-[#d6d3d1]">•</span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase bg-[#16a34a]/10 text-[#16a34a] px-2.5 py-0.5 rounded-full border border-[#16a34a]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
                  Available for 2026 Roles
                </span>
              </div>

              {/* Master Headline: Waldenburg Light 300 (Newsreader Light) */}
              <div className="space-y-4">
                <h1 className="display-mega text-[#0c0a09] tracking-[-1.8px] leading-[1.04]">
                  {personalInfo.heroHeadline}
                </h1>
                <p className="display-lg text-[#292524] font-light max-w-2xl leading-[1.14]">
                  {personalInfo.heroSubheadline}
                </p>
              </div>

              {/* Concise Editorial Introduction */}
              <p className="body-md text-[#4e4e4e] max-w-xl leading-relaxed text-[17px]">
                {personalInfo.heroIntro}
              </p>

              {/* Quick Index Credentials Bar */}
              <div className="p-4 rounded-[16px] bg-[#ffffff] border border-[#e7e5e4] shadow-[0_2px_12px_rgba(0,0,0,0.02)] max-w-xl text-[13px] space-y-1.5">
                <div className="flex items-center justify-between text-[#777169] text-[11px] font-mono uppercase border-b border-[#e7e5e4] pb-1.5">
                  <span>LM. Irsal Shydiq</span>
                  <span className="text-[#0c0a09] font-semibold">LPDP Scholar RI</span>
                </div>
                <div className="flex flex-wrap items-center justify-between pt-0.5 text-[#292524]">
                  <span>Software Engineer Intern @ PT Inpartner Optima Integra</span>
                  <span className="font-mono text-[11px] text-[#777169]">Bandung, ID</span>
                </div>
              </div>

              {/* CTAs: Ink Pill & Outline Pill */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => scrollToSection('projects')}
                  icon={<ArrowDown size={15} />}
                >
                  Explore Selected Works
                </Button>

                <a
                  href={`mailto:${personalInfo.email}?subject=CV%20Request%20%E2%80%94%20LM.%20Irsal%20Shydiq`}
                  className="inline-block"
                >
                  <Button
                    variant="outline"
                    size="md"
                    icon={<FileText size={15} />}
                  >
                    Download CV
                  </Button>
                </a>
              </div>

              {/* Social Channels */}
              <div className="flex flex-wrap items-center gap-5 pt-1 text-[13px] text-[#777169]">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#0c0a09] transition-colors"
                >
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                  <ArrowUpRight size={12} className="opacity-50" />
                </a>
                <span className="text-[#e7e5e4]">•</span>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#0c0a09] transition-colors"
                >
                  <LinkedinIcon size={14} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} className="opacity-50" />
                </a>
                <span className="text-[#e7e5e4]">•</span>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-[#0c0a09] transition-colors"
                >
                  <Mail size={14} />
                  <span>{personalInfo.email}</span>
                </a>
              </div>
            </div>

            {/* Right Column (5 cols): Editorial Portrait & System Plate */}
            <div className="lg:col-span-5 relative">
              <div className="relative overflow-hidden rounded-[24px] border border-[#e7e5e4] bg-[#ffffff] p-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] group transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)]">
                {/* Soft Pastel Radial Glow behind photo */}
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#a7e5d3]/40 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#c8b8e0]/40 blur-2xl pointer-events-none" />

                {/* Portrait Crop */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[#f5f5f5]">
                  <img
                    src={portraitImg}
                    alt="LM. Irsal Shydiq — Software Engineer and LPDP Scholar in Bandung, Indonesia"
                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 object-top"
                    loading="eager"
                  />
                  {/* Subtle live tag on image */}
                  <div className="absolute bottom-3 left-3 bg-[#0c0a09]/80 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-full border border-white/20">
                    Bandung, Indonesia (UTC+7)
                  </div>
                </div>

                {/* Editorial Caption Bar */}
                <div className="pt-3 px-1 flex items-center justify-between text-[12px]">
                  <div>
                    <span className="font-mono text-[11px] text-[#777169] block">
                      Fig. 00 — Portrait
                    </span>
                    <span className="font-medium text-[#0c0a09]">
                      LM. Irsal Shydiq
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#777169] block">
                      Class of 2027
                    </span>
                    <span className="text-[11px] font-mono text-[#0c0a09] font-medium">
                      Informatics Eng.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: ABOUT (01 / ABOUT)                            */}
      {/* ======================================================== */}
      <section
        id="about"
        aria-label="About LM. Irsal Shydiq"
        className="py-24 px-6 sm:px-8 border-b border-[#e7e5e4] bg-[#fafafa]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number={aboutContent.sectionNumber}
            label={aboutContent.sectionTitle}
            headline={aboutContent.headline}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Editorial Narrative & Core Philosophy (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {aboutContent.narrative.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="body-md text-[17px] leading-relaxed text-[#292524]"
                >
                  {paragraph}
                </p>
              ))}

              {/* Core Interests List */}
              <div className="pt-6">
                <span className="caption-uppercase text-[#777169] block mb-3">
                  Research &amp; Engineering Interests
                </span>
                <div className="flex flex-wrap gap-2">
                  {aboutContent.coreInterests.map((interest) => (
                    <Badge key={interest} variant="default" size="md">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Editorial Credentials & Honors Dossier (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Dossier Card 1: Academic & LPDP Honors */}
              <div className="bg-[#ffffff] border border-[#e7e5e4] rounded-[20px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
                <div className="flex items-center justify-between border-b border-[#e7e5e4] pb-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={16} className="text-[#0c0a09]" />
                    <span className="caption-uppercase text-[#0c0a09] font-medium">
                      Academic Foundation
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#777169]">Class of 2027</span>
                </div>
                <div>
                  <h4 className="title-md text-[#0c0a09]">Informatics Engineering</h4>
                  <p className="body-sm text-[#777169] mt-0.5">UIN Sunan Gunung Djati Bandung</p>
                </div>
                <div className="p-3 bg-[#fafafa] rounded-xl border border-[#e7e5e4] flex items-start gap-2.5">
                  <Award size={16} className="text-[#16a34a] shrink-0 mt-0.5" />
                  <div className="text-[12px]">
                    <span className="font-semibold text-[#0c0a09] block">LPDP Scholarship Awardee</span>
                    <span className="text-[#777169]">Ministry of Religious Affairs Indonesia</span>
                  </div>
                </div>
              </div>

              {/* Dossier Card 2: Current Focus & Engineering Philosophy */}
              <div className="bg-[#ffffff] border border-[#e7e5e4] rounded-[20px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-3">
                <div className="flex items-center gap-2 border-b border-[#e7e5e4] pb-3">
                  <Sparkles size={15} className="text-[#0c0a09]" />
                  <span className="caption-uppercase text-[#0c0a09] font-medium">
                    Engineering Creed
                  </span>
                </div>
                <blockquote className="font-serif italic text-[16px] text-[#292524] leading-relaxed">
                  "Engineering is at its best when it solves tangible human problems with quiet elegance, solid systems thinking, and intentional craft."
                </blockquote>
                <div className="pt-2 text-[11px] font-mono text-[#777169] flex items-center justify-between">
                  <span>WCAG 2.2 AAA Focused</span>
                  <span>Full-Stack &amp; AI Systems</span>
                </div>
              </div>

              {/* Quick Stat Tiles */}
              <div className="grid grid-cols-2 gap-3">
                {aboutContent.snapshot.slice(0, 2).map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#ffffff] border border-[#e7e5e4] rounded-[16px] p-4 space-y-1 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
                  >
                    <span className="caption-uppercase text-[#777169] text-[10px] block">
                      {item.label}
                    </span>
                    <h5 className="title-sm text-[#0c0a09]">
                      {item.value}
                    </h5>
                    {item.detail && (
                      <p className="caption text-[#777169] text-[11px]">{item.detail}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: EXPERTISE (02 / EXPERTISE)                    */}
      {/* ======================================================== */}
      <section
        id="expertise"
        aria-label="Technical Expertise"
        className="py-24 px-6 sm:px-8 border-b border-[#e7e5e4] bg-[#f5f5f5]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number={expertiseContent.sectionNumber}
            label={expertiseContent.sectionTitle}
            headline={expertiseContent.headline}
            subheadline={expertiseContent.subheadline}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseContent.categories.map((category, index) => (
              <Surface
                key={category.id}
                variant="card"
                padding="md"
                className="flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="caption-uppercase text-[#777169]">
                      0{index + 1}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e7e5e4] group-hover:bg-[#0c0a09] transition-colors" />
                  </div>

                  <h3 className="display-sm text-[#0c0a09] mb-2">
                    {category.name}
                  </h3>

                  <p className="body-sm text-[#777169] leading-relaxed mb-6">
                    {category.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#e7e5e4]">
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="default" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Surface>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: EXPERIENCE (03 / EXPERIENCE)                  */}
      {/* ======================================================== */}
      <section
        id="experience"
        aria-label="Professional Experience"
        className="py-24 px-6 sm:px-8 border-b border-[#e7e5e4] bg-[#fafafa]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number={experienceContent.sectionNumber}
            label={experienceContent.sectionTitle}
            headline={experienceContent.headline}
            subheadline={experienceContent.subheadline}
          />

          <div className="space-y-6">
            {experienceContent.items.map((item, index) => (
              <div
                key={item.id}
                className="bg-[#ffffff] border border-[#e7e5e4] rounded-[16px] p-6 sm:p-8 hover:border-[#d6d3d1] transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                  {/* Left Column: Organization & Timeline (4 cols) */}
                  <div className="lg:col-span-4 space-y-1">
                    <span className="caption-uppercase text-[#777169] block mb-1">
                      0{index + 1} • {item.type}
                    </span>
                    <h3 className="display-sm text-[#0c0a09]">
                      {item.company}
                    </h3>
                    <p className="body-strong text-[#292524] mt-1">
                      {item.role}
                    </p>
                    <div className="pt-2 body-sm text-[#777169] flex flex-col gap-0.5">
                      <span>{item.period}</span>
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Right Column: Key Responsibilities (8 cols) */}
                  <div className="lg:col-span-8 space-y-4">
                    <span className="caption-uppercase text-[#777169] block">
                      Core Responsibilities &amp; Impact
                    </span>
                    <ul className="space-y-2.5">
                      {item.responsibilities.map((resp, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 body-sm leading-relaxed text-[#4e4e4e]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0c0a09] mt-2 shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    {item.techStack && (
                      <div className="pt-3 flex flex-wrap gap-1.5">
                        {item.techStack.map((tech) => (
                          <Badge key={tech} variant="default" size="sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 5: SELECTED WORK (04 / SELECTED WORK)            */}
      {/* ======================================================== */}
      <section
        id="projects"
        aria-label="Selected Engineering Projects"
        className="py-24 px-6 sm:px-8 border-b border-[#e7e5e4] bg-[#f5f5f5]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number={projectsContent.sectionNumber}
            label={projectsContent.sectionTitle}
            headline={projectsContent.headline}
            subheadline={projectsContent.subheadline}
          />

          {/* Editorial Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-10 pt-2">
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-[13px] px-4 py-1.5 rounded-full transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0c0a09] text-white shadow-sm font-medium'
                    : 'bg-[#ffffff] text-[#4e4e4e] border border-[#e7e5e4] hover:border-[#d6d3d1] hover:text-[#0c0a09]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] font-mono px-1.5 py-0.5 rounded-full ${
                    selectedCategory === cat.id
                      ? 'bg-white/20 text-white'
                      : 'bg-[#f0efed] text-[#777169]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredProjects.map((project, index) => (
              <ProjectShowcase
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 6: RESEARCH & INTERESTS (05 / RESEARCH)          */}
      {/* ======================================================== */}
      <section
        id="research"
        aria-label="Research and Technical Inquiries"
        className="py-24 px-6 sm:px-8 border-b border-[#e7e5e4] bg-[#fafafa]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number={researchContent.sectionNumber}
            label={researchContent.sectionTitle}
            headline={researchContent.headline}
            subheadline={researchContent.subheadline}
          />

          {/* Featured Ongoing Research Direction (rounded.xxl = 24px) */}
          <div className="mb-14 bg-[#ffffff] border border-[#e7e5e4] rounded-[24px] p-8 sm:p-10 shadow-[0_4px_16px_rgba(0,0,0,0.04)] relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="caption-uppercase text-[#777169]">
                Featured Research Direction
              </span>
              <span className="inline-flex items-center text-[12px] text-amber-900 bg-amber-50 border border-amber-200 rounded-full px-3 py-0.5 font-medium">
                {researchContent.featuredDirection.status}
              </span>
            </div>

            <h3 className="display-md text-[#0c0a09] leading-tight mb-4">
              "{researchContent.featuredDirection.title}"
            </h3>

            <p className="body-md text-[#4e4e4e] leading-relaxed mb-6 max-w-4xl">
              {researchContent.featuredDirection.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#e7e5e4]">
              <div>
                <span className="caption-uppercase text-[#0c0a09] block mb-1">
                  Investigation Methodology
                </span>
                <p className="body-sm text-[#4e4e4e] leading-relaxed">
                  {researchContent.featuredDirection.methodology}
                </p>
              </div>
              <div>
                <span className="caption-uppercase text-[#0c0a09] block mb-1">
                  Target Outcomes
                </span>
                <p className="body-sm text-[#4e4e4e] leading-relaxed">
                  {researchContent.featuredDirection.anticipatedOutcomes}
                </p>
              </div>
            </div>

            <div className="pt-6 flex flex-wrap gap-2">
              {researchContent.featuredDirection.keywords.map((kw) => (
                <Badge key={kw} variant="default" size="sm">
                  {kw}
                </Badge>
              ))}
            </div>
          </div>

          {/* Clean Editorial Research List (feature-card: rounded.xl = 16px, p-6) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {researchContent.interests.map((item, idx) => (
              <div
                key={item.topic}
                className="bg-[#ffffff] border border-[#e7e5e4] rounded-[16px] p-6 hover:border-[#d6d3d1] transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="caption-uppercase text-[#777169]">
                    0{idx + 1} • {item.category}
                  </span>
                </div>
                <h4 className="display-sm text-[#0c0a09] mb-2">
                  {item.topic}
                </h4>
                <p className="body-sm text-[#4e4e4e] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 7: LEADERSHIP (06 / LEADERSHIP)                  */}
      {/* ======================================================== */}
      <section
        id="leadership"
        aria-label="Leadership and Community"
        className="py-24 px-6 sm:px-8 border-b border-[#e7e5e4] bg-[#f5f5f5]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number={leadershipContent.sectionNumber}
            label={leadershipContent.sectionTitle}
            headline={leadershipContent.headline}
            subheadline={leadershipContent.subheadline}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leadershipContent.roles.map((role, idx) => (
              <Surface
                key={role.organization}
                variant="card"
                padding="lg"
                className="space-y-6"
              >
                <div>
                  <span className="caption-uppercase text-[#777169] block mb-1">
                    0{idx + 1} • {role.period}
                  </span>
                  <h3 className="display-sm text-[#0c0a09]">
                    {role.organization}
                  </h3>
                  <p className="body-strong text-[#292524] mt-1">
                    {role.role}
                  </p>
                  <p className="caption text-[#777169] mt-0.5">
                    {role.scope}
                  </p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-[#e7e5e4]">
                  <span className="caption-uppercase text-[#777169] block">
                    Strategic Initiatives
                  </span>
                  <ul className="space-y-2">
                    {role.contributions.map((c, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 body-sm leading-relaxed text-[#4e4e4e]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0c0a09] mt-2 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {role.tags.map((tag) => (
                    <Badge key={tag} variant="default" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Surface>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 8: EDUCATION & CERTIFICATIONS                    */}
      {/* ======================================================== */}
      <section
        id="education"
        aria-label="Education and Certifications"
        className="py-24 px-6 sm:px-8 border-b border-[#e7e5e4] bg-[#fafafa]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number={educationContent.sectionNumber}
            label={educationContent.sectionTitle}
            headline={educationContent.headline}
            subheadline={educationContent.subheadline}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Formal University Education (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <span className="caption-uppercase text-[#777169] block">
                Higher Education
              </span>

              <div className="bg-[#ffffff] border border-[#e7e5e4] rounded-[16px] p-6 sm:p-8 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <div>
                  <h3 className="display-sm text-[#0c0a09]">
                    {educationContent.education.institution}
                  </h3>
                  <p className="body-strong text-[#292524] mt-1">
                    {educationContent.education.degree}
                  </p>
                  <p className="body-sm text-[#777169]">
                    {educationContent.education.field}
                  </p>
                </div>

                <div className="py-3 border-t border-b border-[#e7e5e4] grid grid-cols-2 gap-4 text-[13px]">
                  <div>
                    <span className="caption-uppercase block text-[#777169]">Timeline</span>
                    <span className="font-medium text-[#0c0a09]">
                      {educationContent.education.status}
                    </span>
                  </div>
                  <div>
                    <span className="caption-uppercase block text-[#777169]">Grade</span>
                    <span className="font-medium text-[#0c0a09]">
                      GPA: {educationContent.education.gpa}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="caption-uppercase block text-[#777169]">Honor &amp; Fellowship</span>
                  <p className="text-[13px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg p-2.5">
                    {educationContent.education.scholarship}
                  </p>
                </div>

                {educationContent.education.notes && (
                  <p className="caption text-[#777169] leading-relaxed">
                    {educationContent.education.notes}
                  </p>
                )}
              </div>
            </div>

            {/* Verified Certifications Catalog (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <span className="caption-uppercase text-[#777169] block">
                Verified Technical Certifications (2025 – 2026)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {educationContent.certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="bg-[#ffffff] border border-[#e7e5e4] rounded-[16px] p-5 flex flex-col justify-between hover:border-[#d6d3d1] transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
                  >
                    <div>
                      <div className="flex items-center justify-between caption text-[11px] mb-1">
                        <span>{cert.issuer}</span>
                        <span className="font-mono">{cert.year}</span>
                      </div>
                      <h4 className="title-sm text-[#0c0a09] leading-snug">
                        {cert.name}
                      </h4>
                    </div>

                    <p className="caption text-[12px] pt-2 mt-2 border-t border-[#e7e5e4]/60">
                      {cert.credentialFocus}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 9: CONTACT (cta-band)                            */}
      {/* ======================================================== */}
      <section
        id="contact"
        aria-label="Contact and Collaboration"
        className="py-24 px-6 sm:px-8 bg-[#f5f5f5] relative overflow-hidden border-t border-[#e7e5e4]"
      >
        <AtmosphericGlow
          color="rose"
          size={500}
          className="-bottom-20 -right-20 opacity-35"
          animation="drift-1"
        />
        <AtmosphericGlow
          color="mint"
          size={420}
          className="top-10 left-10 opacity-35"
          animation="drift-2"
        />

        <div className="relative z-10 max-w-[900px] mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2">
            <span className="caption-uppercase text-[#777169]">
              07 / CONTACT
            </span>
          </div>

          <h2 className="display-mega text-[#0c0a09] max-w-2xl mx-auto">
            Have something meaningful to build?
          </h2>

          <p className="body-md text-[17px] sm:text-[19px] text-[#4e4e4e] max-w-xl mx-auto leading-relaxed">
            I'm open to engineering opportunities, technical collaborations, and projects that create meaningful impact.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${personalInfo.email}?subject=Project%20Collaboration%20Inquiry%20%E2%80%94%20LM.%20Irsal%20Shydiq`}
              className="inline-block"
            >
              <Button
                variant="primary"
                size="md"
                icon={<ArrowUpRight size={15} />}
              >
                Get in Touch
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
                icon={<LinkedinIcon size={15} />}
              >
                Connect on LinkedIn
              </Button>
            </a>
          </div>

          <div className="pt-8 body-sm text-[#777169]">
            <span>Direct Email: </span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="font-medium text-[#0c0a09] hover:underline"
            >
              {personalInfo.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
