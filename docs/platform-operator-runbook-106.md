# GENESIS — Platform Operator Runbook 106

## Purpose

Provide step-by-step operator procedures for common platform tasks.

This runbook does not automate actions.

This runbook guides the human operator through safe, deliberate steps.

## Who Uses This Runbook

The user acting as the launch operator.

GENESIS assists by preparing content and tracking steps.

GENESIS does not execute public actions without explicit approval.

## Runbook Conventions

Each procedure is organized as:

1. Mode required
2. Approval phrase required
3. Pre-flight checks
4. Step-by-step instructions
5. Post-action log

If any pre-flight check fails, stop and resolve before proceeding.

---

## Procedure 1 — Prepare a Launch Post

Mode: PREPARE_ONLY

Approval phrase: None required for local draft work

Pre-flight checks:

- [ ] Pain point confirmed with at least one real conversation
- [ ] Target platform selected
- [ ] Audience type understood
- [ ] Community rules reviewed
- [ ] Payment link disabled

Steps:

1. Identify target audience segment
2. Write draft using honest founder language
3. Include one clear question or observation
4. Review for hype or spam signals
5. Save draft to docs folder
6. Request GENESIS review for brand safety

Post-action log:

- Draft path
- Target platform
- Review status

---

## Procedure 2 — Open a Platform Page

Mode: OPEN_ONLY

Approval phrase: APPROVE OPEN PAGE

Pre-flight checks:

- [ ] Draft reviewed and ready
- [ ] Platform community rules confirmed
- [ ] No credential request pending

Steps:

1. User says: APPROVE OPEN PAGE
2. GENESIS displays target URL
3. User opens URL in their own browser
4. GENESIS confirms page is open
5. GENESIS does not interact with the page

Post-action log:

- Platform
- Page type opened
- Time
- Status: page viewed

---

## Procedure 3 — Fill a Platform Draft

Mode: FILL_DRAFT_ONLY

Approval phrase: APPROVE FILL DRAFT

Pre-flight checks:

- [ ] Platform page is open
- [ ] Draft is final and approved for filling
- [ ] No checkout link in draft
- [ ] No payment link in draft
- [ ] Community rules reviewed

Steps:

1. User says: APPROVE FILL DRAFT
2. GENESIS prepares the exact content to paste
3. User pastes content into compose box
4. User reviews filled draft visually
5. GENESIS confirms draft state without submitting

Post-action log:

- Platform
- Draft content summary
- Time
- Status: draft filled, not published

---

## Procedure 4 — Publish a LinkedIn Post

Mode: PUBLIC_ACTION

Approval phrase: APPROVE PUBLISH LINKEDIN POST

Pre-flight checks:

- [ ] Draft filled and reviewed by user
- [ ] One-post-per-approval rule confirmed
- [ ] No other pending public actions
- [ ] No payment or checkout link in content
- [ ] Exact approval phrase spoken by user

Steps:

1. User says: APPROVE PUBLISH LINKEDIN POST
2. GENESIS confirms: "You approved publishing one LinkedIn post."
3. User clicks Publish in their browser
4. GENESIS records the result
5. GENESIS stops — no further action without new approval

Post-action log:

- Platform: LinkedIn
- Action: publish post
- Approval phrase used
- Post URL (if available)
- Time
- Status

---

## Procedure 5 — Submit a Show HN Post

Mode: PUBLIC_ACTION

Approval phrase: APPROVE SUBMIT SHOW HN

Pre-flight checks:

- [ ] Title and URL finalized
- [ ] Body text reviewed
- [ ] One submission only
- [ ] No duplicate submission in last 90 days
- [ ] Exact approval phrase spoken by user

Steps:

1. User says: APPROVE SUBMIT SHOW HN
2. GENESIS confirms: "You approved submitting one Show HN post."
3. User clicks Submit in their browser
4. GENESIS records the submission
5. GENESIS stops — no further action without new approval

Post-action log:

- Platform: Hacker News
- Action: submit Show HN
- Post title
- Post URL submitted
- Time
- Status

---

## Procedure 6 — Create a GitHub Discussion

Mode: PUBLIC_ACTION

Approval phrase: APPROVE CREATE GITHUB DISCUSSION

Pre-flight checks:

- [ ] Discussion title and body reviewed
- [ ] Repo owner confirmed
- [ ] One discussion only in this session
- [ ] Exact approval phrase spoken by user

Steps:

1. User says: APPROVE CREATE GITHUB DISCUSSION
2. GENESIS confirms: "You approved creating one GitHub Discussion."
3. User submits discussion in their browser
4. GENESIS records the result
5. GENESIS stops — no further action without new approval

Post-action log:

- Platform: GitHub
- Action: create discussion
- Repo
- Discussion title
- URL (if available)
- Time
- Status

---

## Emergency Stop Procedure

If at any point the operator needs to halt all activity:

User says: STOP ALL PLATFORM ACTIONS

GENESIS must:

1. Halt all pending action recommendations
2. Return to PREPARE_ONLY mode
3. Log the stop event
4. Confirm: "All platform actions stopped. Returning to PREPARE_ONLY mode."

No further platform actions until a new explicit approval is given.

---

## Credential Incident Procedure

If a platform action attempt results in a credential request:

1. GENESIS must immediately stop the action
2. GENESIS must display: "CREDENTIAL REQUEST DETECTED — action halted"
3. User manages login manually in their own browser
4. No password or token is passed through GENESIS
5. After user resolves login, action restarts from pre-flight check

---

## Runbook Audit

All runbook procedures executed must be logged with:

- procedure name
- mode used
- approval phrase recorded
- result
- timestamp
- operator notes

Logs are local-only unless user explicitly approves export.
