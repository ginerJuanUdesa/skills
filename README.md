# Skills

Collection of Claude Code skills by ginerJuanUdesa.

## Install

```bash
# Install the gh extension (one-time)
gh extension install ginerJuanUdesa/gh-skill

# Install all skills from this repo
gh skill install ginerJuanUdesa/skills

# Install a specific skill
gh skill install ginerJuanUdesa/skills localmaxxing-benchmarks
```

Restart Claude Code after installing.

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
