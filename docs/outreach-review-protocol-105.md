# GENESIS — Outreach Review Protocol 105

## Purpose

Define how the user reviews, approves, sends, and tracks the first outreach messages.

This document protects the brand from spam behavior.

## Rule

No automatic outreach.

Every first-batch message requires user review.

Every message must be manually sent by the user or through an explicitly approved manual workflow.

## Review Flow

1. Discover 30 public leads.
2. Score every lead from 1 to 5.
3. Shortlist the top 10.
4. Prepare 3 personalized first messages.
5. User reviews the 3 messages.
6. User sends manually.
7. Record replies.
8. Classify responses.
9. Decide whether to continue to 10.

## Message Quality Standard

Each message must include:

- why this person is relevant
- one clear product sentence
- one live demo link
- one honest question
- no sales pressure
- no payment link
- no checkout link
- no exaggerated claim
- no private core mention

## Base Message

Hey [Name] — I saw your post/work around [specific topic].

I built a live demo for an AI code safety gate:

https://aicodesafety.com

It classifies AI-generated code changes as ALLOW / REQUIRE_APPROVAL / BLOCK before execution.

Quick question:
Have you ever had AI-generated code break something unexpectedly in a real project?

— Yaron

## Short Variant

Hey [Name] — I saw your work around [specific topic].

I built a small live demo for an AI code safety gate:

https://aicodesafety.com

Does AI-generated code risk feel like a real problem in your workflow, or more like a demo curiosity?

— Yaron

## GitHub / Devtools Variant

Hey [Name] — I saw your work on [repo/tool/topic].

I am testing a public demo for a pre-execution AI code safety gate:

https://aicodesafety.com

It shows ALLOW / REQUIRE_APPROVAL / BLOCK decisions before AI-generated code reaches execution.

Would this be more useful as a CLI, GitHub Action, CI check, or editor integration?

— Yaron

## If They Reply With Generic Praise

Example:

Cool idea.

Classification:

WEAK_SIGNAL

Reply:

Thanks. I am trying to separate nice-to-have from real workflow pain.

Have you personally seen AI-generated code break something or create review risk?

## If They Confirm Pain

Example:

Yes, Cursor broke a working flow once.

Classification:

PAIN_CONFIRMED

Reply:

That is exactly the kind of pattern I am trying to understand.

Where did it happen in the workflow?

Local coding, PR review, CI, production, or somewhere else?

## If They Ask About Integration

Example:

Can this run in CI?

Classification:

INTEGRATION_INTEREST

Reply:

That is one of the directions I am considering.

Which integration point would matter most for your workflow:

CLI, GitHub Action, CI check, PR scanner, or editor integration?

## If They Ask To Test It

Example:

Can we try this on our project?

Classification:

DEMO_REQUEST

Reply:

Possibly.

The current public demo is intentionally small, but I am mapping real workflows before building the next layer.

If you are open to it, I can ask a few questions about where AI-generated code enters your workflow.

## If They Ask About Pilot

Example:

Can you help us set this up?

Classification:

PILOT_CANDIDATE

Reply:

Yes, if the workflow is a real fit.

I am running a small paid pilot only for teams that already feel this problem.

The first step would be mapping where AI-generated code enters your workflow and where the first safety gate should sit.

## What Not To Say

Do not say:

- This prevents all AI code bugs.
- This is enterprise-ready.
- This will replace code review.
- This will replace tests.
- This is fully autonomous.
- Buy now.
- Pay here.
- Checkout here.
- The private GENESIS core does X.
- We already support every stack.

## Response Classification

Use these statuses:

- GHOST
- WEAK_SIGNAL
- PAIN_CONFIRMED
- INTEGRATION_INTEREST
- DEMO_REQUEST
- PILOT_CANDIDATE
- NOT_RELEVANT

## Validation Rule

Only these count as meaningful validation:

- PAIN_CONFIRMED
- INTEGRATION_INTEREST
- DEMO_REQUEST
- PILOT_CANDIDATE

These do not count:

- likes
- stars
- reposts
- generic praise
- no reply
- curiosity without workflow pain

## Decision Rule

If the first 3 messages create no useful signal:

Improve targeting.

Do not build features.

If one real pain signal appears:

Prepare a deeper discovery conversation.

If one pilot candidate appears:

Prepare pilot qualification flow.
