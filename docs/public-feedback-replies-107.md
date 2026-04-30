# GENESIS — Public Feedback Reply Templates 107

## Purpose

Define prepared reply templates for responses received after public feedback posts are published.

This is a PREPARE_ONLY document.

No reply in this file may be sent without explicit user authorization.

All replies must be reviewed and personalized by the user before sending.

No automated replies. No DMs from public comments. No bulk responses.

---

## Response Classification Reference

Use these classifications to label each inbound response before deciding on a reply:

| Code | Meaning |
|------|---------|
| GHOST | No response |
| WEAK_SIGNAL | Like, star, or vague comment with no workflow pain |
| PAIN_CONFIRMED | Describes a real problem with AI-generated code in their workflow |
| INTEGRATION_INTEREST | Asks where it runs: CI, GitHub Action, CLI, editor, agent runtime |
| DEMO_REQUEST | Asks to try it, test it, or see a deeper demo |
| PILOT_CANDIDATE | Describes a team or workflow context suggesting real pilot potential |
| NOT_RELEVANT | Off-topic, spammy, or unrelated |

---

## Reply Templates by Classification

---

### PAIN_CONFIRMED

Use when: the person describes a real experience of AI-generated code causing problems.

**Template A — Short acknowledgment:**

That matches exactly what I was running into. The quiet ones are the hardest — no crash, no error, just a change that shouldn't have moved forward.

Where in your workflow did the problem surface? Before execution, in review, or after it was already in the branch?

**Template B — Invite deeper context:**

Thanks for sharing that. That kind of silent regression is what pushed me to build this.

If you're open to it, I'd be curious what your current review process looks like for AI-generated code. Whether a pre-execution gate would have caught it, or whether it was something that would only show up later.

---

### INTEGRATION_INTEREST

Use when: the person asks where the gate runs — CI, GitHub Action, CLI, editor, agent runtime.

**Template A — CI / GitHub Action question:**

That's the direction I'm thinking about too. The demo currently shows the classification logic — the integration layer (CI, GitHub Action, PR check) is what I'm trying to validate next based on where people actually need it.

Is that a gap you're hitting in your current workflow?

**Template B — CLI / pre-commit question:**

CLI or pre-commit is a strong fit for the pattern. The gate needs to be early enough to be useful but not so far upstream that it lacks context about the change.

Are you running AI agents in a local CLI context, or more in a CI/automated pipeline?

**Template C — Editor integration question:**

Editor integration is interesting. The challenge there is that the gate needs enough context to classify the change — which is harder at the keystroke level and more tractable at the file-save or commit level.

What editor are you using? Cursor, VS Code, something else?

**Template D — Agent runtime question:**

Agent runtime is where I started thinking about this. The problem is that agents can move fast enough that a checkpoint after generation but before execution is the only window that reliably exists.

Are you running an agent in a specific framework, or more of a custom pipeline?

---

### DEMO_REQUEST

Use when: the person asks to try it, test it, or see a deeper demo.

**Template A — Point to live demo:**

The live demo is at https://aicodesafety.com — it runs a set of example code changes through the classification logic so you can see ALLOW, REQUIRE_APPROVAL, and BLOCK in action.

The public repo is at https://github.com/aicodesafety/genesis-ai-code-safety-demo if you want to see the demo shell.

What kind of workflow would you want to test it against?

**Template B — Invite use case description:**

Happy to walk through a more specific example if you describe your workflow. What kind of AI-generated changes are you working with — file edits, script execution, database operations, something else?

---

### PILOT_CANDIDATE

Use when: the person describes a team, company, or production workflow suggesting real pilot potential.

**Template A — Express interest and invite conversation:**

That sounds like exactly the kind of context this was built for. A pre-execution gate makes more sense at team scale where review bandwidth is the real constraint.

I'm not pitching anything — this is still early validation — but I'd be genuinely interested to understand your workflow better. Would you be open to a short conversation?

**Template B — Acknowledge team context:**

A team workflow is a different problem than a solo one — the gate needs to surface decisions to the right person, not just flag them.

If you're open to it, I'd love to hear more about how AI-generated code moves through your pipeline today. Not a sales call, just trying to understand whether this maps to a real gap.

---

### WEAK_SIGNAL

Use when: the person liked, starred, or left a vague positive comment with no workflow pain.

**Template A — Invite specificity:**

Thanks. I'm curious whether this maps to something you've run into, or whether it feels more like a hypothetical problem from the outside.

Have you hit a case where AI-generated code moved faster than you could review it?

**Template B — No reply needed:**

If the signal is only a like or star with no comment, no reply is required.

---

### CRITICISM

Use when: the person criticizes the idea, the approach, or the framing.

**Template A — Respond with curiosity:**

That's useful to hear. Where do you think the right checkpoint should be, if anywhere? I'm genuinely trying to figure out whether this is a real workflow problem or something that review and testing already handle well enough.

**Template B — Acknowledge the limitation:**

That's a fair point. The demo is a simplified version of the problem and doesn't capture all the edge cases. What would make a safety gate like this actually useful in your workflow?

**Template C — No reply needed:**

If the criticism is hostile or off-topic, no reply is required.

---

### NOT_RELEVANT

Use when: the response is off-topic, promotional, or unrelated.

No reply required.

---

## Reply Writing Rules

Always:

- personalize before sending — do not copy-paste templates verbatim
- keep replies short — two to four sentences is usually enough
- end with a question where appropriate
- use human founder voice — not corporate, not sales
- acknowledge the specific thing they said before asking a question

Never:

- pitch pricing in a reply
- DM someone who commented publicly without their invitation
- send bulk replies
- copy-paste the same reply to multiple people
- argue with criticism
- reveal private core details in a reply
- imply the public demo is the full product

---

## Escalation Rules

If a reply thread develops into a clear pilot candidate:

Do not negotiate terms in public comments.

Move the conversation to: hello@aicodesafety.com

Standard handoff line:

This would be easier to discuss properly over email. If you're open to it, reach out at hello@aicodesafety.com — no pitch, just a conversation about whether this maps to your workflow.

---

## Payment Boundary in Replies

Do not mention price, checkout, or payment in any reply.

Exception: only if the person explicitly asks about setup cost, pilot pricing, or commercial availability.

If they ask, the correct response is:

I'm not at the pricing stage yet — still validating whether this solves a real problem for people. If you're interested in an early pilot conversation, reach out at hello@aicodesafety.com.

---

## Approval Boundary

No reply in this file may be sent without the user reviewing and approving it first.

Templates are starting points, not final messages.

All replies must be personalized to the specific person and context before sending.
