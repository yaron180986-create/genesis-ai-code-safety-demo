# GENESIS — Feedback Questions

Use these when talking to developers, potential users, or early testers.

---

## Core Discovery Questions

1. Do you use AI coding tools (Cursor, Copilot, Claude Code, etc.) in your daily workflow?

2. Have you ever had AI-generated code cause a breakage that wasn't immediately obvious?
   - What happened?
   - How long did it take to diagnose?

3. How do you currently review AI-generated diffs before they run?
   - Manual review?
   - CI/lint gates?
   - Nothing — you let it run and catch failures downstream?

---

## Problem Validation

4. How often do you feel uncertain about whether an AI-suggested change is safe to apply?

5. Have you ever seen an AI tool generate a change that looked syntactically correct but was semantically destructive?
   - Examples: nullifying exports, disabling flows, replacing logic with stubs

6. If you had a pre-execution gate that said ALLOW / REQUIRE_APPROVAL / BLOCK — would you trust it? What would it take?

---

## Product Fit

7. Where in your workflow would a safety gate make the most sense?
   - Before applying a diff
   - Before committing
   - Before deploying
   - As a CI check

8. Would you want this as a CLI tool, a CI integration, an IDE extension, or something else?

9. What would make you trust the BLOCK decision and not override it?

---

## Willingness to Pay

10. If GENESIS caught one production-breaking AI diff per week — what would that be worth to you or your team?

11. Are you the person who would buy this, or would it need to go through engineering leadership?

---

## Closing

12. Is there anyone else I should talk to about this?

13. Can I follow up in 2 weeks to show you what's changed?
