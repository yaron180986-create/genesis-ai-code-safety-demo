# GENESIS — First Paid Pilot Offer

---

## WHO THIS IS FOR

Teams or solo developers who:

1. Are using AI agents (Cursor, Copilot, Claude, GPT-4, etc.) to write or modify production code
2. Have had at least one incident where AI-generated code caused an unexpected breakage
3. Want a safety layer between AI output and their execution pipeline

---

## WHAT THE PILOT INCLUDES

### Tier: Founder Pilot — $0 / month (first 5 seats)

- Direct access to Yaron (founder) for onboarding
- Private build of GENESIS core configured for your codebase
- Custom detection rules based on your stack and failure history
- Weekly sync for 4 weeks to review flagged patterns
- Input into the product roadmap

**Why free?** The first 5 pilots are discovery, not revenue. I want real failure data from real codebases. Your patterns become the detection catalog.

---

### Tier: Early Adopter — $99 / month (seats 6–20)

- All Founder Pilot features
- Priority support channel (direct Slack or Discord)
- Locked in at $99/mo for 12 months (price will increase post-launch)
- Named in public changelog as early supporter (optional)

---

## WHAT IS NOT INCLUDED

- GENESIS does not modify your CI/CD pipeline structure
- GENESIS does not wrap or intercept your AI provider API
- GENESIS does not collect or transmit your code
- GENESIS is not a linter, test runner, or static analysis tool

---

## HOW IT WORKS (PILOT SETUP)

1. You share your tech stack and one or two past AI-generated failure examples
2. I configure a private GENESIS core build for your stack
3. You install a lightweight adapter in your pipeline (30-minute setup)
4. GENESIS intercepts AI-generated diffs before they reach execution
5. Decisions (ALLOW / BLOCK / REQUIRE_APPROVAL) log to your preferred output

---

## TO APPLY

Send a message to: [hello@aicodesafety.com](mailto:hello@aicodesafety.com)

Temporary fallback: [yaron180986@gmail.com](mailto:yaron180986@gmail.com)

Subject: GENESIS Pilot

Include:
- Your stack (language, framework, AI agents you use)
- One sentence on what you're most worried about in AI-generated code
- Whether you want Founder Pilot (free) or Early Adopter ($99/mo)

---

## QUESTIONS

**Is the core open source?**
No. The public demo shell is MIT. The private core is not open source. The pilot includes a private binary or self-hosted build depending on your setup.

**What stacks are supported?**
Currently Node.js / TypeScript. Python and Go support in progress. If you're on a different stack, apply anyway — I'll tell you honestly whether it's feasible.

**Can I cancel?**
Yes, any time. No contracts.

---

*Last updated: 2026-04-30*
