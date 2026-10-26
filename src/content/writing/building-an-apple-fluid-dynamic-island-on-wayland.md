---
title: "Building an Apple-Fluid Dynamic Island on Wayland with Rust & Slint"
description: "How we implemented interruptible spring physics, liquid glass borders, and sub-18MB memory footprint on Linux."
pubDate: 2026-10-24
category: "Devlog"
featured: true
readTime: "5 min read"
youtubeUrl: "https://www.youtube.com/@amalrajm"
tags:
  - "Rust"
  - "Wayland"
  - "Slint"
  - "Apple HIG"
  - "Systems"
---

Why do desktop widgets on Linux so frequently feel ungrounded, or eat hundreds of megabytes of RAM just to render a rounded rectangle?

When I set out to build **`rust-island`**, the challenge was clear: produce a desktop interface that matches the optical fidelity and physical feedback of Apple's Dynamic Island, but engineered with the discipline of a systems programmer.

## 1. The Physics: Live Springs vs Rigid Keyframes

Traditional UI animation uses static easing curves (`ease-in-out` in 300ms). But if the user clicks or hovers while an animation is in flight, static curves either snap to the start or freeze the gesture.

Following the WWDC Fluid Interface principles, `rust-island` uses continuous spring equations:

$$F = -k \Delta x - c v$$

Every transition passes real-time velocity to the next state:
- **Standard Navigation**: $T_0 = 0.35\text{s}, \zeta = 0.85$ (Slight cushion, smooth settling).
- **Expressive Expand**: $T_0 = 0.40\text{s}, \zeta = 0.75$ (Under-damped, 2.8% overshoot).

## 2. The Liquid Glass Material

Apple's dark mode surfaces are never flat `#000000`. They are layered translucent charcoal:
- **Canvas**: `#000000` (Pure pitch black)
- **Resting Island**: `rgba(28, 28, 30, 0.75)` with `backdrop-filter: blur(20px)`
- **Edge Highlight**: A 1px interior highlight `border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.12);`

## 3. Results Under Constraint

Running on CachyOS under the Umbriel compositor, the compiled binary idles at **14–18 MB RSS**, responds at native 120Hz display refresh rate, and provides immediate tactile feedback.

*Watch the complete architectural walkthrough and live demo on my YouTube channel.*
