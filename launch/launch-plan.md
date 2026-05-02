# Launch Plan — GENESIS AI Code Safety Demo

> The goal of the first launch is not fame. The goal is signal.

---

## 1. Objective

Expose the public demo to real developers and collect honest feedback about whether the problem feels real. Not to go viral. Not to get press. Not to raise money. To find out if other people recognize this problem — and whether the solution resonates.

---

## 2. What Success Means in the First 7 Days

- 10 real people have seen the demo (not bots, not strangers)
- 3 people gave a meaningful reply (anything more than "cool")
- 1 person gave a technical critique
- 1 person said "I'd try this" or asked how to use it
- GitHub traffic shows real human visitors in the 48h after first public post
- Live demo at https://aicodesafety.com received at least 5 real clicks

Stars are useful as a signal of approval but are not the primary metric. A critical comment from a senior engineer is worth more than 50 stars from people who clicked without reading.

---

## 3. What Does NOT Count as Failure

- Nobody comments on LinkedIn
- Nobody stars the repo
- Getting zero response from one community post
- Low view counts on day 1
- Someone saying "this is too simple" — that is useful signal, not rejection
- Someone saying "Copilot already does this" — that is a positioning opportunity, not a loss
- Feeling embarrassed after posting

Failure would be: posting once, seeing silence, and concluding the product is worthless. That is not a valid experiment.

---

## 4. Launch Stages

### Stage 1 — Private Feedback (Days 1–2)
Send the live demo link to 3 trusted people — developers who will be honest.  
Ask one simple question: "Does this problem feel real to you?"  
Do not explain the whole product. Just share the link and the question.

### Stage 2 — Soft Public Post (Day 3)
Post on LinkedIn — founder version or short version.  
Do not announce a launch. Share a problem and show the demo.  
Aim for conversation, not reach.

### Stage 3 — Technical Community Post (Day 4–5)
Post to Hacker News Show HN or a relevant technical subreddit.  
Frame it as: "I built this — looking for feedback from developers using AI coding tools."  
Include a clear link to the live demo.

### Stage 4 — Follow-Up (Days 6–7)
Reply to every comment personally.  
Update README based on confusion patterns if any arise.  
Decide what to do next based on signal received.

---

## 5. 7-Day Schedule

| Day | Action |
|-----|--------|
| 1 | Polish README, test live demo link, send to 3 trusted people privately |
| 2 | Send to 7 more people — mix of developers and founders |
| 3 | First LinkedIn post (founder story or technical version) |
| 4 | Post to Hacker News Show HN or r/programming |
| 5 | Collect feedback, reply to every comment |
| 6 | Update README or demo message based on feedback patterns |
| 7 | Review all signal received — decide next step |

---

## 6. Daily Minimum Action

Each day requires only **one action**. Doing that one action is a successful day.

- Day 1: Send to 1 person
- Day 2: Send to 3 people
- Day 3: Post on LinkedIn
- Day 4: Post in one technical community
- Day 5: Read and reply to feedback
- Day 6: Update one section of README
- Day 7: Write one paragraph summarizing what you learned

If the full action feels too heavy: do the minimum version. The minimum version is always sufficient.

---

## 7. Metrics to Check

**GitHub (check via CLI — read-only):**
```bash
gh api repos/aicodesafety/genesis-ai-code-safety-demo/traffic/views
gh api repos/aicodesafety/genesis-ai-code-safety-demo/traffic/clones
gh api repos/aicodesafety/genesis-ai-code-safety-demo/traffic/popular/referrers
gh api repos/aicodesafety/genesis-ai-code-safety-demo/traffic/popular/paths
```

**Manual:**
- How many people did you share the link with directly?
- How many replied?
- How many clicked through to the demo?
- Any GitHub stars?
- Any DMs or emails?

**Check frequency:** Once per day, after 5pm. Do not obsess during the day.

---

## 8. Stop Conditions

Pause the launch if:
- You receive a legal or IP concern you cannot immediately address
- The live demo breaks (aicodesafety.com returns an error)
- You receive a security report you need to investigate
- You feel overwhelmed and it is affecting your ability to work — pause, do not quit

A pause is not a failure. A pause is a controlled reset.

---

## 9. Decision Points

**After Day 3:**
- If 0 responses: stay the course, proceed to technical post
- If 3+ responses: read them all before Day 4 post

**After Day 5:**
- If 0 engagement in both posts: reconsider framing and target community
- If engagement is "interesting but confusing": simplify the demo intro message
- If engagement is critical: treat critique as product research

**After Day 7:**
- If signal is positive but weak: continue outreach, improve messaging
- If signal is negative but clear: refine positioning before next round
- If signal shows a pattern of confusion: fix the specific confusion point
- If 0 signal after 7 days of real posting: the message needs a full rewrite — not the product
