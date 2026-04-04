---
name: motion-animation-storytelling-designer
description: >-
  Designs cinematic scroll-driven narrative websites where motion serves story:
  pinned sections, parallax, kinetic type, chapter transitions, GSAP/ScrollTrigger,
  performance (GPU-friendly animation), and accessibility (prefers-reduced-motion,
  semantics). Use when building storytelling landings, scroll experiences, hero
  reveals, chapter-based pages, or when the user asks for cinematic web motion,
  scroll narrative, or motion-first UI.
---

# Motion Animation Storytelling Designer

## When to apply

Read this skill when the work is **motion-led narrative web UI**: scroll storytelling, chapter arcs, cinematic heroes, pinned scrub sections, or polished marketing pages where animation carries meaning—not decoration.

## Golden rule

If removing an animation makes the story **clearer**, remove it. Motion must improve comprehension and emotional resonance.

## Core pillars

| Pillar | Meaning |
|--------|---------|
| Narrative first | Every animation serves the story |
| Spatial continuity | Elements feel like one persistent world |
| Emotional timing | Easing carries weight vs revelation |
| Progressive disclosure | Information unfolds like film beats |
| Purposeful pause | Stillness is as strong as movement |

## Motion identity (before coding)

- Pick **one** primary motion personality (e.g. cinematic & weighty).
- Choose **2–3** signature moves used consistently.
- Define tokens: `--duration-base` (e.g. `400ms`), primary easing, entrance/exit/idle for major blocks.

## Five laws (storytelling animation)

1. **Anticipation** — Hint before important beats (subtle offset → settle).
2. **Staging** — Focal element enters last or alone (`animation-delay` as spotlight).
3. **Follow-through** — Motion settles; prefer spring-like easing over flat `ease-out` when organic.
4. **Secondary motion** — Environment reacts (gradients, particles) to primary action.
5. **Timing hierarchy** — Micro 80–200ms, UI 200–400ms, sections 400–800ms, chapters 800–1600ms, ambient 3–8s.

## Page architecture (typical)

1. Optional preloader / intro  
2. Hero / chapter title (full viewport)  
3. Act 1 — establish (scroll-triggered scenes)  
4. Transition break (full-bleed separator)  
5. Act 2 — develop (parallax, pinned sections)  
6. Climax / interactive beat  
7. Resolution + CTA / epilogue  

**Layout:** asymmetric splits (e.g. 40/60), intentional overlap, breathing room, alternate full-bleed vs contained; use `z-index` + `scale` for depth.

## Typography (kinetic)

- **Display:** headlines, chapter titles — expressive/editorial.  
- **Body:** legible narrative — reveal **block-by-block**, not word-by-word at reading speed.  
- **Accent:** labels, nav, meta — mono or condensed.  
- Use **fluid type** with `clamp()`; split lines for staggered reveals when it serves the beat.

## Color & atmosphere

- Background stack: base / surface / elevated.  
- Text: primary / secondary / ghost.  
- Accents: 1–2 story colors + optional **chapter-reactive** accent per section.  
- Layer gradients + optional grain for depth (see [reference.md](reference.md)).

## Non-negotiables: performance

- Target **~60fps** on mid-range devices.  
- Prefer animating **`transform` and `opacity`** only; avoid animating layout props (`width`, `height`, `top`, `left`, margin, padding, `background-color`).  
- Use `requestAnimationFrame` for JS-driven motion; passive scroll listeners where applicable.  
- `will-change` only while animating; remove after.  
- Lazy-load heavy motion (e.g. `requestIdleCallback` + dynamic import).  
- Cap concurrent animated elements (practical guideline: ~≤8 simultaneous).

## Non-negotiables: accessibility

- Global **`prefers-reduced-motion: reduce`** — near-instant transitions + `scroll-behavior: auto`.  
- In JS, gate motion with `matchMedia('(prefers-reduced-motion: reduce)')` and provide instant “visible” fallbacks.  
- Semantic structure: `<main>`, `<article>`, `<section>` with `aria-label` / headings for chapters.  
- Focus management and live region announcements when jumping chapters (see [reference.md](reference.md)).

## Tech stack (defaults)

| Need | Typical choice |
|------|----------------|
| Framework | Next.js / Astro (fast first paint) |
| Scroll / pin / scrub | GSAP + ScrollTrigger |
| Declarative motion (React) | Framer Motion |
| 3D | Three.js / R3F |
| 2D WebGL particles | Pixi.js |
| Video | Mux / Cloudinary |
| Fonts | Variable fonts via `@font-face` |

Bundler: Vite or framework default; CSS: modules or Tailwind as utilities; images: framework-optimized pipelines; optional **lottie-web** for designer assets.

## Workflow for the agent

1. Lock **story outline** (chapters, emotional arc) before layout polish.  
2. Define **palette + motion vocabulary** (3–5 patterns max).  
3. Implement **reveal** and **section** patterns with observers or ScrollTrigger—see [reference.md](reference.md).  
4. Verify **reduced motion**, **focus**, and **perf** (throttled CPU in DevTools).  
5. Run **pre-launch checklist** in [reference.md](reference.md).

## Further detail

- **Patterns, CSS/JS snippets, React `Reveal` example, checklist, inspiration links:** [reference.md](reference.md)
