# Reddit Launch Copy — GENESIS AI Code Safety Gate

---

## TARGET SUBREDDITS
- r/programming
- r/MachineLearning (if framed around AI agents)
- r/devops
- r/webdev
- r/ExperiencedDevs
- r/rust / r/node (for implementation-focused posts)

---

## POST VARIANT 1 — r/programming

**Title:**
I built an open-source AI code safety gate after an agent silently nullified my module.exports in production

**Body:**

A few months ago one of my AI agents wrote a change that passed every linter, passed every test, and made it to production.

The change was `module.exports = null`.

The module it was attached to was a critical internal adapter. Everything downstream worked fine — until the next cold start. Then everything broke.

I couldn't figure it out for two hours.

That incident led to GENESIS — an AI code safety gate that intercepts AI-generated changes before they reach your execution pipeline.

**What it does:**

It pattern-matches AI-generated code for high-risk patterns before they run:

- `module.exports = null` → BLOCK
- `if(false)` gates on critical paths → REQUIRE_APPROVAL
- Destructive rewrites that wipe working function bodies → BLOCK
- Unauthorized dependency overrides → flag

**What it doesn't do:**

- It doesn't replace your tests
- It doesn't wrap your AI provider
- It has no telemetry
- It's not a linter plugin

It runs at the pipeline boundary — between "AI wrote this" and "this executes."

**Public demo:**

```bash
git clone https://github.com/yaron180986-create/genesis-ai-code-safety-demo
cd genesis-ai-code-safety-demo
npm install
npm run demo          # critical block
npm run demo:safe     # safe allow
npm run demo:danger   # explicit danger
npm run demo:dead-code  # dead-code gate
```

All decisions print to terminal. No setup beyond npm install.

The core detection engine is private (I'm building toward a pilot), but the public demo shell shows the decision surface and output format.

**Feedback welcome:**

What AI code patterns have caused you the most pain? I'm building a detection catalog and would genuinely like to know what's actually breaking in the wild.

---

## POST VARIANT 2 — r/ExperiencedDevs

**Title:**
What patterns in AI-generated code worry you most? Building a safety gate and want real failure cases.

**Body:**

I've been building a tool called GENESIS — an AI code safety gate that sits between AI agent output and your execution pipeline.

Current detection set:
- Critical export nullification (`module.exports = null`)
- Dead-code gates (`if(false)` on critical paths)
- Destructive rewrites
- Dependency overrides

These came from my own failures with AI agents. But I suspect the real failure catalog is much wider.

**Actual question:**

What AI-generated code patterns have broken things for you? Not hypothetical — actual incidents.

If useful: I have a public demo repo here: [link]

---

## POSTING NOTES
- Don't lead with the repo link — Reddit penalizes self-promotion if it's the first thing
- Lead with the problem / story
- Reply to every comment in first hour
- Do NOT cross-post simultaneously — wait 48h between subreddits
- Check subreddit rules before posting (some ban self-promotion entirely)
