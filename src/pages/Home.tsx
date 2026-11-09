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
    { id: 'all', label: 'All Projects', count: projectsContent.projects.length },
    { id: 'Accessible Tech', label: 'Accessible Tech', count: projectsContent.projects.filter(p => p.category === 'Accessible Tech').length },
    { id: 'Full-Stack Systems', label: 'Full-Stack Systems', count: projectsContent.projects.filter(p => p.category === 'Full-Stack Systems').length },
    { id: 'AI & Web', label: 'AI & Web', count: projectsContent.projects.filter(p => p.category === 'AI & Web').length },
    { id: 'Applied Research', label: 'Applied Research', count: projectsContent.projects.filter(p => p.category === 'Applied Research').length },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projectsContent.projects
    : projectsContent.projects.filter(p => p.category === selectedCategory);

  return (
    <div className="relative">
      {/* ======================================================== */}
      {/* SECTION 1: HERO                                          */}
      {/* ======================================================== */}
      <section
        id="hero"
        aria-label="Introduction"
        className="relative pt-16 sm:pt-24 pb-16 sm:pb-24 px-6 sm:px-8 border-b border-[#e5e2dc]"
      >
        <div className="max-w-[1200px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column (7 cols): Editorial Typography & Direct CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow: Status & Location */}
              <div className="flex flex-wrap items-center gap-3 text-[#6e6b65] text-[13px] font-mono">
                <span className="text-[#141413] font-medium">
                  PORTFOLIO JOURNAL
                </span>
                <span className="text-[#d0ccc3]">&bull;</span>
                <span className="inline-flex items-center gap-1.5 text-[#6e6b65]">
                  <MapPin size={12} className="text-[#141413]" />
                  {personalInfo.location}
                </span>
                <span className="text-[#d0ccc3]">&bull;</span>
                <span className="text-[#1e3a2b] bg-[#1e3a2b]/5 px-2 py-0.5 rounded-sm border border-[#1e3a2b]/20 text-[11px]">
                  Available for 2026 Roles
                </span>
              </div>

              {/* Master Headline: EB Garamond Light Display */}
              <div className="space-y-3">
                <h1 className="display-mega text-[#141413]">
                  {personalInfo.heroHeadline}
                </h1>
                <p className="display-md text-[#44423e] max-w-xl">
                  {personalInfo.heroSubheadline}
                </p>
              </div>

              {/* Grounded Editorial Introduction */}
              <p className="body-md text-[#44423e] max-w-xl text-[16px] leading-relaxed">
                {personalInfo.heroIntro}
              </p>

              {/* Credentials Ledger */}
              <div className="p-4 bg-[#f5f4f0] border border-[#e5e2dc] rounded-sm max-w-xl text-[13px] font-mono space-y-2">
                <div className="flex items-center justify-between text-[#6e6b65] text-[11px] uppercase border-b border-[#e5e2dc] pb-1.5">
                  <span>LM. Irsal Shydiq</span>
                  <span className="text-[#141413] font-medium">LPDP Scholar &bull; Kemenag RI</span>
                </div>
                <div className="flex flex-wrap items-center justify-between pt-0.5 text-[#242321]">
                  <span>Software Engineer Intern @ PT Inpartner Optima Integra</span>
                  <span className="text-[#6e6b65]">UIN SGD Bandung '27</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => scrollToSection('projects')}
                  icon={<ArrowDown size={14} />}
                >
                  Selected Work
                </Button>

                <a
                  href={`mailto:${personalInfo.email}?subject=CV%20Request%20%E2%80%94%20LM.%20Irsal%20Shydiq`}
                  className="inline-block"
                >
                  <Button
                    variant="secondary"
                    size="md"
                    icon={<FileText size={14} />}
                  >
                    Request CV
                  </Button>
                </a>
              </div>

              {/* Direct Channels */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-[13px] font-mono text-[#6e6b65]">
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

            {/* Right Column (5 cols): Editorial Portrait */}
            <div className="lg:col-span-5">
              <div className="border border-[#e5e2dc] bg-[#ffffff] p-2.5 rounded-sm">
                <div className="aspect-[4/5] overflow-hidden bg-[#f5f4f0] rounded-xs">
                  <img
                    src={portraitImg}
                    alt="LM. Irsal Shydiq — Software Engineer and LPDP Scholar in Bandung, Indonesia"
                    className="w-full h-full object-cover object-top filter grayscale-[10%]"
                    loading="eager"
                  />
                </div>
                <div className="pt-3 px-1 flex items-center justify-between text-[11px] font-mono text-[#6e6b65] border-t border-[#eeebe6] mt-2.5">
                  <div>
                    <span className="text-[#9c9890] block">Fig. 01 — Portrait</span>
                    <span className="text-[#141413] font-medium">LM. Irsal Shydiq</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#9c9890] block">Informatics Eng.</span>
                    <span className="text-[#141413]">Class of 2027</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: ABOUT                                         */}
      {/* ======================================================== */}
      <section
        id="about"
        aria-label="About LM. Irsal Shydiq"
        className="py-20 sm:py-24 px-6 sm:px-8 border-b border-[#e5e2dc] bg-[#fbfbf9]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number={aboutContent.sectionNumber}
            label={aboutContent.sectionTitle}
            headline={aboutContent.headline}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Editorial Narrative (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {aboutContent.narrative.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="body-md text-[16px] leading-relaxed text-[#44423e]"
                >
                  {paragraph}
                </p>
              ))}

              <div className="pt-4 border-t border-[#e5e2dc]">
                <blockquote className="display-sm italic text-[#141413] pl-4 border-l border-[#141413] py-1">
                  "{personalInfo.brandStatement}"
                </blockquote>
              </div>

              {/* Research & Technical Interests */}
              <div className="pt-4">
                <span className="caption-uppercase block mb-2.5">
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

            {/* Right: Academic & Institutional Dossier (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="border border-[#e5e2dc] bg-[#ffffff] p-5 sm:p-6 rounded-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#eeebe6] pb-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={15} className="text-[#141413]" />
                    <span className="caption-uppercase text-[#141413] font-medium">
                      Academic Base
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#6e6b65]">Class of 2027</span>
                </div>
                <div>
                  <h4 className="title-sm text-[#141413]">Informatics Engineering</h4>
                  <p className="caption text-[#6e6b65] mt-0.5">UIN Sunan Gunung Djati Bandung &bull; GPA: 3.30 / 4.00</p>
                </div>
                <div className="p-3 bg-[#f5f4f0] rounded-sm border border-[#e5e2dc] flex items-start gap-2.5">
                  <Award size={15} className="text-[#1e3a2b] shrink-0 mt-0.5" />
                  <div className="text-[12px]">
                    <span className="font-medium text-[#141413] block">LPDP Scholarship Awardee</span>
                    <span className="text-[#6e6b65]">Ministry of Religious Affairs (Kemenag RI)</span>
                  </div>
                </div>
              </div>

              {/* Quick Snapshot Table */}
              <div className="border border-[#e5e2dc] bg-[#ffffff] rounded-sm divide-y divide-[#eeebe6] text-[13px]">
                {aboutContent.snapshot.map((item) => (
                  <div key={item.label} className="p-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="caption-uppercase text-[10px] text-[#6e6b65] sm:w-1/3">
                      {item.label}
                    </span>
                    <div className="sm:w-2/3">
                      <span className="font-medium text-[#141413] block">{item.value}</span>
                      {item.detail && (
                        <span className="text-[#6e6b65] text-[12px] block">{item.detail}</span>
                      )}
                    </div>
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
        className="py-20 sm:py-24 px-6 sm:px-8 border-b border-[#e5e2dc] bg-[#f5f4f0]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number={expertiseContent.sectionNumber}
            label={expertiseContent.sectionTitle}
            headline={expertiseContent.headline}
            subheadline={expertiseContent.subheadline}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expertiseContent.categories.map((category, index) => (
              <div
                key={category.id}
                className="bg-[#ffffff] border border-[#e5e2dc] rounded-sm p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#eeebe6] text-[11px] font-mono text-[#6e6b65]">
                    <span>DOM-0{index + 1}</span>
                    <span>ENGINEERING DOMAIN</span>
                  </div>

                  <h3 className="display-sm text-[#141413] mb-1.5">
                    {category.name}
                  </h3>

                  <p className="body-sm text-[#6e6b65] leading-relaxed mb-5">
                    {category.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#eeebe6]">
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="mono" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
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
        className="py-20 sm:py-24 px-6 sm:px-8 border-b border-[#e5e2dc] bg-[#fbfbf9]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number={experienceContent.sectionNumber}
            label={experienceContent.sectionTitle}
            headline={experienceContent.headline}
            subheadline={experienceContent.subheadline}
          />

          <div className="border border-[#e5e2dc] bg-[#ffffff] rounded-sm divide-y divide-[#e5e2dc]">
            {experienceContent.items.map((item, index) => (
              <div
                key={item.id}
                className="p-6 sm:p-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                  {/* Left Column: Organization & Timeline (4 cols) */}
                  <div className="lg:col-span-4 space-y-1">
                    <span className="caption-uppercase text-[#6e6b65] block mb-1">
                      LOG-0{index + 1} &bull; {item.type}
                    </span>
                    <h3 className="display-sm text-[#141413]">
                      {item.company}
                    </h3>
                    <p className="body-strong text-[#242321] mt-1 text-[15px]">
                      {item.role}
                    </p>
                    <div className="pt-2 font-mono text-[12px] text-[#6e6b65] space-y-0.5">
                      <div>{item.period}</div>
                      <div>{item.location}</div>
                    </div>
                  </div>

                  {/* Right Column: Responsibilities & Impact (8 cols) */}
                  <div className="lg:col-span-8 space-y-4">
                    <span className="caption-uppercase text-[#6e6b65] block">
                      Core Responsibilities &amp; Impact
                    </span>
                    <ul className="space-y-2">
                      {item.responsibilities.map((resp, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 body-sm leading-relaxed text-[#44423e]"
                        >
                          <span className="text-[#9c9890] font-mono text-[11px] select-none mt-0.5">
                            &bull;
                          </span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    {item.techStack && (
                      <div className="pt-3 border-t border-[#eeebe6] flex flex-wrap gap-1.5">
                        {item.techStack.map((tech) => (
                          <Badge key={tech} variant="mono" size="sm">
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
        className="py-20 sm:py-24 px-6 sm:px-8 border-b border-[#e5e2dc] bg-[#f5f4f0]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number={projectsContent.sectionNumber}
            label={projectsContent.sectionTitle}
            headline={projectsContent.headline}
            subheadline={projectsContent.subheadline}
          />

          {/* Editorial Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 mb-10 pb-4 border-b border-[#e5e2dc]">
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-[12px] font-mono px-3 py-1.5 rounded-sm transition-colors cursor-pointer flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-[#141413] text-white font-medium'
                    : 'bg-transparent text-[#6e6b65] hover:text-[#141413] hover:bg-[#eeebe6]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-xs ${
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
      {/* SECTION 6: RESEARCH                                      */}
      {/* ======================================================== */}
      <section
        id="research"
        aria-label="Research and Technical Inquiries"
        className="py-20 sm:py-24 px-6 sm:px-8 border-b border-[#e5e2dc] bg-[#fbfbf9]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number={researchContent.sectionNumber}
            label={researchContent.sectionTitle}
            headline={researchContent.headline}
            subheadline={researchContent.subheadline}
          />

          {/* Featured Research Direction Plate */}
          <div className="mb-12 bg-[#ffffff] border border-[#e5e2dc] rounded-sm p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-[#eeebe6] font-mono text-[11px]">
              <span className="caption-uppercase text-[#6e6b65]">
                Featured Research Investigation
              </span>
              <span className="text-[#1e3a2b] bg-[#1e3a2b]/5 px-2 py-0.5 rounded-sm border border-[#1e3a2b]/20">
                {researchContent.featuredDirection.status}
              </span>
            </div>

            <h3 className="display-md text-[#141413] leading-snug mb-3">
              "{researchContent.featuredDirection.title}"
            </h3>

            <p className="body-md text-[#44423e] leading-relaxed mb-6 max-w-4xl">
              {researchContent.featuredDirection.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#eeebe6]">
              <div>
                <span className="caption-uppercase block mb-1 text-[#141413]">
                  Methodology
                </span>
                <p className="body-sm text-[#44423e] leading-relaxed">
                  {researchContent.featuredDirection.methodology}
                </p>
              </div>
              <div>
                <span className="caption-uppercase block mb-1 text-[#141413]">
                  Target Empirical Outcomes
                </span>
                <p className="body-sm text-[#44423e] leading-relaxed">
                  {researchContent.featuredDirection.anticipatedOutcomes}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#eeebe6] flex flex-wrap gap-1.5">
              {researchContent.featuredDirection.keywords.map((kw) => (
                <Badge key={kw} variant="mono" size="sm">
                  {kw}
                </Badge>
              ))}
            </div>
          </div>

          {/* Research Inquiries Ledger */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {researchContent.interests.map((item, idx) => (
              <div
                key={item.topic}
                className="bg-[#ffffff] border border-[#e5e2dc] rounded-sm p-5 hover:border-[#d0ccc3] transition-colors"
              >
                <div className="flex items-center justify-between mb-2 text-[11px] font-mono text-[#6e6b65]">
                  <span>RES-0{idx + 1}</span>
                  <span>{item.category}</span>
                </div>
                <h4 className="title-sm text-[#141413] mb-1.5">
                  {item.topic}
                </h4>
                <p className="body-sm text-[#44423e] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 7: EDUCATION & CERTIFICATIONS                    */}
      {/* ======================================================== */}
      <section
        id="education"
        aria-label="Education and Certifications"
        className="py-20 sm:py-24 px-6 sm:px-8 border-b border-[#e5e2dc] bg-[#f5f4f0]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number={educationContent.sectionNumber}
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
      {/* SECTION 8: LEADERSHIP                                    */}
      {/* ======================================================== */}
      <section
        id="leadership"
        aria-label="Leadership and Community"
        className="py-20 sm:py-24 px-6 sm:px-8 border-b border-[#e5e2dc] bg-[#fbfbf9]"
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
              <div
                key={role.organization}
                className="bg-[#ffffff] border border-[#e5e2dc] rounded-sm p-6 space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#6e6b65] mb-2">
                    <span>LEAD-0{idx + 1}</span>
                    <span>{role.period}</span>
                  </div>
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

                <div className="pt-2 border-t border-[#eeebe6] space-y-1.5">
                  <span className="caption-uppercase block text-[#9c9890] text-[10px]">
                    Key Initiatives &amp; Responsibilities
                  </span>
                  <ul className="space-y-1.5">
                    {role.contributions.map((c, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 body-sm leading-relaxed text-[#44423e]"
                      >
                        <span className="text-[#9c9890] font-mono text-[11px] select-none mt-0.5">
                          &bull;
                        </span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

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
      {/* SECTION 9: CONTACT                                       */}
      {/* ======================================================== */}
      <section
        id="contact"
        aria-label="Contact and Collaboration"
        className="py-20 sm:py-24 px-6 sm:px-8 bg-[#f5f4f0]"
      >
        <div className="max-w-[800px] mx-auto text-center space-y-6">
          <span className="caption-uppercase text-[#6e6b65] block">
            № 08 &bull; INQUIRIES &amp; DISPATCH
          </span>

          <h2 className="display-mega text-[#141413]">
            Initiate dialogue or engineering inquiry.
          </h2>

          <p className="body-md text-[16px] sm:text-[17px] text-[#44423e] max-w-xl mx-auto leading-relaxed">
            I am currently open to software engineering internships, technical collaborations, and research inquiries across full-stack systems and accessible technology.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${personalInfo.email}?subject=Project%20Inquiry%20%E2%80%94%20LM.%20Irsal%20Shydiq`}
              className="inline-block"
            >
              <Button
                variant="primary"
                size="md"
                icon={<ArrowUpRight size={14} />}
              >
                Send Email
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
          </div>

          <div className="pt-4 font-mono text-[13px] text-[#6e6b65]">
            <span>Direct Email: </span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="font-medium text-[#141413] hover:underline"
            >
              {personalInfo.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
