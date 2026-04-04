# Engineering Excellence — Reference

---

## 1. Best Product Architecture

### Core Principles

**Separation of Concerns**
Every layer must own exactly one responsibility. UI never talks to the database. Business logic never leaks into controllers. Persistence never bleeds into services.

```
┌─────────────────────────────────────────┐
│             Presentation Layer          │  ← UI / API endpoints
├─────────────────────────────────────────┤
│             Application Layer           │  ← Use cases / orchestration
├─────────────────────────────────────────┤
│              Domain Layer               │  ← Business rules / entities
├─────────────────────────────────────────┤
│           Infrastructure Layer          │  ← DB / Storage / External APIs
└─────────────────────────────────────────┘
```

### Recommended Architectures by Scale

| Scale | Architecture | When to Use |
| --- | --- | --- |
| Small / Startup | **Monolith (Modular)** | < 5 devs, fast iteration needed |
| Medium | **Modular Monolith** | Single deploy, clear boundaries |
| Large | **Microservices** | Independent scaling per domain |
| Event-heavy | **Event-Driven (EDA)** | High throughput, async workflows |
| ML/Data heavy | **Lambda Architecture** | Batch + stream processing |

### Patterns to Follow

**Hexagonal Architecture (Ports & Adapters)**

```
          [CLI]   [REST API]   [gRPC]
               \      |      /
            ┌──────────────────┐
            │   Application    │
            │   (Use Cases)    │
            └──────────────────┘
               /      |      \
          [DB]    [MQ]    [S3]
```

- Core domain has zero dependencies on external systems
- Adapters plug in from outside
- Swap DB/queue without touching business logic

**Domain-Driven Design (DDD)**

- Define **Bounded Contexts** — each context owns its data model
- Use **Aggregates** to enforce invariants
- Publish **Domain Events** across contexts
- Keep **Anti-Corruption Layers** between contexts

**CQRS (Command Query Responsibility Segregation)**

```
Write Side (Commands) → Event Store → Read Side (Queries)
```

- Separate models for reads and writes
- Optimise each independently
- Essential for high read/write asymmetry

### Architecture Decision Records (ADR)

Every major architectural decision must be documented:

```markdown
# ADR-001: Use LMDB for image storage

## Status: Accepted
## Context: 3 lakh voter images need millisecond fetch
## Decision: Use LMDB with memory-mapped reads
## Consequences: Fast reads, single-writer constraint
```

---

## 2. Best Engineering Practices

### Code Quality Standards

**SOLID Principles**

```
S — Single Responsibility  → One class, one job
O — Open/Closed            → Open for extension, closed for modification
L — Liskov Substitution    → Subtypes must replace base types
I — Interface Segregation  → Small, focused interfaces
D — Dependency Inversion   → Depend on abstractions, not concretions
```

**DRY / YAGNI / KISS**

- **DRY** — Don't Repeat Yourself: extract common logic once
- **YAGNI** — You Aren't Gonna Need It: don't build for imagined futures
- **KISS** — Keep It Simple: complexity is a liability

### Testing Pyramid

```
          /\
         /E2E\          ← Few, slow, expensive (10%)
        /──────\
       /Integr. \       ← Medium (20%)
      /────────────\
     /  Unit Tests  \   ← Many, fast, cheap (70%)
    /────────────────\
```

**Rules:**

- Unit tests must be deterministic and < 10ms
- Mock external I/O in unit tests — never real DB or network
- Integration tests own one contract boundary
- E2E tests own user-facing critical paths only

### CI/CD Pipeline

```
Push → Lint → Unit Tests → Build → Integration Tests → Deploy (staging) → E2E → Deploy (prod)
```

Every step must be:

- **Automated** — no manual gates except production approval
- **Fast** — fail within 5 minutes on bad code
- **Visible** — every failure sends an alert

### Observability (Three Pillars)

```
Logs     → What happened       (structured JSON, correlation IDs)
Metrics  → How it's performing (latency p99, error rate, throughput)
Traces   → Why it happened     (distributed request trace across services)
```

**Must-have instrumentation:**

