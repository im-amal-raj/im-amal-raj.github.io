---
title: "PipeWire DSP Audio Pipeline"
tagline: "Headless Linux audio filtering using PipeWire and DeepFilterNet for clean -14 LUFS vocal capture on modest hardware."
category: "Audio DSP & Systems"
featured: true
order: 3
badge: "Audio Stack"
tech:
  - "PipeWire"
  - "DeepFilterNet"
  - "ALSA Gain Staging"
  - "Biquad EQ"
  - "Linux Audio"
---

## Why I Built It

Good vocal audio matters when recording tutorials or devlogs. But on my laptop's built-in 3.5mm jack and an affordable $15 Logitech webcam mic, the recording suffered from a harsh electrical buzzing hiss and laptop fan whine.

Rather than buying expensive studio preamps or running heavy Electron-based audio apps, I audited the hardware gain chain with `amixer`. Lowering analog boost and wiring DeepFilterNet directly into PipeWire's native filter graph produced clean, radio-quality audio with virtually no CPU impact.

### What It Does

- **Eliminates Motherboard Hiss**: Fixes the root electrical leak by lowering analog capture gain from +50dB to +6dB.
- **Neural Noise Suppression**: Uses DeepFilterNet directly in PipeWire to strip background room reflections and keystrokes without metallic phasing.
- **Headless & Invisible**: Runs automatically as a user service with zero desktop UI bloat.
