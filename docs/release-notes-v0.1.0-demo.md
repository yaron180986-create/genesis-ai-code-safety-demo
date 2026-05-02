# v0.1.0-demo — Public AI Code Safety Gate Demo

**Draft release notes. Do not create GitHub release until manually reviewed and approved.**

---

## Summary

First public release of the GENESIS AI Code Safety Gate demo.

This release demonstrates the core concept: a pre-execution gate that classifies AI-generated code changes as `ALLOW`, `REQUIRE_APPROVAL`, or `BLOCK` before they run.

This is a public-safe demo shell. The private GENESIS core is not included.

---

## What Is Included

- Browser demo (`index.html`) — runs in any browser, no install required
- CLI demo (`scripts/genesis-demo.js`) — Node.js, runs locally
- Three demo scenarios with example JSON inputs
- MIT license
- README with product explanation, flow diagram, and live demo link

---

## Demo Scenarios

| Scenario | Input | Decision |
|---|---|---|
| Safe helper function | `examples/demo-safe.json` | `ALLOW` |
| Export nullification (`module.exports = null`) | `examples/demo-danger.json` | `BLOCK` |
| Dead-code gate (`if(false)`) | `examples/demo-dead-code.json` | `REQUIRE_APPROVAL` |

---

## What Is Intentionally Excluded

- Private GENESIS core (risk engine, diff analysis pipeline, execution control layer)
- Electron-based developer panel
- Full pattern classification ruleset
- Production integration layer (GitHub Actions, CI hooks, IDE plugin)
- Authentication or user management

---

## Known Limitations

- This is a public-safe demo only — not the private GENESIS core
- The demo uses a limited rule set for demonstration purposes
- No guarantee of complete code safety for all possible AI-generated patterns
- No autonomous mutation of repositories — the demo classifies and reports, it does not modify or deploy
- Browser demo simulates decisions; it does not connect to a live backend
- CLI demo is a local Node.js script — no server, no API calls

---

## Suggested Launch Copy

### LinkedIn Post (140–200 words)

> AI coding tools are part of production now.
>
> But there's a gap: AI moves fast, and fast means changes that look fine — until they silently break something downstream.
>
> I built a pre-execution safety gate that classifies every AI-generated change before it runs.
>
> Three decisions:
> - ALLOW — safe to proceed
> - REQUIRE_APPROVAL — risky pattern, needs human sign-off
> - BLOCK — destructive change stopped
>
> Example: `module.exports = null` — a single AI-generated line that silently destroys a module's entire interface. The gate catches it before it runs.
>
> Public demo is live. No install required.
>
> [https://aicodesafety.com](https://aicodesafety.com)
>
> Feedback welcome — especially from developers using Cursor, Copilot, or Claude Code.

---

### X / Twitter Thread

**Tweet 1:**
> AI coding tools can generate code that looks fine — but silently destroys things.
> I built a safety gate that classifies every change before it runs.
> ALLOW / REQUIRE_APPROVAL / BLOCK.

**Tweet 2:**
> Example: `module.exports = null`
> Looks harmless. Destroys the module's entire public interface.
> Your app won't crash — it just stops working.
> The gate catches this before execution.

**Tweet 3:**
> Public demo live. No install. No account.
> Three scenarios you can run in 60 seconds.
> aicodesafety.com
> Feedback welcome.

---

### Hacker News — Show HN Title

> Show HN: A pre-execution safety gate that classifies AI-generated code changes before they run
