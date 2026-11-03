---
title: "Notes on Vibe-Coding a Dynamic Island for Wayland"
description: "How having a clear visual idea and collaborating with AI tools brought a fluid desktop widget to life on Linux."
pubDate: 2026-10-24
category: "Desktop UI"
featured: true
readTime: "4 min read"
tags:
  - "Slint"
  - "Wayland"
  - "AI Coding"
  - "Linux"
---

I've always loved fluid, polished interface details, but desktop Linux status widgets usually feel like rigid rectangles.

I wanted a compact pill resting at the top of the screen that could smoothly expand when playing music, adjusting volume, or switching workspaces. Since I'm not a native systems developer writing low-level Rust from scratch, I took a vibe-coding approach: holding a very clear visual and interaction mental model, and using AI coding assistants to write and debug the underlying Slint UI and Rust code.

## The Iteration Loop

1. **Clear Interaction Rules**: Before asking the AI for code, I defined exact states: Compact resting pill, Media preview, Expanded controls, and Launcher mode.
2. **Spring Physics over Static Durations**: Rather than rigid linear easing that snaps when interrupted, we wired continuous spring transitions so expanding and collapsing feels natural and weighted.
3. **Layer Shell Protocol**: By targeting Wayland's layer-shell protocol directly, the island floats above windows smoothly without creating disruptive window-manager focus grabs.

It's been a fun experiment in bringing an idea into reality simply by knowing what you want it to feel like and steering modern developer tools to build it.
