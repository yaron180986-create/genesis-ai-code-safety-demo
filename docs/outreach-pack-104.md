# GENESIS — First Outreach Pack 104

## Goal

Turn the live demo into real feedback.

Primary objective:

10 targeted outreach messages
→ 3 replies
→ 1 confirmed pain signal
→ 1 possible pilot candidate

## Core Links

Live demo:

https://aicodesafety.com

Public repo:

https://github.com/aicodesafety/genesis-ai-code-safety-demo

Contact:

hello@aicodesafety.com

## Positioning

GENESIS is an AI Code Safety Gate.

It sits between AI-generated code and execution.

It classifies changes as:

- ALLOW
- REQUIRE_APPROVAL
- BLOCK

One-line message:

Stop risky AI code before it runs.

## Target Audience

Prioritize people who:

- use Cursor
- use GitHub Copilot
- use Claude Code
- use ChatGPT for coding
- build AI-assisted engineering workflows
- lead small engineering teams
- build developer tools
- have posted about AI-generated code problems
- care about CI, code review, or safety gates

## Do Not Target Yet

Avoid for now:

- broad non-technical audiences
- paid ad audiences
- random startup directories
- investors before feedback exists
- enterprise procurement people before pilot proof

## LinkedIn Post

Use this post:

Last month one of my AI agents deleted a working export function.

It passed every linter check. Tests still passed. But the module was dead.

I caught it by accident during manual review.

That is what GENESIS is for.

GENESIS is an AI code safety gate.

Before any AI-generated change reaches execution, it classifies the change as:

ALLOW
REQUIRE_APPROVAL
BLOCK

It does not replace tests.
It runs before tests, at the point where AI-generated code enters the workflow.

Live demo:

https://aicodesafety.com

Public repo:

https://github.com/aicodesafety/genesis-ai-code-safety-demo

Question for developers using Cursor, Copilot, Claude Code, or ChatGPT:

Have you ever had AI-generated code break something you did not catch until later?

I am collecting real patterns before building more.

## Short Direct Message

Hey [Name] — I shipped a live demo of something I am building: a pre-execution safety gate for AI-generated code.

It classifies AI code changes as ALLOW / REQUIRE_APPROVAL / BLOCK before execution.

Try it here:
https://aicodesafety.com

Quick question:
Have you ever had AI-generated code break something unexpectedly in a real project?

— Yaron

## Very Short Version

I built a live demo for an AI code safety gate:

https://aicodesafety.com

It classifies AI-generated changes before execution.

Have you ever had AI code break something unexpectedly?

## Technical Founder Message

Hey [Name] — I am testing a small public demo around AI-generated code risk.

The idea:

AI-generated code
→ safety gate
→ ALLOW / REQUIRE_APPROVAL / BLOCK
→ execution

Live demo:
https://aicodesafety.com

I am trying to learn whether teams using Cursor / Copilot / Claude Code actually feel this pain.

Have you seen AI-generated code silently break something in a real workflow?

## Developer Tools Message

Hey [Name] — I saw you are interested in developer tools / AI coding workflows.

I built a live public demo for a pre-execution AI code safety gate:

https://aicodesafety.com

It shows how risky AI-generated changes can be blocked or queued for review before execution.

Would love your honest take:
Is this a real workflow problem, or just a demo curiosity?

## GitHub / Open Source Message

Hey [Name] — I launched a public demo repo for an AI Code Safety Gate.

Live demo:
https://aicodesafety.com

Repo:
https://github.com/aicodesafety/genesis-ai-code-safety-demo

It demonstrates ALLOW / REQUIRE_APPROVAL / BLOCK decisions for AI-generated code changes.

Question:
Would this be more useful as a CLI, GitHub Action, CI check, or editor integration?

## When To Mention Paid Pilot

Do not mention paid pilot in the first message.

Only mention it if the person says something like:

- this happened to us
- we need this
- can this run in CI
- can this work on our stack
- can you help us test this
- how would this integrate

Then reply:

I am running a small paid pilot for teams that already feel this workflow pain.

It starts with mapping where AI-generated code enters your workflow and defining the first safety-gate layer around it.

If useful, we can explore whether your workflow is a fit.

## What To Track

For each person:

- name
- platform
- why relevant
- message sent
- reply
- pain confirmed
- pilot fit
- next action
- notes

## Success Criteria

Minimum:

- 10 people contacted
- 3 replies
- 1 real pain signal

Strong:

- 10 people contacted
- 5 replies
- 2 demo requests
- 1 pilot candidate

## Rule

Do not build more product features until first feedback is reviewed.
