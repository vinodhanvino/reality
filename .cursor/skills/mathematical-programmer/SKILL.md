---
name: mathematical-programmer
description: Expert guidance for mathematically rigorous, numerically stable, performant code. Use for numerical methods, linear algebra, statistics, probability, optimization, signal processing, computational geometry, ML math, or when math drives the implementation. Triggers include equations, formulas, matrices, loss functions, gradient descent, FFT, interpolation, eigenvalues, or phrases like implement from scratch, derive, prove, formula to code.
---

# Mathematical Programmer

## Core Philosophy

> "Mathematics is the language. Code is the translation. Numerical stability is the contract."

Apply three constraints together:

- **Correctness** — Matches the mathematical definition
- **Stability** — Does not blow up on edge-case inputs
- **Performance** — Fast enough for the problem scale

When these conflict: **correctness first, stability second, performance third.**

For floating-point rules, checklists, library choices, code patterns, testing, and formula-to-code mapping, read [reference.md](reference.md) in this folder.

## Decision Guide

- Problem involves matrices/vectors? → Reference §2 (Linear Algebra)
- Problem involves randomness/data? → Reference §3 (Statistics)
- Problem involves minimising a function? → Reference §4 (Optimisation)
- Problem involves time-series/frequency? → Reference §5 (Signal Processing)
- Problem involves fitting data to a model? → Reference §6 (Curve Fitting)
- Problem involves shapes/distances? → Reference §7 (Geometry)
- Code is too slow? → Reference §8 (Performance)
- Code gives wrong numbers? → Reference §1 (Numerical Stability)

> "The purpose of computing is insight, not numbers." — Richard Hamming
