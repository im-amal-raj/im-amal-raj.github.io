import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

export interface ProjectItem {
  title: string;
  tagline: string;
  category: string;
  tech: string[];
  github?: string;
  highlights?: string[];
}

interface Props {
  projects: ProjectItem[];
}

export default function InteractiveProjects({ projects }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const filterGroupId = useId();

  const categories = ['All', 'Full-Stack Web', 'Automation & APIs'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-6">
      {/* Category Filter Pills */}
      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="flex flex-wrap items-center gap-2 border-b border-[var(--color-border)] pb-4"
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setSelectedCategory(cat);
                setExpandedIndex(null);
              }}
              type="button"
              className={`relative inline-flex min-h-[44px] cursor-pointer items-center px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'text-[var(--color-text-primary)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId={`filter-pill-${filterGroupId}`}
                  className="absolute inset-0 rounded-[var(--radius-button)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs"
                  transition={{ type: 'spring', bounce: 0.18, duration: 0.35 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Project Rows */}
      <div className="divide-y divide-[var(--color-border)] border-b border-[var(--color-border)]">
        {filteredProjects.map((project, idx) => {
          const isExpanded = expandedIndex === idx;
          const hasHighlights = project.highlights && project.highlights.length > 0;

          return (
            <article
              key={project.title}
              className="group py-6 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4">
                <div className="space-y-2 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] tracking-tight">
                      {project.title}
                    </h3>
                    <span className="rounded-[var(--radius-button)] bg-[var(--color-surface-elevated)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-text-secondary)]">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {project.tagline}
                  </p>

                  <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-secondary)]">
                    {project.tech.join(' · ')}
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-3">
                  {hasHighlights && (
                    <button
                      onClick={() => toggleExpand(idx)}
                      type="button"
                      aria-expanded={isExpanded}
                      aria-label={`${isExpanded ? 'Hide' : 'View'} architecture notes for ${project.title}`}
                      className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-[var(--radius-button)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs font-medium text-[var(--color-text-secondary)] shadow-xs transition-colors hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)]"
                    >
                      <span>Notes</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-[var(--color-accent)]' : ''
                        }`}
                      />
                    </button>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-[var(--color-accent)] hover:underline"
                    >
                      <span>Source</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Expandable Architecture Highlights */}
              <AnimatePresence initial={false}>
                {isExpanded && hasHighlights && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5 shadow-xs">
                      <h4 className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
                        Implementation Notes
                      </h4>
                      <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                        {project.highlights!.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2">
                            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </div>
  );
}
