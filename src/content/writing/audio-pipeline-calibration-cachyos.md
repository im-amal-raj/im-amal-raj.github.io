---
title: "Fixing Microphone Hiss and Gain Staging on Linux"
description: "How auditing ALSA preamp levels and routing neural noise filters in PipeWire fixed an annoying motherboard electrical noise issue."
pubDate: 2026-10-25
category: "Linux & Audio"
featured: true
readTime: "4 min read"
tags:
  - "Audio"
  - "PipeWire"
  - "Linux"
  - "Setup"
---

When recording voice calls or demos on my Linux laptop using an inexpensive headset and webcam microphone, the capture audio had a constant background buzzing hiss that made it sound like an electrical leak.

Rather than assuming the microphone hardware was broken, I audited the sound pipeline using `amixer` and PipeWire.

## The Culprit: Too Much Analog Boost

Checking the ALSA mixer settings for the onboard ALC257 codec revealed the problem:
- **Capture** was pushed to `100%` (+30.00 dB).
- **Internal Mic Boost** was turned on at `+20.00 dB`.

Stacking +50 dB of hardware analog boost inside a laptop chassis amplifies motherboard electromagnetic coil whine and power ripple directly into the audio stream.

## The Fix: Gain Staging and Neural Filtering

1. **Drop Analog Gain**: Backed off the hardware capture slider to ~55% (+6 dB), allowing the audio preamp to operate in its cleanest linear range.
2. **DeepFilterNet in PipeWire**: Loaded a native PipeWire filter-chain node running DeepFilterNet to remove ambient laptop fan noise without introducing underwater metallic artifacts.
3. **High-Pass Filter**: Added a gentle 80Hz low-cut to strip low-frequency mechanical rumble from the desk.

The microphone output immediately became clear and clean with zero extra software running in userland.
