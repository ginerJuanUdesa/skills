#!/usr/bin/env node
"use strict";

const { mkdirSync, writeFileSync } = require("fs");
const { homedir } = require("os");
const { join, dirname } = require("path");
const { inflateRawSync } = require("zlib");

const [,, command, repoUrl] = process.argv;

if (command !== "add" || !repoUrl) {
  console.error("Usage: npx ccskills add <github-repo-url>");
  process.exit(1);
}

const match = repoUrl.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
if (!match) {
  console.error("Invalid GitHub URL:", repoUrl);
  process.exit(1);
}
const [, owner, repo] = match;

const SKILLS_DIR = join(homedir(), ".claude", "skills");

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "ccskills", "Accept": "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  return res.json();
}

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: { "User-Agent": "ccskills" } });
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

function parseZip(buf) {
  const entries = [];
  let i = 0;
  while (i <= buf.length - 30) {
    if (buf.readUInt32LE(i) !== 0x04034b50) { i++; continue; }
    const compression = buf.readUInt16LE(i + 8);
    const compressedSize = buf.readUInt32LE(i + 18);
    const fileNameLen = buf.readUInt16LE(i + 26);
    const extraLen = buf.readUInt16LE(i + 28);
    const fileName = buf.slice(i + 30, i + 30 + fileNameLen).toString("utf8");
    const dataStart = i + 30 + fileNameLen + extraLen;
    const compData = buf.slice(dataStart, dataStart + compressedSize);
    const data = compression === 8 ? inflateRawSync(compData) : compData;
    entries.push({ name: fileName, data });
    i = dataStart + compressedSize;
  }
  return entries;
}

async function installSkill(downloadUrl, skillName) {
  const buf = await fetchBuffer(downloadUrl);
  const entries = parseZip(buf);

  for (const entry of entries) {
    if (entry.name.endsWith("/")) continue;
    // Strip top-level directory prefix from zip paths
    const relPath = entry.name.replace(/^[^/]+\//, "");
    if (!relPath) continue;
    const dest = join(SKILLS_DIR, skillName, relPath);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, entry.data);
  }

  console.log(`  ${skillName} → ${join(SKILLS_DIR, skillName)}`);
}

async function main() {
  console.log(`Fetching from ${owner}/${repo}...`);
  const contents = await fetchJson(`https://api.github.com/repos/${owner}/${repo}/contents/`);
  const skillFiles = contents.filter((f) => f.name.endsWith(".skill") && f.type === "file");

  if (skillFiles.length === 0) {
    console.log("No .skill files found.");
    process.exit(0);
  }

  mkdirSync(SKILLS_DIR, { recursive: true });

  for (const file of skillFiles) {
    const skillName = file.name.replace(/\.skill$/, "");
    process.stdout.write(`Installing ${skillName}... `);
    await installSkill(file.download_url, skillName);
  }

  console.log(`\nDone! ${skillFiles.length} skill(s) installed. Restart Claude Code to load.`);
}

main().catch((e) => { console.error("Error:", e.message); process.exit(1); });
