# GENESIS — Slice Orchestrator Checkpoint Template 108

## Purpose

Define the required format for all slice checkpoints produced by the GENESIS execution agent.

Every unit that completes file creation must produce a checkpoint in this exact format before any git operation is performed.

---

## Required Checkpoint Format

Use this format after every unit that creates or modifies files.

```text
GIT CHECKPOINT REQUIRED

SLICE:
NNN — [Slice Title]

UNIT:
X/Y — [Unit Title]

BRANCH:
slice-NNN-slug

CHANGED FILES:
- docs/file-a.md
- docs/file-b.md

CONCISE CHANGE SUMMARY:
- [One sentence per file or group of files describing what was added]
- Kept this as documentation-only.
- Did not change demo behavior.
- Kept private GENESIS core excluded.

VALIDATION RESULTS:
- branch verified:           [PASS | FAIL]
- remote verified:           [PASS | FAIL]
- changed files verified:    [PASS | FAIL]
- required files present:    [PASS | FAIL]
- no runtime changes:        [PASS | FAIL]
- no secrets:                [PASS | FAIL]
- no credential/env files:   [PASS | FAIL]
- no payment links:          [PASS | FAIL]
- no checkout URL:           [PASS | FAIL]
- no private core exposure:  [PASS | FAIL]
[Additional slice-specific checks as declared in unit manifest]

RISK / WEAKNESS AUDIT:
- runtime behavior changed:    [YES — STOP | NO]
- private repo touched:        [YES — STOP | NO]
- private core exposed:        [YES — STOP | NO]
- implementation code added:   [YES — describe | NO]
- what is not implemented yet: [list or NONE]
- next hardening step:         [one sentence or NONE]

PROPOSED COMMIT MESSAGE:

[type](genesis): [short imperative description]

- [detail line 1]
- [detail line 2]
- keep private GENESIS core excluded

FINAL STATUS:
Awaiting user approval before commit.
No commit was made.
No push was made.
```

---

## Failure Checkpoint Format

If any validation check fails, use this format instead:

```text
GIT CHECKPOINT REQUIRED — VALIDATION FAILURE

SLICE:
NNN — [Slice Title]

UNIT:
X/Y — [Unit Title]

BRANCH:
slice-NNN-slug

FAILURE:
[Exact failure type from orchestration-failure-taxonomy-108.md]

FAILED CHECK:
[Exact check that failed — e.g., "no secrets: FAIL"]

DETAIL:
[Specific file, line, or condition that caused the failure]

ACTION REQUIRED:
[What the architect must do to resolve this before the checkpoint can pass]

FINAL STATUS:
HALTED — awaiting architect resolution.
No commit was made.
No push was made.
```

---

## Approval Phrases

The following exact phrases activate the corresponding git operation. No git operation is performed without one of these phrases.

### Commit Approval

```text
APPROVE COMMIT SLICE NNN
```

Activates: stage slice files and create commit. Push is not performed.

### Push Approval

```text
APPROVE PUSH SLICE NNN
```

Activates: push branch to remote. Merge is not performed.

### Merge Approval

```text
APPROVE MERGE SLICE NNN
```

Activates: checkout main, merge branch with --no-ff, push main. Branch cleanup is not performed.

### Cleanup Approval

```text
APPROVE BRANCH CLEANUP SLICE NNN
```

Activates: delete remote branch. Local branch deletion requires separate confirmation.

---

## Weakness Audit Requirement

Every checkpoint must include a RISK / WEAKNESS AUDIT section.

The audit is not optional.

The audit must answer:

1. Did any runtime file change? If yes: HALT. Do not produce a passing checkpoint.
2. Was the private repo or private GENESIS core touched? If yes: HALT.
3. Was implementation code (non-documentation) added? If yes: describe it.
4. What is not implemented yet in this slice? List it honestly.
5. What is the next hardening step after this slice closes?

A checkpoint with a missing or empty weakness audit is not a valid checkpoint.

---

## Final Rule

No commit is created before a checkpoint.

No checkpoint is produced before all validation checks pass.

No push is performed before explicit approval.

No merge is performed before explicit approval.

No branch cleanup is performed before explicit approval.

The checkpoint exists to create a mandatory pause between the execution agent completing work and any irreversible git action being taken.

GIT CHECKPOINT REQUIRED is not a status message — it is a gate.
