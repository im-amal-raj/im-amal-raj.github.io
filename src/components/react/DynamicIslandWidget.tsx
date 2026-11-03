import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Music, Sparkles } from 'lucide-react';

type IslandMode = 'resting' | 'music' | 'telemetry';

export default function DynamicIslandWidget() {
  const [mode, setMode] = useState<IslandMode>('resting');

  return (
    <div className="flex flex-col items-center gap-3 w-full my-2">
      <div className="flex items-center gap-2 text-xs text-neutral-400">
        <Sparkles size={13} className="text-sky-400" />
        <span className="font-medium tracking-tight">Interactive Wayland Island Preview</span>
      </div>

      {/* Capsule Container */}
      <div className="relative h-20 flex items-center justify-center w-full">
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          className="relative overflow-hidden rounded-full bg-neutral-950/90 backdrop-blur-2xl border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_16px_36px_-6px_rgba(0,0,0,0.85)] cursor-pointer select-none"
        >
          <AnimatePresence mode="wait">
            {mode === 'resting' && (
              <motion.div
                key="resting"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                onClick={() => setMode('music')}
                className="flex items-center gap-4 px-4 py-2"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                  <span className="text-xs font-mono font-medium text-neutral-200">7% CPU</span>
                </div>
                <div className="h-3 w-px bg-white/10"></div>
                <span className="text-xs font-semibold text-white tracking-tight">Wayland Island</span>
                <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
                  Slint + Rust
                </span>
              </motion.div>
            )}

            {mode === 'music' && (
              <motion.div
                key="music"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                onClick={() => setMode('telemetry')}
                className="flex items-center gap-3.5 px-4 py-2"
              >
                <div className="w-7 h-7 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Music size={14} />
                </div>
                <div className="flex flex-col pr-1">
                  <span className="text-xs font-semibold text-white tracking-tight leading-none">PipeWire Core</span>
                  <span className="text-[10px] text-neutral-400 mt-1 font-mono">Buffer: 64 spl · 1.3ms</span>
                </div>
                <div className="flex items-center gap-0.5 ml-1">
                  <span className="w-1 h-3 bg-sky-400 rounded-full animate-pulse"></span>
                  <span className="w-1 h-4 bg-sky-400 rounded-full animate-pulse delay-75"></span>
                  <span className="w-1 h-2 bg-sky-400 rounded-full animate-pulse delay-150"></span>
                </div>
              </motion.div>
            )}

            {mode === 'telemetry' && (
              <motion.div
                key="telemetry"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                onClick={() => setMode('resting')}
                className="flex items-center gap-3 px-4 py-2"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Activity size={14} />
                </div>
                <div className="flex flex-col pr-1">
                  <span className="text-xs font-semibold text-white tracking-tight leading-none">18 MB Resident Memory</span>
                  <span className="text-[10px] text-emerald-400 mt-1 font-mono">120 FPS Spring Motion</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Mode Selector Pills */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10">
        {(['resting', 'music', 'telemetry'] as IslandMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium capitalize tracking-tight transition-all duration-200 ${
              mode === m
                ? 'bg-sky-500 text-white shadow-[0_2px_10px_rgba(14,165,233,0.4)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}
