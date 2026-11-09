import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Tag, ArrowRight, Check } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';
import { AtmosphericOrb } from '../components/AtmosphericOrb';
import { useTheme } from '../contexts/ThemeContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function CaseStudy() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const project = location.state?.project;
  const isLight = theme === 'light';

  if (!project) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <GlassCard className="max-w-md text-center p-8">
          <h2 className="display-sm mb-3 font-display font-light">
            Project not located
          </h2>
          <p className="body-sm text-[#777169] mb-6">
            The requested project study could not be retrieved from history.
          </p>
          <GlassButton
            variant="primary"
            onClick={() => navigate('/portfolio')}
          >
            Return to Portfolio
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
          color="mint"
          size={500}
          className="top-10 -right-20 opacity-35 dark:opacity-15"
        />
        <AtmosphericOrb
          color="peach"
          size={550}
          className="top-[600px] -left-20 opacity-30 dark:opacity-15"
        />
      </div>

      <div className="max-w-[960px] mx-auto relative z-10">
        {/* Back Button as subtle outline pill */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <GlassButton
            variant="outline"
            size="sm"
            onClick={() => navigate('/portfolio')}
          >
            <ArrowLeft size={14} />
            <span>Return to Works</span>
          </GlassButton>
        </motion.div>

        {/* Project Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <GlassCard className="p-8 md:p-10">
            <span className="caption-uppercase text-[#777169] block mb-2">
              Case Study • {project.category}
            </span>
            <h1 className="display-xl mb-4 font-display font-light text-[#0c0a09] dark:text-white">
              {project.title}
            </h1>
            <p className="body-md text-[#4e4e4e] dark:text-[#a8a29e] mb-6 max-w-2xl">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#e7e5e4] dark:border-[#292524]">
              <div className="flex items-center gap-2 text-sm text-[#777169]">
                <Calendar size={15} />
                <span>2024 Release</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#777169]">
                <Tag size={15} />
                <span>{project.category}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 ml-auto">
                {project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-[#f0efed] dark:bg-[#292524] text-[#0c0a09] dark:text-white border border-[#e7e5e4] dark:border-[#3e3835]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Hero Visual Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="rounded-[16px] overflow-hidden border border-[#e7e5e4] dark:border-[#292524] bg-[#f0efed] dark:bg-[#1c1917] shadow-sm">
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-[400px] md:h-[480px] object-cover"
            />
          </div>
        </motion.div>

        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <GlassCard className="p-8 md:p-10">
            <span className="caption-uppercase text-[#777169] block mb-2">Intent</span>
            <h2 className="display-md mb-4 font-display font-light text-[#0c0a09] dark:text-white">
              Project Overview
            </h2>
            <div className="space-y-4 body-md text-[#4e4e4e] dark:text-[#a8a29e]">
              <p>
                This project documents an intentional approach to {project.category.toLowerCase()} where visual restraint and rigorous functionality coexist harmoniously. The core intent was to craft an experience devoid of unnecessary decorative friction, favoring typographical hierarchy and tactile responsiveness.
              </p>
              <p>
                Through user interviews, prototyping cycles, and careful component architecture, the final implementation establishes a calm, cohesive environment tailored to real daily workflows.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Problem Statement */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <GlassCard className="p-8 md:p-10">
            <span className="caption-uppercase text-[#777169] block mb-2">The Challenge</span>
            <h2 className="display-md mb-4 font-display font-light text-[#0c0a09] dark:text-white">
              Problem Definition
            </h2>
            <p className="body-md text-[#4e4e4e] dark:text-[#a8a29e] mb-6">
              Contemporary digital tools frequently overwhelm users with high-saturation accent colors, uncalibrated animations, and congested layouts. The challenge was to deliver complex information architectures without cognitive fatigue.
            </p>

            {/* Editorial quote block in surface-strong (#f0efed) */}
            <div className="p-6 rounded-[12px] bg-[#f0efed] dark:bg-[#141210] border border-[#e7e5e4] dark:border-[#292524]">
              <p className="font-display italic text-lg text-[#0c0a09] dark:text-white leading-relaxed">
                "How might we design a voice that speaks with quiet authority — prioritizing content legibility and functional speed over visual bravado?"
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Design & Engineering Process */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <GlassCard className="p-8 md:p-10">
            <span className="caption-uppercase text-[#777169] block mb-2">Methodology</span>
            <h2 className="display-md mb-6 font-display font-light text-[#0c0a09] dark:text-white">
              Execution Sequence
            </h2>

            <div className="space-y-6">
              {[
                {
                  step: '01',
                  title: 'Research & Typographic Discovery',
                  description: 'Analyzed editorial print journals, evaluated reader scan patterns, and set the strict 300-weight display hierarchy.'
                },
                {
                  step: '02',
                  title: 'Component Modularization',
                  description: 'Constructed reusable UI components around 8px/16px geometric grids with hairline border dividers.'
                },
                {
                  step: '03',
                  title: 'React & Motion Integration',
                  description: 'Implemented smooth layout transitions and responsive fluid breakpoints with zero rendering jank.'
                },
                {
                  step: '04',
                  title: 'Accessibility & Contrast Review',
                  description: 'Validated WCAG AA/AAA targets across all touch points and verified dark mode token fidelity.'
                }
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  {/* Circular step badge in surface-strong */}
                  <div className="w-10 h-10 rounded-full bg-[#f0efed] dark:bg-[#292524] border border-[#e7e5e4] dark:border-[#3e3835] flex items-center justify-center flex-shrink-0 text-sm font-semibold text-[#0c0a09] dark:text-white">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="title-sm font-medium text-[#0c0a09] dark:text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="body-sm text-[#4e4e4e] dark:text-[#a8a29e]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Deliverables / Solution Points */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <GlassCard className="p-8 md:p-10">
            <span className="caption-uppercase text-[#777169] block mb-2">Resolution</span>
            <h2 className="display-md mb-6 font-display font-light text-[#0c0a09] dark:text-white">
              Key Artifacts Delivered
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Strict 300-Weight Editorial Typography',
                'Pastel Atmospheric Gradient Blooms',
                'Pill-Geometry Button System',
                'Responsive 12-Column Grid Architecture',
                'Accessible High-Contrast Near-Black Ink',
                'Lightweight Performant Bundle Footprint'
              ].map((feature) => (
                <div
                  key={feature}
                  className="p-4 rounded-[12px] bg-[#f0efed] dark:bg-[#141210] border border-[#e7e5e4] dark:border-[#292524] flex items-center gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-white dark:bg-[#292524] border border-[#e7e5e4] dark:border-[#3e3835] flex items-center justify-center text-[#16a34a] flex-shrink-0">
                    <Check size={13} />
                  </span>
                  <span className="body-sm font-medium text-[#0c0a09] dark:text-white">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Pre-footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center pt-8 border-t border-[#e7e5e4] dark:border-[#292524]"
        >
          <h3 className="display-sm mb-4 font-display font-light text-[#0c0a09] dark:text-white">
            Interested in exploring similar work together?
          </h3>
          <GlassButton
            variant="primary"
            size="lg"
            onClick={() => navigate('/contact')}
          >
            <span>Inquire About Collaboration</span>
            <ArrowRight size={16} />
          </GlassButton>
        </motion.div>
      </div>
    </div>
  );
}
