# GENESIS — Slice Orchestrator Contract 108

## Purpose

Define the binding contract between the GENESIS architect and the GENESIS execution agent for slice orchestration.

This document complements the state machine spec (slice-orchestrator-state-machine-108.md).

Where the state machine defines the states and transitions, this contract defines the obligations, rights, and boundaries of each party.

## Parties

### ARCHITECT

Role: System owner. Declares intent. Approves checkpoints. Issues instructions for commit and push.

Obligations:
- Declare the slice ID, unit count, and manifest at the start of every slice.
- Review and explicitly approve each unit checkpoint before the next unit begins.
- Issue explicit instructions for commit and push — never assume they are automatic.
- Declare HALT resolution when the orchestrator reports a blocked state.

Rights:
- Request re-execution of any unit.
- Override orchestrator decisions with explicit instruction.
- Abort any slice at any point.
- Inspect orchestrator state at any time.

### EXECUTION AGENT

Role: Implementation executor. Reads state. Creates files. Validates. Reports checkpoints.

Obligations:
- Inspect repository state before executing any unit.
- Never execute Unit N+1 until Unit N checkpoint is approved.
- Halt immediately on any halt condition.
- Report exact state on halt — do not guess or recover silently.
- Produce a checkpoint report after every unit.
- Never commit without explicit architect approval.
- Never push without explicit architect instruction.
- Never modify runtime files, index.html, package.json, or package-lock.json.
- Never expose or reference private GENESIS core.

Rights:
- Refuse to execute a unit if pre-conditions are not met.
- Report HALTED state and wait without proceeding.
- Request clarification from architect before continuing after a halt.

## Checkpoint Report Format

After every unit, the execution agent must produce a checkpoint report in this exact format:

```text
═══════════════════════════════════════
GENESIS SLICE NNN — UNIT X/Y CHECKPOINT
═══════════════════════════════════════

SLICE:        NNN — [Slice Title]
UNIT:         X of Y
SESSION_ID:   NNN-UX
BRANCH:       slice-NNN-name
STATUS:       COMPLETE | INCOMPLETE | HALTED

FILES CREATED:
  ✓ docs/file-a.md
  ✓ docs/file-b.md

FILES MODIFIED:
  (none)

RUNTIME FILES TOUCHED:
  (none)

PRIVATE REPO TOUCHED:
  (none)

VALIDATION:
  ✓ All files in public repo path
  ✓ No runtime files modified
  ✓ No private repo exposure
  ✓ No secrets or env vars
  ✓ No payment links

NEXT UNIT:
  Unit X+1 may begin after architect approval.

AWAITING ARCHITECT APPROVAL.
═══════════════════════════════════════
```

The checkpoint report must be produced before any commit or push action.

The checkpoint report must not be skipped or abbreviated.

## Halt Report Format

When the execution agent halts, it must produce a halt report in this exact format:

```text
═══════════════════════════════════════
GENESIS SLICE NNN — UNIT X/Y HALTED
═══════════════════════════════════════

SLICE:        NNN
UNIT:         X of Y
LAST STATE:   [STATE NAME]
HALT REASON:  [exact reason]

COMPLETED BEFORE HALT:
  ✓ docs/file-a.md — created
  ✗ docs/file-b.md — not created

ACTION REQUIRED FROM ARCHITECT:
  [specific instruction needed]

DO NOT PROCEED UNTIL ARCHITECT RESPONDS.
═══════════════════════════════════════
```

The execution agent must not attempt self-recovery from a HALTED state.

## Unit Pre-conditions

Before the execution agent begins any unit, it must verify:

| Pre-condition | Check |
|---|---|
| Branch is correct | git branch --show-current matches expected slice branch |
| Working tree is clean | git status --short returns no output |
| Remote is correct | git remote -v matches public remote only |
| Prior unit is approved | Architect has explicitly approved the previous unit checkpoint |
| Slice manifest is declared | Unit manifest was declared at slice start |

If any pre-condition fails, the execution agent must report HALTED before executing any file operations.

## File Operation Rules

The execution agent must follow these rules for all file operations:

1. Only create files declared in the slice manifest for the current unit.
2. Do not create files outside the declared manifest without explicit architect instruction.
3. Do not overwrite existing non-empty files unless explicitly instructed.
4. Verify each file path is inside the public repo before writing.
5. After writing each file, confirm the file exists and is non-empty.
6. Report any file that could not be written as a HALTED condition.

## Prohibited Actions

The execution agent is permanently prohibited from:

- Touching any file in scripts/, src/, public/, examples/
- Modifying index.html
- Modifying package.json or package-lock.json
- Adding payment links, checkout links, or Lemon Squeezy references
- Adding secrets, API keys, passwords, or environment variables
- Connecting to external platforms
- Publishing, submitting, or sending anything
- Committing without explicit approval
- Pushing without explicit instruction
- Merging without explicit instruction
- Touching any private GENESIS core path

Violation of any prohibited action constitutes an immediate halt condition and must be reported.

## Slice Manifest Declaration

The architect must declare the slice manifest at the start of Unit 1.

The execution agent must read and store the manifest before executing any file operation.

The manifest governs the entire slice lifecycle:
- Which files must be created in each unit
- Which unit performs validation
- What the correct branch name is
- How many units the slice contains

If the manifest is not declared, the execution agent must halt and request it before proceeding.

## Approval Protocol

### Approving a Unit

The architect approves a unit by sending one of:

- "APPROVED"
- "APPROVE UNIT X"
- "POST-APPROVAL: UNIT X"
- An explicit positive statement that the unit is complete and approved

The execution agent must not proceed to the next unit on an implicit or ambiguous signal.

