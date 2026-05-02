# PROVE BY GENESIS — Brand Identity MVP

## Brand Intent

The PROVE BY GENESIS brand should communicate:
- Controlled execution
- Intelligent governance
- Precision and trust
- A real product with a real point of view

It should not communicate:
- Generic AI tooling
- Startup playfulness
- Sci-fi aesthetics
- Marketing hype

## Chosen Concept: The Gate

**The mark is a controlled passage symbol.**

Two elements:
1. A rectangle with rounded corners — the controlled boundary (the perimeter of execution control)
2. A horizontal line at ~65% height, extending ~70% of the interior width — the gate control threshold

The gap between the line's right end and the rectangle's right wall is the controlled passage — the point where a decision has been made and movement is permitted. The mark is intentionally unresolved on the right: passage is not automatic, it is controlled.

This reads as: boundary / threshold / decision / controlled opening.

## Visual Meaning

- **The outer rectangle**: The governance perimeter. Nothing enters or exits without passing through.
- **The horizontal line**: The pre-execution threshold — the moment of the safety gate decision.
- **The gap**: The controlled passage — what remains open after a decision is made.
- **The blank upper-right interior**: What is blocked. The space that does not have permission.

## Color Logic

| Token | Value | Use |
|---|---|---|
| Primary accent | `#4a7fe0` | Mark, qualifier text, accent elements |
| Primary text | `#eef2fc` | Brand name in lockup, primary headings |
| Background | Transparent | SVG files are background-agnostic |

The mark uses a single color. No gradients. No fills. Stroke-only construction.

## Asset List

| File | Use |
|---|---|
| `assets/brand/prove-by-genesis-mark.svg` | Standalone mark — icon use, favicon source |
| `assets/brand/favicon.svg` | Browser favicon (SVG, 32×32 viewbox) |
| `assets/brand/prove-by-genesis-wordmark.svg` | Standalone wordmark — docs, README, social |
| `assets/brand/prove-by-genesis-lockup.svg` | Mark + wordmark — standalone use, social, print |

## Usage Notes

**Page integration:**
The lockup in the page header uses the mark SVG (`<img>`) combined with styled HTML text. This is intentional — SVG text renders inconsistently across browsers when loaded as `<img>`. The mark is purely geometric (no text) and renders perfectly at all sizes.

**Favicon:**
`favicon.svg` is a 32×32 optimized version of the mark with the same geometry, slightly adjusted for small-size legibility. Referenced via `<link rel="icon" type="image/svg+xml">` in `index.html`.

**Color use:**
Always use `#4a7fe0` for the mark on dark backgrounds. On light backgrounds, the same color remains legible. Do not alter the mark color to match arbitrary brand colors without producing a new asset.

**Minimum size:**
The mark is legible at 16×16. The lockup should not be displayed below 120px wide.

## What This Does NOT Claim

This is a Brand Identity MVP. It is not:
- A complete brand system
- A production-ready brand guide
- A certified visual identity
- A trademark filing
- A finalized logo (subject to revision after feedback)

## Next Upgrade Path

- **F4 (optional)**: Social card PNG for proper OG image support (SVG is not reliably supported by Twitter/LinkedIn)
- **F5 (optional)**: Dark + light mark variants with proper color tokens
- **F6 (future)**: Full brand system with type scale, spacing, and component library
- **Post-signal**: Commissioned brand identity after first customer conversations validate the category
