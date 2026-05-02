# Security Headers Hardening — Public Static Demo

This slice hardens the public static demo without changing demo behavior.

## What Was Added

| File | Purpose |
|---|---|
| `vercel.json` | HTTP security response headers via Vercel |
| `robots.txt` | Crawler policy — open indexing allowed |
| `.well-known/security.txt` | Responsible disclosure contact |
| `docs/security-headers-hardening.md` | This document |

---

## Headers Applied

### Content-Security-Policy (CSP)

```
default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
img-src 'self' data:; font-src 'self' data:; connect-src 'self'; object-src 'none';
base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
```

**Why:** Restricts what resources the browser may load, blocking XSS, clickjacking, and data injection attacks.

**Why `'unsafe-inline'`:** The current static demo uses inline `<script>` and `<style>` blocks in `index.html`. Removing `'unsafe-inline'` would break the demo without a nonce or hash refactor. This is the known current limitation — see *What Remains to Improve* below.

### X-Content-Type-Options

```
nosniff
```

**Why:** Prevents browsers from MIME-sniffing a response away from the declared content type, blocking certain MIME-confusion attacks.

### Referrer-Policy

```
strict-origin-when-cross-origin
```

**Why:** Sends the full URL as referrer for same-origin requests and only the origin for cross-origin requests. Leaks no path/query information to third parties.

### Permissions-Policy

```
camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(),
magnetometer=(), gyroscope=(), accelerometer=(), fullscreen=(self)
```

**Why:** Explicitly disables hardware APIs the demo never uses, reducing the browser attack surface. `fullscreen=(self)` preserves any demo-internal fullscreen needs.

### Cross-Origin-Opener-Policy (COOP)

```
same-origin
```

**Why:** Prevents cross-origin windows from retaining a reference to this page, blocking cross-origin attack vectors that rely on window handles.

### Cross-Origin-Resource-Policy (CORP)

```
same-origin
```

**Why:** Prevents other origins from embedding this site's resources (images, scripts) via `<img>`, `<script>`, etc., blocking cross-origin data leakage.

---

## Public Security Metadata

### `.well-known/security.txt`

Complies with RFC 9116. Provides a responsible disclosure contact so security researchers know how to report vulnerabilities.

### `robots.txt`

Allows all crawlers. The public demo is intentionally open for indexing.

---

## What Remains to Improve Later

1. **Remove `'unsafe-inline'` from CSP** — Refactor `index.html` to extract all inline `<script>` and `<style>` blocks into external files, then tighten CSP to `script-src 'self'`.
2. **Add Strict-Transport-Security (HSTS)** — Vercel sets HSTS automatically on production custom domains; verify the header is present after deployment.
3. **Subresource Integrity (SRI)** — If any external CDN resources are ever added, add `integrity` attributes.
4. **CSP Reporting** — Add a `report-uri` or `report-to` endpoint to detect policy violations in production.

---

## Validation Commands

```bash
# Validate vercel.json structure
node -e "const fs=require('fs'); const j=JSON.parse(fs.readFileSync('vercel.json','utf8')); if(!Array.isArray(j.headers)) process.exit(1); console.log('OK vercel json')"

# Validate required headers present
node -e "
const fs=require('fs');
const j=JSON.parse(fs.readFileSync('vercel.json','utf8'));
const h=j.headers[0].headers.map(x=>x.key);
const req=[
  'Content-Security-Policy',
  'X-Content-Type-Options',
  'Referrer-Policy',
  'Permissions-Policy',
  'Cross-Origin-Opener-Policy',
  'Cross-Origin-Resource-Policy'
];
for (const r of req) {
  if (!h.includes(r)) { console.error('missing', r); process.exit(1); }
}
console.log('OK required headers');
"

# Validate security.txt
test -f .well-known/security.txt && echo "OK security.txt"
grep -q "Contact: mailto:hello@aicodesafety.com" .well-known/security.txt && echo "OK security contact"

# Validate robots.txt
test -f robots.txt && echo "OK robots.txt"
grep -q "User-agent: \*" robots.txt && echo "OK robots user-agent"
grep -q "Allow: /" robots.txt && echo "OK robots allow"

# Post-deploy verification (run after Vercel deployment completes)
curl -sI https://aicodesafety.com | grep -E "content-security-policy|x-content-type-options|referrer-policy|permissions-policy|cross-origin"
```

---

## Scope Confirmation

- Private GENESIS core: **not touched**
- Demo behavior: **unchanged**
- `index.html`: **not modified**
- `package.json`: **not modified**
- External scripts: **none added**
- Analytics: **none added**
- Secrets: **none present**