### Approving a Commit

The architect approves a commit by sending one of:

- "COMMIT"
- "COMMIT SLICE NNN UNIT X"
- An explicit instruction to commit

The execution agent must not create a commit on an implicit or ambiguous signal.

### Approving a Push

The architect approves a push by sending one of:

- "PUSH"
- "PUSH TO REMOTE"
- An explicit instruction to push

The execution agent must not push on an implicit or ambiguous signal.

## Recovery Protocol

If the execution agent is interrupted mid-unit:

1. On re-entry, the execution agent inspects the current branch and manifest.
2. It lists which files from the manifest are present and which are missing.
3. It completes only the missing files.
4. It does not re-create files that already exist and are non-empty.
5. It proceeds to validation once all files are present.
6. It produces a checkpoint report as if the unit had completed normally.

The architect must confirm the manifest and branch are correct before the execution agent begins recovery.

## Slice Lifecycle Summary

```text
Architect declares slice intent and manifest
  ↓
Execution agent detects state and resolves branch
  ↓
Unit 1 executes: files created, checkpoint produced
  ↓
Architect reviews and approves Unit 1
  ↓
Unit 2 executes: files created, checkpoint produced
  ↓
Architect reviews and approves Unit 2
  ↓
Unit 3 executes: validation, final checkpoint produced
  ↓
Architect approves final checkpoint
  ↓
Execution agent commits (on explicit approval)
  ↓
Execution agent pushes (on explicit instruction)
  ↓
Execution agent merges (on explicit instruction)
  ↓
Execution agent confirms cleanup
  ↓
Slice complete — returns to IDLE
```

## Required Slice Metadata

Every slice prompt must declare the following metadata at the start of Unit 1. The execution agent must verify all fields are present before proceeding.

| Field | Type | Description |
|---|---|---|
| SLICE | integer | Unique monotonically increasing slice number (e.g. 108) |
| SLICE_TITLE | string | Short human-readable name for the slice |
| BRANCH | string | Exact git branch name: slice-NNN-slug |
| UNIT_COUNT | integer | Total number of units in this slice (usually 3) |
| SESSION_ID | string | Unique session identifier: NNN-U1, NNN-U2, NNN-U3 |
| REPO_PATH | path | Absolute path to the public repo root |
| REMOTE_URL | URL | Must be https://github.com/aicodesafety/genesis-ai-code-safety-demo.git |

If any Required Slice Metadata field is absent or incorrect, the execution agent must HALT before creating any file.

## Required Unit Metadata

Each unit prompt must declare the following metadata. The execution agent must verify all fields match the slice manifest before beginning file operations.

| Field | Type | Description |
|---|---|---|
| UNIT | integer | Unit number within the slice (1, 2, or 3) |
| UNIT_TITLE | string | Short human-readable description of this unit's purpose |
| SESSION_ID | string | Must match: SLICE_ID-U(UNIT) |
| FILES | list | Exact list of files this unit must create or modify |
| VALIDATION | boolean | Whether this unit performs validation (true for Unit 3) |
| COMMIT_ALLOWED | boolean | Whether a commit may be created (never true in Unit 1 or 2) |

If any Required Unit Metadata field is absent, the execution agent must HALT and request the manifest.

## Required Manifest Shape

The slice manifest must conform to the following shape. Any manifest that deviates from this shape must be rejected.

```text
SLICE: NNN
SLICE_TITLE: [descriptive title]
BRANCH: slice-NNN-slug
UNIT_COUNT: N
REMOTE: https://github.com/aicodesafety/genesis-ai-code-safety-demo.git

UNITS:
  - UNIT: 1
    TITLE: [unit 1 purpose]
    FILES:
      - docs/file-a.md
      - docs/file-b.md
    VALIDATION: false
    COMMIT_ALLOWED: false

  - UNIT: 2
    TITLE: [unit 2 purpose]
    FILES:
      - docs/file-c.md
      - docs/file-d.md
      - docs/file-e.md
    VALIDATION: false
    COMMIT_ALLOWED: false

  - UNIT: 3
    TITLE: Validation / Checkpoint / Git procedure
    FILES: []
    VALIDATION: true
    COMMIT_ALLOWED: true
```

The Required Manifest Shape is binding. Deviations require an explicit architect override.

## Idempotency Rule

The execution agent must treat all file creation and git operations as idempotent.

**File idempotency**: If a file already exists and is non-empty, the execution agent must NOT overwrite it unless the architect has explicitly instructed replacement. The agent must instead report the existing file as FOUND and proceed to the next missing file.

**Branch idempotency**: If the slice branch already exists, the execution agent must NOT recreate it. It must checkout the existing branch and continue.

**Commit idempotency**: If a commit already exists with the expected message, the execution agent must NOT create a duplicate commit. It must report the existing commit and confirm whether a push is still needed.

**Push idempotency**: If the branch has already been pushed and the remote is up to date, the execution agent must NOT push again. It must report that the remote is already at the expected commit.

**Merge idempotency**: If the slice branch has already been merged into main, the execution agent must NOT merge again. It must report that the merge is already present in main history.

The Idempotency Rule exists to prevent destructive duplication when a unit is re-run after partial success. Violation of this rule is a GIT_STAGE_FAILURE or GIT_COMMIT_FAILURE and must be reported.

## Versioning

This contract applies from Slice 108 onward.

Previous slices are not retroactively governed by this contract.

Future revisions to this contract must be declared in a new docs/slice-orchestrator-contract-NNN.md file.

## Status

DRAFT — Slice 108, Unit 1.

State machine spec is in: docs/slice-orchestrator-state-machine-108.md
