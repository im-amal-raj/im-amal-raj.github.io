import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, ArrowUpRight } from 'lucide-react';

interface Props {
  email?: string;
  githubUrl?: string;
}

export default function CopyEmailPill({
  email = 'amalMraj@proton.me',
  githubUrl = 'https://github.com/im-amal-raj',
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      <button
        onClick={handleCopy}
        type="button"
        aria-label="Copy email address to clipboard"
        className="group relative inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-text-primary)] px-5 py-2.5 text-sm font-medium text-[var(--color-surface)] shadow-xs transition-all hover:bg-[var(--color-accent)] active:scale-[0.98]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.16 }}
              className="flex items-center gap-2"
            >
              <Check className="h-4 w-4" aria-hidden="true" />
              <span>Copied to clipboard</span>
            </motion.span>
          ) : (
            <motion.span
              key="default"
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 3 }}
              transition={{ duration: 0.16 }}
              className="flex items-center gap-2"
            >
              <Copy className="h-3.5 w-3.5 opacity-80 transition-transform group-hover:scale-110" aria-hidden="true" />
              <span>{email}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex min-h-[44px] items-center gap-1.5 rounded-[var(--radius-button)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-primary)] shadow-xs transition-colors hover:border-[var(--color-text-primary)] active:scale-[0.98]"
      >
        <span>github.com/im-amal-raj</span>
        <ArrowUpRight className="h-4 w-4 text-[var(--color-text-secondary)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-text-primary)]" />
      </a>
    </div>
  );
}
