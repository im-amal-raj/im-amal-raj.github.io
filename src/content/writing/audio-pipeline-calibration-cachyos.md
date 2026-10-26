---
title: "Calibrating a Broadcast-Ready Vocal Pipeline on CachyOS"
description: "Fixing motherboard electrical leak, staging ALSA gains, and wiring PipeWire neural noise filters for crisp -14 LUFS audio."
pubDate: 2026-10-25
category: "Engineering"
featured: true
readTime: "6 min read"
tags:
  - "Audio"
  - "PipeWire"
  - "Linux"
  - "Optimization"
---

Great devlogs and technical demos live and die by vocal clarity. You can write the cleanest Rust systems code in the world, but if your microphone sounds thin, quiet, or plagued by motherboard coil whine, audio immersion drops immediately.

Here is how I audited and rebuilt the audio recording pipeline on Linux to deliver consistent, broadcast-ready speech at **-14 LUFS**.

## The Problem: The "Electrical Leak" Sound

During audio audits on CachyOS with an ALC257 motherboard codec, the capture chain suffered from a harsh buzzing hiss. 

Inspecting `amixer` revealed the culprit:
- Analog **Capture** was set to `100%` (+30.00 dB).
- Analog **Internal Mic Boost** was set to `+20.00 dB`.

Boosting raw analog signals by **+50 dB** inside a compact laptop chassis turns internal electromagnetic interference (EMI) and power plane ripple into audible noise.

## The Solution: Clean Gain Staging & Neural Filtering

1. **Lower Analog Gain**: Reduce hardware capture to 50–60% (+6 dB), where the analog preamp stays in its linear, low-noise range.
2. **DeepFilterNet / RNNoise in PipeWire**: Use AI-driven neural models to eliminate ambient laptop fan hum without metallic phasing.
3. **Parametric Vocal EQ**:
   - Low-cut high-pass filter at 80Hz (eliminates mechanical desk thumps).
   - Gentle +2.5 dB presence lift at 3.2 kHz for speech intelligibility.
4. **Transparent Compression & Limiting**:
   - Target loudness standard: **-14 LUFS integrated**, with True Peak capped at **-1.5 dBTP**.

The result is radio-grade vocal presence with zero analog noise—calibrated specifically for technical devlogs.
