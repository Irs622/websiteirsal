import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, MapPin, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';
import { SkillTag } from '../components/SkillTag';
import { AtmosphericOrb } from '../components/AtmosphericOrb';
import { useTheme } from '../contexts/ThemeContext';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  skills: string[];
  tools: string[];
}

const experienceData: Record<string, ExperienceItem> = {
  'tech-innovators': {
    title: 'Independent UI/UX Designer',
    company: 'Freelance & Studio Practice',
    period: '2024 — Present',
    location: 'Bandung / Remote',
    type: 'Independent Practice',
    description: 'Providing comprehensive UI/UX design services for early-stage tech startups, venture-backed products, and creative teams. Creating intentional, user-centered digital artifacts from typographic concept through component system delivery.',
    responsibilities: [
      'Collaborated directly with founders and product leads to synthesize business goals into serene interfaces',
      'Architected end-to-end design systems, typography hierarchies, and modular component sets in Figma',
      'Created high-fidelity interactive prototypes for stakeholder review and user usability validation',
      'Conducted qualitative customer interviews and structured usability sessions to eliminate workflow friction',
      'Delivered developer-ready handoff specs with detailed token references and interaction states'
    ],
    achievements: [
      'Successfully delivered 8+ client products with 100% on-time delivery records',
      'Shipped complete redesign of 2 mobile application ecosystems',
      'Formulated a modular token system reducing ongoing client revision cycles by 30%'
    ],
    skills: ['Typography Architecture', 'Design Systems', 'Wireframing', 'User Research', 'Interactive Prototyping', 'Design Tokens'],
    tools: ['Figma', 'Miro', 'Notion', 'Slack', 'Linear']
  },
  'digital-solutions': {
    title: 'Frontend React Developer',
    company: 'Independent & Contract',
    period: '2024 — Present',
    location: 'Remote',
    type: 'Contract Practice',
    description: 'Building modern, performant, and accessible web applications using React, TypeScript, and modern styling libraries. Prioritizing strict typing, semantic markup, zero layout shift, and exceptional typographic rendering.',
    responsibilities: [
      'Authored custom React client architectures matching strict design mockups with pixel precision',
      'Engineered clean, reusable component libraries backed by TypeScript interfaces and Tailwind CSS',
      'Integrated RESTful APIs, external data pipelines, and third-party webhook services cleanly',
      'Audited bundle size, image pipelines, and runtime performance to ensure instant page delivery',
      'Maintained ongoing deployment pipelines and continuous delivery integrations'
    ],
    achievements: [
      'Constructed and shipped 5+ production-grade web applications with zero critical bugs',
      'Maintained 95+ average Google Lighthouse scores across Performance, Accessibility, and Best Practices',
      'Optimized component rendering pipelines resulting in an estimated 40% reduction in development overhead'
    ],
    skills: ['React 18/19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js', 'State Architecture', 'Web Performance'],
    tools: ['VS Code', 'Git', 'GitHub', 'Vercel', 'Postman']
  },
  'freelance-creative': {
    title: 'Visual Creator & Photographer',
    company: 'Independent Creative',
    period: '2022 — Present',
    location: 'Global / On-Location',
    type: 'Creative Practice',
    description: 'Documenting musical performances, urban architectures, and brand narratives through documentary photography and long-form visual editorial. Specializing in low-light stage capture and authentic filmic color treatment.',
    responsibilities: [
      'Captured high-dynamic-range photo collections for touring artists, cultural festivals, and editorial clients',
      'Conducted color grading, post-production curation, and print layout preparation using Adobe tools',
      'Directed short-form promotional films with deliberate editorial pacing and custom sound design',
      'Maintained professional client communications, asset archival, and licensing agreements',
      'Authored long-form design articles and photo essays published across online creative communities'
    ],
    achievements: [
      'Completed 50+ commissioned creative projects with universal client praise',
      'Showcased work in regional photography exhibitions and independent publications',
      'Cultivated an organic global creative following of 10K+ peers across creative platforms'
    ],
    skills: ['Live Event Photography', 'Color Grading', 'Visual Editorial', 'Short-form Film Direction', 'Essays'],
    tools: ['Sony A7III', '35mm/85mm Prime Glass', 'Adobe Lightroom', 'Premiere Pro', 'DaVinci Resolve']
  }
};

