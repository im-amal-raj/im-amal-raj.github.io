import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Sparkles, CornerDownLeft, Volume2 } from 'lucide-react';

type ConsoleTab = 'telemetry' | 'vibe' | 'cli';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system';
  text: string;
  link?: string;
}

const COMMAND_HELP = [
  'projects  - List active software & desktop builds',
  'stack     - View tech stack & toolchain',
  'rig       - Display Linux & Wayland environment specs',
  'contact   - Get direct contact channels',
  'clear     - Reset the terminal buffer',
];

export default function InteractiveConsole() {
  const [activeTab, setActiveTab] = useState<ConsoleTab>('telemetry');
  const [commandInput, setCommandInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'amal@cachyos-rig:~$ welcome to amal raj interactive console v2.4',
    },
    {
      id: 'init-2',
      type: 'system',
      text: 'Type a command or click one of the quick pills below (e.g. projects, rig, stack).',
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newLines: TerminalLine[] = [
      { id: `in-${Date.now()}`, type: 'input', text: `$ ${cmd}` },
    ];

    switch (trimmed) {
      case 'help':
        COMMAND_HELP.forEach((helpText, i) => {
          newLines.push({
            id: `out-${Date.now()}-${i}`,
            type: 'output',
            text: helpText,
          });
        });
        break;

      case 'projects':
        newLines.push(
          { id: `out-${Date.now()}-1`, type: 'output', text: '1. Dynamic Island (Slint UI + Rust) - Native Wayland top-bar', link: '#projects' },
          { id: `out-${Date.now()}-2`, type: 'output', text: '2. RestroBill (Python / Django) - Restaurant POS & table management', link: '#projects' },
          { id: `out-${Date.now()}-3`, type: 'output', text: '3. Event Organizer (Django / SQLite) - Scalable attendee ticketing', link: '#projects' },
          { id: `out-${Date.now()}-4`, type: 'output', text: '4. Discord AutoBot (Python / AsyncIO) - Workflow automation engine', link: '#projects' }
        );
        break;

      case 'stack':
        newLines.push(
          { id: `out-${Date.now()}-1`, type: 'output', text: 'Languages:   Python, Rust, TypeScript, JavaScript' },
          { id: `out-${Date.now()}-2`, type: 'output', text: 'Frameworks:  Django, React 19, Astro v5, Tailwind CSS v4' },
          { id: `out-${Date.now()}-3`, type: 'output', text: 'Systems:     Wayland Layer Shell, Slint, PipeWire DSP, Linux' }
        );
        break;

      case 'rig':
        newLines.push(
          { id: `out-${Date.now()}-1`, type: 'output', text: 'OS:          CachyOS Linux x86_64 (Custom Kernel)' },
          { id: `out-${Date.now()}-2`, type: 'output', text: 'Compositor:  Niri (Scrollable-tiling Wayland)' },
          { id: `out-${Date.now()}-3`, type: 'output', text: 'Audio DSP:   PipeWire + DeepFilterNet 3 (1.3ms buffer)' },
          { id: `out-${Date.now()}-4`, type: 'output', text: 'Memory Bar:  Slint native Dynamic Island (18 MB RSS)' }
        );
        break;

      case 'contact':
        newLines.push(
          { id: `out-${Date.now()}-1`, type: 'output', text: 'Email:  amalMraj@proton.me' },
          { id: `out-${Date.now()}-2`, type: 'output', text: 'GitHub: https://github.com/im-amal-raj' },
          { id: `out-${Date.now()}-3`, type: 'output', text: 'Status: Open for interesting projects & contract builds' }
        );
        break;

      case 'clear':
        setTerminalHistory([]);
        setCommandInput('');
        return;

      default:
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `Command not recognized: "${trimmed}". Type "help" to view options.`,
        });
        break;
    }

    setTerminalHistory((prev) => [...prev, ...newLines]);
    setCommandInput('');
  };

  useEffect(() => {
    if (activeTab === 'cli') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory, activeTab]);

  return (
    <div className="w-full rounded-[22px] bg-neutral-950/75 backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_20px_40px_-12px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col font-mono text-xs">
      {/* Console Chrome Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shadow-[0_0_6px_rgba(244,63,94,0.4)]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_6px_rgba(245,158,11,0.4)]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.4)]"></span>
          </div>
          <span className="text-[11px] font-sans font-medium text-neutral-400 ml-2 hidden sm:inline">
            amal@cachyos:~
          </span>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/40 border border-white/5 font-sans">
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              activeTab === 'telemetry'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Telemetry
          </button>
          <button
            onClick={() => setActiveTab('vibe')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              activeTab === 'vibe'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Philosophy
          </button>
          <button
            onClick={() => setActiveTab('cli')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'cli'
                ? 'bg-sky-500 text-white shadow-[0_0_12px_rgba(14,165,233,0.4)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Terminal size={11} />
            <span>CLI</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="p-4 sm:p-5 min-h-[220px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {activeTab === 'telemetry' && (
            <motion.div
              key="telemetry"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-3 font-sans"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Cpu size={14} className="text-sky-400" />
                  <span className="text-xs font-semibold text-white">Daily Driver Environment</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 font-mono text-[11px]">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                  <span className="text-neutral-400 text-[10px]">OS / KERNEL</span>
                  <span className="text-neutral-200 font-semibold truncate">CachyOS Linux (x86_64)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                  <span className="text-neutral-400 text-[10px]">WAYLAND COMPOSITOR</span>
                  <span className="text-sky-400 font-semibold truncate">Niri (Scrollable-tiling)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                  <span className="text-neutral-400 text-[10px]">DESKTOP TOOLKIT</span>
                  <span className="text-indigo-400 font-semibold truncate">Slint UI + Rust</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                  <span className="text-neutral-400 text-[10px]">AUDIO PIPELINE</span>
                  <span className="text-emerald-400 font-semibold truncate">PipeWire 1.3ms DSP</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                  Tactile UX without background bloat
                </span>
                <span className="font-mono text-neutral-400">18 MB baseline RSS</span>
              </div>
            </motion.div>
          )}

          {activeTab === 'vibe' && (
            <motion.div
              key="vibe"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-3 font-sans"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                <Sparkles size={14} className="text-amber-400" />
                <span className="text-xs font-semibold text-white">Vibe-Coding Engineering Ethos</span>
              </div>
              <p className="text-neutral-300 text-xs leading-relaxed">
                <strong className="text-white">Taste over syntax memorization:</strong> I pair deep architectural intuition with AI coding velocity. Rather than getting bogged down in boilerplate, I architect the system, calibrate physical motion springs, and guide AI agents to deliver lean, production-grade software.
              </p>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-neutral-400">Approach</span>
                <span className="text-amber-300 font-mono">Clean Architecture + Fast Iteration</span>
              </div>
            </motion.div>
          )}

          {activeTab === 'cli' && (
            <motion.div
              key="cli"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-2.5 h-full justify-between"
            >
              <div className="flex flex-col gap-1 max-h-[140px] overflow-y-auto pr-1 text-[11px] leading-relaxed">
                {terminalHistory.map((line) => (
                  <div
                    key={line.id}
                    className={`${
                      line.type === 'input'
                        ? 'text-sky-400 font-semibold'
                        : line.type === 'system'
                        ? 'text-neutral-400'
                        : 'text-neutral-200'
                    }`}
                  >
                    {line.link ? (
                      <a href={line.link} className="hover:text-sky-300 hover:underline">
                        {line.text}
                      </a>
                    ) : (
                      line.text
                    )}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Quick Command Action Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5 font-sans">
                {['projects', 'rig', 'stack', 'contact', 'clear'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleCommand(cmd)}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5 transition-colors"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Interactive Input Line */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommand(commandInput);
                }}
                className="flex items-center gap-2 mt-1 px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10"
              >
                <span className="text-sky-400 font-bold">$</span>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="type 'help' or any command..."
                  className="w-full bg-transparent text-white font-mono text-[11px] focus:outline-none placeholder:text-neutral-600"
                />
                <button
                  type="submit"
                  aria-label="Submit command"
                  className="text-neutral-400 hover:text-sky-400 transition-colors"
                >
                  <CornerDownLeft size={12} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
