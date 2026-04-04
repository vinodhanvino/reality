---
name: engineering-excellence
description: Guidance on product architecture, engineering practices, code organisation, and orchestration. Use when designing system layers, ADRs, SOLID and testing pyramid, CI/CD, observability, security, Python/ML project layout, dependency rules, or multi-step pipelines with workers. Triggers include monolith vs microservices, hexagonal architecture, DDD, CQRS, orchestrator, saga, fan-out.
---

# Engineering Excellence

## Intent

Apply layered architecture, solid engineering habits, clear code organisation, and production-grade orchestration when building or reviewing software.

For full diagrams, tables, checklists, configuration examples, and the orchestrator reference implementation, read [reference.md](reference.md).

## When to apply what

- **Product architecture** — Before major structural decisions; document with ADRs.
- **Engineering practices** — Every PR: quality, tests, CI, observability, security.
- **Code organisation** — New modules, services, or repos; enforce dependency direction.
- **Orchestrator pattern** — More than two coordinated steps or multiple workers.

> "Make it work. Make it right. Make it fast." — Kent Beck