export function ExperienceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const experience = id ? experienceData[id] : null;

  if (!experience) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <GlassCard className="max-w-md text-center p-8">
          <h2 className="display-sm mb-3 font-display font-light">
            Record not located
          </h2>
          <p className="body-sm text-[#777169] mb-6">
            The requested career experience detail could not be retrieved.
          </p>
          <GlassButton
            variant="primary"
            onClick={() => navigate('/about')}
          >
            Return to About
          </GlassButton>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-12 pb-24 px-6 overflow-hidden">
      {/* Background Atmospheric Orbs */}
      <div className="absolute inset-0 pointer-events-none flex justify-between">
        <AtmosphericOrb
          color="peach"
          size={500}
          className="top-10 -left-20 opacity-35 dark:opacity-15"
        />
        <AtmosphericOrb
          color="sky"
          size={520}
          className="top-[500px] -right-20 opacity-30 dark:opacity-15"
        />
      </div>

      <div className="max-w-[960px] mx-auto relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <GlassButton
            variant="outline"
            size="sm"
            onClick={() => navigate('/about')}
          >
            <ArrowLeft size={14} />
            <span>Return to Career Index</span>
          </GlassButton>
        </motion.div>

        {/* Experience Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <GlassCard className="p-8 md:p-10">
            <span className="caption-uppercase text-[#777169] block mb-2">
              Career Chapter • {experience.type}
            </span>
            <h1 className="display-xl mb-2 font-display font-light text-[#0c0a09] dark:text-white">
              {experience.title}
            </h1>
            <p className="title-md font-medium text-[#292524] dark:text-[#d6d3d1] mb-6">
              {experience.company}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#e7e5e4] dark:border-[#292524] text-sm text-[#777169]">
              <div className="flex items-center gap-2">
                <Calendar size={15} />
                <span>{experience.period}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={15} />
                <span>{experience.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={15} />
                <span>{experience.type}</span>
              </div>
            </div>

            <p className="body-md text-[#4e4e4e] dark:text-[#a8a29e] mt-6">
              {experience.description}
            </p>
          </GlassCard>
        </motion.div>

        {/* Responsibilities */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <GlassCard className="p-8 md:p-10">
            <span className="caption-uppercase text-[#777169] block mb-2">Scope</span>
            <h2 className="display-md mb-6 font-display font-light text-[#0c0a09] dark:text-white">
              Primary Responsibilities
            </h2>

            <ul className="space-y-4">
              {experience.responsibilities.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3.5 body-md text-[#4e4e4e] dark:text-[#a8a29e]"
                >
                  <span className="w-5 h-5 rounded-full bg-[#f0efed] dark:bg-[#292524] border border-[#e7e5e4] dark:border-[#3e3835] flex items-center justify-center text-[#0c0a09] dark:text-white flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={13} className="text-[#0c0a09] dark:text-white" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>

        {/* Key Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <GlassCard className="p-8 md:p-10">
            <span className="caption-uppercase text-[#777169] block mb-2">Impact</span>
            <h2 className="display-md mb-6 font-display font-light text-[#0c0a09] dark:text-white">
              Key Achievements
            </h2>

            <div className="grid gap-4">
              {experience.achievements.map((item, index) => (
                <div
                  key={index}
                  className="p-5 rounded-[12px] bg-[#f0efed] dark:bg-[#141210] border border-[#e7e5e4] dark:border-[#292524] flex items-start gap-3"
                >
                  <span className="caption-uppercase text-[11px] font-bold text-[#777169] mt-0.5">
                    0{index + 1}
                  </span>
                  <p className="body-sm font-medium text-[#0c0a09] dark:text-white">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Skills & Tools Grids */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          <GlassCard className="p-6">
            <span className="caption-uppercase text-[#777169] block mb-3">Methods & Concepts</span>
            <h3 className="title-sm font-medium mb-4 text-[#0c0a09] dark:text-white">Applied Skills</h3>
            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skill) => (
                <SkillTag key={skill}>{skill}</SkillTag>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <span className="caption-uppercase text-[#777169] block mb-3">Software & Hardware</span>
            <h3 className="title-sm font-medium mb-4 text-[#0c0a09] dark:text-white">Tools Deployed</h3>
            <div className="flex flex-wrap gap-2">
              {experience.tools.map((tool) => (
                <SkillTag key={tool}>{tool}</SkillTag>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Bottom CTA */}
        <div className="text-center pt-8 border-t border-[#e7e5e4] dark:border-[#292524]">
          <GlassButton
            variant="primary"
            size="lg"
            onClick={() => navigate('/contact')}
          >
            <span>Inquire About Collaboration</span>
            <ArrowRight size={16} />
          </GlassButton>
        </div>
      </div>
    </div>
  );
}
