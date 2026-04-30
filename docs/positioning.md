# GENESIS — Positioning and Scope

## What GENESIS is

GENESIS is an AI code safety gate — a pre-execution checkpoint that intercepts AI-generated code changes and classifies them before they run.

It answers one question: **Is this change safe to execute?**

---

## What GENESIS is NOT

**Not a Copilot replacement.**
GENESIS does not write code. It does not suggest completions. It does not generate diffs.
It inspects changes that AI tools have already produced.

**Not a code writer.**
GENESIS sits downstream of AI coding tools — Copilot, Cursor, Claude Code, or any other.
It reviews their output, not produces it.

**Not an IDE plugin (in this demo).**
The production GENESIS system integrates directly into the execution pipeline.
This public demo is a CLI shell only.

---

## What this public package is

This repository is a public positioning and demo package.

It contains:
- A static demo CLI that simulates GENESIS decision output
- Sample JSON inputs representing safe, dangerous, and dead-code scenarios
- Documentation explaining the product concept

It does NOT contain:
- The private GENESIS core engine
- The real risk scoring or decision engine
- The execution control layer
- The Electron developer panel
- Any active project data or runtime logs
- Internal roadmap or architecture documents

---

## Why the core is private

The core GENESIS engine contains proprietary risk heuristics, a real-time diff analysis pipeline, and an execution control system built specifically to intercept AI-generated code at the point of execution.

Releasing that logic publicly would eliminate the product's defensibility.

This public demo exists to demonstrate the concept, invite feedback, and establish market positioning — not to expose the implementation.

---

## Target user

Senior engineers and engineering leads at teams that use AI coding tools heavily and want a safety layer between AI output and production execution.

---

## Status

Early MVP. Feedback welcome.

Contact: [hello@aicodesafety.com](mailto:hello@aicodesafety.com)

Temporary fallback: [yaron180986@gmail.com](mailto:yaron180986@gmail.com)
