# F2 — Public Demo Narrative Layer

F2 upgrades the public product narrative without changing demo logic.

---

## Purpose

Reposition the public demo so a first-time technical visitor understands within 30 seconds:

1. AI coding tools are moving from suggestions to execution.
2. Uncontrolled AI-generated execution creates governance gaps.
3. GENESIS adds a pre-execution gate.
4. ALLOW / REQUIRE_APPROVAL / BLOCK is the core control model.
5. The public demo is intentionally simple — it shows the decision surface only.
6. The private GENESIS core is deeper and not exposed here.
7. The product direction is serious: execution governance for AI-assisted software workflows.

---

## What Changed

**index.html — content and layout only. No detection logic, no JS changes.**

### Hero
- Eyebrow updated: `GENESIS` → `PROVE BY GENESIS`
- Added category statement: "The execution gate for AI-generated code."
- Slogan updated: "Stop risky AI code before it runs." → "AI coding tools are executing. This is the gate."
- Sub updated to use `pre-execution control layer` framing and name all three decisions.
- Trust-line updated to frame the public/private boundary clearly.

### Notice
- Updated to use `concept demo` and `decision surface` language.

### Without / With GENESIS (new section)
- Two-column comparison added immediately below the notice.
- Explains the absence of a governance layer vs the presence of one.
- Red left-border for Without, green left-border for With.

### Demo framing label
- Small uppercase label added above the scenario pills: "Try the public-safe decision surface"

### Honest Boundary (replaced old business boundary)
- Removed: "First simulated fix is free. Additional fixes require a paid pilot or setup." — was confusing for a concept demo.
- Replaced with: explicit, confident honest boundary statement explaining what the demo is and is not.

### Decision Model cards (new — inside the How section)
- Three cards explaining ALLOW, REQUIRE_APPROVAL, and BLOCK.
- Key message: "The value is not only detection — it is the approval boundary and the evidence record."

### Private Core section (new)
- Pipeline visualization: intent → action → safety gate → execution decision → evidence → verified result
- Bullet list of what the private core is designed to provide.
- Language uses "represents", "designed for", "product direction" — not production capability claims.

### Why This Matters section (new)
- Three concrete AI coding scenarios showing the governance gap.
- Closes with: "This turns AI-assisted development from uncontrolled execution into governed execution."

### CTA
- Updated from generic "Have feedback?" to: "Building AI coding workflows at scale? We want to hear what execution-control problems you are seeing."

### Footer
- Updated from "Public demo" to "Public demo — decision surface only"

---

## Positioning Rules

**Use:**
- pre-execution control layer
- AI-generated code
- execution gate
- decision surface
- human approval boundary
- evidence record
- private GENESIS core
- public-safe demo
- governed execution

**Do not use:**
- production-grade
- catches everything
- prevents all AI bugs
- replaces code review
- SOC 2, HIPAA, PCI, compliance claims
- guaranteed security
- semantic analyzer
- AST parser
- enterprise-certified

---

## Public Demo Boundary

The public demo:
- Uses simple visible pattern matching.
- Shows the decision model (ALLOW / REQUIRE_APPROVAL / BLOCK).
- Does not expose the private GENESIS core.
- Does not claim production-grade code analysis.
- Is honest about its scope on the page — explicitly.

A skeptical technical visitor who inspects the demo should find the honest boundary statement before they need to go looking for it.

---

## Why No Detection Logic Changed

Detection logic is in `scripts/genesis-demo.js` and the inline JS in `index.html`. Both are unchanged.

F2 is a narrative upgrade, not a detection upgrade. The goal is correct framing of what the demo already does — not new detection capability. Adding detection capability before the narrative is right would be building in the wrong order.

---

## Validation Checklist

- [ ] Hero says "AI coding tools are executing. This is the gate."
- [ ] Category statement present: "The execution gate for AI-generated code."
- [ ] "pre-execution control layer" appears in the page
- [ ] Without / With GENESIS section present
- [ ] Demo scenarios still work (ALLOW / REQUIRE_APPROVAL / BLOCK)
- [ ] Decision model cards explain all three decisions
- [ ] Private GENESIS core section present with pipeline visualization
- [ ] Why This Matters section with concrete scenarios
- [ ] Honest boundary statement visible and confident (not apologetic)
- [ ] CTA invites technical conversation, not sales conversion
- [ ] No forbidden claims present
- [ ] No JS changes
- [ ] No external dependencies added
- [ ] No backend added
- [ ] Security files untouched (vercel.json, security.txt, robots.txt)
- [ ] demo, demo:danger, demo:dead-code commands still pass

---

## Known Limitations

- The public demo uses pattern matching. This is by design. The honest boundary statement makes this clear.
- False positives are possible. The REQUIRE_APPROVAL tier is the correct response to ambiguous cases.
- The private core architecture is described conceptually only. No private core code is exposed.
- The page does not integrate with external services, analytics, or backends.

---

## Next Possible Slices (after signal from F2)

- **F3 — Scenario Gallery:** Real documented AI coding failure patterns as interactive examples.
- **F4 — Evidence Bundle Display:** A more detailed visualization of what a decision evidence record looks like.
- **F5 — GitHub Actions Integration Concept:** Technical design showing where GENESIS sits in a CI/CD pipeline.
- **F6 — Decision Audit Trail Demo:** An expanded REQUIRE_APPROVAL flow showing the human checkpoint being created.

Do not start any F3+ slice until F2 is merged, live, and at least 5 substantive technical conversations have happened.
