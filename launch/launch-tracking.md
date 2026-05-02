# Launch Tracking — GENESIS AI Code Safety Gate

Track metrics daily. Check once per day, after 5pm. Do not obsess during the day.

---

## 1. Metrics to Record Daily

| Metric | Day 1 | Day 2 | Day 3 | Day 4 | Day 5 | Day 6 | Day 7 |
|--------|-------|-------|-------|-------|-------|-------|-------|
| Direct messages sent | | | | | | | |
| Replies received | | | | | | | |
| GitHub views (total) | | | | | | | |
| GitHub unique visitors | | | | | | | |
| GitHub clones | | | | | | | |
| GitHub stars | | | | | | | |
| GitHub forks | | | | | | | |
| Live demo visits (if available) | | | | | | | |
| Public post engagements | | | | | | | |
| Comments received | | | | | | | |
| Useful feedback pieces | | | | | | | |

---

## 2. GitHub Traffic — CLI Commands (Read-Only)

Run these to pull GitHub traffic data locally. These do not modify anything.

```bash
# View traffic (total views and unique visitors)
gh api repos/aicodesafety/genesis-ai-code-safety-demo/traffic/views

# Clone traffic
gh api repos/aicodesafety/genesis-ai-code-safety-demo/traffic/clones

# Where traffic is coming from
gh api repos/aicodesafety/genesis-ai-code-safety-demo/traffic/popular/referrers

# Which paths are being accessed
gh api repos/aicodesafety/genesis-ai-code-safety-demo/traffic/popular/paths

# Stars count
gh api repos/aicodesafety/genesis-ai-code-safety-demo --jq '.stargazers_count'

# Forks count
gh api repos/aicodesafety/genesis-ai-code-safety-demo --jq '.forks_count'
```

Note: GitHub traffic data is only retained for 14 days. Check regularly.

---

## 3. Live Demo Metrics

If analytics are available on https://aicodesafety.com, record daily:

| Metric | Day 1 | Day 2 | Day 3 | Day 4 | Day 5 | Day 6 | Day 7 |
|--------|-------|-------|-------|-------|-------|-------|-------|
| Total visits | | | | | | | |
| Unique visitors | | | | | | | |
| Avg time on page | | | | | | | |
| Scenario interactions | | | | | | | |
| Custom input uses | | | | | | | |

If analytics are not available, use GitHub referrer data as a proxy.

---

## 4. Manual Outreach Tracker

| Person | Type | Date Sent | Date Replied | Reply Quality | Action Taken |
|--------|------|-----------|--------------|---------------|--------------|
| | Developer friend | | | | |
| | Senior engineer | | | | |
| | AI tools builder | | | | |
| | Startup founder | | | | |
| | Security engineer | | | | |
| | Open-source maintainer | | | | |
| | Other | | | | |

**Reply Quality key:**
- `1` — no reply
- `2` — polite but no substance
- `3` — genuine reaction (positive or negative)
- `4` — technical critique or real question
- `5` — offered to test, forward, or follow up

---

## 5. Feedback Tracker

| Source | Date | Feedback Summary | Category | Action Item |
|--------|------|-----------------|----------|-------------|
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |

**Category options:**
- `positioning` — confusion about what this is or how it differs from other tools
- `problem` — feedback about whether the problem is real
- `demo` — feedback about the demo UX, clarity, or scenarios
- `technical` — critique of the classification logic or patterns
- `scope` — too simple, too limited, or needs more depth
- `compliment` — positive but not actionable
- `question` — follow-up question from an interested user

---

## 6. Decision Table

After Day 7, use this table to decide what to do next.

| Signal Pattern | Recommended Action |
|---------------|-------------------|
| 3+ strong responses, real engagement | Continue outreach, expand channels |
| Engagement but consistent confusion about what it is | Rewrite the one-line pitch and demo intro |
| Technical critiques with substance | Treat as product research, address specific points |
| "Too simple" pattern | Clarify that private core exists, consider showing more depth |
| "This already exists as X" pattern | Research X, sharpen differentiation |
| Near-zero engagement after real posting effort | Full message rewrite before round 2 — not product change |
| Consistent "interesting but not for me" | Refine target audience targeting, not message |
| Someone asks for access or wants to try it for real | This is the strongest signal — prioritize follow-up |
| Zero engagement after 7 days and 10+ outreach messages | Pause, reassess channels and framing |

**Pause conditions:**
- You feel overwhelmed and it is affecting other work
- Live demo is broken
- A security or IP concern emerges
- Engagement is zero and messaging has already been revised once

**Do not quit after 7 days. Pause if needed. Reassess. Resume.**
