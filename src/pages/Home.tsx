import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { LazyMount } from '../components/util/LazyMount';
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
const ExpertiseChart = lazy(() =>
  import('../components/expertise/ExpertiseChart').then((m) => ({ default: m.ExpertiseChart }))
);
import { ResearchPull } from '../components/research/ResearchPull';
import { ContactAssemble } from '../components/contact/ContactAssemble';

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
          {/* Reserve the chart's real height (taller on mobile where the
              tabs wrap) so the lazy mount never shifts the content below. */}
          <div className="min-h-[610px] md:min-h-[500px]">
            <LazyMount minHeight="610px">
              <Suspense fallback={<div className="h-[560px]" aria-hidden="true" />}>
                <ExpertiseChart />
              </Suspense>
            </LazyMount>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: EXPERIENCE (REFINED CHRONOLOGICAL LAYOUT)     */}
      {/* ======================================================== */}
      <section
        id="experience"
        aria-label="Professional Experience"
        className="py-20 sm:py-24 px-6 sm:px-8 border-b border-[#e2e2de]"
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

      {/* ====================================================== */}
      {/* SECTION 6: RESEARCH — PINNED PULL SEQUENCE             */}
      {/* ====================================================== */}
      <ResearchPull />

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
        className="py-20 sm:py-24 px-6 sm:px-8 border-b border-[#e2e2de]"
      >
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number="07"
            label={leadershipContent.sectionTitle}
            headline={leadershipContent.headline}
            subheadline={leadershipContent.subheadline}
          />

          <div className="border-t border-[#e2e2de] divide-y divide-[#ecece8]">
            {leadershipContent.roles.map((role) => (
              <div
                key={role.organization}
                className="py-8 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <h3 className="display-sm text-[#0b0b0b]">
                      {role.organization}
                    </h3>
                    <p className="body-strong text-[#0b0b0b] mt-0.5">
                      {role.role}
                    </p>
                    <p className="caption text-[#6b6b66] text-[12px] mt-0.5">
                      {role.scope}
                    </p>
                  </div>
                  <span className="font-mono text-[12px] text-[#6b6b66]">
                    {role.period}
                  </span>
                </div>

                <ul className="space-y-1.5 max-w-3xl pt-1">
                  {role.contributions.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[#1a1a18]"
                    >
                      <span className="text-[#6b6b66] font-mono text-[11px] select-none mt-0.5">
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

      {/* ====================================================== */}
      {/* SECTION 9: CONTACT — ASSEMBLE SEQUENCE                 */}
      {/* ====================================================== */}
      <ContactAssemble />

    </div>
  );
}
