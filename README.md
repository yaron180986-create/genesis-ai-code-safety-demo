# GENESIS AI Code Safety Gate

A public-safe demo showing how risky AI-generated code changes can be blocked before execution.

---

## The Problem

AI coding tools can move fast — sometimes too fast.

They may generate code that looks harmless but can:
- break exports
- disable critical flows
- replace working logic
- introduce dead-code gates
- create destructive changes before a human notices

Example:

```js
module.exports = null;
```

That single line silently destroys a module's entire public interface.  
Your app won't crash immediately. It will just silently stop working.  
And the AI that wrote it had no idea.

---

## The Solution

GENESIS sits between AI-generated code and execution.

Every change is evaluated before it runs.  
Every decision is explicit.

| Decision | Meaning |
|----------|---------|
| `ALLOW` | Change is safe — proceed automatically |
| `REQUIRE_APPROVAL` | Risky pattern detected — human sign-off required |
| `BLOCK` | Destructive change stopped — not executed |

---

## Try the Browser Demo

Open the static HTML demo directly — no install required:

```bash
open index.html
```

Or double-click `index.html` in the repo folder.

The browser demo includes:

- Safe helper change → ALLOW
- Dead-code gate → REQUIRE_APPROVAL
- Export nullification → BLOCK
- Custom input textarea

> Note: This is a public-safe browser demo. The private GENESIS core is not included.
> First simulated fix is free. Additional fixes require a paid pilot or setup.

---

## Live Demo

```bash
git clone https://github.com/yaron180986-create/genesis-ai-code-safety-demo.git
cd genesis-ai-code-safety-demo
npm install
```

Run the scenarios:

```bash
npm run demo          # Safe helper addition → ALLOW
npm run demo:danger   # module.exports = null → BLOCK
npm run demo:dead-code  # if(false) gate → REQUIRE_APPROVAL
```

Or run directly:

```bash
node scripts/genesis-demo.js examples/demo-safe.json
node scripts/genesis-demo.js examples/demo-danger.json
node scripts/genesis-demo.js examples/demo-dead-code.json
```

---

## Demo Scenarios

| Scenario | Pattern | Decision |
|----------|---------|----------|
| `demo-safe.json` | Safe helper function added | `ALLOW` |
| `demo-danger.json` | `module.exports = null` — export destruction | `BLOCK` |
| `demo-dead-code.json` | `if(false)` — dead-code gate | `REQUIRE_APPROVAL` |

---

## Who This Is For

**Developers** using AI coding assistants (Cursor, Copilot, Claude Code, etc.)  
You've seen the AI make a change that looked fine — then broke something.  
GENESIS gives you a safety layer without slowing down the flow.

**Founders and engineering leads** building AI-assisted teams  
You want your team to move fast with AI — but not break production.  
GENESIS is the control layer that makes that safe.

**AI tooling builders**  
You're building on top of LLMs and need deterministic safety gates.  
GENESIS is designed to plug in between generation and execution.

---

## What This Repo Is

This is a **public-safe demo shell**.

It demonstrates the GENESIS decision surface — the output layer that developers and integrators interact with.

The private GENESIS core includes:
- A real-time AI diff analysis pipeline
- A private risk engine with pattern classification
- An execution control layer
- An Electron-based developer panel (Genesis Panel)

None of those are in this repository.  
**GENESIS core is always private.**

---

## Architecture (Public View)

```
AI Tool Output
      │
      ▼
┌─────────────────────┐
│   GENESIS Safety    │  ← This demo shows this surface
│   Gate (Decision)   │
└─────────────────────┘
      │
   ALLOW / REQUIRE_APPROVAL / BLOCK
      │
      ▼
 Execution Layer
```

---

## Status

Early MVP — actively seeking feedback from developers using AI coding tools.

If you work with AI-generated code at scale and want to talk:

**Contact:** yaron180986@gmail.com

---

> GENESIS core is private. This repo is a public demo only.
