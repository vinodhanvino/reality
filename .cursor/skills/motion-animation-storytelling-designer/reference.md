# Motion storytelling — reference

Companion to [SKILL.md](SKILL.md). Patterns, tokens, snippets, and QA.

## Visual identity — motion personality

```
Urgent / Fast ←————————————————————→ Contemplative / Slow
Raw / Abrupt ←————————————————————→ Polished / Smooth
Playful / Bouncy ←——————————————————→ Cinematic / Weighty
Fragmented / Glitchy ←——————————————→ Fluid / Continuous
```

**Identity checklist**

- [ ] One primary motion personality
- [ ] 2–3 signature animation moves
- [ ] `--duration-base` token
- [ ] Primary easing curve
- [ ] Entrance / exit / idle for major elements

## Typography — layers & fluid scale

**Layers**

- Display: headlines, chapter titles — expressive (e.g. Playfair, Clash Display, Syne).
- Body: paragraphs — legible (e.g. Lora, Fraunces, General Sans).
- Accent: tags, nav — mono or condensed (e.g. Space Mono, Barlow Condensed).

**Fluid type**

```css
:root {
  --text-xs:    clamp(0.75rem,  1vw,   0.875rem);
  --text-sm:    clamp(0.875rem, 1.2vw, 1rem);
  --text-base:  clamp(1rem,     1.5vw, 1.125rem);
  --text-lg:    clamp(1.125rem, 2vw,   1.5rem);
  --text-xl:    clamp(1.5rem,   3vw,   2.25rem);
  --text-2xl:   clamp(2rem,     5vw,   4rem);
  --text-hero:  clamp(3rem,     10vw,  9rem);
}
```

**Kinetic rules**

1. Line-by-line reveals: split lines, stagger `animation-delay`.
2. Word emphasis: key words to bold/color on scroll.
3. Body: fade block-by-block — never animate body at reading speed.
4. Reveal copy **before** the user needs to read it.

## Color tokens & atmosphere

```
Background: --bg-base, --bg-surface, --bg-elevated
Text:       --text-primary, --text-secondary, --text-ghost
Accent:     --accent-primary, --accent-warm, --accent-reactive (per chapter)
```

**Layered hero**

```css
.hero-atmosphere {
  background:
    radial-gradient(ellipse 80% 50% at 50% -10%, rgba(120, 80, 255, 0.15), transparent),
    radial-gradient(ellipse 60% 40% at 80% 80%, rgba(255, 100, 50, 0.08), transparent),
    var(--bg-base);
}
```

**Grain overlay** — use a small SVG noise data-URL or asset; `opacity` ~0.03–0.04; `pointer-events: none`; fixed full viewport.

**Chapter accents (example)**

```javascript
const chapters = [
  { id: 'prologue', accent: '#C8A96E', mood: 'warm amber — anticipation' },
  { id: 'act-one',  accent: '#6E9DC8', mood: 'cold blue — conflict' },
  { id: 'act-two',  accent: '#C86E9D', mood: 'rose — emotion peaks' },
  { id: 'climax',   accent: '#FFFFFF', mood: 'white — revelation' },
  { id: 'epilogue', accent: '#6EC8A9', mood: 'teal — resolution' },
];
```

## Easing vocabulary

```css
:root {
  --ease-cinematic-in:  cubic-bezier(0.76, 0, 0.24, 1);
  --ease-reveal:        cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring:        cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-exit:          cubic-bezier(0.4, 0, 1, 1);
  --ease-standard:      cubic-bezier(0.25, 0.1, 0.25, 1);
}
```

## Animation patterns

### Text line reveal

```css
.split-line { overflow: hidden; display: block; }
.split-line span {
  display: block;
  transform: translateY(110%);
  transition: transform 0.9s var(--ease-reveal);
}
.split-line.animate span { transform: translateY(0); }
.split-line:nth-child(2) span { transition-delay: 0.1s; }
.split-line:nth-child(3) span { transition-delay: 0.2s; }
```

### Cinematic image curtain

```css
.image-reveal { position: relative; overflow: hidden; }
.image-reveal::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--bg-base);
  transform: scaleX(1);
  transform-origin: left;
  transition: transform 1.2s var(--ease-cinematic-in);
}
.image-reveal.revealed::after {
  transform: scaleX(0);
  transform-origin: right;
}
```

### Scroll counter (RAF + ease-out cubic)

```javascript
function animateCounter(el, target, duration = 2000) {
  const start = performance.now();
  const update = (time) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
```

### Parallax layers

```javascript
const layers = document.querySelectorAll('[data-parallax]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  layers.forEach((layer) => {
    const speed = parseFloat(layer.dataset.parallax) || 0.5;
    layer.style.transform = `translateY(${scrollY * speed}px)`;
  });
}, { passive: true });
```

### Chapter wipe (fixed overlay)

```css
.chapter-transition {
  position: fixed;
  inset: 0;
  background: var(--accent-primary);
  z-index: 1000;
  transform: scaleY(0);
  transform-origin: bottom;
  pointer-events: none;
}
.chapter-transition.entering { animation: wipe-in 0.6s var(--ease-cinematic-in) forwards; }
.chapter-transition.exiting { animation: wipe-out 0.6s var(--ease-reveal) forwards; }
@keyframes wipe-in { to { transform: scaleY(1); } }
@keyframes wipe-out {
  from { transform: scaleY(1); transform-origin: top; }
  to { transform: scaleY(0); transform-origin: top; }
}
```

