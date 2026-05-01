#!/usr/bin/env node
// GENESIS SLICE STATE TRACKER
// Read-only. Reads a manifest and reports current slice state.
// Does not write, stage, commit, push, merge, or delete.

"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const BLOCKED_COMMANDS = [
  "git add",
  "git commit",
  "git push",
  "git merge",
  "git branch -D",
  "git push origin --delete",
  "rm -rf",
  "curl",
  "wget",
];

function safeExec(cmd) {
  const cmdLower = cmd.toLowerCase();
  for (const blocked of BLOCKED_COMMANDS) {
    if (cmdLower.includes(blocked)) {
      throw new Error(`BLOCKED: command "${cmd}" is not permitted in the tracker.`);
    }
  }
  try {
    return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();
  } catch (e) {
    return "";
  }
}

function readManifest(manifestPath) {
  const abs = path.resolve(manifestPath);
  if (!fs.existsSync(abs)) {
    console.error(`[ERROR] Manifest not found: ${abs}`);
    process.exit(1);
  }
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(abs, "utf8"));
  } catch (e) {
    console.error(`[ERROR] Manifest parse failed: ${e.message}`);
    process.exit(1);
  }
  return manifest;
}

function checkField(obj, field, label) {
  if (obj[field] === undefined || obj[field] === null) {
    console.error(`[ERROR] Manifest missing field: ${label}`);
    process.exit(1);
  }
}

const DEFAULT_MANIFEST = "manifests/slice-109-orchestrator-manifest.json";
const manifestPath = process.argv[2] || DEFAULT_MANIFEST;

const manifest = readManifest(manifestPath);

checkField(manifest, "schemaVersion", "schemaVersion");
checkField(manifest, "slice", "slice");
if (typeof manifest.slice.number !== "number") {
  console.error("[ERROR] slice.number must be an integer");
  process.exit(1);
}
checkField(manifest.slice, "branch", "slice.branch");
checkField(manifest, "repository", "repository");
checkField(manifest.repository, "remote", "repository.remote");

const LINE = "=".repeat(60);
let failures = 0;

function ok(msg)   { console.log(`[OK]      ${msg}`); }
function fail(msg) { console.log(`[FAIL]    ${msg}`); failures++; }
function info(msg) { console.log(`          ${msg}`); }

// ── HEADER ──────────────────────────────────────────────────
console.log("");
console.log("GENESIS SLICE STATE TRACKER");
console.log(LINE);
console.log(`Manifest: ${manifestPath}`);
console.log("");

// ── SLICE IDENTITY ───────────────────────────────────────────
const expectedBranch = manifest.slice.branch;
const currentBranch  = safeExec("git branch --show-current");

console.log(`Slice:           ${manifest.slice.number} — ${manifest.slice.name}`);
console.log(`Expected branch: ${expectedBranch}`);
console.log(`Current branch:  ${currentBranch}`);

if (currentBranch !== expectedBranch) {
  fail(`Branch mismatch. Expected "${expectedBranch}", got "${currentBranch}"`);
} else {
  ok("Branch matches");
}
console.log("");

// ── REMOTE ───────────────────────────────────────────────────
const expectedRemote = manifest.repository.remote;
const currentRemote  = safeExec("git remote get-url origin");

console.log(`Expected remote: ${expectedRemote}`);
console.log(`Current remote:  ${currentRemote}`);

if (currentRemote !== expectedRemote) {
  fail(`Remote mismatch. Expected "${expectedRemote}", got "${currentRemote}"`);
} else {
  ok("Remote matches");
}
console.log("");

// ── WORKING TREE ─────────────────────────────────────────────
const statusRaw = safeExec("git status --short");
const changedLines = statusRaw ? statusRaw.split("\n").filter(Boolean) : [];

if (changedLines.length === 0) {
  console.log("Working tree:    CLEAN");
} else {
  console.log("Working tree:    CHANGES DETECTED");
  changedLines.forEach(l => info(l));
}
console.log("");

// ── FORBIDDEN CHANGED FILES ───────────────────────────────────
console.log("Forbidden changed files:");
const forbidden = manifest.repository.forbiddenFiles || [];
let forbiddenViolations = 0;
for (const f of forbidden) {
  const violated = changedLines.some(l => l.includes(f));
  if (violated) {
    console.log(`[VIOLATION] ${f}`);
    forbiddenViolations++;
    failures++;
  }
}
if (forbiddenViolations === 0) {
  ok("no forbidden files changed");
}
console.log("");

// ── REQUIRED FILES ────────────────────────────────────────────
console.log("Required files:");
const required = manifest.requiredFiles || [];
let missingFiles = 0;
for (const f of required) {
  if (fs.existsSync(path.resolve(f))) {
    ok(f);
  } else {
    fail(`MISSING: ${f}`);
    missingFiles++;
  }
}
console.log("");

// ── MARKERS ───────────────────────────────────────────────────
console.log("Markers:");
const markers = manifest.markers || {};
let missingMarkers = 0;
for (const [file, marker] of Object.entries(markers)) {
  const abs = path.resolve(file);
  if (!fs.existsSync(abs)) {
    fail(`MISSING FILE for marker check: ${file}`);
    missingMarkers++;
    continue;
  }
  const contents = fs.readFileSync(abs, "utf8");
  if (contents.includes(marker)) {
    ok(`${file} — "${marker}"`);
  } else {
    fail(`MISSING MARKER in ${file} — "${marker}"`);
    missingMarkers++;
  }
}
console.log("");

// ── VALIDATION COMMANDS ───────────────────────────────────────
console.log("Validation commands declared:");
const valCmds = manifest.validationCommands || [];
valCmds.forEach(c => info(c));
console.log("");

// ── INFERRED LIFECYCLE STATE ──────────────────────────────────
let lifecycleState;
if (missingFiles === required.length && required.length > 0) {
  lifecycleState = "NOT STARTED     — branch or required files missing";
} else if (missingFiles > 0 || missingMarkers > 0) {
  lifecycleState = "IN PROGRESS     — some files present, some missing";
} else if (failures === 0) {
  lifecycleState = "CHECKPOINT HELD — ready and no forbidden changes detected";
} else if (forbiddenViolations === 0 && missingFiles === 0 && missingMarkers === 0) {
  lifecycleState = "READY           — all files present, all markers found, no violations";
} else {
  lifecycleState = "IN PROGRESS     — some checks failed";
}

console.log(`Inferred lifecycle state: ${lifecycleState}`);
console.log("");

// ── NEXT SAFE ACTION ──────────────────────────────────────────
let nextAction;
if (failures === 0) {
  nextAction = "Run validation commands, then present GIT CHECKPOINT REQUIRED and await user approval.";
} else if (forbiddenViolations > 0) {
  nextAction = "STOP — forbidden file violation detected. Revert forbidden changes before continuing.";
} else if (missingFiles > 0) {
  nextAction = "Create missing required files, then re-run the tracker.";
} else {
  nextAction = "Fix reported failures, then re-run the tracker.";
}

console.log(`Next safe action: ${nextAction}`);
console.log("");
console.log(LINE);

if (failures > 0) {
  console.log(`TRACKER RESULT: ${failures} check(s) failed.`);
  process.exit(1);
} else {
  console.log("TRACKER RESULT: all checks passed.");
  process.exit(0);
}
