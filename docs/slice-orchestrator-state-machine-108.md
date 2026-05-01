# GENESIS — Slice Orchestrator State Machine 108

## Purpose

Define the state machine that allows GENESIS to manage slice execution without relying on the user to manually sequence every unit.

The orchestrator must inspect the real repository state, detect what is complete, detect what is missing, continue safely, validate, and stop at checkpoint.

## Problem Being Solved

Previous slice execution exposed an orchestration gap.

The system could run individual units, but it did not reliably manage the entire slice lifecycle.

Observed failure modes:

- Unit 2 was invoked before Unit 1 had completed.
- Unit 3 validation was invoked before Unit 2 files existed.
- A branch existed but had no actual slice files.
- The user had to manually decide which unit to rerun.
- Claude could detect failure but did not always recover as an orchestrator.
- Manual copy-paste sequencing created process fragility.

## Core Principle

GENESIS should not blindly execute the next pasted unit.

GENESIS should inspect current state first.

Then it should decide:

- what exists
- what is missing
- what is incomplete
- what is unsafe
- what can be completed
- what must stop
- what checkpoint should be produced

## Required Orchestration Flow

Every future slice should pass through this flow:

```text
INTENT
→ REPOSITORY STATE DETECTION
→ BRANCH RESOLUTION
→ UNIT MANIFEST CHECK
→ FILE COMPLETION CHECK
→ SAFE COMPLETION OF MISSING WORK
→ VALIDATION
→ CHECKPOINT
→ USER APPROVAL
→ COMMIT
→ PUSH
→ MERGE
→ CLEANUP
```

## States

### STATE: IDLE

Entry condition: No active slice in progress.

Action: Wait for architect intent signal.

Transition: INTENT_RECEIVED → STATE: DETECTING

---

### STATE: DETECTING

Entry condition: Architect has declared a slice ID and unit count.

Action:
- Read current branch
- Read git status
- Read git log
- Identify the slice branch name
- Determine if branch exists
- Determine if branch is behind main
- Determine if branch has commits ahead of main

Transition:
- Branch does not exist → STATE: BRANCH_CREATING
- Branch exists and is current → STATE: MANIFEST_CHECKING
- Branch exists but is not current → STATE: BRANCH_RESUMING
- Working tree is dirty → STATE: HALTED (reason: dirty tree)
- Remote is wrong → STATE: HALTED (reason: wrong remote)

---

### STATE: BRANCH_CREATING

Entry condition: Slice branch does not exist.

Action:
- git checkout -b slice-NNN-name

Transition:
- Branch created → STATE: MANIFEST_CHECKING
- Git error → STATE: HALTED (reason: branch creation failed)

---

### STATE: BRANCH_RESUMING

Entry condition: Slice branch exists but is not the current branch.

Action:
- git checkout slice-NNN-name

Transition:
- Checkout succeeded → STATE: MANIFEST_CHECKING
- Git error → STATE: HALTED (reason: checkout failed)

---

### STATE: MANIFEST_CHECKING

Entry condition: On correct slice branch.

Action:
- Read the declared unit manifest for this slice
- For each expected file: check whether it exists on disk
- Classify each file as: PRESENT | MISSING | EMPTY

Transition:
- All files present and non-empty → STATE: VALIDATING
- Some files missing or empty → STATE: COMPLETING
- Manifest itself is undefined → STATE: HALTED (reason: no manifest declared)

---

### STATE: COMPLETING

Entry condition: One or more expected files are missing or empty.

Action:
- For each missing file: generate and write the file
- Do not overwrite existing non-empty files unless explicitly instructed
- After writing: re-check manifest

Transition:
- All files now present → STATE: VALIDATING
- A file still cannot be written → STATE: HALTED (reason: file write failed)

---

### STATE: VALIDATING

Entry condition: All files in the manifest are present and non-empty.

Action:
- Confirm all file paths are inside allowed public repo path
- Confirm no runtime files were modified
- Confirm no private repo path was touched
- Confirm no secrets or env vars were written
- Confirm no payment or outreach links were added
- Produce a validation summary