```python
logger.info("Processing voter image", extra={
    "trace_id": trace_id,
    "book": book_id,
    "page": page_id,
    "duration_ms": elapsed
})
```

### Security Checklist

- [ ] No secrets in code — use Vault / env variables
- [ ] Input validation on every boundary
- [ ] Principle of least privilege for service accounts
- [ ] Encrypt data at rest and in transit
- [ ] Dependency scanning in CI (e.g., `pip audit`, `npm audit`)
- [ ] Rate limiting on all public APIs

---

## 3. Best Code Organisation

### Project Structure (Python — ML/Data Project)

```
project/
│
├── src/
│   ├── domain/                  # Pure business logic — no I/O
│   │   ├── entities/
│   │   ├── services/
│   │   └── events/
│   │
│   ├── application/
│   │   ├── commands/
│   │   ├── queries/
│   │   └── handlers/
│   │
│   ├── infrastructure/
│   │   ├── storage/
│   │   ├── messaging/
│   │   └── ml/
│   │
│   ├── api/
│   │   ├── routes/
│   │   ├── schemas/
│   │   └── middleware/
│   │
│   └── config/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── scripts/
├── notebooks/
├── docker/
├── .env.example
├── pyproject.toml
└── README.md
```

### Naming Conventions

| Element | Convention | Example |
| --- | --- | --- |
| Files | `snake_case` | `voter_processor.py` |
| Classes | `PascalCase` | `VoterImageStore` |
| Functions | `snake_case` | `compress_image()` |
| Constants | `UPPER_SNAKE` | `MAX_WORKERS = 16` |
| Private methods | `_prefix` | `_validate_path()` |
| Types/Interfaces | `PascalCase` | `ImageRepository` |

### Module Dependency Rules

```
api → application → domain ← infrastructure
              ↑_____________________________|
```

**Hard rules:**

- `domain` imports from **nothing** inside the project
- `application` imports only from `domain`
- `infrastructure` implements interfaces defined in `domain`
- `api` orchestrates `application` only

### Configuration Management

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    base_path: str
    lmdb_path: str
    workers: int = 16
    quality: int = 85
    skip_pages: set[str] = {"page_001", "page_002"}
    scan_limit: int | None = None

    class Config:
        env_file = ".env"

settings = Settings()
```

### Error Handling Strategy

```python
class VoterImageNotFound(Exception): ...
class ImageCorruptError(Exception): ...
class StorageWriteError(Exception): ...

def compress_image(path: Path) -> bytes:
    try:
        ...
    except OSError as e:
        raise StorageWriteError(f"Cannot read {path}") from e
```

---

## 4. Best Orchestrator

### What Is an Orchestrator?

An orchestrator coordinates multi-step workflows across workers, services, or systems. It owns the **what and when** — workers own the **how**.

```
Orchestrator
    │
    ├──► Worker A (compress image)
    ├──► Worker B (write to LMDB)
    ├──► Worker C (update index)
    └──► Worker D (send notification)
```

### Orchestration Patterns

**Pipeline Pattern** — sequential steps

```python
result = (
    pipeline
    .scan(base_path)
    .filter(skip_pages)
    .compress(quality=85)
    .store(lmdb_path)
    .report()
)
```

**Fan-out / Fan-in** — parallel workers with aggregation

```python
with ThreadPoolExecutor(max_workers=WORKERS) as executor:
    futures = [executor.submit(process, img) for img in images]
    results = [f.result() for f in as_completed(futures)]
summary = aggregate(results)
```

**Saga Pattern** — distributed transactions with compensation

```
Step 1: compress_image()     → on fail: log_error()
Step 2: write_to_lmdb()      → on fail: delete_partial()
Step 3: update_index()       → on fail: rollback_lmdb_entry()
Step 4: mark_complete()      → on fail: retry(3x)
```

### Production-Grade Orchestrator (Reference)

```python
import lmdb
import io
import os
import logging
import time
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass, field

from PIL import Image
from tqdm import tqdm

logger = logging.getLogger(__name__)


@dataclass
class OrchestrationResult:
    total: int = 0
    success: int = 0
    failed: int = 0
    skipped: int = 0
    errors: list[str] = field(default_factory=list)
    duration_sec: float = 0.0

    @property
    def success_rate(self) -> float:
        return (self.success / self.total * 100) if self.total else 0


