# GENESIS — Response Classification 104

## Goal

Classify outreach responses consistently.

## Response Types

### NO RESPONSE

No reply after initial message.

Status:

GHOST

### Generic Positive

Examples:

- cool idea
- nice
- looks interesting
- good luck

Status:

WEAK_SIGNAL

Action:

Thank them, but do not count as pain.

### Real Pain

Examples:

- AI broke something in our code
- we had a bad AI-generated PR
- Cursor changed working logic
- Copilot introduced something risky
- we need more review control
- our team worries about AI-generated code

Status:

PAIN_CONFIRMED

Action:

Ask one follow-up question:

Where in your workflow did it happen?

### Integration Interest

Examples:

- Can this run in CI?
- Can it work as a GitHub Action?
- Can it integrate with Cursor?
- Can it scan PRs?

Status:

INTEGRATION_INTEREST

Action:

Ask which integration point matters most.

### Demo Request

Examples:

- Can you show me more?
- Can we test this?
- Can you run this on our workflow?

Status:

DEMO_REQUEST

Action:

Offer short call or async workflow review.

### Pilot Candidate

Examples:

- We need this.
- Can you test it with our stack?
- How much would a pilot cost?
- Can you help us set this up?

Status:

PILOT_CANDIDATE

Action:

Offer paid pilot discussion.

## Pilot Qualification Questions

Ask only after real pain is confirmed:

1. Which AI coding tools do you use?
2. Is AI-generated code entering real projects?
3. Where does review happen today?
4. What failure would be most expensive?
5. Would a pre-execution gate fit CI, GitHub, local CLI, or editor workflow?
6. Is this urgent or exploratory?

## What Not To Do

Do not:

- pitch payment before pain
- send checkout links
- mention Lemon Squeezy
- overpromise prevention
- expose private core
- claim enterprise readiness
- count likes as validation

## Decision Rule

Build next only if at least one real pain signal is confirmed.

Otherwise:

Continue outreach.