Transition:
- All validation checks pass → STATE: CHECKPOINT
- Any validation check fails → STATE: HALTED (reason: validation failure, detail provided)

---

### STATE: CHECKPOINT

Entry condition: All validation passed.

Action:
- Output a structured checkpoint report
- List: slice ID, unit number, files created, files modified, validation status
- Request explicit architect approval

Transition:
- Architect approves → STATE: APPROVED
- Architect requests changes → STATE: COMPLETING (re-enter with correction context)
- No response → STATE: WAITING

---

### STATE: WAITING

Entry condition: Checkpoint was produced, no architect response received.

Action:
- Hold. Do not commit. Do not push. Do not continue.

Transition:
- Architect approves → STATE: APPROVED
- Architect requests changes → STATE: COMPLETING

---

### STATE: APPROVED

Entry condition: Architect has explicitly approved the checkpoint.

Action:
- Stage only the slice files
- Commit with the canonical GENESIS commit message format
- Do not push unless explicitly instructed

Transition:
- Commit succeeded → STATE: COMMITTED
- Commit failed → STATE: HALTED (reason: commit failed)

---

### STATE: COMMITTED

Entry condition: Slice files have been committed.

Action:
- Wait for push instruction

Transition:
- Push instructed → STATE: PUSHING
- Merge instructed directly → STATE: MERGING

---

### STATE: PUSHING

Entry condition: Architect has instructed to push.

Action:
- git push origin slice-NNN-name

Transition:
- Push succeeded → STATE: PR_READY
- Push failed → STATE: HALTED (reason: push failed)

---

### STATE: PR_READY

Entry condition: Branch has been pushed to remote.

Action:
- Output PR summary: branch, files, commit, ready for merge

Transition:
- Architect instructs merge → STATE: MERGING

---

### STATE: MERGING

Entry condition: Architect instructs merge.

Action:
- git checkout main
- git merge --no-ff slice-NNN-name -m "merge(genesis): ..."
- git push origin main

Transition:
- Merge succeeded → STATE: CLEANUP
- Merge conflict → STATE: HALTED (reason: merge conflict)

---

### STATE: CLEANUP

Entry condition: Merge succeeded.

Action:
- Delete local slice branch
- Confirm main is up to date

Transition:
- Done → STATE: IDLE

---

### STATE: HALTED

Entry condition: Any unrecoverable condition encountered.

Action:
- Output: HALTED
- Output: exact reason
- Output: last known state
- Output: files that were created or modified before halt
- Do not attempt recovery automatically
- Wait for architect decision

Transition:
- Architect provides resolution → re-enter at appropriate state
- Architect instructs abort → STATE: IDLE

## Halt Conditions (Non-Negotiable)

The orchestrator must HALT immediately on any of the following:

- Working tree is dirty at slice start
- Remote is not the expected public remote
- A file write would touch a private repo path
- A runtime file would be modified (scripts/, src/, public/, examples/)
- A file contains a secret, password, API key, or env var
- A file contains a payment link, checkout link, or Lemon Squeezy reference
- A commit would include files outside the declared slice manifest
- A push would target anything other than the declared public remote

## Invariants

The following are permanent invariants that no slice may violate:

1. CORE remains private. Nothing in the public repo may reference or expose it.
2. Runtime behavior is never changed by documentation units.
3. index.html is never modified.
4. package.json and package-lock.json are never modified.
5. The public remote is the only permitted push target.
6. No commit is created without explicit architect approval.
7. No push is made without explicit architect instruction.
8. Validation always precedes checkpoint.
9. Checkpoint always precedes commit.
10. Unit sequence is always: Unit 1 → Unit 2 → Unit 3 in order.

## Recovery Protocol

If a unit is interrupted or incomplete:

1. Orchestrator inspects current branch state.
2. Orchestrator lists which files from the manifest are present and which are missing.
3. Orchestrator completes missing files only.
4. Orchestrator does not re-create files that already exist and are non-empty.
5. Orchestrator proceeds to validation once all files are present.

## Unit Sequencing Rule

