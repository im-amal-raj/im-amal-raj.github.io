import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Activity } from 'lucide-react';

export default function AudioDspWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [audioSupported, setAudioSupported] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const volumeGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Handle Volume Change
  const handleVolumeChange = (newVal: number) => {
    setVolume(newVal);
    if (volumeGainRef.current && audioCtxRef.current) {
      volumeGainRef.current.gain.setTargetAtTime(newVal, audioCtxRef.current.currentTime, 0.05);
    }
  };

  // Toggle Calm Ambient Generative Sound
  const toggleSound = async () => {
    try {
      if (isPlaying) {
        // Fade out smoothly
        if (masterGainRef.current && audioCtxRef.current) {
          masterGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.2);
          setTimeout(() => {
            oscillatorsRef.current.forEach((osc) => {
              try {
                osc.stop();
                osc.disconnect();
              } catch (_) {}
            });
            oscillatorsRef.current = [];
            setIsPlaying(false);
          }, 250);
        } else {
          setIsPlaying(false);
        }
        return;
      }

      // Initialize Web Audio Context
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

      // Volume Gain Node
      const volumeGain = ctx.createGain();
      volumeGain.gain.setValueAtTime(volume, ctx.currentTime);
      volumeGain.connect(ctx.destination);
      volumeGainRef.current = volumeGain;

      // Master Gain for smooth fade-in
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.setTargetAtTime(0.09, ctx.currentTime, 0.4);
      masterGain.connect(volumeGain);
      masterGainRef.current = masterGain;

      // Warm analog lowpass filter (removes any harsh treble frequencies)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.Q.setValueAtTime(1.8, ctx.currentTime);
      filter.connect(masterGain);

      // Warm 432 Hz Binaural Harmony: 216Hz Sub, 432Hz Fundamental, 648Hz Fifth
      const harmonics = [
        { freq: 216, gain: 0.5, type: 'sine' as OscillatorType, lfoFreq: 0.08 },
        { freq: 432, gain: 0.35, type: 'triangle' as OscillatorType, lfoFreq: 0.12 },
        { freq: 648, gain: 0.15, type: 'sine' as OscillatorType, lfoFreq: 0.18 },
      ];

      const newOscs: OscillatorNode[] = [];

      harmonics.forEach(({ freq, gain, type, lfoFreq }) => {
        const osc = ctx.createOscillator();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Slow frequency modulation for gentle breathing warmth
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(lfoFreq, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(1.2, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(gain, ctx.currentTime);
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

  // Clean up Web Audio nodes on unmount
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

  // Equalizer Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let step = 0;
    const barCount = 24;

    const render = () => {
      step += isPlaying ? 0.07 : 0.02;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const spacing = 3;
      const barWidth = (width - spacing * (barCount - 1)) / barCount;

      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + spacing);
        const wave = Math.sin(step + i * 0.35) * 0.5 + 0.5;
        const multiplier = isPlaying ? 0.85 : 0.22;
        const barHeight = Math.max(3, wave * height * multiplier);
        const y = height - barHeight;

        const grad = ctx.createLinearGradient(0, height, 0, y);
        if (isPlaying) {
          grad.addColorStop(0, '#10b981'); // Emerald base
          grad.addColorStop(1, '#38bdf8'); // Cyan tip
        } else {
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0.30)');
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
    <div className="w-full flex flex-col gap-3 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={14} className={isPlaying ? 'text-emerald-400' : 'text-neutral-400'} />
          <span className="text-xs font-semibold text-white tracking-tight">PipeWire Audio Pipeline</span>
        </div>
        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-300 border border-white/10">
          {isPlaying ? '432 Hz Binaural' : '1.3ms Latency · 48 kHz'}
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
            <span>Harmonic Active</span>
          </div>
        )}
      </div>

      {/* Controls: Play Toggle & Volume Slider */}
      {audioSupported && (
        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={toggleSound}
            type="button"
            className={`flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl text-xs font-semibold tracking-tight transition-all duration-200 select-none ${
              isPlaying
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                : 'bg-white/5 text-neutral-200 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
            aria-label={isPlaying ? 'Pause Calm Ambient Sound' : 'Play Calm Ambient Sound (432Hz)'}
          >
            {isPlaying ? (
              <>
                <Pause size={13} className="text-emerald-400" />
                <span>Pause Ambient Sound</span>
                <Volume2 size={13} className="text-emerald-400 ml-auto" />
              </>
            ) : (
              <>
                <Play size={13} className="text-sky-400" />
                <span>Play Calm Sound (432 Hz)</span>
                <VolumeX size={13} className="text-neutral-500 ml-auto" />
              </>
            )}
          </button>

          {/* Volume Slider Control */}
          {isPlaying && (
            <div className="flex items-center gap-2 px-1 pt-1 text-[11px] text-neutral-400">
              <span className="font-mono text-[10px]">VOL</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-sky-400"
                aria-label="Adjust ambient sound volume"
              />
              <span className="font-mono text-[10px] w-7 text-right">{Math.round(volume * 100)}%</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
