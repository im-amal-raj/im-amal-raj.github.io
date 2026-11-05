import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Activity } from 'lucide-react';

export default function AudioDspWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSupported, setAudioSupported] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Initialize or start calm ambient generative sound
  const toggleSound = async () => {
    try {
      if (isPlaying) {
        // Fade out smoothly
        if (gainNodeRef.current && audioCtxRef.current) {
          gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.15);
          setTimeout(() => {
            oscillatorsRef.current.forEach((osc) => {
              try {
                osc.stop();
                osc.disconnect();
              } catch (_) {}
            });
            oscillatorsRef.current = [];
            setIsPlaying(false);
          }, 200);
        } else {
          setIsPlaying(false);
        }
        return;
      }

      // Start Web Audio Context
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) {
        setAudioSupported(false);
        return;
      }

      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioContextClass();
      }

      if (audioCtxRef.current.state === 'suspended') {
        await audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;

      // Master Gain with gentle fade in
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.setTargetAtTime(0.08, ctx.currentTime, 0.4); // Comfortable calm volume
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Biquad Lowpass filter for warm analog tone
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(680, ctx.currentTime);
      filter.Q.setValueAtTime(2.5, ctx.currentTime);
      filter.connect(masterGain);

      // Harmonious warm chords (432Hz fundamental, 648Hz fifth, and deep warm octave 216Hz)
      const freqs = [216, 432, 648];
      const newOscs: OscillatorNode[] = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Subtle slow frequency modulation for breathing aura
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.15 + idx * 0.08, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(idx === 0 ? 0.6 : 0.25, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(filter);

        osc.start();
        newOscs.push(osc);
      });

      oscillatorsRef.current = newOscs;
      setIsPlaying(true);
    } catch (err) {
      console.warn('Web Audio error:', err);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (_) {}
      });
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  // Canvas Waveform / Equalizer Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let step = 0;
    const barCount = 20;

    const render = () => {
      step += isPlaying ? 0.08 : 0.02;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const barWidth = width / barCount - 2;

      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + 2);
        // Base sine wave modulation
        const wave = Math.sin(step + i * 0.45) * 0.5 + 0.5;
        const multiplier = isPlaying ? 0.85 : 0.25;
        const barHeight = Math.max(4, wave * height * multiplier);
        const y = height - barHeight;

        // Gradient coloring
        const grad = ctx.createLinearGradient(0, height, 0, y);
        if (isPlaying) {
          grad.addColorStop(0, '#10b981'); // Emerald
          grad.addColorStop(1, '#0ea5e9'); // Sky blue
        } else {
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0.35)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [2, 2, 0, 0]);
        ctx.fill();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={14} className={isPlaying ? 'text-emerald-400' : 'text-neutral-400'} />
          <span className="text-xs font-semibold text-white tracking-tight">PipeWire DSP Engine</span>
        </div>
        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-300 border border-white/10">
          {isPlaying ? '432 Hz Ambient ON' : '1.3ms Latency · 64 spl'}
        </span>
      </div>

      {/* Reactive Visualizer Canvas */}
      <div className="relative w-full h-14 bg-black/40 rounded-xl border border-white/5 p-2 flex items-end overflow-hidden">
        <canvas
          ref={canvasRef}
          width={280}
          height={48}
          className="w-full h-full block"
        />
        {isPlaying && (
          <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Calm Wave Active</span>
          </div>
        )}
      </div>

      {/* Interactive Play / Sound Button */}
      {audioSupported && (
        <button
          onClick={toggleSound}
          type="button"
          className={`flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl text-xs font-semibold tracking-tight transition-all duration-200 select-none ${
            isPlaying
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
              : 'bg-white/5 text-neutral-200 hover:text-white hover:bg-white/10 border border-white/10'
          }`}
          aria-label={isPlaying ? 'Pause Calm Ambient Sound' : 'Play Calm Ambient Sound (432Hz)'}
        >
          {isPlaying ? (
            <>
              <Pause size={13} className="text-emerald-400" />
              <span>Pause Calm Ambient Sound</span>
              <Volume2 size={13} className="text-emerald-400 ml-auto" />
            </>
          ) : (
            <>
              <Play size={13} className="text-sky-400" />
              <span>Play Calm Ambient Sound (432 Hz)</span>
              <VolumeX size={13} className="text-neutral-500 ml-auto" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
