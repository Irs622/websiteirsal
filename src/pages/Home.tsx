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
import { ProjectGallery } from '../components/projects/ProjectGallery';
import { ExperienceTimeline } from '../components/ExperienceTimeline';
import { AboutEngineerAnatomy } from '../components/AboutEngineerAnatomy';
import { GithubIcon, LinkedinIcon } from '../components/ui/Icons';
import { HeroAtlas } from '../components/hero/HeroAtlas';
import { AboutSpecimen } from '../components/about/AboutSpecimen';
import { ExpertiseChart } from '../components/expertise/ExpertiseChart';

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
      {/* ====================================================== */}
      {/* SECTION 1: HERO — DRAGGABLE PROJECT ATLAS              */}
      {/* ====================================================== */}
      <HeroAtlas />

      {/* ====================================================== */}
      {/* SECTION 2: ABOUT — SPECIMEN PLATE                      */}
      {/* ====================================================== */}
      <AboutSpecimen />


      {/* ====================================================== */}
      {/* SECTION 3: EXPERTISE — CAPABILITY CHART                 */}
      {/* ====================================================== */}
      <section
        id="expertise"
        aria-label="Technical Expertise"
        className="py-20 sm:py-28 px-6 sm:px-8 border-b border-[#e2e2de]"
      >
        <div className="max-w-[1320px] mx-auto">
          <SectionHeader
            number="02"
            label={expertiseContent.sectionTitle}
            headline={expertiseContent.headline}
            subheadline={expertiseContent.subheadline}
          />
          <ExpertiseChart />
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
        className="py-20 sm:py-28 px-6 sm:px-8 border-b border-[#e2e2de]"
      >
        <div className="max-w-[1320px] mx-auto">
          <ProjectGallery />
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

    </div>
  );
}
