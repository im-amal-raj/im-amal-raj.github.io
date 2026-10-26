---
title: "rust-island"
tagline: "A compact, fluid Dynamic Island for Wayland compositors (Umbriel / Niri). Built with Slint and Rust."
category: "Desktop Shell"
featured: true
order: 1
heroImage: "/images/projects/rust-island.png"
badge: "Daily Driver"
github: "https://github.com/im-amal-raj"
tech:
  - "Rust"
  - "Slint UI"
  - "Wayland Layer Shell"
  - "D-Bus"
  - "PipeWire"
---

## Why I Built It

I love using Wayland on Linux, but I was frustrated with existing desktop bars and overlays. Many of them run on web tech, pulling 300MB+ of RAM and dragging laptop battery just to show the clock, media controls, and status pills.

I wanted something that feels fluid and tactile under the cursor—similar to the polish you get on macOS—without the overhead. So I started building **`rust-island`** in Rust and Slint.

### What It Does

- **Layer Shell Native**: Sits cleanly over your desktop on compositors like Umbriel and Niri without feeling like a foreign window.
- **Micro-Damped Springs**: Uses physical spring equations for transitions so resizing and expansions feel alive rather than like rigid CSS keyframes.
- **Lightweight by Nature**: Compiles directly to native code, running silently with minimal memory impact and instant D-Bus event hooks for audio, battery, and media.
