# Skills

Collection of Claude Code skills by ginerJuanUdesa.

## Tutorial: Installing Skills

### 1. Install the `gh-skill` extension (one-time setup)

You need the [GitHub CLI](https://cli.github.com/) installed and authenticated.

```bash
gh extension install ginerJuanUdesa/gh-skill
```

Verify it works:

```bash
gh skill --help
```

### 2. Install skills

**Install all skills from this repo:**

```bash
gh skill install ginerJuanUdesa/skills
```

**Install a specific skill:**

```bash
gh skill install ginerJuanUdesa/skills localmaxxing-benchmarks
```

Skills are extracted to `~/.claude/skills/`.

### 3. Restart Claude Code

Skills are loaded at startup. Restart Claude Code after installing.

```bash
# Verify skill was installed
ls ~/.claude/skills/
```

### 4. Use the skill

Once restarted, Claude will automatically use the skill when relevant triggers appear in your prompts. For example, with `localmaxxing-benchmarks` installed, just ask:

> "Show me benchmark results for Qwen3-8B on discrete GPUs"

---

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
