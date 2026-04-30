# GENESIS — Platform Audit Log Template 106

## Purpose

Provide a standard audit log template for all platform operator actions.

Every public platform action must produce an audit log entry.

## Platform Audit Log

### Entry Format

```
--- GENESIS Platform Audit Log Entry ---

Session ID:
Date:
Time (UTC):

Platform:
Action Type:
Mode: [PREPARE_ONLY | OPEN_ONLY | FILL_DRAFT_ONLY | PUBLIC_ACTION]
Risk Level: [SAFE_LOCAL | LOW_EXTERNAL | DRAFT_EXTERNAL | PUBLIC_ACTION | HIGH_RISK_ACTION]

Approval Phrase:
Approval Given By: [User / Not Required]
Approval Time:

Draft Path:
Draft Summary:

Execution Result:
Public URL (if created):
Error (if any):

Stopped After Action: [Yes / No]
Follow-Up Needed: [Yes / No]
Follow-Up Notes:

Risk Notes:

Operator Notes:
--- END ENTRY ---
```

---

## Mode Definitions

### PREPARE_ONLY

Audit log required: Recommended but not mandatory for purely local draft work.

Log fields:

- Draft path
- Draft summary
- Review status

### OPEN_ONLY

Audit log required: Yes.

Log fields:

- Platform
- URL opened
- Mode: OPEN_ONLY
- Risk Level: LOW_EXTERNAL
- Approval Phrase: APPROVE OPEN PAGE
- Time

### FILL_DRAFT_ONLY

Audit log required: Yes.

Log fields:

- Platform
- Draft content summary
- Mode: FILL_DRAFT_ONLY
- Risk Level: DRAFT_EXTERNAL
- Approval Phrase: APPROVE FILL DRAFT
- Time
- Status: draft filled, not published

### PUBLIC_ACTION

Audit log required: Mandatory.

Log fields:

- Platform
- Action type
- Mode: PUBLIC_ACTION
- Risk Level: PUBLIC_ACTION
- Approval Phrase: exact phrase recorded
- Draft content summary
- Public URL created (if applicable)
- Execution result
- Time
- Follow-up needed

---

## Sample Entries

### Sample 1 — LinkedIn Post Published

```
--- GENESIS Platform Audit Log Entry ---

Session ID: 106-OPS-001
Date: 2026-05-01
Time (UTC): 14:32

Platform: LinkedIn
Action Type: Publish post
Mode: PUBLIC_ACTION
Risk Level: PUBLIC_ACTION

Approval Phrase: APPROVE PUBLISH LINKEDIN POST
Approval Given By: User
Approval Time: 14:31

Draft Path: docs/launch-post.md
Draft Summary: "Asking AI engineers about false-positive code warnings — validation post"

Execution Result: Success
Public URL (if created): [URL to be filled by operator]
Error (if any): None

Stopped After Action: Yes
Follow-Up Needed: Yes
Follow-Up Notes: Monitor for replies within 48 hours. Log responses in feedback-tracker.md.

Risk Notes: No payment link included. No Lemon Squeezy mention. No mass-send.

Operator Notes: Single post. Manual publish by user.
--- END ENTRY ---
```

### Sample 2 — Show HN Submitted

```
--- GENESIS Platform Audit Log Entry ---

Session ID: 106-OPS-002
Date: 2026-05-01
Time (UTC): 15:00

Platform: Hacker News
Action Type: Submit Show HN
Mode: PUBLIC_ACTION
Risk Level: PUBLIC_ACTION

Approval Phrase: APPROVE SUBMIT SHOW HN
Approval Given By: User
Approval Time: 14:58

Draft Path: docs/social-reddit.md
Draft Summary: "Show HN: GENESIS — I built a code safety AI agent that flags dangerous AI-generated code patterns"

Execution Result: Success
Public URL (if created): [HN URL to be filled by operator]
Error (if any): None

Stopped After Action: Yes
Follow-Up Needed: Yes
Follow-Up Notes: Monitor HN thread for 24 hours. Log any comments in feedback-tracker.md.

Risk Notes: One submission only. No duplicate. No credential usage.

Operator Notes: Manual submission by user.
--- END ENTRY ---
```

### Sample 3 — GitHub Discussion Created

```
--- GENESIS Platform Audit Log Entry ---

Session ID: 106-OPS-003
Date: 2026-05-01
Time (UTC): 16:00

Platform: GitHub
Action Type: Create Discussion
Mode: PUBLIC_ACTION
Risk Level: PUBLIC_ACTION

Approval Phrase: APPROVE CREATE GITHUB DISCUSSION
Approval Given By: User
Approval Time: 15:58

Draft Path: docs/outreach-pack-104.md
Draft Summary: "Asking the developer community about dangerous AI code patterns — validation question"

Execution Result: Success
Public URL (if created): [GitHub Discussion URL to be filled by operator]
Error (if any): None

Stopped After Action: Yes
Follow-Up Needed: Yes
Follow-Up Notes: Monitor for replies within 72 hours. Log responses in feedback-tracker.md.

Risk Notes: Created in own repo. No fake issue for marketing. No payment mention.

Operator Notes: Manual creation by user in browser.
--- END ENTRY ---
```

---

## Feedback Log

All public actions that generate replies, comments, or engagement must feed back into the GENESIS feedback system.

### Feedback Log Entry Format

```
--- GENESIS Feedback Log Entry ---

Date:
Platform:
Source URL:
Respondent Handle:
Response Type: [Comment | DM | Reply | Email | Form | Other]
Response Summary:
Pain Confirmed: [Yes / No / Partial]
Pilot Interest: [Yes / No / Unclear]
Follow-Up Needed: [Yes / No]
Follow-Up Action:
Logged By:
--- END ENTRY ---
```

---

## Audit Log Storage

Audit logs must be stored locally.

Suggested location:

```
docs/audit-log-[date]-[session-id].md
```

Audit logs must not be committed to git unless the user explicitly approves.

Audit logs must not include passwords, tokens, or credentials.

Audit logs must not be transmitted externally without user approval.

---

## Audit Log Review Policy

Audit logs must be reviewed:

- After each public platform action
- At the end of each launch session
- Before any new launch wave begins

Review confirms:

- All actions were approved
- No unauthorized public actions occurred
- No credential exposure
- Feedback entries match responses received
- Risk Level was correctly applied
