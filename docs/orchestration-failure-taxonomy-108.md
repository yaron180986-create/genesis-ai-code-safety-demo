# GENESIS — Orchestration Failure Taxonomy 108

## Purpose

Define all recognized failure categories for the GENESIS Slice Orchestrator.

Every failure the execution agent encounters must be classified against this taxonomy before a halt report is produced.

This taxonomy applies to all slices governed by the Slice Orchestrator state machine (Slice 108 onward).

---

## Severity Levels

| Level | Code | Meaning |
|---|---|---|
| LOW | L | Non-blocking informational discrepancy. Logged but execution continues. |
| MEDIUM | M | Recoverable issue. Execution pauses. Architect notified. Agent may auto-recover with instruction. |
| HIGH | H | Non-recoverable without architect action. Execution HALTS. No file operations continue. |
| CRITICAL | C | Safety boundary violation. Execution HALTS immediately. No git operation may proceed until resolved. |

---

## Failure Categories

### REPO_STATE_FAILURE

**Severity:** CRITICAL

**Definition:**
The repository is not in the expected state for slice execution to begin safely.

**Triggers:**
- Remote does not point to the expected public URL
- `git remote -v` shows a private or unexpected repository
- Working tree is dirty at slice entry (unrelated files changed)
- Current branch is main when a slice branch is expected
- git is not initialized in the expected directory

**Action:**
HALT immediately. Report exact remote URL or git status output. Do not create or modify any file.

**Resolution:**
Architect must correct the remote or clean the working tree before execution resumes.

---

### BRANCH_FAILURE

**Severity:** HIGH

**Definition:**
The slice branch could not be created, checked out, or verified.

**Triggers:**
- `git checkout -b` fails
- `git checkout slice-NNN-name` fails (branch exists but checkout errors)
- Current branch after checkout does not match expected branch name
- Branch name does not follow the `slice-NNN-slug` convention

**Action:**
HALT. Report exact git error output. Do not create any slice files.

**Resolution:**
Architect must resolve git branch state before execution resumes.

---

### UNIT_ORDER_FAILURE

**Severity:** HIGH

**Definition:**
A unit was invoked out of the required sequence (Unit 1 → Unit 2 → Unit 3).

**Triggers:**
- Unit 2 prompt received before Unit 1 files exist
- Unit 3 validation invoked before Unit 2 files exist
- A unit prompt arrives without the preceding unit checkpoint being approved

**Action:**
HALT. Report which unit was invoked and which prior unit files are missing. List the missing files.

**Resolution:**
Agent recovers by creating missing prior-unit files, then produces the correct checkpoint before proceeding.

Note: UNIT_ORDER_FAILURE is recoverable if the missing files can be created. It becomes a non-recoverable HALT only if the architect explicitly blocks recovery.

---

### FILE_MANIFEST_FAILURE

**Severity:** MEDIUM

**Definition:**
One or more files declared in the slice manifest could not be found, created, or verified.

**Triggers:**
- A required file is absent after the completion step
- A file write failed (permission error, disk full, path error)
- A file was created but is empty or less than 5 lines
- A file path is outside the allowed public repo directory

**Action:**
Report which files are FOUND, MISSING, INCOMPLETE, or PATH_INVALID. Attempt creation of MISSING files. Report INCOMPLETE files before replacing.

**Resolution:**
Agent creates missing files. Reports INCOMPLETE files to architect for decision. Path errors are escalated to CRITICAL.

---

### VALIDATION_FAILURE

**Severity:** HIGH

**Definition:**
One or more required validation checks failed during Unit 3 or any end-of-unit validation step.

**Triggers:**
- A required grep check does not find the expected string in the expected file
- `npm run demo:safe`, `npm run demo:danger`, or `npm run demo:dead-code` exits non-zero
- A required file exists but does not contain required content markers
- A validation step produces unexpected output

**Action:**
HALT. Report exact check that failed, exact file and line if known. Do not produce a passing checkpoint. Do not commit.

**Resolution:**
Architect must instruct whether to update the file, re-run a prior unit, or override the check.

---

### SAFETY_BOUNDARY_FAILURE

**Severity:** CRITICAL

**Definition:**
A safety boundary was violated or nearly violated during execution.

**Triggers:**
- A runtime file was modified: `scripts/`, `src/`, `public/`, `examples/`, `index.html`, `package.json`, `package-lock.json`
- A file contains a real secret, API key, password, or environment variable
- A file contains a payment link, checkout link, or Lemon Squeezy URL
- A file path references or exposes the private GENESIS core
- A file contains a real external URL that was not in the prior slice history

**Action:**
HALT immediately. Report exact file and line. Do not commit. Do not push. Do not produce a passing checkpoint.

