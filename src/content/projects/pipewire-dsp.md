---
title: "PipeWire DSP Broadcast Stack"
tagline: "A headless, system-level audio pipeline running DeepFilterNet 3 and native biquad filters directly in the kernel audio loop, killing room noise on modest hardware without userland bloatware."
category: "Audio DSP & Systems"
featured: true
order: 3
badge: "Systems"
metrics:
  - label: "CPU Overhead"
    value: "0% Spike"
  - label: "Target Loudness"
    value: "-14 LUFS"
  - label: "Architecture"
    value: "Headless PipeWire"
tech:
  - "PipeWire"
  - "DeepFilterNet 3"
  - "ALSA Staging"
  - "Biquad EQ"
  - "Linux Audio"
---

## The Problem: The Inaudible Devlog

Technical devlogs and presentations live or die by vocal clarity. On budget hardware or modest microphones (like a \$15 Logitech webcam or a 3.5mm headset), users either suffer from aggressive fan hum and motherboard electrical coil noise, or install heavy Electron-based audio apps that chew up CPU cycles during recording sessions.

**`PipeWire DSP Broadcast Stack`** stages analog preamp gain properly at the hardware level, eliminates electrical hiss, and wires neural noise suppression into PipeWire's native filter graph—delivering radio-ready -14 LUFS vocal capture with zero perceptible CPU impact.

### System Design

- **Linear Analog Gain Staging**: Drops hardware capture gain from +50dB down to +6dB, eliminating analog clipping and motherboard coil noise at the root.
- **DeepFilterNet 3 Neural Engine**: Removes continuous acoustic room reflections and typing clatter without metallic phasing or speech distortion.
- **Direct PipeWire Integration**: Zero userland GUI bloat; boots with the system as a lightweight systemd user service.
