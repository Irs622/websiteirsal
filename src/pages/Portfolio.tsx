import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { AtmosphericOrb } from '../components/AtmosphericOrb';
import { useTheme } from '../contexts/ThemeContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import liveEventImage from 'figma:asset/5879bf3215834319cdadf80da5a00755d2ab9eb0.png';

type Category = 'All' | 'UI/UX' | 'React' | 'Photography' | 'Writing' | 'Video Editing';

interface Project {
  id: number;
  title: string;
  category: Category;
  description: string;
  image: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Dashboard',
    category: 'UI/UX',
    description: 'Modern analytics dashboard with real-time data visualization and editorial hierarchy.',
    image: 'https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1aSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjQwOTEyNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Figma', 'Design System', 'Dashboard']
  },
  {
    id: 2,
    title: 'Portfolio Web App',
    category: 'React',
    description: 'Interactive React portfolio with smooth animations, custom layout and high performance.',
    image: 'https://images.unsplash.com/photo-1591267990439-bc68529677c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFjdCUyMGRldmVsb3BtZW50JTIwY29kZXxlbnwxfHx8fDE3NjQwOTEyNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['React', 'TypeScript', 'Tailwind']
  },
  {
    id: 3,
    title: 'Live Event Visuals',
    category: 'Photography',
    description: 'Dynamic live concert and event photography capturing dramatic shadows and lighting.',
    image: liveEventImage,
    tags: ['Sony A7III', 'Event Photography', 'Atmosphere']
  },
  {
    id: 4,
    title: 'Design Thinking Journal',
    category: 'Writing',
    description: 'In-depth essays and articles on UX design methodology, ergonomics, and typography.',
    image: 'https://images.unsplash.com/photo-1669139660221-19454e55751e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cml0aW5nJTIwbm90ZWJvb2slMjBkZXNrfGVufDF8fHx8MTc2NDA5MDY0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['UX Writing', 'Editorial', 'Essays']
  },
  {
    id: 5,
    title: 'Task Management Interface',
    category: 'UI/UX',
    description: 'Minimalist task system focused on high accessibility, quick keyboard navigation, and clarity.',
    image: 'https://images.unsplash.com/photo-1657032633395-1cb34612f86d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2RvJTIwbGlzdCUyMGFwcCUyMGRlc2lnbnxlbnwxfHx8fDE3NjQxNDg0Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Mobile UI', 'Figma', 'Ergonomics']
  },
  {
    id: 6,
    title: 'React Component Library',
    category: 'React',
    description: 'Reusable component library built with TypeScript, Storybook documentation, and zero bloat.',
    image: 'https://images.unsplash.com/photo-1591267990439-bc68529677c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFjdCUyMGRldmVsb3BtZW50JTIwY29kZXxlbnwxfHx8fDE3NjQwOTEyNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['React', 'Storybook', 'UI Components']
  },
  {
    id: 7,
    title: 'Brand Film Direction',
    category: 'Video Editing',
    description: 'Dynamic promotional video featuring bespoke motion graphics, sound design, and color grading.',
    image: 'https://images.unsplash.com/photo-1695218716405-5b813000e994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGVkaXRpbmclMjBzb2Z0d2FyZSUyMHRpbWVsaW5lfGVufDF8fHx8MTc2NDA5ODQxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Premiere Pro', 'After Effects', 'Color Grading']
  }
];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isLight = theme === 'light';

  const categories: Category[] = ['All', 'UI/UX', 'React', 'Photography', 'Writing', 'Video Editing'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const getCategoryButtonClasses = (isActive: boolean) => {
    if (isActive) {
      return isLight
        ? 'bg-[#292524] text-white border-[#292524] shadow-sm'
        : 'bg-white text-[#0c0a09] border-white shadow-sm';
    }
    return isLight
      ? 'bg-transparent text-[#4e4e4e] border-[#e7e5e4] hover:border-[#d6d3d1] hover:text-[#0c0a09]'
      : 'bg-transparent text-[#a8a29e] border-[#292524] hover:border-[#3e3835] hover:text-white';
  };

  return (
    <div className="relative min-h-screen pt-12 pb-24 px-6 overflow-hidden">
      {/* Background Atmospheric Orbs */}
      <div className="absolute inset-0 pointer-events-none flex justify-between">
        <AtmosphericOrb
          color="mint"
          size={500}
          className="top-10 -left-20 opacity-45 dark:opacity-15"
        />
        <AtmosphericOrb
          color="lavender"
          size={550}
          className="top-96 -right-20 opacity-40 dark:opacity-15"
        />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="caption-uppercase text-[#777169] block mb-2">Curated Folio</span>
          <h1 className="display-xl mb-4 font-display font-light">
            Works & Studies
          </h1>
          <p className="body-md text-[#4e4e4e] dark:text-[#a8a29e]">
            A comprehensive index of digital experiences, front-end architecture, editorial photography, and creative writing.
          </p>
        </motion.div>

        {/* Filter Pills (All CTA / Badges use rounded.pill) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center gap-2 mb-14 flex-wrap"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  h-10 px-5 rounded-full text-[14px] font-medium transition-all duration-150 cursor-pointer border
                  ${getCategoryButtonClasses(isActive)}
                `}
              >
                {category}
              </button>
            );
          })}
        </motion.div>

        {/* Projects Grid (3-up on desktop, 2-up tablet, 1-up mobile) */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <GlassCard
                  hover
                  onClick={() => navigate('/case-study', { state: { project } })}
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Image frame with 12px radius */}
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
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
