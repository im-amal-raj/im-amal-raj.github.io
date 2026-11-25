import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Mail } from 'lucide-react';

export default function ContactPill() {
  const [copied, setCopied] = useState(false);
  const email = 'amalMraj@proton.me';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <a
        href={`mailto:${email}`}
        className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold tracking-tight shadow-[0_4px_16px_rgba(14,165,233,0.35)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
      >
        <Mail size={16} />
        <span>Contact Me</span>
      </a>

      <button
        onClick={handleCopy}
        aria-label="Copy email address to clipboard"
        title="Copy email to clipboard"
        className="inline-flex items-center gap-2 h-11 px-4 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-mono border border-white/10 transition-all duration-200 active:scale-[0.98]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex items-center gap-1.5 text-emerald-400 font-sans font-medium"
            >
              <Check size={14} />
              <span>Copied!</span>
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex items-center gap-1.5"
            >
              <Copy size={13} className="text-neutral-400" />
              <span>{email}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
