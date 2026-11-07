# DESIGN SYSTEM & AESTHETIC GUIDELINES

## 1. Visual Direction
- **Theme**: Deep obsidian / warm muted carbon (`#0a0a0c`, `#121216`).
- **Surface Contrast**: Solid high-contrast text (`#f4f4f5`), secondary text (`#a1a1aa`), muted subtle borders (`rgba(255, 255, 255, 0.08)`).
- **Restraint**: Maximum 1 accent color at rest (calm cyan/sky `#38bdf8` or emerald `#34d399`).

## 2. Typography
- **Headings**: Editorial, high-contrast, confident tracking (`-0.025em`). Solid colors only (never `bg-clip-text` gradients).
- **Body**: Clean, readable sans-serif (e.g. system or distinctive humanist face), comfortable line-height (`1.65`).
- **Code & Specs**: Clean monospace (JetBrains Mono or Berkeley Mono) for data, git hashes, and benchmarks.

## 3. UI Hierarchy & The Ladder of Laziness
- **Rung 1**: Plain typography and whitespace beat cards.
- **Rung 2**: Real screenshots, 60fps native captures, and SVG/Mermaid architecture diagrams beat toy interactive widgets.
- **Rung 3**: Semantic HTML (`<details>`, `<a>`, `<time>`) beats complex JavaScript state machines.
- **Rung 4**: Interactive components are ONLY allowed if they connect to real live data (e.g. search filter, theme toggle, live API feed).
