# GENESIS — Platform Action Taxonomy 106

## Purpose

Classify platform actions by risk level before GENESIS assists with them.

Every action must be classified before execution.

## Risk Levels

Use four risk levels:

- SAFE_LOCAL
- LOW_EXTERNAL
- PUBLIC_ACTION
- HIGH_RISK_ACTION

## SAFE_LOCAL

Actions that do not touch an external platform and do not publish anything.

Examples:

- write draft
- edit draft
- create checklist
- create launch calendar
- score platform readiness
- classify feedback
- prepare post variants
- prepare reply variants
- create tracking table

Approval required:

No public-action approval required.

Still must follow normal project safety rules.

## LOW_EXTERNAL

Actions that open or inspect an external public page without changing public state.

Examples:

- open GitHub repo page
- open Hacker News submit page
- open LinkedIn home page
- open Product Hunt profile page
- open Dev.to draft page
- open Medium draft page
- open Reddit community rules page

Approval required:

APPROVE OPEN PAGE

Boundary:

No form filling.
No posting.
No sending.
No clicking submit.

## DRAFT_EXTERNAL

Actions that place prepared text into a platform draft or compose field but do not publish.

Examples:

- paste LinkedIn post draft into composer
- paste X post draft into composer
- paste Dev.to article draft
- paste Medium article draft
- fill GitHub Discussion title and body
- fill Show HN title and URL
- fill Reddit post body

Approval required:

APPROVE FILL DRAFT

Boundary:

Stop before public action.
The user must review the filled draft visually.

## PUBLIC_ACTION

Actions that publish, send, submit, or create public content.

Examples:

- publish LinkedIn post
- submit Show HN post
- create GitHub Discussion
- publish X post
- submit Reddit post
- submit Reddit comment
- publish Dev.to article
- publish Medium article
- send one approved DM
- send one approved email
- launch Product Hunt page

Approval required:

Platform-specific exact approval.

Examples:

- APPROVE PUBLISH LINKEDIN POST
- APPROVE SUBMIT SHOW HN
- APPROVE CREATE GITHUB DISCUSSION
- APPROVE POST REDDIT COMMENT
- APPROVE SEND ONE DM TO [NAME]

Boundary:

One public action per approval.

Stop immediately after action.

Record audit log.

## HIGH_RISK_ACTION

Actions that can damage accounts, brand, trust, or security.

Examples:

- bulk DMs
- bulk follows
- auto-commenting
- scraping people
- posting same content across many communities
- creating fake issues for marketing
- bypassing rate limits
- storing passwords
- using unscoped tokens
- editing public profile
- deleting public posts
- launching Product Hunt
- sending payment links
- changing domain settings
- changing email routing
- changing GitHub organization settings

Default:

Blocked.

Requires separate deep slice and explicit approval.

## Platform Matrix

| Platform | Prepare Draft | Open Page | Fill Draft | Public Action | High Risk |
|---|---|---|---|---|---|
| GitHub Discussions | SAFE_LOCAL | LOW_EXTERNAL | DRAFT_EXTERNAL | PUBLIC_ACTION | HIGH_RISK_ACTION |
| Hacker News | SAFE_LOCAL | LOW_EXTERNAL | DRAFT_EXTERNAL | PUBLIC_ACTION | HIGH_RISK_ACTION |
| Reddit | SAFE_LOCAL | LOW_EXTERNAL | DRAFT_EXTERNAL | PUBLIC_ACTION | HIGH_RISK_ACTION |
| LinkedIn | SAFE_LOCAL | LOW_EXTERNAL | DRAFT_EXTERNAL | PUBLIC_ACTION | HIGH_RISK_ACTION |
| X / Twitter | SAFE_LOCAL | LOW_EXTERNAL | DRAFT_EXTERNAL | PUBLIC_ACTION | HIGH_RISK_ACTION |
| Dev.to | SAFE_LOCAL | LOW_EXTERNAL | DRAFT_EXTERNAL | PUBLIC_ACTION | HIGH_RISK_ACTION |
| Medium | SAFE_LOCAL | LOW_EXTERNAL | DRAFT_EXTERNAL | PUBLIC_ACTION | HIGH_RISK_ACTION |
| Product Hunt | SAFE_LOCAL | LOW_EXTERNAL | DRAFT_EXTERNAL | HIGH_RISK_ACTION | HIGH_RISK_ACTION |

## Approval Phrase Map

| Action | Required Approval |
|---|---|
| Create local draft | No public-action approval |
| Open platform page | APPROVE OPEN PAGE |
| Fill draft | APPROVE FILL DRAFT |
| Publish LinkedIn post | APPROVE PUBLISH LINKEDIN POST |
| Publish X post | APPROVE PUBLISH X POST |
| Submit Show HN | APPROVE SUBMIT SHOW HN |
| Create GitHub Discussion | APPROVE CREATE GITHUB DISCUSSION |
| Submit Reddit post | APPROVE SUBMIT REDDIT POST |
| Comment on Reddit | APPROVE POST REDDIT COMMENT |
| Publish Dev.to article | APPROVE PUBLISH DEVTO ARTICLE |
| Publish Medium article | APPROVE PUBLISH MEDIUM ARTICLE |
| Launch Product Hunt | Requires separate launch slice |
| Send one DM | APPROVE SEND ONE DM TO [NAME] |
| Send one email | APPROVE SEND ONE EMAIL TO [EMAIL] |

## Default Decision

If uncertain:

Classify as HIGH_RISK_ACTION.

Stop.

Ask for explicit user review.

## Examples

### Example 1

User says:

Prepare a LinkedIn post.

Classification:

SAFE_LOCAL

Allowed:

Create draft only.

### Example 2

User says:

Open LinkedIn and paste this.

Classification:

DRAFT_EXTERNAL

Required:

APPROVE OPEN PAGE
then
APPROVE FILL DRAFT

### Example 3

User says:

Post it.

Classification:

PUBLIC_ACTION

Required:

APPROVE PUBLISH LINKEDIN POST

### Example 4

User says:

Send this to 50 people.

Classification:

HIGH_RISK_ACTION

Decision:

BLOCK.

Reason:

Bulk messaging is forbidden.

### Example 5

User says:

Add Lemon Squeezy checkout to the post.

Classification:

HIGH_RISK_ACTION

Decision:

BLOCK during public feedback stage.

Reason:

Payment is not part of first validation launch.

## Final Rule

Every platform action must pass through:

Intent
→ Classification
→ Approval Gate
→ Execution Boundary
→ Audit Log
→ Stop
