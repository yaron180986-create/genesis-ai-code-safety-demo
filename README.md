# GENESIS AI Code Safety Gate — Public Demo

This is a public-safe demo package.

The real GENESIS core remains private.

---

## What it demonstrates

GENESIS checks AI-generated code changes before execution.

It returns:
- **ALLOW** — change is safe to proceed
- **REQUIRE APPROVAL** — human sign-off needed before execution
- **BLOCK** — change stopped immediately, not executed

---

## Why it matters

AI coding tools can generate destructive edits that look harmless.

Example:
```js
module.exports = null;
```

That single line silently destroys a module's entire interface at runtime.

GENESIS blocks it before execution.

---

## Run the demo

```bash
npm install
node scripts/genesis-demo.js examples/demo-danger.json
node scripts/genesis-demo.js examples/demo-safe.json
node scripts/genesis-demo.js examples/demo-dead-code.json
```

Or use the npm shortcuts:

```bash
npm run demo
npm run demo:safe
npm run demo:danger
npm run demo:dead-code
```

---

## Demo scenarios

| File | Pattern | Decision |
|------|---------|----------|
| `demo-safe.json` | Safe helper addition | ALLOW |
| `demo-danger.json` | `module.exports = null` | BLOCK |
| `demo-dead-code.json` | `if(false)` dead-code gate | REQUIRE APPROVAL |

---

## Important

This repository does not include the private GENESIS core engine.

It is a public demo and positioning package only.

The production GENESIS system includes:
- A private risk engine
- An execution control layer
- A real-time AI diff analysis pipeline
- An Electron-based developer panel

None of those are present here.

---

## Status

Early MVP / feedback stage.

Contact: yaron180986@gmail.com
