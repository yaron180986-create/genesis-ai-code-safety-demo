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

## Chosen Concept: The Gate / Subtle G

**The mark is a controlled passage symbol with a secondary Genesis G reading.**

Two elements:
1. An open-right rounded square path — the controlled boundary with a deliberate passage opening on the right side (~30% of height, mid-right)
2. A horizontal spur entering from the right at mid-opening — the gate control threshold / the G crossbar

Primary reading (70%): execution gate. The outer path traces ¾ of a rounded square — a perimeter with a controlled opening on the right. The horizontal spur enters from that opening, representing the pre-execution threshold.

Secondary reading (30%): the letter G for GENESIS. The open-right perimeter plus the inward spur together form the unmistakable geometry of a capital G. This is not a lettermark — the gate reading comes first. The G emerges on second look.

This reads as: boundary / controlled passage / decision threshold / Genesis.

## Visual Meaning

- **The outer open-right path**: The governance perimeter. Three sides are closed; the right side opens at the controlled passage point.
- **The gap in the right side**: The controlled passage — the outcome of a gate decision. Passage is not automatic; it is decided.
- **The horizontal spur**: The pre-execution threshold entering from the passage. Also the crossbar of the G.
- **The enclosed left and lower area**: The interior of the execution-control boundary — what stays within governance.
- **Negative G reading**: The open perimeter + spur together quietly spell the initial of GENESIS without shouting it.

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
The mark is legible at 16×16. The G spur and perimeter gap remain distinguishable at small sizes because the stroke-to-opening ratio is tuned for it. The lockup should not be displayed below 120px wide.

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
