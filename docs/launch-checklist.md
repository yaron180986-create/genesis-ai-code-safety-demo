# Launch Checklist — AI Code Safety Gate Public Demo

Practical checklist for first public sharing of the demo.

---

## 1. Before Sharing

- [ ] License file exists (`LICENSE` — MIT)
- [ ] README has a visual (SVG hero or screenshot/GIF of demo output)
- [ ] Live demo link works — open `https://aicodesafety.com` and run all three scenarios
- [ ] README live demo link is clickable and correct
- [ ] README explains the product in under 10 seconds (above the fold)
- [ ] "First simulated fix is free" or payment-pressure language removed from README
- [ ] No secrets, API keys, or `.env` content anywhere in the repo
- [ ] No private GENESIS core files referenced or included

---

## 2. GitHub Repo Readiness

- [ ] Repo is public (`visibility: PUBLIC` confirmed)
- [ ] Description is set: clear, under 120 characters
- [ ] Homepage URL is set: `https://aicodesafety.com`
- [ ] Topics are set: at minimum `ai-safety`, `code-security`, `developer-tools`
- [ ] Default branch is `main` and healthy
- [ ] README renders correctly on the GitHub repo page
- [ ] SVG assets render inline in README on GitHub
- [ ] No 404s in README links
- [ ] License shows on repo sidebar (GitHub auto-detects MIT)
- [ ] Consider creating a GitHub release: `v0.1.0-demo` with short release notes
- [ ] Consider pinning the repo on the `aicodesafety` org profile

---

## 3. Live Demo Readiness

- [ ] `https://aicodesafety.com` loads without errors
- [ ] All three demo scenarios run correctly in browser (ALLOW / REQUIRE_APPROVAL / BLOCK)
- [ ] Custom input textarea works
- [ ] Demo looks professional on mobile (basic check)
- [ ] No console errors in browser DevTools during normal use
- [ ] Demo does not expose any private backend architecture

---

## 4. Social Launch Options

Choose one or two channels for the first push — do not spray all channels simultaneously.

**LinkedIn (highest expected return for developer B2B)**
- [ ] Write a post framing the problem first, then the demo
- [ ] Include a short demo GIF or screenshot if available
- [ ] End with the demo link and a clear CTA ("try it, let me know what you think")
- [ ] Tag relevant hashtags: `#AIcoding`, `#devtools`, `#softwaredevelopment`, `#AI`

**X / Twitter**
- [ ] Short thread: problem → solution → demo link
- [ ] If a GIF of terminal BLOCK output exists, include it in tweet 2
- [ ] Keep each tweet under 200 characters for readability

**Hacker News — Show HN**
- [ ] Only after a screenshot or GIF of demo output exists in README
- [ ] Title format: `Show HN: A pre-execution safety gate for AI-generated code`
- [ ] First comment should explain: what problem it solves, what is in the demo, what is not
- [ ] Do not submit to Show HN before the README has visual proof

**Reddit**
- [ ] r/programming — link post with description
- [ ] r/MachineLearning — if framing is technical/research
- [ ] r/netsec — if framing is security-focused
- [ ] r/devops — if framing is CI/workflow-focused
- [ ] Stagger posts — do not post to all subreddits the same day

**Dev.to / Hashnode**
- [ ] Write a short technical article: "How I built a safety gate that blocks `module.exports = null`"
- [ ] Include screenshots of terminal output
- [ ] Link back to repo and live demo

---

## 5. Direct Outreach

- [ ] Identify 5–10 developers you know who use Cursor, Copilot, or Claude Code
- [ ] Send a short personal message — not a pitch, a genuine "would you try this and tell me what you think"
- [ ] Ask for one specific type of feedback: "Does the demo make the concept clear in under a minute?"
- [ ] Early stars from known contacts help algorithmic visibility on GitHub

---

## 6. What Not to Do

- Do not buy stars, watchers, or followers — GitHub detects and penalizes this
- Do not post the same content to multiple communities simultaneously — looks like spam
- Do not submit to Hacker News without a screenshot or GIF in the README
- Do not give external tools (including Cursor, Copilot, or others) broad write access to this repository
- Do not expose private GENESIS core files, architecture docs, or internal tooling in this repo
- Do not add payment links or conversion pressure to the public README before establishing trust
- Do not claim features the demo does not have (compliance, SOC 2, enterprise SLA, full vulnerability scanning)

---

## 7. Post-Launch Metrics to Check (48–72 Hours After Sharing)

**GitHub traffic (check via GitHub web: Insights → Traffic)**
- [ ] Page views (total and unique)
- [ ] Referring sites (where visitors came from)
- [ ] Popular content (which README sections are landing pages)
- [ ] Clone count change

**GitHub social signals**
- [ ] Stars
- [ ] Watchers
- [ ] Forks
- [ ] Issues opened

**Live demo**
- [ ] Vercel analytics or server logs — how many visits to `aicodesafety.com`
- [ ] Which demo scenario is run most often

**Qualitative**
- [ ] Any direct replies or DMs from shared posts
- [ ] Any feedback on what is unclear or missing
- [ ] Any questions that suggest a specific segment is interested
