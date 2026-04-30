# GENESIS — Vercel Deployment

## Live URL

https://aicodesafety.com

## Public Repo

https://github.com/yaron180986-create/genesis-ai-code-safety-demo

## Vercel Project

- Project name: genesis-ai-code-safety-demo
- Framework: Static HTML (no build step)
- Root directory: /
- Output: index.html

## Custom Domain

- Domain: aicodesafety.com
- Registrar / DNS: Cloudflare
- www redirect: www.aicodesafety.com → aicodesafety.com
- SSL: Vercel managed (auto-provisioned)

## Deployment Trigger

Pushes to `main` branch on the public repo trigger automatic redeploy.

## What Is Deployed

- `index.html` — public browser demo shell
- `scripts/` — CLI demo scripts (Node.js)
- `examples/` — demo scenario JSON files
- `package.json` — npm demo commands

## What Is NOT Deployed

The private GENESIS core is not in this repo and is never deployed here.

- No private risk engine
- No private execution adapter
- No API keys
- No private repo references

## Notes

- First simulated fix is free.
- Additional fixes require a paid pilot or setup.
- Demo runs entirely in the browser — no backend calls.
