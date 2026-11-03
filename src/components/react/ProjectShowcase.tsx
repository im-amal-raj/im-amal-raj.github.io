import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import DynamicIslandWidget from './DynamicIslandWidget';

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export interface ProjectItem {
  title: string;
  tagline: string;
  category: string;
  badge?: string;
  tech: string[];
  github?: string;
  demo?: string;
  heroImage?: string;
  slug: string;
}

interface ProjectShowcaseProps {
  projects: ProjectItem[];
}

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'desktop', label: 'Desktop & Wayland' },
  { id: 'web', label: 'Full-Stack Web' },
  { id: 'automation', label: 'Automation & APIs' },
];

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProjects = projects.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'desktop') return p.category.toLowerCase().includes('desktop');
    if (activeTab === 'web') return p.category.toLowerCase().includes('web');
    if (activeTab === 'automation') return p.category.toLowerCase().includes('automation');
    return true;
  });

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Category Filter Pills with Spring Physics */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-xl">
        {CATEGORIES.map((cat) => {
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight transition-colors duration-200 ${
                isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilterPill"
                  transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-sky-500 shadow-[0_2px_12px_rgba(14,165,233,0.35)]"
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bento Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            const isFeatured = project.heroImage && (activeTab === 'all' || activeTab === 'desktop');
            const colSpan = isFeatured ? 'md:col-span-2' : 'md:col-span-1';

            return (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1.0, 0.3, 1.0] }}
                className={colSpan}
              >
                <SpotlightCard className="h-full flex flex-col justify-between group">
                  {/* Top Card Media for Featured Item */}
                  {isFeatured && (
                    <div className="flex flex-col lg:flex-row border-b border-white/10">
                      <div className="relative lg:w-3/5 aspect-[16/9] lg:aspect-auto overflow-hidden bg-black/60 border-b lg:border-b-0 lg:border-r border-white/10">
                        <img
                          src={project.heroImage}
                          alt={`Screenshot of ${project.title}`}
                          width={748}
                          height={353}
                          loading="lazy"
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1.0,0.3,1.0)] group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                      </div>

                      {/* Interactive Widget Simulator */}
                      <div className="lg:w-2/5 p-6 flex flex-col justify-center items-center bg-black/30">
                        <DynamicIslandWidget />
                      </div>
                    </div>
                  )}

                  {/* Card Content Details */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 gap-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-400">
                          {project.category}
                        </span>
                        {project.badge && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {project.badge}
                          </span>
                        )}
                      </div>

                      {/* External / GitHub Links */}
                      <div className="flex items-center gap-1.5">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors duration-150"
                            aria-label={`View ${project.title} on GitHub`}
                            title="GitHub Repository"
                          >
                            <GithubIcon size={16} />
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors duration-150"
                            aria-label={`View live demo of ${project.title}`}
                            title="Live Demo"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-white text-xl font-bold tracking-tight group-hover:text-sky-400 transition-colors duration-150">
                        {project.title}
                      </h3>
                      <p className="text-neutral-300 text-sm leading-relaxed max-w-xl">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    {project.tech && project.tech.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/5 text-neutral-300 border border-white/5 font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
