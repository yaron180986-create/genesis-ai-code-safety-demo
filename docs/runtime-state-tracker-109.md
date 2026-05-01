# GENESIS — Runtime State Tracker 109

## Purpose

Define the behavior of the `slice-state-tracker.js` script that reads a GENESIS orchestrator manifest and reports the current runtime state of a slice.

The tracker is read-only.

It does not write files, stage changes, create commits, push, merge, or delete branches.

## Problem Being Solved

After Slice 108 introduced the orchestrator state machine, a gap remained: there was no lightweight tool to inspect the current slice state on demand without triggering an orchestration run.

The runtime tracker fills this gap.

It can be run at any point during a slice lifecycle — before execution, mid-execution, or at checkpoint — and it will report exactly what is present, what is missing, and what the next safe action is.

## Core Principle

The tracker reads the manifest. It does not hold state of its own.

Running the tracker twice produces the same output if the filesystem and Git state have not changed between runs.

The tracker is safe to run at any time.

## Input

The tracker accepts one optional argument: the path to the manifest file.

```
node scripts/slice-state-tracker.js [manifest-path]
```

If no argument is provided, the tracker defaults to:

```
manifests/slice-109-orchestrator-manifest.json
```

## Output Sections

The tracker prints the following sections to stdout:

### Header

```
GENESIS SLICE STATE TRACKER
===========================
Manifest: <manifest-path>
```

### Slice Identity

```
Slice: <number> — <name>
Expected branch: <branch>
Current branch:  <detected>
```

### Remote

```
Expected remote: <manifest-remote>
Current remote:  <detected>
```

### Working Tree

```
Working tree: CLEAN | CHANGES DETECTED
```

Lists any changed files detected by `git status --short`.

### Required Files

For each file in `requiredFiles`:

```
[OK]     <file>
[MISSING] <file>
```

### Markers

For each marker in the manifest:

```
[OK]     <file> — "<marker>"
[MISSING] <file> — "<marker>"
```

### Forbidden Changed Files

For each file in `forbiddenFiles` that appears modified:

```
[VIOLATION] <file>
```

If none:

```
[OK] no forbidden files changed
```

### Validation Commands

Lists all commands declared in `validationCommands`. Does not run them — lists them for reference.

### Inferred Lifecycle State

One of:

```
NOT STARTED     — branch or required files missing
IN PROGRESS     — some files present, some missing
READY           — all files present, all markers found, no violations
CHECKPOINT HELD — ready and no forbidden changes detected
```

### Next Safe Action

One sentence describing the appropriate next step based on the inferred lifecycle state.

## Enforcement

The tracker exits nonzero if any of the following conditions are detected:

- Manifest file cannot be read or parsed
- `slice.number` is not an integer
- `slice.branch` is missing
- `repository.remote` is missing
- Current remote does not match manifest remote
- A forbidden file appears in `git status --short`
- Any required file is missing
- Any marker is missing from its target file

## Blocked Commands

The tracker must never internally invoke:

```
git add
git commit
git push
git merge
git branch -D
git push origin --delete
rm -rf
curl
wget
```

If a future modification to the tracker were to add any of these, it would violate the read-only contract.

## Exit Codes

| Code | Meaning |
|------|---------|
| 0    | All checks passed |
| 1    | One or more checks failed |

## Integration

The tracker is registered in `package.json` under two scripts:

```json
"slice:state": "node scripts/slice-state-tracker.js",
"slice:state:109": "node scripts/slice-state-tracker.js manifests/slice-109-orchestrator-manifest.json"
```

Both scripts invoke the same tracker. The explicit form passes the manifest path directly.

## Safety Properties

- No network access.
- No file writes.
- No Git mutations.
- No subprocess execution beyond read-only Git commands.
- Idempotent — safe to run multiple times.
- Does not modify `package-lock.json` or any tracked file.
