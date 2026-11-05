---
title: "Notes on Building a Fluid Dynamic Island for Wayland"
description: "Designing and implementing a fluid, spring-animated top-bar for Linux using Slint UI and Rust."
pubDate: 2026-10-24
category: "Desktop UI"
featured: true
readTime: "4 min read"
tags:
  - "Slint"
  - "Wayland"
  - "Rust"
  - "Linux"
---

I've always appreciated fluid, refined interface details, but desktop Linux status widgets often feel like rigid, static rectangles.

I wanted a compact pill resting at the top of the screen that could smoothly expand when playing music, adjusting volume, or switching workspaces. I structured the interaction model around state machines and spring physics, then implemented the desktop application using Slint UI and Rust.

## The Iteration Loop

1. **Clear Interaction Rules**: Before writing code, I defined exact states: Compact resting pill, Media preview, Expanded controls, and Launcher mode.
2. **Spring Physics over Static Durations**: Rather than rigid linear easing that snaps when interrupted, we wired continuous spring transitions so expanding and collapsing feels natural and weighted.
3. **Layer Shell Protocol**: By targeting Wayland's layer-shell protocol directly, the island floats above windows smoothly without creating disruptive window-manager focus grabs.

It has become an essential part of my daily desktop setup on CachyOS and Niri, showing that Linux desktop tooling can feel as fluid and responsive as modern mobile interfaces while consuming less than 20 MB of resident memory.
