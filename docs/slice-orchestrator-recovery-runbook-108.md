# GENESIS — Slice Orchestrator Recovery Runbook 108

## Purpose

Define how the execution agent should recover from any interrupted or out-of-order slice execution.

This runbook applies to all slices governed by the Slice Orchestrator state machine (Slice 108 onward).

## Recovery Command

When a slice is in an unknown or incomplete state, the architect sends:

```text
ORCHESTRATE SLICE [number] FROM CURRENT STATE
```

This command instructs the execution agent to:

1. Inspect the actual repository state.
2. Determine which files exist, which are missing, which are incomplete.
3. Determine the current git state (branch, remote, status, log).
4. Resume from the correct state without re-doing completed work.
5. Produce a recovery report before taking any action.

The execution agent must not assume anything. It must read from the filesystem and git before acting.

---

## Recovery Scenarios

### Recovery Scenario 1 — Unit 2 Invoked Before Unit 1

**Symptom**: Unit 2 prompt was sent before Unit 1 files were created. Unit 1 files are missing.

**Detection**:
- Unit 2 files exist (or were attempted)
- Unit 1 files are absent from the filesystem

**Recovery**:
1. Report that Unit 1 files are missing.
2. Create Unit 1 files.
3. Validate Unit 1 output.
4. Produce Unit 1 checkpoint and request approval before continuing to Unit 2.

**Do not** proceed to Unit 2 validation until Unit 1 is approved.

---

### Recovery Scenario 2 — Unit 3 Invoked Before Unit 2

**Symptom**: Unit 3 validation prompt was sent before Unit 2 files were created. Unit 2 files are missing.

**Detection**:
- Unit 3 validation checks fail on missing required files
- Unit 2 files are absent from the filesystem

**Recovery**:
1. Report which Unit 2 files are missing.
2. Create missing Unit 2 files.
3. Validate all required files now exist.
4. Produce Unit 2 + Unit 3 combined checkpoint report.
5. Request approval before commit.

---

### Recovery Scenario 3 — Branch Exists But Is Empty

**Symptom**: The slice branch exists in git, but no slice files have been created. Branch may only have the base commit from main.

**Detection**:
- `git branch --show-current` shows the correct slice branch
- `git status --short` shows no changes
- `ls docs/` shows no slice-NNN files

**Recovery**:
1. Confirm branch name and remote are correct.
2. Treat this as a fresh start on the correct branch.
3. Create all Unit 1 and Unit 2 files.
4. Validate.
5. Produce checkpoint.

---

### Recovery Scenario 4 — Some Required Files Exist

**Symptom**: Recovery is triggered mid-execution. Some required files are present, others are missing.

**Detection**:
- File manifest check shows a mix of FOUND and MISSING results

**Recovery**:
1. List all FOUND files with line counts.
2. List all MISSING files.
3. Create only the MISSING files.
4. Do not overwrite FOUND files unless explicitly instructed.
5. Validate the complete set.
6. Produce checkpoint.

---

### Recovery Scenario 5 — File Exists But Is Incomplete

**Symptom**: A required file exists on disk but is clearly incomplete (empty body, placeholder-only content, under 10 lines with no substantive content).

**Detection**:
- `wc -l` shows very low line count
- File content is a stub or contains only a title line

**Recovery**:
1. Report the file as INCOMPLETE — show its line count and first 5 lines.
2. Ask architect whether to replace or append.
3. Do not silently overwrite.
4. On explicit instruction: replace or append as directed.
5. Validate after replacement.

---

### Recovery Scenario 6 — Commit Already Exists

**Symptom**: The expected commit message already appears in `git log`. A prior session may have committed successfully.

**Detection**:
- `git log --oneline` shows the expected `docs(genesis):` commit message
- All slice files are tracked

**Recovery**:
1. Report: commit is already present.
2. Confirm: working tree is clean, all files are committed.
3. Ask architect: is a push still needed, or was push already completed?
4. Do not create a duplicate commit.
5. Proceed to push step only on explicit instruction.

---

### Recovery Scenario 7 — Push Already Happened

**Symptom**: The slice branch already exists on the remote. The commit is already pushed.

**Detection**:
- `git log --oneline` shows expected commit
- `git branch -r` shows `origin/slice-NNN-name`
- Remote branch is at the same commit as local

**Recovery**:
1. Report: push is already complete.
2. Confirm: remote branch matches local commit.
3. Ask architect: is a merge still needed?
4. Do not push again.

---

### Recovery Scenario 8 — Merge Already Happened

**Symptom**: The slice commit already appears in main history. Merge was completed in a prior session.

**Detection**:
- `git log origin/main --oneline` includes the expected `merge(genesis):` commit
- Remote main is ahead of the slice branch base

