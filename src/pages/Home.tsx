import React from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Mail,
  MapPin,
  FileText
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
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <div className="relative overflow-hidden selection:bg-[#e7e5e4] selection:text-[#0c0a09]">
      {/* ======================================================== */}
      {/* SECTION 1: HERO (hero-band)                              */}
      {/* ======================================================== */}
      <section
        id="hero"
        aria-label="Introduction"
        className="relative min-h-[85vh] sm:min-h-[88vh] flex flex-col justify-center pt-10 pb-24 px-6 sm:px-8 border-b border-[#e7e5e4] bg-[#f5f5f5]"
      >
        {/* Soft Pastel Atmospheric Gradient Orbs drifting behind hero */}
        <AtmosphericGlow
          color="mint"
          size={520}
          className="-top-24 -left-20 opacity-40"
          animation="drift-1"
        />
        <AtmosphericGlow
          color="lavender"
          size={560}
          className="top-1/4 -right-28 opacity-45"
          animation="drift-2"
        />
        <AtmosphericGlow
          color="peach"
          size={420}
          className="bottom-6 left-1/3 opacity-35"
          animation="drift-1"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto w-full">
          {/* Eyebrow: Location & Academic Fellowship */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-[#777169]">
            <span className="caption-uppercase text-[#0c0a09]">
              Editorial Identity
            </span>
            <span className="text-[#d6d3d1]">•</span>
            <span className="inline-flex items-center gap-1.5 body-sm text-[#777169]">
              <MapPin size={13} className="text-[#0c0a09]" />
              {personalInfo.location}
            </span>
            <span className="text-[#d6d3d1] hidden sm:inline">•</span>
            <span className="body-sm text-[#777169] hidden sm:inline">
              LPDP Scholar
            </span>
          </div>

          {/* Master Headline: Waldenburg Light 300 (display-mega: 64px / 300 / -1.92px) */}
          <div className="max-w-4xl space-y-4 mb-8">
            <h1 className="display-mega text-[#0c0a09]">
              {personalInfo.heroHeadline}
            </h1>
            <p className="display-xl text-[#292524] font-light max-w-3xl leading-[1.12]">
              {personalInfo.heroSubheadline}
            </p>
          </div>

          {/* Concise Editorial Introduction (body-md: 16px / 400 / 0.16px) */}
          <p className="body-md text-[#4e4e4e] max-w-2xl leading-relaxed mb-10 text-[16px] sm:text-[18px]">
            {personalInfo.heroIntro}
          </p>

          {/* Identity & Social Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-12 text-[14px]">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 sm:pr-6 sm:border-r border-[#e7e5e4]">
              <span className="title-sm text-[#0c0a09]">{personalInfo.name}</span>
              <span className="text-[#d6d3d1] hidden sm:inline">—</span>
              <span className="body-md text-[#4e4e4e]">{personalInfo.professionalTitle}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 body-sm text-[#4e4e4e] hover:text-[#0c0a09] transition-colors"
              >
                <GithubIcon size={15} />
                <span>GitHub</span>
                <ArrowUpRight size={13} className="opacity-50" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 body-sm text-[#4e4e4e] hover:text-[#0c0a09] transition-colors"
              >
                <LinkedinIcon size={15} />
                <span>LinkedIn</span>
                <ArrowUpRight size={13} className="opacity-50" />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-1.5 body-sm text-[#4e4e4e] hover:text-[#0c0a09] transition-colors"
              >
                <Mail size={15} />
                <span>{personalInfo.email}</span>
              </a>
            </div>
          </div>

          {/* CTAs: Ink Pill (button-primary) & Outline Pill (button-outline) */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              size="md"
              onClick={() => scrollToSection('projects')}
              icon={<ArrowDown size={15} />}
            >
              Explore My Work
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
            {/* Left: Editorial Narrative & Snapshot (7 cols) */}
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

            {/* Right: Portrait & Compact Professional Snapshot (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              {/* Portrait Composition with 24px radius & soft drop */}
              <div className="relative overflow-hidden rounded-[24px] border border-[#e7e5e4] bg-[#ffffff] p-3 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[18px] bg-[#f5f5f5]">
                  <img
                    src={portraitImg}
                    alt="LM. Irsal Shydiq — Software Engineer and LPDP Scholar in Bandung, Indonesia"
                    className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 pt-4 flex items-center justify-between caption">
                  <span className="font-mono text-[12px]">Fig 1.0 — Portrait</span>
                  <span className="text-[12px]">Bandung, Indonesia</span>
                </div>
              </div>

              {/* Snapshot Cards (rounded.xl = 16px) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {aboutContent.snapshot.map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#ffffff] border border-[#e7e5e4] rounded-[16px] p-4 space-y-1 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
                  >
                    <span className="caption-uppercase text-[#777169] text-[10px] block">
                      {item.label}
                    </span>
                    <h4 className="title-sm text-[#0c0a09]">
                      {item.value}
                    </h4>
                    {item.detail && (
                      <p className="caption text-[#777169] text-[12px]">{item.detail}</p>
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

          <div className="space-y-4">
            {projectsContent.projects.map((project, index) => (
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
