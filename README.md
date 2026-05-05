# Skills

Collection of Claude Code skills by ginerJuanUdesa.

## Skills

### `localmaxxing-benchmarks`

Fetches, filters, and analyzes LLM inference benchmark data from [localmaxxing.com](https://localmaxxing.com).

**Triggers:** "get benchmarks", "fetch benchmark results", "show me benchmark data for [model]", "compare GPU performance", "find speculative decoding benchmarks", "what's the fastest hardware for [model]", "scrape localmaxxing", or any mention of localmaxxing.com.

**Capabilities:**
- Queries `https://localmaxxing.com/api/benchmarks` (public, no auth)
- Filters by model (`hfId`), hardware class, GPU name, chip vendor/family, KV cache dtype, attention backend, date ranges, username
- Handles pagination
- Includes Python helpers and curl recipes

**Key params:** `hfId`, `hwClass` (`DISCRETE_GPU`/`UNIFIED`/`CPU_ONLY`), `gpuName`, `specOnly`, `mtpOnly`, `dateFrom`, `dateTo`, `limit`, `offset`

---

## Install

Replace `localmaxxing-benchmarks` with the skill you want to install.

### Claude Code

```bash
curl -L https://github.com/ginerJuanUdesa/skills/raw/master/localmaxxing-benchmarks.skill -o /tmp/skill.zip
unzip -o /tmp/skill.zip -d ~/.claude/skills/
# Restart Claude Code
```

### OpenCode

```bash
curl -L https://github.com/ginerJuanUdesa/skills/raw/master/localmaxxing-benchmarks.skill -o /tmp/skill.zip
unzip -p /tmp/skill.zip '*/SKILL.md' >> ~/.opencode/instructions.md
```

### Codex CLI

```bash
curl -L https://github.com/ginerJuanUdesa/skills/raw/master/localmaxxing-benchmarks.skill -o /tmp/skill.zip
unzip -p /tmp/skill.zip '*/SKILL.md' >> AGENTS.md
```

### GitHub Copilot

```bash
curl -L https://github.com/ginerJuanUdesa/skills/raw/master/localmaxxing-benchmarks.skill -o /tmp/skill.zip
unzip -p /tmp/skill.zip '*/SKILL.md' >> .github/copilot-instructions.md
```

### Cursor

```bash
curl -L https://github.com/ginerJuanUdesa/skills/raw/master/localmaxxing-benchmarks.skill -o /tmp/skill.zip
unzip -p /tmp/skill.zip '*/SKILL.md' >> .cursor/rules/localmaxxing-benchmarks.mdc
```

### Windsurf

```bash
curl -L https://github.com/ginerJuanUdesa/skills/raw/master/localmaxxing-benchmarks.skill -o /tmp/skill.zip
unzip -p /tmp/skill.zip '*/SKILL.md' >> .windsurfrules
```