### Ambient particles (canvas sketch)

Use a small `ParticleField` class: init particles with `x,y,r,vx,vy,alpha`, update in `requestAnimationFrame`, bounce at edges — keep count modest for perf.

## Scroll storytelling

### GSAP ScrollTrigger pin + scrub

```javascript
gsap.to('.story-scene', {
  scrollTrigger: {
    trigger: '.story-section',
    start: 'top top',
    end: '+=300%',
    pin: true,
    scrub: 1,
  },
  x: '-200vw',
});
```

### IntersectionObserver reveal

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
);
document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
```

### Scroll progress CSS variable

```javascript
window.addEventListener('scroll', () => {
  const progress = window.scrollY / (document.body.scrollHeight - innerHeight);
  document.documentElement.style.setProperty('--scroll-progress', String(progress));
}, { passive: true });
```

```css
.progress-line {
  transform: scaleX(var(--scroll-progress));
  transform-origin: left;
}
```

## Interactive components

### Magnetic cursor (lerp)

```javascript
const cursor = document.querySelector('.custom-cursor');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
function updateCursor() {
  cursorX += (mouseX - cursorX) * 0.12;
  cursorY += (mouseY - cursorY) * 0.12;
  cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
  requestAnimationFrame(updateCursor);
}
updateCursor();
```

### 3D tilt card

```css
.distort-card {
  transition: transform 0.4s var(--ease-spring);
  transform-style: preserve-3d;
}
.distort-card:hover {
  transform: perspective(600px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
}
```

Set `--rx` / `--ry` from pointer position relative to card rect; reset on `mouseleave`.

## Token system (extended)

```css
:root {
  --dur-instant: 80ms;
  --dur-fast: 200ms;
  --dur-normal: 400ms;
  --dur-slow: 700ms;
  --dur-cinematic: 1200ms;
  --dur-epic: 2000ms;
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-in-out: cubic-bezier(0.76, 0, 0.24, 1);
  --ease-snap: cubic-bezier(0.2, 0, 0, 1);
  --section-gap: clamp(6rem, 15vw, 14rem);
  --content-width: min(90rem, 92vw);
  --text-width: min(72ch, 92vw);
}
```

## React `Reveal` wrapper

```jsx
import { useEffect, useRef } from 'react';

export function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('revealed'), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`reveal-wrapper ${className}`}>
      {children}
    </div>
  );
}
```

```css
.reveal-wrapper {
  opacity: 0;
  transform: translateY(2rem);
  transition:
    opacity var(--dur-slow) var(--ease-out-expo),
    transform var(--dur-slow) var(--ease-out-expo);
}
.reveal-wrapper.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

## Performance & reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
```

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function shouldAnimate() {
  return !prefersReducedMotion.matches;
}
function revealElement(el) {
  if (shouldAnimate()) el.classList.add('animate-in');
  else el.classList.add('visible');
}
```

**Perf checklist**

- [ ] `will-change` only during active animation
- [ ] Stacking context via `transform: translateZ(0)` where needed
- [ ] ≤ ~8 concurrent animated elements
- [ ] Passive scroll listeners
- [ ] Throttled CPU test in DevTools

## Accessibility — structure & focus

```html
<main>
  <article aria-label="Story: [Title]">
    <section aria-label="Chapter 1: The Beginning" id="chapter-1">
      <h2 class="visually-hidden">Chapter 1: The Beginning</h2>
    </section>
  </article>
</main>
```

```javascript
function transitionToChapter(chapterEl) {
  chapterEl.setAttribute('tabindex', '-1');
  chapterEl.focus({ preventScroll: true });
  const liveRegion = document.getElementById('sr-announcer');
  liveRegion.textContent = `Now in: ${chapterEl.dataset.chapterTitle}`;
}
```

## Design checklist

**Pre-dev**

- [ ] Story outline + chapter titles + arc
- [ ] Palette + chapter accents
- [ ] Font pairing (display + body + accent)
- [ ] 3–5 signature motion patterns
- [ ] Reduced-motion strategy
- [ ] Perf budget (e.g. LCP < 2.5s)

**During dev**

- [ ] Observer or ScrollTrigger for reveals
- [ ] Only `transform` / `opacity` for motion
- [ ] `prefers-reduced-motion` respected
- [ ] Keyboard paths for interactive beats
- [ ] Custom cursor fallback
- [ ] Chapter transitions preserve scroll sanity
- [ ] Lazy media

**Pre-launch**

- [ ] ~60fps mid-range Android
- [ ] CLS < 0.1 from motion
- [ ] Screen reader story order
- [ ] Focus visible after animations
- [ ] 4x CPU throttle
- [ ] Static fallback without JS

## Inspiration

| Source | Study |
|--------|--------|
| [Bruno Simon](https://bruno-simon.com) | 3D scroll storytelling |
| [The Boat (SBS)](http://www.sbs.com.au/theboat/) | Scroll narrative journalism |
| [Active Theory](https://activetheory.net) | Cinematic transitions |
| [Stripe](https://stripe.com) | Subtle polish |
| [Apple product stories](https://apple.com) | Scroll scrubbing |
| [Locomotive Scroll](https://locomotivemtl.github.io/locomotive-scroll/) | Smooth scroll |
| [GSAP Showcase](https://gsap.com/showcase/) | Pattern bank |

---

*Derived from Motion Designer Spec v1.0.0 (MIT).*
