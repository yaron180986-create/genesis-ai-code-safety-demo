# GENESIS — Orchestrator Manifest Schema 109

## Purpose

Define the machine-readable manifest format that allows GENESIS to fully orchestrate a slice without relying on implicit knowledge or manual sequencing.

A slice without a manifest is not fully orchestratable.

## Problem Being Solved

Previous slices required Claude and the user to carry orchestration state in conversation context.

When context was lost or units were invoked out of order, the system failed silently or stopped without a clear recovery path.

A machine-readable manifest solves this by encoding the complete slice contract in a versioned JSON file that any agent or tool can read and verify independently.

## Core Principle

Every slice in GENESIS must declare:

- Its identity (number, name, branch)
- Its repository boundary (remote, forbidden files)
- Its required deliverables (files that must exist)
- Its required markers (strings that must appear in those files)
- Its allowed changes (files that may be modified)
- Its forbidden changes (files that must not be modified)
- Its validation commands (what to run to confirm correctness)
- Its Git commit and merge message templates

## Schema Version

All manifests for Slice 109 and later use:

```
schemaVersion: "1.0"
```

## Schema Structure

```json
{
  "schemaVersion": "1.0",
  "slice": {
    "number": <integer>,
    "name": <string>,
    "branch": <string>
  },
  "repository": {
    "remote": <string>,
    "forbiddenFiles": [ <string>, ... ]
  },
  "requiredFiles": [ <string>, ... ],
  "allowedChanges": [ <string>, ... ],
  "markers": {
    "<file-path>": "<required-string>",
    ...
  },
  "validationCommands": [ <string>, ... ],
  "git": {
    "commitMessage": <string>,
    "mergeMessage": <string>
  }
}
```

## Field Definitions

### schemaVersion

String. Must be `"1.0"` for manifests conforming to this schema.

### slice.number

Integer. The canonical slice number assigned at planning time.

### slice.name

String. Human-readable name for the slice.

### slice.branch

String. The exact Git branch name for this slice. The orchestrator must verify this matches `git branch --show-current` before proceeding.

### repository.remote

String. The full HTTPS remote URL for the public demo repository. The orchestrator must verify this matches `git remote get-url origin` before proceeding.

### repository.forbiddenFiles

Array of strings. File paths and directory prefixes that must not appear in `git status --short` as modified. Any modification to these files is a STOP condition.

### requiredFiles

Array of strings. Files that must exist on disk before validation can pass. A missing required file is a STOP condition.

### allowedChanges

Array of strings. Files that may legitimately appear as modified in `git status --short` for this slice. Changes outside this list are a STOP condition.

### markers

Object. Maps each file path to a string that must appear inside that file. A missing marker is a STOP condition.

### validationCommands

Array of strings. Shell commands that must all exit zero for the slice to be considered valid.

### git.commitMessage

String. The exact commit message to use when the user approves the commit.

### git.mergeMessage

String. The exact merge message to use when the user approves the merge.

## Enforcement Rules

The `slice-state-tracker.js` script reads this manifest and enforces all fields at runtime.

The tracker is read-only. It does not write, stage, commit, push, or merge.

Any field that fails validation causes the tracker to exit nonzero and print the failing condition.

## Lifecycle Integration

A manifest is consumed at three points in the slice lifecycle:

1. **Pre-execution** — agent reads the manifest to know what to create.
2. **Mid-execution** — tracker reads the manifest to verify partial state.
3. **Checkpoint** — validation unit reads the manifest to confirm readiness before proposing a commit.

## What This Enables

- Any agent can recover a slice from any point by reading the manifest.
- No slice state is stored only in conversation context.
- Validation is deterministic and repeatable.
- The Git procedure is encoded in the manifest, not only in the prompt.
