import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Sparkles, Layers, Code, Camera, Film, BookOpen } from 'lucide-react';
import { GlassButton } from '../components/GlassButton';
import { GlassCard } from '../components/GlassCard';
import { SkillTag } from '../components/SkillTag';
import { AtmosphericOrb } from '../components/AtmosphericOrb';
import { AudioWaveformCard } from '../components/AudioWaveformCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { PricingTierCard } from '../components/PricingTierCard';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import liveEventImage from 'figma:asset/5879bf3215834319cdadf80da5a00755d2ab9eb0.png';

export function Home() {
  const navigate = useNavigate();

  const disciplines = [
    {
      title: 'UI/UX Design',
      count: '10+ Projects',
      desc: 'Intuitive user architectures, responsive design systems & clean prototypes.',
      orb: 'mint' as const,
      icon: <Layers size={18} />
    },
    {
      title: 'React Engineering',
      count: '10+ Apps',
      desc: 'Performant web applications built with TypeScript, Tailwind & modular patterns.',
      orb: 'sky' as const,
      icon: <Code size={18} />
    },
    {
      title: 'Editorial Photography',
      count: '500+ Shots',
      desc: 'Live event coverage, urban landscapes, and high-dynamic-range framing.',
      orb: 'peach' as const,
      icon: <Camera size={18} />
    },
    {
      title: 'Film & Motion Editing',
      count: '80+ Edits',
      desc: 'Color grading, rhythmic pacing, and dynamic promotional storytelling.',
      orb: 'rose' as const,
      icon: <Film size={18} />
    },
    {
      title: 'Content Strategy & Writing',
      count: '50+ Articles',
      desc: 'Design methodology articles, documentation, and digital narratives.',
      orb: 'lavender' as const,
      icon: <BookOpen size={18} />
    }
  ];

  const featuredWorks = [
    {
      id: 1,
      title: 'E-Commerce Dashboard',
      category: 'UI/UX Design',
      description: 'Modern analytics interface with real-time data visualization and editorial clarity.',
      image: 'https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1aSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjQwOTEyNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['Figma', 'Design System', 'Analytics']
    },
    {
      id: 3,
      title: 'Live Event Visuals',
      category: 'Editorial Photography',
      description: 'Atmospheric concert photography exploring dramatic shadows and lighting.',
      image: liveEventImage,
      tags: ['Sony A7III', 'Live Concert', 'Atmosphere']
    },
    {
      id: 2,
      title: 'Portfolio Web Architecture',
      category: 'React & TypeScript',
      description: 'Editorial web application with quiet typography and custom motion pacing.',
      image: 'https://images.unsplash.com/photo-1591267990439-bc68529677c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFjdCUyMGRldmVsb3BtZW50JTIwY29kZXxlbnwxfHx8fDE3NjQwOTEyNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['React', 'TypeScript', 'Tailwind']
    }
  ];

  const testimonials = [
    {
      quote: "Irsal has that rare ability to bridge exacting aesthetic taste with rock-solid frontend execution. The resulting design was both serene and lightning-fast.",
      author: "Aditya Pratama",
      role: "Product Lead",
      company: "Kinetik Studio"
    },
    {
      quote: "Working with Irsal brought editorial clarity to our brand. The typography, spacing, and micro-interactions exceeded our highest expectations.",
      author: "Rian Hidayat",
      role: "Engineering Director",
      company: "Svara Tech"
    }
  ];

  const engagementTiers = [
    {
      name: "Design Audit & Advisory",
      tagline: "Comprehensive architectural and typographic teardown for existing web products.",
      price: "$1,200",
      cadence: "per sprint",
      features: [
        "Complete design system & UI audit",
        "Typographic hierarchy & spacing review",
        "Accessibility & contrast audit (WCAG AA)",
        "Component refactoring recommendations",
        "Executive summary & implementation guide"
      ],
      ctaText: "Inquire about audit"
    },
    {
      name: "Full Product MVP",
      tagline: "End-to-end design & React engineering from zero to production launch.",
      price: "$4,500",
      cadence: "per project",
      features: [
        "Full tokenized design library in Figma",
        "React 18/19 & TypeScript web client",
        "High-performance Tailwind CSS architecture",
        "Responsive 12-column fluid grid",
        "Turnkey production deployment"
      ],
      ctaText: "Start sprint engagement",
      featured: true
    },
    {
      name: "Embedded Creative Lead",
      tagline: "Dedicated creative direction, continuous frontend architecture and feature iteration.",
      price: "$6,800",
      cadence: "per month",
      features: [
        "Weekly feature sprint design & coding",
        "Design tokens & component governance",
        "Frontend PR reviews & architecture",
        "Editorial photography & visual assets",
        "Direct async Slack & GitHub access"
      ],
      ctaText: "Check availability"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* ========================================================
          HERO BAND (96px Rhythm, Off-white canvas, Display 300)
         ======================================================== */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 py-24 md:py-32">
        {/* Atmospheric Gradient Orbs behind headline (Signature Peach & Lavender blooms) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
          <AtmosphericOrb
            color="peach"
            size={520}
            animation="drift-1"
            className="-top-12 -right-16 opacity-60 dark:opacity-20"
          />
          <AtmosphericOrb
            color="lavender"
            size={580}
            animation="drift-2"
            className="bottom-4 -left-20 opacity-55 dark:opacity-20"
          />
          <AtmosphericOrb
            color="mint"
            size={360}
            animation="drift-1"
            className="top-1/3 left-1/2 -translate-x-1/2 opacity-35 dark:opacity-15"
          />
        </div>

        {/* Hero Content */}
        <div className="max-w-[960px] mx-auto text-center relative z-10">
          {/* Status Badge Pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-block"
          >
            <SkillTag size="md">
              <Sparkles size={13} className="text-[#a8a29e]" />
              <span>Open for creative engineering roles</span>
            </SkillTag>
          </motion.div>

          {/* Waldenburg Light Display Mega (Weight 300 strictly, -1.92px tracking) */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="display-mega mb-6"
          >
            Irsal Shydiq
          </motion.h1>

          {/* Sub-headline (Display Light at weight 300) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="display-md mb-6 font-display font-light text-[#292524] dark:text-[#d6d3d1]"
          >
            Multidisciplinary Designer & React Developer
          </motion.p>

          {/* Editorial running text (Inter 16px / 400 with 0.16px letter-spacing) */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="body-md max-w-2xl mx-auto mb-10 text-[#4e4e4e] dark:text-[#a8a29e]"
          >
            Designing quiet, human-centered interfaces and building robust React applications with equal reverence for typographic detail and software craft.
          </motion.p>

          {/* CTAs: Ink pill primary + Transparent outline secondary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <GlassButton
              variant="primary"
              size="lg"
              onClick={() => navigate('/portfolio')}
            >
              <span>Explore Selected Works</span>
              <ArrowRight size={16} />
            </GlassButton>

            <GlassButton
              variant="outline"
              size="lg"
              onClick={() => navigate('/contact')}
            >
              <span>Get in Touch</span>
            </GlassButton>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          DISCIPLINE STACK (Feature Cards & Atmospheric Cards)
         ======================================================== */}
      <section className="max-w-[1200px] mx-auto px-6 py-24 relative z-10 border-t border-[#e7e5e4] dark:border-[#292524]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#e7e5e4] dark:border-[#292524]">
          <div>
            <span className="caption-uppercase text-[#777169] block mb-2">Practice & Focus</span>
            <h2 className="display-lg">Multidisciplinary Overview</h2>
          </div>
          <p className="body-sm text-[#777169] max-w-sm mt-3 md:mt-0">
            A spectrum of creative and technical disciplines refined through freelance and independent projects.
          </p>
        </div>

        {/* 3-up & 2-up responsive feature card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {disciplines.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <GlassCard
                hover
                orbVariant={item.orb}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="w-9 h-9 rounded-full bg-[#f0efed] dark:bg-[#292524] flex items-center justify-center text-[#0c0a09] dark:text-white">
                      {item.icon}
                    </span>
                    <span className="caption-uppercase text-[#777169] dark:text-[#a8a29e]">
                      {item.count}
                    </span>
                  </div>

                  <h3 className="title-md mb-2">
                    {item.title}
                  </h3>

                  <p className="body-sm text-[#4e4e4e] dark:text-[#a8a29e]">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#e7e5e4] dark:border-[#292524] flex items-center justify-between">
                  <span className="caption-uppercase text-[11px] text-[#777169]">Verified</span>
                  <span className="text-[12px] font-medium text-[#0c0a09] dark:text-white inline-flex items-center gap-1 group-hover:underline">
                    Inquire <ArrowUpRight size={13} />
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================
          SELECTED WORKS SECTION (2-up & 3-up Editorial Grid)
         ======================================================== */}
      <section className="max-w-[1200px] mx-auto px-6 py-24 relative z-10 border-t border-[#e7e5e4] dark:border-[#292524]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#e7e5e4] dark:border-[#292524]">
          <div>
            <span className="caption-uppercase text-[#777169] block mb-2">Curated Folio</span>
            <h2 className="display-lg">Selected Projects</h2>
          </div>
          <div className="mt-3 md:mt-0">
            <GlassButton
              variant="outline"
              size="sm"
              onClick={() => navigate('/portfolio')}
            >
              View all projects
            </GlassButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredWorks.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard
                hover
                onClick={() => navigate('/case-study', { state: { project } })}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  {/* Image container with 12px radius */}
                  <div className="relative overflow-hidden rounded-[12px] mb-5 h-52 bg-[#f0efed] dark:bg-[#292524]">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-[#0c0a09]/90 border border-[#e7e5e4] dark:border-[#292524] text-[#0c0a09] dark:text-white">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>

                  <span className="caption-uppercase text-[11px] text-[#777169] block mb-1">
                    {project.category}
                  </span>

                  <h3 className="display-sm mb-2 text-[#0c0a09] dark:text-white font-display font-light">
                    {project.title}
                  </h3>

                  <p className="body-sm text-[#4e4e4e] dark:text-[#a8a29e] mb-4">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#e7e5e4] dark:border-[#292524]">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-[#f0efed] dark:bg-[#292524] text-[#292524] dark:text-[#d6d3d1]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================
          AUDIO / WAVEFORM SIGNATURE (ElevenLabs Audio Card)
         ======================================================== */}
      <section className="max-w-[1200px] mx-auto px-6 py-24 relative z-10 border-t border-[#e7e5e4] dark:border-[#292524]">
        <div className="mb-8 pb-4 border-b border-[#e7e5e4] dark:border-[#292524]">
          <span className="caption-uppercase text-[#777169] block mb-1">Interactive Voice Note</span>
          <h2 className="display-lg">Creative Direction & Sound Sample</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <AudioWaveformCard />
        </motion.div>
      </section>

      {/* ========================================================
          PRICING & ENGAGEMENT TIERS (Featured Inverted Tier)
         ======================================================== */}
      <section className="max-w-[1200px] mx-auto px-6 py-24 relative z-10 border-t border-[#e7e5e4] dark:border-[#292524]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#e7e5e4] dark:border-[#292524]">
          <div>
            <span className="caption-uppercase text-[#777169] block mb-2">Engagements</span>
            <h2 className="display-lg">Services & Collaboration Tiers</h2>
          </div>
          <p className="body-sm text-[#777169] max-w-sm mt-3 md:mt-0">
            Predictable engagement models tailored to ambitious founders and high-craft engineering teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {engagementTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PricingTierCard
                name={tier.name}
                tagline={tier.tagline}
                price={tier.price}
                cadence={tier.cadence}
                features={tier.features}
                ctaText={tier.ctaText}
                featured={tier.featured}
                onSelect={() => navigate('/contact')}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================
          TESTIMONIALS SECTION (Editorial Quotes)
         ======================================================== */}
      <section className="max-w-[1200px] mx-auto px-6 py-24 relative z-10 border-t border-[#e7e5e4] dark:border-[#292524]">
        <div className="mb-8 pb-4 border-b border-[#e7e5e4] dark:border-[#292524]">
          <span className="caption-uppercase text-[#777169] block mb-1">Endorsements</span>
          <h2 className="display-lg">Collaborator Reflections</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TestimonialCard
                quote={t.quote}
                author={t.author}
                role={t.role}
                company={t.company}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================
          EDITORIAL CTA BAND (Pre-footer 96px rhythm)
         ======================================================== */}
      <section className="relative px-6 py-24 md:py-32 text-center overflow-hidden border-t border-[#e7e5e4] dark:border-[#292524]">
        {/* Soft pastel atmospheric bloom behind CTA */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <AtmosphericOrb
            color="rose"
            size={450}
            className="opacity-45 dark:opacity-15"
          />
          <AtmosphericOrb
            color="sky"
            size={400}
            className="opacity-35 dark:opacity-10 translate-x-20"
          />
        </div>

        <div className="max-w-[720px] mx-auto relative z-10">
          <span className="caption-uppercase text-[#777169] block mb-3">Next Step</span>
          <h2 className="display-lg mb-5 font-display font-light text-[#0c0a09] dark:text-white">
            Ready to build something quietly remarkable?
          </h2>
          <p className="body-md mb-8 text-[#4e4e4e] dark:text-[#a8a29e]">
            Whether you need a bespoke design system, a complete React application, or editorial visual direction, let’s discuss your upcoming venture.
          </p>
          <GlassButton
            variant="primary"
            size="lg"
            onClick={() => navigate('/contact')}
          >
            <span>Start a conversation</span>
            <ArrowRight size={16} />
          </GlassButton>
        </div>
      </section>
    </div>
  );
}
