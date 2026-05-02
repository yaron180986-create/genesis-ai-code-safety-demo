# Feedback Script — GENESIS AI Code Safety Gate

> Feedback is not judgment. Feedback is data.

---

## Purpose

This script makes it easy to ask for feedback without feeling like you are selling something. Feedback is not a pitch. It is a research conversation. You are trying to understand a problem, not convince anyone of anything.

Before any feedback conversation: share the demo link, let them use it for 2 minutes, and ask one question. That is enough.

---

## 1. Five Simple Feedback Questions

Use these for anyone — developers, founders, non-technical people.

1. **Does this problem feel real to you?**
   *(Have you ever seen AI-generated code cause a problem that was hard to catch?)*

2. **When you look at the demo, does the decision make sense to you?**
   *(ALLOW, REQUIRE_APPROVAL, BLOCK — does the logic feel right?)*

3. **Is there anything confusing about the demo?**
   *(Is there a moment where you weren't sure what was happening?)*

4. **If this existed in your workflow, would you trust it enough to use it?**
   *(Even partially — what would you need to see to trust it more?)*

5. **Would you share this with anyone you know who works with AI coding tools?**
   *(This is a measure of usefulness, not a request to share.)*

---

## 2. Five Deeper Technical Feedback Questions

Use these for senior developers, engineers, or people with strong technical context.

1. **Are there AI-generated patterns you encounter regularly that you don't think the demo would catch?**
   *(This tells you where the classification gap is.)*

2. **How do you currently handle AI-generated code review at scale?**
   *(This tells you what competition looks like in their workflow.)*

3. **Does this overlap with anything in your current toolchain — linters, SAST, test coverage?**
   *(This tells you whether they think it's redundant or complementary.)*

4. **What would need to be true for you to add a gate like this to your CI/CD pipeline?**
   *(This tells you the requirements bar for real adoption.)*

5. **What's the most dangerous AI-generated change you've seen in a production codebase?**
   *(This grounds the conversation in real incidents and gives you pattern data.)*

---

## 3. Five Questions for Founders and Engineering Leads

Use these with people who think about teams and workflows, not just code.

1. **Is AI-generated code something your team is actively managing the risk of?**
   *(Tells you whether this is a priority problem or a theoretical one.)*

2. **If your team introduced a pre-execution gate for AI code, what would be the internal resistance?**
   *(Tells you the organizational friction points.)*

3. **What's your current policy on merging AI-generated code without review?**
   *(Tells you whether there is a gap in their existing process.)*

4. **At what scale does the risk of AI-generated code start feeling unmanageable for you?**
   *(Tells you the threshold at which this becomes a real purchase decision.)*

5. **Would this feel like a developer tool, a security tool, or a process tool to your team?**
   *(Tells you how they would categorize it — relevant for pricing and positioning.)*

---

## 4. How to Interpret Responses

**Positive signal pattern:**
- "Yeah, I've had exactly this happen."
- "This makes sense. I'd want to try it in a real project."
- "My team would need X before we'd adopt this."
- "I'd show this to [someone specific]."

These responses confirm the problem is real and the solution direction is understood.

**Confused signal pattern:**
- "I'm not sure I understand what it does."
- "How is this different from just running tests?"
- "Isn't this what ESLint does?"

These responses indicate a messaging problem, not a product problem. The concept is not landing clearly. The fix is in the pitch and the demo intro text, not in the product.

**Dismissive signal pattern:**
- "This is too simple."
- "Copilot/Cursor already does this."
- "Nobody needs this."

These responses are useful. "Too simple" is an invitation to show the private core or explain the depth. "Copilot already does this" is a positioning error — the responder doesn't understand the distinction. "Nobody needs this" is not evidence — it is an opinion. Ask a follow-up: "Have you seen AI-generated code cause a problem in a real system?"

---

## 5. What Responses Are Strong Signal

- A developer shares a specific incident where AI code broke something
- A response that says "I would use this" or "my team would need this"
- A critique that assumes the product works and asks about edge cases
- Someone who forwards it to a colleague without being asked
- A question about integration ("does this work with GitHub Actions?")
- Any response that treats this as a real product rather than a demo

**Strong signal = the problem is real to them and the solution concept registered.**

---

## 6. What Responses Are Weak Signal

- "Cool project" with no follow-up
- A like or a star with no comment
- "Interesting" with no elaboration
- A compliment from someone who did not try the demo

Weak signal is not bad signal. It just means you don't have data yet. Don't optimize for weak signal. Keep asking for one specific reaction.

---

## 7. What to Do If People Ignore It

Silence is not rejection. Most people are busy.

If a message gets no response after 3–5 days:
- Do not send a follow-up asking if they saw it
- Do not send a second pitch
- You can send one single gentle follow-up: "No pressure — just checking in case this got buried."
- If still no response: note it in the tracking sheet and move on

If a public post gets no engagement:
- Do not delete it
- Do not edit it into something different
- Wait 48 hours and look at the GitHub traffic data — real views often don't produce comments

Silence after one post is not a signal about the product. It may be a signal about the channel, the timing, or the framing.

---

## 8. What to Do If People Criticize It

Write it down before responding. Every criticism has a data point inside it.

**Categorize the criticism:**
- "This isn't solving a real problem" → ask for their real experience with AI code
- "The demo is too simple" → agree, explain the private core exists, ask what they'd want to see
- "This already exists as X" → treat as a positioning conversation, ask to see X
- "This would add too much friction" → ask what level of friction would be acceptable

**Never:**
- Defend the product against technical criticism before you understand the full point
- Dismiss criticism as "they don't get it"
- Delete or hide the critical comment

A technical critique on a public post is free product research. Treat it accordingly.

---

## 9. What to Do If People Ask "How Is This Different from Cursor/Copilot?"

This question means the positioning did not land. The responder thinks GENESIS is another AI coding assistant.

**Correct response (brief, not defensive):**

> "Cursor and Copilot write code. GENESIS evaluates code before it runs. Generation and safety classification are different layers. One produces the output, the other decides whether the output is safe to execute."

If they push back:

> "Think of it like a code review that happens at the execution boundary, not at the commit boundary — and is specifically designed for the failure modes that AI code generation introduces."

If they still don't see the distinction: that is a positioning problem worth solving before the next public post. Note it in the feedback tracker.