**Resolution:**
Architect must review and confirm the violation before any further execution. If the violation is in a file the agent created, the agent must offer to delete or sanitize it.

---

### GIT_STAGE_FAILURE

**Severity:** HIGH

**Definition:**
The git staging step (git add) did not produce the expected staged file list.

**Triggers:**
- `git diff --cached --name-only` shows files not in the slice manifest
- `git diff --cached --name-only` shows files from prior slices unexpectedly staged
- Staging produced no output (no files staged)
- A staged file is a runtime file

**Action:**
HALT before commit. Report exact diff --cached output. Do not commit until staging is verified clean.

**Resolution:**
Architect must confirm which files should be staged. Agent unstages unexpected files on instruction.

---

### GIT_COMMIT_FAILURE

**Severity:** HIGH

**Definition:**
The git commit step failed or produced unexpected results.

**Triggers:**
- `git commit` exits non-zero
- A pre-commit hook failed
- The commit message does not match the expected `docs(genesis):` format
- `git log --oneline` after commit does not show the expected commit

**Action:**
HALT. Report exact commit error output. Do not push.

**Resolution:**
Architect decides whether to fix the hook failure, amend, or abort.

---

### GIT_PUSH_FAILURE

**Severity:** HIGH

**Definition:**
The git push step failed or targeted an unexpected remote.

**Triggers:**
- `git push` exits non-zero
- Remote rejected the push (non-fast-forward, permissions, protected branch)
- Push targeted a remote other than the expected public URL
- Remote branch after push does not match local commit hash

**Action:**
HALT. Report exact push error output. Do not merge.

**Resolution:**
Architect resolves remote state before push is retried.

---

### GIT_MERGE_FAILURE

**Severity:** HIGH

**Definition:**
The git merge step failed or produced a conflict.

**Triggers:**
- `git merge` exits non-zero
- A merge conflict is detected in any file
- Merge was fast-forward when --no-ff was required
- Post-merge `git status` shows dirty working tree

**Action:**
HALT. Report exact merge error and conflict list. Do not push main. Do not clean up branch.

**Resolution:**
Architect resolves conflict. Agent resumes merge push only on explicit instruction.

---

### CLEANUP_FAILURE

**Severity:** MEDIUM

**Definition:**
Branch cleanup could not be completed.

**Triggers:**
- Remote branch deletion fails (already deleted, permissions error)
- Local branch deletion fails (not fully merged, detached HEAD)
- `git branch -r` still shows the remote branch after deletion attempt

**Action:**
Report the failure. Do not retry automatically. Confirm whether the merge is already complete in main.

**Resolution:**
Architect confirms cleanup is safe and instructs retry or accepts partial cleanup.

---

### IDEMPOTENCY_FAILURE

**Severity:** MEDIUM

**Definition:**
An operation was attempted that would create a duplicate of an already-completed action.

**Triggers:**
- A commit with the expected message already exists in `git log` and a second commit was about to be created
- A push was about to be made but the remote is already at the expected commit
- A merge was about to be made but the merge commit already exists in main history
- A file was about to be created but it already exists with full content

**Action:**
Report the duplicate condition. Do not perform the duplicate operation. Confirm the existing state and ask architect whether to proceed to the next step.

**Resolution:**
Architect confirms which step to skip and what the next required action is. Agent updates its state accordingly.

---

## Failure Report Format

When reporting any failure, the execution agent must use this format:

```text
═══════════════════════════════════════
GENESIS SLICE NNN — FAILURE DETECTED
═══════════════════════════════════════

SLICE:         NNN — [Slice Title]
UNIT:          X of Y
FAILURE TYPE:  [FAILURE_CATEGORY from this taxonomy]
SEVERITY:      [LOW | MEDIUM | HIGH | CRITICAL]

FAILED CHECK:
  [Exact check or operation that failed]

DETAIL:
  [File path, line number, git output, or exact error message]

STATE AT FAILURE:
  Branch:       [branch name]
  Remote:       [remote URL]
  Working tree: [CLEAN | DIRTY — list]
  Last commit:  [hash and message]

FILES COMPLETED BEFORE FAILURE:
  ✓ docs/file-a.md — written
  ✗ docs/file-b.md — not written

ACTION REQUIRED:
  [Specific instruction the architect must provide to resume]

DO NOT PROCEED UNTIL ARCHITECT RESPONDS.
═══════════════════════════════════════
```

---

## Final Rule

Every failure must be classified.

Unclassified failures are treated as CRITICAL until proven otherwise.

The execution agent does not self-recover from CRITICAL failures.

The execution agent does not silently swallow failures.

Every failure produces a halt report. Every halt report waits for architect response.
