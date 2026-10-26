---
title: "rust-island"
tagline: "A native Dynamic Island for Wayland compositors (Umbriel / Niri). Proves Linux desktop UI can have fluid spring physics and compact elegance without running a Chromium instance."
category: "Desktop Shell"
featured: true
order: 1
heroImage: "/images/projects/rust-island-capsule.svg"
badge: "Featured"
github: "https://github.com/im-amal-raj"
metrics:
  - label: "RAM Footprint"
    value: "18 MB"
  - label: "Spring Physics"
    value: "120 FPS"
  - label: "Binary Engine"
    value: "Rust + Slint"
tech:
  - "Rust"
  - "Slint UI"
  - "Wayland Layer Shell"
  - "D-Bus"
  - "PipeWire"
---

## The Problem: Electron Wrapping as Desktop Policy

Modern Linux desktop utilities frequently pull 350MB+ of RAM and run entire headless Chromium instances just to draw a floating pill or status widget. Unused RAM isn't "free"—it drains laptop battery, causes garbage collection stutter, and introduces latency during window switches.

**`rust-island`** proves that desktop Linux can deliver macOS-grade visual craft, continuous squircle geometry, and fluid spring physics while compiling down to a lean native binary that idles silently at 18MB RSS.

### Key Architectural Choices

- **Compiled Slint Core**: GPU-accelerated rendering through FemtoVG/Skia with zero WebKit or Chromium dependencies.
- **Wayland Layer Shell**: Sits natively above compositors (Umbriel, Niri) with hardware alpha blending and live blur.
- **Micro-Damped Springs**: UI transitions inherit physical exit velocity instead of running rigid fixed-duration CSS animations.
- **Zero Background Polling**: D-Bus event hooks for audio, battery, Wi-Fi, and clipboard updates eliminate continuous CPU wakeups.