The orchestrator enforces strict unit ordering.

Unit N+1 may not begin until:

- Unit N has produced a checkpoint report.
- The checkpoint report confirms all Unit N files are present and valid.
- The architect has explicitly approved Unit N.

This rule exists to prevent the failure mode where Unit 2 runs before Unit 1 is complete.

## Slice Manifest Format

Each slice must declare its manifest at the start of Unit 1.

Format:

```text
SLICE: NNN
UNIT_COUNT: N
UNITS:
  - UNIT: 1
    FILES:
      - docs/file-a.md
      - docs/file-b.md
  - UNIT: 2
    FILES:
      - docs/file-c.md
  - UNIT: 3
    FILES: []
    VALIDATION: true
```

The orchestrator reads this manifest at STATE: MANIFEST_CHECKING and uses it throughout all subsequent states.

## Status

DRAFT — Slice 108, Unit 1.

This document defines the orchestration contract.

Implementation spec is in: docs/slice-orchestrator-contract-108.md

---

## State Reference Index

Numbered state aliases for programmatic reference and validation.

| Numeric ID | State Name | Description |
|---|---|---|
| STATE 0 — UNINITIALIZED | IDLE (pre-slice) | No slice is in progress. System awaits architect intent. |
| STATE 1 — INTENT_RECEIVED | IDLE → DETECTING | Architect has declared a slice ID. Transition begins. |
| STATE 2 — DETECTING | DETECTING | Inspecting branch, remote, status, log. |
| STATE 3 — BRANCH_MISSING | BRANCH_CREATING | Slice branch does not exist. Will be created. |
| STATE 4 — BRANCH_EXISTS | BRANCH_RESUMING | Slice branch exists but is not current. Will checkout. |
| STATE 5 — MANIFEST_READING | MANIFEST_CHECKING | On correct branch. Reading declared unit manifest. |
| STATE 6 — FILES_COMPLETING | COMPLETING | One or more manifest files are missing. Writing now. |
| STATE 7 — CHECKPOINT_READY | CHECKPOINT | All validation checks passed. Checkpoint report produced. Awaiting architect approval. |
| STATE 8 — WAITING_APPROVAL | WAITING | Checkpoint produced. No architect response yet. Holding. |
| STATE 9 — APPROVED | APPROVED | Architect approved. Staging and committing slice files. |
| STATE 10 — COMMITTED | COMMITTED | Slice files committed. Awaiting push instruction. |
| STATE 11 — PUSHING | PUSHING | Push instruction received. Pushing branch to remote. |
| STATE 12 — PR_READY | PR_READY | Branch pushed. PR summary output. Awaiting merge instruction. |
| STATE 13 — MERGING | MERGING | Merge instruction received. Checking out main and merging. |
| STATE 14 — MERGE_CONFLICT | HALTED | Merge produced a conflict. Halted for architect resolution. |
| STATE 15 — CLEANUP_PENDING | CLEANUP | Merge succeeded. Awaiting cleanup instruction. |
| STATE 16 — BRANCH_DELETING | CLEANUP | Deleting local slice branch. |
| STATE 17 — REMOTE_BRANCH_DELETING | CLEANUP | Deleting remote slice branch (if instructed). |
| STATE 18 — HALTED | HALTED | Unrecoverable condition. Exact reason reported. Waiting for architect. |
| STATE 19 — SLICE_CLOSED | IDLE (post-slice) | All cleanup complete. Branch deleted. Slice fully merged. System returned to IDLE. |

### Key State Aliases for Validation

- **STATE 0 — UNINITIALIZED**: The system state before any slice has been started in the current session. Equivalent to IDLE with no active manifest.
- **STATE 7 — CHECKPOINT_READY**: The system has completed all required file creation and validation. A structured checkpoint report has been produced. The orchestrator is paused, awaiting explicit architect approval before any git operation.
- **STATE 19 — SLICE_CLOSED**: All slice units are complete, commit is merged into main, branch cleanup is done, and the orchestrator has returned to IDLE. No further action is taken until the next slice intent is declared.
