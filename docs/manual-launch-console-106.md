# GENESIS — Manual Launch Console 106

## Purpose

Define the manual launch console interface that the Platform Operator presents to the user before any public action.

The console is a structured decision interface, not an automation engine.

The user decides. GENESIS prepares.

## What the Console Is

A structured display that shows:

- what action is proposed
- what platform is targeted
- what draft is ready
- what risk level applies
- what approval phrase is required
- what will happen if approved
- what will not happen without approval

The console stops before every public action and waits for explicit user input.

## Console Modes

### PREPARE_ONLY Mode

Console behavior:

- Display: Draft preparation in progress
- Allow: Write draft, create checklist, rank platforms, prepare copy
- Block: Open platform page, fill form, post, send, submit
- Approval required: None for local work
- Next step: User reviews draft and decides whether to proceed

Console output format:

```
[GENESIS CONSOLE] MODE: PREPARE_ONLY
ACTION: Prepare [target] draft
PLATFORM: Local only
RISK: SAFE_LOCAL
STATUS: Draft ready for review
NEXT: Review draft. To open platform, say: APPROVE OPEN PAGE
```

### OPEN_ONLY Mode

Console behavior:

- Display: Platform page open
- Allow: Open the target platform URL in user's browser
- Block: Fill form, paste text, click submit, publish, send
- Approval required: APPROVE OPEN PAGE
- Next step: User reviews the platform and decides whether to fill draft

Console output format:

```
[GENESIS CONSOLE] MODE: OPEN_ONLY
ACTION: Open [platform] [page type]
URL: [platform URL shown to user]
RISK: LOW_EXTERNAL
STATUS: Page open — no action taken
NEXT: To fill draft, say: APPROVE FILL DRAFT
```

### FILL_DRAFT_ONLY Mode

Console behavior:

- Display: Draft pasted into platform compose area
- Allow: Paste prepared text into compose box or draft field
- Block: Click submit, publish, send, comment, DM
- Approval required: APPROVE FILL DRAFT
- Next step: User reviews filled draft visually before any public action

Console output format:

```
[GENESIS CONSOLE] MODE: FILL_DRAFT_ONLY
ACTION: Fill [platform] draft
DRAFT: [content summary]
RISK: DRAFT_EXTERNAL
STATUS: Draft filled — not published
NEXT: Review draft. To publish, say: APPROVE PUBLISH [PLATFORM] POST
```

### PUBLIC_ACTION Mode

Console behavior:

- Display: Public action request pending approval
- Allow: Execute exactly one approved public action
- Block: Any second action without new approval
- Approval required: Platform-specific exact phrase
- Next step: User provides exact approval phrase before execution

Console output format:

```
[GENESIS CONSOLE] MODE: PUBLIC_ACTION
ACTION: [Exact action name]
PLATFORM: [Platform name]
TARGET: [URL or recipient if applicable]
DRAFT: [content summary]
RISK: PUBLIC_ACTION
APPROVAL REQUIRED: [exact approval phrase]
STATUS: Waiting for approval
NEXT: Say the exact approval phrase to proceed, or STOP to cancel
```

After execution:

```
[GENESIS CONSOLE] PUBLIC ACTION COMPLETE
ACTION: [What was done]
PLATFORM: [Platform]
URL: [Public URL if created]
TIME: [timestamp]
STATUS: [success / error / pending]
AUDIT: Logged
NEXT: GENESIS stopped. No further action without new approval.
```

## One-Action Rule

The console may present only one public action at a time.

The console must stop after each public action and return to PREPARE_ONLY mode.

Batched approval is not permitted.

## Credential Rule

The console must never display:

- passwords
- tokens
- API keys
- session cookies
- private keys

The console must never ask:

- for passwords
- for tokens
- for credentials of any kind

If a platform requires login, the console instructs the user to log in manually in their own browser.

## Stop Conditions

The console must halt immediately if:

- public action approval phrase is missing or vague
- the requested action is bulk or mass
- credentials are requested
- the user has not reviewed the draft
- platform rules are unclear
- the action would add payment links without prior pilot qualification
- the action would expose private GENESIS core

## Safety Escalation

If the console receives an action request it cannot safely classify:

1. Halt
2. Display: UNKNOWN ACTION — requires manual review
3. Ask user to classify and approve explicitly

## Console Audit

Every console session must log:

- session ID
- mode used
- action proposed
- approval phrase given or withheld
- result
- timestamp

Logs must be kept locally.

Logs must not be transmitted to external systems without user approval.

## Final Rule

The console is an interface for deliberate, human-controlled platform work.

It is not an autopilot.

It is not a posting bot.

It is not a messaging engine.

Every public action requires a human decision.
