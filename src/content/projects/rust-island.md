---
title: "rust-island"
tagline: "Authentic Apple-grade Dynamic Island on Wayland built in Rust & Slint."
category: "Systems / Wayland"
featured: true
order: 1
heroImage: "/images/projects/island_expanded.png"
badge: "Featured"
github: "https://github.com/im-amal-raj"
metrics:
  - label: "RAM Usage"
    value: "< 18 MB"
  - label: "Spring Physics"
    value: "120 FPS"
  - label: "Engine"
    value: "Rust + Slint"
tech:
  - "Rust"
  - "Slint UI"
  - "Wayland Layer Shell"
  - "D-Bus"
  - "PipeWire"
---

## The Vision: Apple Polish Without Electron Bloat

Modern Linux desktop environments often compromise on either visual fluidity or resource efficiency. Heavy desktop overlays frequently pull hundreds of megabytes of RAM while stuttering during animated layout changes.

**`rust-island`** brings authentic Apple HIG design, continuous curvature squircles, and mathematically calibrated spring physics ($\text{response} = 0.35\text{s}, \zeta = 0.85$) to modern Wayland compositors (such as Umbriel and Niri) with near-zero resource impact.

### Architectural Highlights

- **Rust & Slint UI Core**: Compiles down to native machine code with GPU-accelerated rendering through FemtoVG/Skia.
- **Wayland Layer Shell**: Renders smoothly above windows with transparent alpha channels and live blur surfaces (`rgba(28, 28, 30, 0.75)`).
- **Sub-18MB Memory Footprint**: Idles silently without background garbage collection or browser engine overhead.
- **D-Bus & PipeWire Integration**: Real-time volume feedback, media playback controls, Wi-Fi status, and system clipboard tracking.
