# Skills

Collection of Claude Code skills by ginerJuanUdesa.

## Skills

### `localmaxxing-benchmarks`

Fetches, filters, analyzes, and submits LLM inference benchmark data on [localmaxxing.com](https://localmaxxing.com).

**Triggers:** "get benchmarks", "fetch benchmark results", "show me benchmark data for [model]", "compare GPU performance", "find speculative decoding benchmarks", "what's the fastest hardware for [model]", "submit a benchmark", "run a benchmark", "scrape localmaxxing", or any mention of localmaxxing.com.

**Capabilities:**
- Submit benchmarks via `POST /api/benchmarks` (Bearer API key auth)
- Dry-run validation before submitting
- Query `GET /api/benchmarks` — filter by model, hardware, GPU, KV cache dtype, attention backend, date ranges, username, spec/MTP flags
- Query `GET /api/leaderboard` — ranked results with VRAM tier, model family, MoE, OS, backend filters
- Browse/search models via `GET /api/models` and `GET /api/models/search`
- Full hardware schemas: `DISCRETE_GPU`, `UNIFIED` (Apple Silicon/APU), `CPU_ONLY`
- Full `engineFlags` schema including spec decoding, MTP, flash attention, KV cache quant, concurrency
- Evals API: list suites, submit runs, dry-run, execute custom suites
- API key management: create, list, revoke
- Benchmark methodology guidance and field constraints

**Key params:** `hfId`, `hwClass` (`DISCRETE_GPU`/`UNIFIED`/`CPU_ONLY`), `gpuName`, `specOnly`, `mtpOnly`, `dateFrom`, `dateTo`, `limit`, `offset`, `memTier`, `hardwareName`, `modelFamily`, `isMoE`, `since`

---

### `port-ledger`

Maintains a shared port ledger at `/home/ports.md` so port bindings never collide across services.

**Triggers:** any time you bind, publish, or hardcode a network port (web/inference/db/API/dev server, Docker `-p`, daemon).

**Capabilities:**
- Reads currently bound ports (`ss -tulpn`) and reserved ports (`/home/ports.md`) before assigning
- Records each binding under its category with today's date, one bullet per service
- Host-aware: stops and asks if the ledger belongs to a different machine
- Stale-entry reuse (~30d+, not currently bound) with user confirmation before overwriting

---

## Install

Replace `localmaxxing-benchmarks` with the skill you want to install.

```bash
# 1. Download the skill
curl -L https://github.com/ginerJuanUdesa/skills/raw/master/localmaxxing-benchmarks.skill -o /tmp/skill.zip

# 2. Install for your AI tool
unzip -o /tmp/skill.zip -d ~/.claude/skills/                             # Claude Code
unzip -p /tmp/skill.zip '*/SKILL.md' >> ~/.opencode/instructions.md      # OpenCode
unzip -p /tmp/skill.zip '*/SKILL.md' >> AGENTS.md                        # Codex CLI
unzip -p /tmp/skill.zip '*/SKILL.md' >> .github/copilot-instructions.md  # GitHub Copilot
unzip -p /tmp/skill.zip '*/SKILL.md' >> .cursor/rules/skill.mdc          # Cursor
unzip -p /tmp/skill.zip '*/SKILL.md' >> .windsurfrules                   # Windsurf
```
