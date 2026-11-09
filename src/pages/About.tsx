import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Code, Camera, Briefcase, ArrowUpRight, ArrowRight } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';
import { SkillTag } from '../components/SkillTag';
import { AtmosphericOrb } from '../components/AtmosphericOrb';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import profileImage from 'figma:asset/10be68f43185b69174f9ad5cc031832d9e118087.png';

export function About() {
  const navigate = useNavigate();

  const skillGroups = [
    {
      category: 'Design Systems & UI',
      items: ['Figma', 'Design Tokens', 'Prototyping', 'User Research', 'Typography Architecture']
    },
    {
      category: 'Frontend Engineering',
      items: ['React 18/19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js', 'REST APIs']
    },
    {
      category: 'Editorial Photography',
      items: ['Sony A7III', 'High-speed Prime Glass', 'Adobe Lightroom', 'Event Coverage', 'Color Grading']
    },
    {
      category: 'Film & Motion Editing',
      items: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Rhythm & Sound Design', 'Short-form Narrative']
    },
    {
      category: 'Writing & Editorial',
      items: ['UX Copywriting', 'Technical Documentation', 'Design Essays', 'Case Studies', 'Content Strategy']
    }
  ];

  const experience = [
    {
      id: 'tech-innovators',
      icon: <Briefcase size={16} />,
      title: 'Independent UI/UX Designer',
      company: 'Freelance & Studio Practice',
      period: '2024 — Present',
      description: 'Architecting digital interfaces, design tokens, and comprehensive design libraries for early-stage startups and established commercial ventures.'
    },
    {
      id: 'digital-solutions',
      icon: <Code size={16} />,
      title: 'Frontend React Developer',
      company: 'Independent & Contract',
      period: '2024 — Present',
      description: 'Developing high-fidelity, performant React applications with TypeScript, strict type safety, modular layouts, and responsive fluid styling.'
    },
    {
      id: 'freelance-creative',
      icon: <Camera size={16} />,
      title: 'Visual Creator & Photographer',
      company: 'Independent Creative',
      period: '2022 — Present',
      description: 'Editorial concert photography, brand promotional narratives, and design-led written essays documenting modern digital craft.'
    }
  ];

  return (
    <div className="relative min-h-screen pt-12 pb-24 px-6 overflow-hidden">
      {/* Background Atmospheric Orbs */}
      <div className="absolute inset-0 pointer-events-none flex justify-between">
        <AtmosphericOrb
          color="peach"
          size={520}
          className="top-10 -right-20 opacity-40 dark:opacity-15"
        />
        <AtmosphericOrb
          color="sky"
          size={500}
          className="top-[450px] -left-20 opacity-35 dark:opacity-15"
        />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="caption-uppercase text-[#777169] block mb-2">Biography</span>
          <h1 className="display-xl mb-4 font-display font-light">
            About Irsal Shydiq
          </h1>
          <p className="body-md text-[#4e4e4e] dark:text-[#a8a29e]">
            A multidisciplinary creator balancing the quiet precision of editorial design with modern software engineering and documentary photography.
          </p>
        </motion.div>

        {/* Profile Card (Pure white card, hairline border, soft drop) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <GlassCard className="p-8 md:p-10">
            <div className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-12 items-center">
              {/* Profile Image with 16px radius & hairline border */}
              <div className="relative mx-auto md:mx-0 w-56 md:w-full">
                <div className="w-full aspect-square rounded-[16px] overflow-hidden border border-[#e7e5e4] dark:border-[#292524] bg-[#f0efed] dark:bg-[#1c1917] shadow-sm">
                  <ImageWithFallback
                    src={profileImage}
                    alt="Irsal Shydiq"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Status Badge */}
                <div className="mt-3 text-center">
                  <SkillTag size="sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1.5" />
                    <span>Based in Bandung, ID</span>
                  </SkillTag>
                </div>
              </div>

              {/* Editorial Bio Text */}
              <div className="space-y-4">
                <span className="caption-uppercase text-[#777169]">Creative Philosophy</span>
                <h2 className="display-md font-display font-light text-[#0c0a09] dark:text-white">
                  "Simplicity is not the lack of clutter, but the mastery of purpose."
                </h2>
                <p className="body-md text-[#4e4e4e] dark:text-[#a8a29e]">
                  Over the past three years, I’ve operated at the intersection of aesthetic design and robust web engineering. I believe software should feel quietly intentional — clear typographic hierarchies, calm color palettes, and deliberate micro-interactions that serve human intent rather than algorithmic noise.
                </p>
                <p className="body-md text-[#4e4e4e] dark:text-[#a8a29e]">
                  When I am not coding in TypeScript or drafting components in Figma, I can be found documenting live musical performances with my 35mm primes or writing analytical essays on design systems.
                </p>

                <div className="pt-4 flex items-center gap-4 flex-wrap">
                  <GlassButton
                    variant="primary"
                    onClick={() => navigate('/contact')}
                  >
                    <span>Get in Touch</span>
                    <ArrowRight size={15} />
                  </GlassButton>
                  <GlassButton
                    variant="outline"
                    onClick={() => navigate('/portfolio')}
                  >
                    <span>View Projects</span>
                  </GlassButton>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Career Experience (ElevenLabs Voice Row inspired pattern: 32px circular icon plate, hairline dividers) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="mb-8 pb-4 border-b border-[#e7e5e4] dark:border-[#292524] flex items-end justify-between">
            <div>
              <span className="caption-uppercase text-[#777169] block mb-1">Timeline</span>
              <h2 className="display-lg font-display font-light">Experience & Practice</h2>
            </div>
            <span className="caption text-[#777169] hidden sm:inline">2022 — Present</span>
          </div>

          <div className="space-y-4">
            {experience.map((item) => (
              <GlassCard
                key={item.id}
                hover
                onClick={() => navigate(`/experience/${item.id}`)}
                className="p-6 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* 32px circular plate (surface-strong #f0efed) */}
                    <div className="w-10 h-10 rounded-full bg-[#f0efed] dark:bg-[#292524] flex items-center justify-center flex-shrink-0 text-[#0c0a09] dark:text-white border border-[#e7e5e4] dark:border-[#3e3835]">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="title-md text-[#0c0a09] dark:text-white font-medium">
                        {item.title}
                      </h3>
                      <p className="body-sm text-[#777169]">
                        {item.company}{' • '}{item.period}
                      </p>
                      <p className="body-sm text-[#4e4e4e] dark:text-[#a8a29e] mt-2 max-w-2xl">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="self-end md:self-center flex items-center gap-1.5 text-[13px] font-medium text-[#0c0a09] dark:text-white group">
                    <span>Details</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Skills & Tooling Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 pb-4 border-b border-[#e7e5e4] dark:border-[#292524]">
            <span className="caption-uppercase text-[#777169] block mb-1">Competencies</span>
            <h2 className="display-lg font-display font-light">Skills & Capabilities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group) => (
              <GlassCard key={group.category} className="p-6">
                <h3 className="caption-uppercase text-[12px] text-[#777169] mb-4 font-semibold tracking-[0.96px]">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full text-[12px] font-medium bg-[#f0efed] dark:bg-[#292524] text-[#0c0a09] dark:text-white border border-[#e7e5e4] dark:border-[#3e3835]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
