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
    <div className="relative overflow-hidden selection:bg-[#E7E5E4] selection:text-[#0C0A09]">
      {/* ======================================================== */}
      {/* SECTION 1: HERO                                          */}
      {/* ======================================================== */}
      <section
        id="hero"
        aria-label="Introduction"
        className="relative min-h-[88vh] sm:min-h-[92vh] flex flex-col justify-center pt-8 pb-20 px-6 sm:px-8 border-b border-[#E7E5E4]"
      >
        {/* Subtle Pastel Atmospheric Gradient Glows in Background */}
        <AtmosphericGlow
          color="mint"
          size={520}
          className="-top-20 -left-24 opacity-35"
          animation="drift-1"
        />
        <AtmosphericGlow
          color="lavender"
          size={560}
          className="top-1/4 -right-32 opacity-40"
          animation="drift-2"
        />
        <AtmosphericGlow
          color="peach"
          size={420}
          className="bottom-10 left-1/3 opacity-30"
          animation="drift-1"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto w-full">
          {/* Top Editorial Eyebrow */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-[#777169]">
            <span className="label-editorial text-[#0C0A09] font-medium tracking-[0.16em]">
              Editorial Identity
            </span>
            <span className="text-[#D6D3D1]">•</span>
            <span className="inline-flex items-center gap-1.5 text-[13px]">
              <MapPin size={13} className="text-[#0C0A09]" />
              {personalInfo.location}
            </span>
            <span className="text-[#D6D3D1] hidden sm:inline">•</span>
            <span className="text-[13px] text-[#777169] hidden sm:inline">
              LPDP Scholar
            </span>
          </div>

          {/* Master Headline (EB Garamond Light 300) */}
          <div className="max-w-4xl space-y-4 mb-8">
            <h1 className="display-hero text-[#0C0A09]">
              {personalInfo.heroHeadline}
            </h1>
            <p className="display-secondary text-[#292524] font-light max-w-3xl leading-[1.18]">
              {personalInfo.heroSubheadline}
            </p>
          </div>

          {/* Concise Editorial Introduction */}
          <p className="body-editorial text-[17px] sm:text-[19px] text-[#4E4E4E] max-w-2xl leading-relaxed mb-10">
            {personalInfo.heroIntro}
          </p>

          {/* Identity & Social Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-12 text-[14px]">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 sm:pr-6 sm:border-r border-[#E7E5E4]">
              <span className="font-medium text-[#0C0A09] text-[15px]">{personalInfo.name}</span>
              <span className="text-[#D6D3D1] hidden sm:inline">—</span>
              <span className="text-[#4E4E4E] font-normal">{personalInfo.professionalTitle}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#4E4E4E] hover:text-[#0C0A09] transition-colors"
              >
                <GithubIcon size={15} />
                <span>GitHub</span>
                <ArrowUpRight size={13} className="opacity-50" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#4E4E4E] hover:text-[#0C0A09] transition-colors"
              >
                <LinkedinIcon size={15} />
                <span>LinkedIn</span>
                <ArrowUpRight size={13} className="opacity-50" />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-1.5 text-[#4E4E4E] hover:text-[#0C0A09] transition-colors"
              >
                <Mail size={15} />
                <span>{personalInfo.email}</span>
              </a>
            </div>
          </div>

          {/* Primary & Secondary Call to Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              size="lg"
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
                variant="secondary"
                size="lg"
                icon={<FileText size={15} />}
              >
                Download CV
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: ABOUT                                         */}
      {/* ======================================================== */}
      <section
        id="about"
        aria-label="About LM. Irsal Shydiq"
        className="py-20 sm:py-28 px-6 sm:px-8 border-b border-[#E7E5E4] bg-[#FAFAFA]"
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
                  className="body-editorial text-[17px] leading-relaxed text-[#292524]"
                >
                  {paragraph}
                </p>
              ))}

              {/* Core Interests List */}
              <div className="pt-6">
                <span className="label-editorial text-[#777169] block mb-3">
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
              {/* Portrait Composition */}
              <div className="relative overflow-hidden rounded-[24px] border border-[#E7E5E4] bg-[#FFFFFF] p-3 shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[18px] bg-[#F5F5F5]">
                  <img
                    src={portraitImg}
                    alt="LM. Irsal Shydiq — Software Engineer and LPDP Scholar in Bandung, Indonesia"
                    className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 pt-4 flex items-center justify-between text-[12px] text-[#777169]">
                  <span className="font-mono">Fig 1.0 — Portrait</span>
                  <span>Bandung, Indonesia</span>
                </div>
              </div>

              {/* Snapshot Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {aboutContent.snapshot.map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[16px] p-4 space-y-1"
                  >
                    <span className="label-editorial text-[#777169] text-[10px] block">
                      {item.label}
                    </span>
                    <h4 className="text-[14px] font-medium text-[#0C0A09]">
                      {item.value}
                    </h4>
                    {item.detail && (
                      <p className="text-[12px] text-[#777169]">{item.detail}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: EXPERTISE                                     */}
      {/* ======================================================== */}
      <section
        id="expertise"
        aria-label="Technical Expertise"
        className="py-20 sm:py-28 px-6 sm:px-8 border-b border-[#E7E5E4] bg-[#F5F5F5]"
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
                className="flex flex-col justify-between hover:border-[#D6D3D1] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="label-editorial text-[#777169]">
                      0{index + 1}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E7E5E4] group-hover:bg-[#0C0A09] transition-colors" />
                  </div>

                  <h3 className="font-display text-[24px] font-light text-[#0C0A09] mb-2">
                    {category.name}
                  </h3>

                  <p className="text-[14px] text-[#777169] leading-relaxed mb-6">
                    {category.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E7E5E4]">
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="neutral" size="sm">
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
      {/* SECTION 4: EXPERIENCE                                    */}
      {/* ======================================================== */}
      <section
        id="experience"
        aria-label="Professional Experience"
        className="py-20 sm:py-28 px-6 sm:px-8 border-b border-[#E7E5E4] bg-[#FAFAFA]"
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
                className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[20px] p-6 sm:p-8 hover:border-[#D6D3D1] transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                  {/* Left Column: Organization & Timeline (4 cols) */}
                  <div className="lg:col-span-4 space-y-1">
                    <span className="label-editorial text-[#777169] block mb-1">
                      0{index + 1} • {item.type}
                    </span>
                    <h3 className="font-display text-[24px] font-light text-[#0C0A09]">
                      {item.company}
                    </h3>
                    <p className="text-[15px] font-medium text-[#292524]">
                      {item.role}
                    </p>
                    <div className="pt-2 text-[13px] text-[#777169] flex flex-col gap-0.5">
                      <span>{item.period}</span>
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Right Column: Key Responsibilities (8 cols) */}
                  <div className="lg:col-span-8 space-y-4">
                    <span className="label-editorial text-[#777169] block">
                      Core Responsibilities &amp; Impact
                    </span>
                    <ul className="space-y-2.5">
                      {item.responsibilities.map((resp, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[14px] leading-relaxed text-[#4E4E4E]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0C0A09] mt-2 shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    {item.techStack && (
                      <div className="pt-3 flex flex-wrap gap-1.5">
                        {item.techStack.map((tech) => (
                          <Badge key={tech} variant="neutral" size="sm">
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
      {/* SECTION 5: SELECTED WORK                                 */}
      {/* ======================================================== */}
      <section
        id="projects"
        aria-label="Selected Engineering Projects"
        className="py-20 sm:py-28 px-6 sm:px-8 border-b border-[#E7E5E4] bg-[#F5F5F5]"
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
      {/* SECTION 6: RESEARCH & INTERESTS                          */}
      {/* ======================================================== */}
      <section
        id="research"
        aria-label="Research and Technical Inquiries"
        className="py-20 sm:py-28 px-6 sm:px-8 border-b border-[#E7E5E4] bg-[#FAFAFA]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number={researchContent.sectionNumber}
            label={researchContent.sectionTitle}
            headline={researchContent.headline}
            subheadline={researchContent.subheadline}
          />

          {/* Featured Ongoing Research Direction */}
          <div className="mb-14 bg-[#FFFFFF] border border-[#E7E5E4] rounded-[24px] p-8 sm:p-10 shadow-[0_2px_16px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="label-editorial text-[#777169]">
                Featured Research Direction
              </span>
              <span className="inline-flex items-center text-[12px] text-amber-900 bg-amber-50 border border-amber-200 rounded-full px-3 py-0.5">
                {researchContent.featuredDirection.status}
              </span>
            </div>

            <h3 className="font-display text-[28px] sm:text-[34px] font-light text-[#0C0A09] leading-tight mb-4">
              "{researchContent.featuredDirection.title}"
            </h3>

            <p className="body-editorial text-[16px] text-[#4E4E4E] leading-relaxed mb-6 max-w-4xl">
              {researchContent.featuredDirection.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E7E5E4]">
              <div>
                <span className="label-editorial text-[#0C0A09] block mb-1">
                  Investigation Methodology
                </span>
                <p className="text-[14px] text-[#4E4E4E] leading-relaxed">
                  {researchContent.featuredDirection.methodology}
                </p>
              </div>
              <div>
                <span className="label-editorial text-[#0C0A09] block mb-1">
                  Target Outcomes
                </span>
                <p className="text-[14px] text-[#4E4E4E] leading-relaxed">
                  {researchContent.featuredDirection.anticipatedOutcomes}
                </p>
              </div>
            </div>

            <div className="pt-6 flex flex-wrap gap-2">
              {researchContent.featuredDirection.keywords.map((kw) => (
                <Badge key={kw} variant="neutral" size="sm">
                  {kw}
                </Badge>
              ))}
            </div>
          </div>

          {/* Clean Editorial Research List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {researchContent.interests.map((item, idx) => (
              <div
                key={item.topic}
                className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[18px] p-5 sm:p-6 hover:border-[#D6D3D1] transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="label-editorial text-[#777169]">
                    0{idx + 1} • {item.category}
                  </span>
                </div>
                <h4 className="font-display text-[22px] font-light text-[#0C0A09] mb-2">
                  {item.topic}
                </h4>
                <p className="text-[14px] text-[#4E4E4E] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 7: LEADERSHIP                                    */}
      {/* ======================================================== */}
      <section
        id="leadership"
        aria-label="Leadership and Community"
        className="py-20 sm:py-28 px-6 sm:px-8 border-b border-[#E7E5E4] bg-[#F5F5F5]"
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
                padding="md"
                className="space-y-6"
              >
                <div>
                  <span className="label-editorial text-[#777169] block mb-1">
                    0{idx + 1} • {role.period}
                  </span>
                  <h3 className="font-display text-[24px] font-light text-[#0C0A09]">
                    {role.organization}
                  </h3>
                  <p className="text-[15px] font-medium text-[#292524] mt-1">
                    {role.role}
                  </p>
                  <p className="text-[13px] text-[#777169] mt-0.5">
                    {role.scope}
                  </p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-[#E7E5E4]">
                  <span className="label-editorial text-[#777169] block">
                    Strategic Initiatives
                  </span>
                  <ul className="space-y-2">
                    {role.contributions.map((c, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[#4E4E4E]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0C0A09] mt-2 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {role.tags.map((tag) => (
                    <Badge key={tag} variant="neutral" size="sm">
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
        className="py-20 sm:py-28 px-6 sm:px-8 border-b border-[#E7E5E4] bg-[#FAFAFA]"
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
              <span className="label-editorial text-[#777169] block">
                Higher Education
              </span>

              <div className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[20px] p-6 sm:p-8 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <div>
                  <h3 className="font-display text-[26px] font-light text-[#0C0A09]">
                    {educationContent.education.institution}
                  </h3>
                  <p className="text-[16px] font-medium text-[#292524] mt-1">
                    {educationContent.education.degree}
                  </p>
                  <p className="text-[14px] text-[#777169]">
                    {educationContent.education.field}
                  </p>
                </div>

                <div className="py-3 border-t border-b border-[#E7E5E4] grid grid-cols-2 gap-4 text-[13px]">
                  <div>
                    <span className="label-editorial block text-[#777169]">Timeline</span>
                    <span className="font-medium text-[#0C0A09]">
                      {educationContent.education.status}
                    </span>
                  </div>
                  <div>
                    <span className="label-editorial block text-[#777169]">Grade</span>
                    <span className="font-medium text-[#0C0A09]">
                      GPA: {educationContent.education.gpa}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="label-editorial block text-[#777169]">Honor &amp; Fellowship</span>
                  <p className="text-[13px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg p-2.5">
                    {educationContent.education.scholarship}
                  </p>
                </div>

                {educationContent.education.notes && (
                  <p className="text-[13px] text-[#777169] leading-relaxed">
                    {educationContent.education.notes}
                  </p>
                )}
              </div>
            </div>

            {/* Verified Certifications Catalog (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <span className="label-editorial text-[#777169] block">
                Verified Technical Certifications (2025 – 2026)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {educationContent.certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="bg-[#FFFFFF] border border-[#E7E5E4] rounded-[16px] p-4 flex flex-col justify-between hover:border-[#D6D3D1] transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#777169] mb-1">
                        <span>{cert.issuer}</span>
                        <span className="font-mono">{cert.year}</span>
                      </div>
                      <h4 className="text-[14px] font-medium text-[#0C0A09] leading-snug">
                        {cert.name}
                      </h4>
                    </div>

                    <p className="text-[12px] text-[#777169] pt-2 mt-2 border-t border-[#E7E5E4]/60">
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
      {/* SECTION 9: CONTACT                                       */}
      {/* ======================================================== */}
      <section
        id="contact"
        aria-label="Contact and Collaboration"
        className="py-24 sm:py-32 px-6 sm:px-8 bg-[#F5F5F5] relative overflow-hidden"
      >
        <AtmosphericGlow
          color="rose"
          size={500}
          className="-bottom-20 -right-20 opacity-30"
          animation="drift-1"
        />
        <AtmosphericGlow
          color="mint"
          size={420}
          className="top-10 left-10 opacity-30"
          animation="drift-2"
        />

        <div className="relative z-10 max-w-[900px] mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2">
            <span className="label-editorial text-[#777169] tracking-[0.16em]">
              07 / CONTACT
            </span>
          </div>

          <h2 className="display-hero text-[#0C0A09] max-w-2xl mx-auto">
            Have something meaningful to build?
          </h2>

          <p className="body-editorial text-[18px] sm:text-[20px] text-[#4E4E4E] max-w-xl mx-auto leading-relaxed">
            I'm open to engineering opportunities, technical collaborations, and projects that create meaningful impact.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${personalInfo.email}?subject=Project%20Collaboration%20Inquiry%20%E2%80%94%20LM.%20Irsal%20Shydiq`}
              className="inline-block"
            >
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowUpRight size={16} />}
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
                size="lg"
                icon={<LinkedinIcon size={16} />}
              >
                Connect on LinkedIn
              </Button>
            </a>
          </div>

          <div className="pt-8 text-[14px] text-[#777169]">
            <span>Direct Email: </span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="font-medium text-[#0C0A09] hover:underline"
            >
              {personalInfo.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