class VoterImageOrchestrator:
    """Orchestrates: scan → filter → compress → store → report."""

    def __init__(self, config):
        self.config = config
        self.result = OrchestrationResult()
        self._start = None

    def scan(self) -> list[Path]:
        logger.info("Stage 1/4: Scanning...")
        images = []
        for p in Path(self.config.base_path).rglob("voter_*.png"):
            if self._should_skip(p):
                self.result.skipped += 1
                continue
            images.append(p)
            if self.config.scan_limit and len(images) >= self.config.scan_limit:
                break
        self.result.total = len(images)
        logger.info("  Found %s | Skipped %s", f"{self.result.total:,}", f"{self.result.skipped:,}")
        return images

    def _should_skip(self, path: Path) -> bool:
        return path.parent.name.lower() in self.config.skip_pages

    def _compress(self, img_path: Path) -> tuple[str, bytes] | tuple[None, None]:
        try:
            img = Image.open(img_path)
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
            buf = io.BytesIO()
            img.save(buf, format="JPEG", quality=self.config.quality, optimize=True)
            key = (
                f"{img_path.parent.parent.name}/"
                f"{img_path.parent.name}/{img_path.stem}"
            )
            return key, buf.getvalue()
        except Exception as e:
            self.result.errors.append(f"{img_path.name}: {e}")
            return None, None

    def _store_lmdb(self, images: list[Path]):
        env = lmdb.open(
            self.config.lmdb_path,
            map_size=self.config.map_size,
            writemap=True,
        )
        batch = {}
        flush = 1000

        with ThreadPoolExecutor(max_workers=self.config.workers) as ex:
            futures = {ex.submit(self._compress, img): img for img in images}

            with tqdm(total=self.result.total, desc="Storing to LMDB", unit="img") as pbar:
                for future in as_completed(futures):
                    key, data = future.result()
                    if key and data:
                        batch[key.encode()] = data
                        self.result.success += 1
                    else:
                        self.result.failed += 1

                    if len(batch) >= flush:
                        with env.begin(write=True) as txn:
                            for k, v in batch.items():
                                txn.put(k, v)
                        batch.clear()

                    pbar.update(1)
                    pbar.set_postfix(ok=self.result.success, fail=self.result.failed)

        if batch:
            with env.begin(write=True) as txn:
                for k, v in batch.items():
                    txn.put(k, v)
        env.close()

    def run(self) -> OrchestrationResult:
        self._start = time.time()
        logger.info("=== Orchestration Start ===")
        images = self.scan()
        self._store_lmdb(images)
        self.result.duration_sec = time.time() - self._start
        self._report()
        return self.result

    def _report(self):
        r = self.result
        rate = r.success / r.duration_sec if r.duration_sec else 0.0
        print(f"\n{'=' * 50}")
        print(f"Success     : {r.success:,}")
        print(f"Failed      : {r.failed:,}")
        print(f"Skipped     : {r.skipped:,}")
        print(f"Success rate: {r.success_rate:.1f}%")
        print(f"Duration    : {r.duration_sec:.1f}s")
        print(f"Throughput  : {rate:.0f} img/s")
        if r.errors:
            print("\nFirst 5 errors:")
            for e in r.errors[:5]:
                print(f"   {e}")
        print(f"{'=' * 50}")
```

### Orchestrator Checklist

- [ ] **Idempotent** — safe to re-run without duplicating data
- [ ] **Resumable** — track progress, skip already-done items
- [ ] **Observable** — logs every stage start/end with counts
- [ ] **Bounded** — scan limit prevents runaway memory usage
- [ ] **Error isolated** — one failure never kills the whole pipeline
- [ ] **Reported** — always prints summary: total / success / failed / rate / speed

---

## Summary: When to Apply What

```
Product Architecture  → before writing a single line of code
Engineering Practices → during every pull request, every day
Code Organisation     → when creating a new module or service
Orchestrator Pattern  → when coordinating > 2 steps or > 1 worker
```

> "Make it work. Make it right. Make it fast." — Kent Beck