**Recovery**:
1. Report: merge is already present in main.
2. Confirm: merge commit hash and message.
3. Ask architect: is branch cleanup still needed?
4. Do not merge again.

---

### Recovery Scenario 9 — Remote Branch Already Deleted

**Symptom**: Branch cleanup was already performed. Remote slice branch no longer exists.

**Detection**:
- `git branch -r` does not show `origin/slice-NNN-name`
- Local branch may or may not still exist

**Recovery**:
1. Report: remote branch is already deleted.
2. Confirm: main contains the merge commit.
3. If local branch still exists: ask architect whether to delete it.
4. Do not attempt to delete the remote branch again (would error).

---

### Recovery Scenario 10 — Unexpected Runtime Change Detected

**Symptom**: A runtime file has been modified. Detected during pre-execution check or during validation.

**Detection**:
- `git status --short` shows changes to `scripts/`, `src/`, `public/`, `examples/`, `index.html`, `package.json`, or `package-lock.json`

**Recovery**:
1. HALT immediately.
2. Report: unexpected runtime change detected.
3. List the exact files changed.
4. Do not create or modify any docs.
5. Do not commit.
6. Wait for architect resolution.

This is a SAFETY_BOUNDARY_FAILURE. It cannot be auto-recovered.

---

### Recovery Scenario 11 — Wrong Remote

**Symptom**: The git remote does not point to the expected public repo.

**Detection**:
- `git remote -v` does not show `https://github.com/aicodesafety/genesis-ai-code-safety-demo.git`

**Recovery**:
1. HALT immediately.
2. Report: remote is unexpected.
3. Show the actual remote URL.
4. Do not create any files.
5. Do not commit or push.
6. Wait for architect to correct the remote.

This is a REPO_STATE_FAILURE. It cannot be auto-recovered.

---

### Recovery Scenario 12 — Dirty Main

**Symptom**: During merge preparation, main is found to have uncommitted changes or is behind the remote.

**Detection**:
- `git status --short` shows changes after `git checkout main`
- `git pull origin main` shows diverged history

**Recovery**:
1. HALT immediately.
2. Report: main is dirty or diverged.
3. Show `git status` output.
4. Do not merge.
5. Wait for architect to resolve main state before proceeding.

---

## Recovery Decision Table

| Scenario | Auto-recover? | Action |
|---|---|---|
| Unit 2 before Unit 1 | Yes | Create Unit 1 files, then proceed |
| Unit 3 before Unit 2 | Yes | Create missing Unit 2 files, then validate |
| Branch exists but empty | Yes | Create all files from scratch |
| Some files exist | Yes | Create only missing files |
| File exists but incomplete | No — report first | Ask architect before replacing |
| Commit already exists | No — report | Confirm state, ask about push |
| Push already happened | No — report | Confirm state, ask about merge |
| Merge already happened | No — report | Confirm state, ask about cleanup |
| Remote branch deleted | No — report | Confirm state, ask about local branch |
| Runtime file changed | HALT | Do not proceed — architect must resolve |
| Wrong remote | HALT | Do not proceed — architect must correct |
| Dirty main | HALT | Do not proceed — architect must resolve |

---

## Required Recovery Report

Before taking any recovery action, the execution agent must produce this report:

```text
═══════════════════════════════════════
GENESIS SLICE NNN — RECOVERY DETECTED
═══════════════════════════════════════

SLICE:        NNN — [Slice Title]
BRANCH:       [current branch]
REMOTE:       [remote URL]

REPOSITORY STATE:
  branch: [current branch]
  remote: [remote URL — SAFE or UNEXPECTED]
  working tree: [CLEAN or DIRTY — list changed files if dirty]
  last commit: [hash and message]

FILE MANIFEST STATE:
  ✓ docs/file-a.md — FOUND (NNN lines)
  ✗ docs/file-b.md — MISSING
  ⚠ docs/file-c.md — INCOMPLETE (3 lines)

RECOVERY PLAN:
  - Create: docs/file-b.md
  - Report: docs/file-c.md is incomplete — awaiting architect instruction
  - Preserve: docs/file-a.md — not overwriting

AWAITING ARCHITECT CONFIRMATION BEFORE PROCEEDING.
═══════════════════════════════════════
```

The recovery report must be produced before any file is created or modified.

---

## Idempotency Guarantee

This recovery runbook is designed to be idempotent.

Running recovery multiple times on the same repository state produces the same output.

Running recovery on a fully-complete slice produces a confirmation report with no file operations.

Running recovery on a partially-complete slice produces only the missing files.

No recovery action overwrites existing non-empty files without explicit architect instruction.

---

## Final Rule

Recovery does not mean restarting from scratch.

Recovery means inspecting what is real, completing what is missing, and stopping at the correct checkpoint.

GENESIS orchestration always follows the real repository state — not what it expected to find.
