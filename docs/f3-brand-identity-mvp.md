# F3 — Brand Identity MVP

## Slice Summary

F3 adds the first Brand Identity MVP layer to the PROVE BY GENESIS public demo. The page previously had no mark, no favicon, and no visual identity. This slice establishes a minimal, serious first brand layer without changing demo logic, scanner logic, or security behavior.

## File Map

### New files

| File | Type | Purpose |
|---|---|---|
| `assets/brand/prove-by-genesis-mark.svg` | SVG mark | Primary brand symbol — the gate aperture |
| `assets/brand/favicon.svg` | SVG favicon | Browser tab icon, 32×32 optimized |
| `assets/brand/prove-by-genesis-wordmark.svg` | SVG wordmark | Standalone wordmark for docs/social/README |
| `assets/brand/prove-by-genesis-lockup.svg` | SVG lockup | Mark + wordmark combined, for standalone use |
| `docs/brand/brand-identity-mvp.md` | Documentation | Brand intent, concept, color, usage, next steps |

### Modified files

| File | Change |
|---|---|
| `index.html` | Added `<title>` update, `<meta description>`, OG meta tags, favicon `<link>`, brand lockup CSS, replaced eyebrow `<p>` with brand lockup `<div>` |

## UI Integration Notes

**Before F3:**
```
[plain uppercase text] PROVE BY GENESIS
```

**After F3:**
```
[gate mark SVG]  Prove by
                 GENESIS
```

The lockup is centered in the page header, replacing the `.eyebrow` text element. The mark SVG is loaded as an `<img>` tag for reliable rendering. The text is styled HTML (not SVG text) for cross-browser font consistency.

**CSS classes added:**
- `.brand-lockup` — flex container for mark + text
- `.brand-mark` — the mark `<img>` element
- `.brand-text` — text wrapper
- `.brand-qualifier` — "Prove by" in small accent blue uppercase
- `.brand-name` — "GENESIS" in white, larger weight

**Head additions:**
- `<title>` updated to "PROVE BY GENESIS — AI Code Safety Gate"
- `<meta name="description">` added
- `<meta property="og:title">` added
- `<meta property="og:description">` added
- `<meta property="og:type">` added
- `<meta property="og:url">` added
- `<link rel="icon" type="image/svg+xml" href="assets/brand/favicon.svg">` added

## Validation Checklist

- [ ] Mark SVG renders in browser (blue gate on dark background)
- [ ] Favicon appears in browser tab
- [ ] Brand lockup visible in page header above `<h1>`
- [ ] Page title updated to "PROVE BY GENESIS — AI Code Safety Gate"
- [ ] OG meta tags present in `<head>`
- [ ] demo → BLOCK
- [ ] demo:danger → BLOCK
- [ ] demo:dead-code → REQUIRE_APPROVAL
- [ ] No forbidden files changed
- [ ] No demo logic changed
- [ ] No scanner logic changed
- [ ] No security headers changed

## What Did Not Change

- `scripts/genesis-demo.js` — untouched
- `examples/` — untouched
- `package.json` — untouched
- `vercel.json` — untouched
- `security.txt`, `robots.txt`, `.well-known/` — untouched
- Demo decision behavior — unchanged
- Public demo boundary statements — unchanged

## Future Follow-Up Ideas

- Social card PNG (1200×630) for proper Twitter/LinkedIn OG image support
- Dark/light mark variants
- README integration with lockup SVG
- Brand applied to docs site or product site header
- Commissioned brand identity after early customer validation
