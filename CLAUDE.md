# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Beelal Coffee is a **vanilla JS progressive web app** for a Malaysian coffee shop. There is no build step — all files are plain HTML/CSS/JS deployed directly to Cloudflare Pages.

## Deployment

- **No build command.** Push to GitHub → Cloudflare Pages auto-deploys from repo root.
- Cloudflare config: `wrangler.jsonc` (output directory is `/`, framework preset = None).
- Local dev: open HTML files directly in browser, or run `npx wrangler pages dev .` for Cloudflare edge emulation.

## Architecture

Three standalone HTML files — each is self-contained with all JS/CSS inlined:

| File | Purpose |
|---|---|
| `index.html` | Customer-facing menu PWA (~1,567 lines) |
| `admin.html` | Admin panel with AI-powered editor (~2,065 lines) |
| `guide.html` | Malay-language setup guide for store owner |

**Data layer:** Firebase Realtime Database (REST API, no SDK) at `ash-2026-photobook-default-rtdb.asia-southeast1.firebasedatabase.app` under the `beelal_coffee/` namespace.

**Firebase data structure:**
```
beelal_coffee/
├── config/store        { name, slogan, phone, hours, isOpen, logo_url }
├── config/theme        { bg, bg2, bg3, surface, primary, accent, ... }
├── config/pins         { owner, dev }          ← 4-digit PINs, client-side auth
├── config/dev/or_key   (OpenRouter API key)
├── config/dev/sys_prompt
├── menu/items          { id: { cat, name, desc, emoji, sizes, addons, price, avail } }
├── menu/categories     { id: { label, emoji } }
└── error_log/err_<ts>  { type, msg, ts, ua, stack }
```

**AI Studio** (`admin.html`): Admin types natural language commands → OpenRouter LLM (Gemma 4 / free models) → JSON response `{ understood, action, changes, suggestion }` → auto-applied to Firebase. API key is stored in Firebase, not in env vars.

## Code Conventions

### JS Module Organisation (inside each `<script>` tag)
Each file follows this section order, marked by comments:
```
// CONFIG      ← constants: FB_URL, FB_ROOT, WhatsApp number
// STATE       ← global mutable state: menuItems, storeData, cart
// FIREBASE HELPERS
// INIT        ← runs on DOMContentLoaded
// RENDER      ← DOM-building functions
// EVENT HANDLERS
```

### Firebase Helpers
All Firebase access goes through these wrappers (defined per-file):
```js
fbGet(path)      // GET with 8s timeout
fbSet(path, data)
fbDelete(path)
fbGetSafe(path)  // returns { data, ok } — used for network-detection fallbacks
```

### Error Handling Pattern
- All async entry points wrapped in `safe()` helper that catches + logs to `error_log/`
- Global `window.onerror` and `unhandledrejection` listeners log to Firebase
- 8-second loader timeout on init; 25-second timeout on AI calls

### Theming
CSS custom properties (`--bg`, `--primary`, `--accent`, etc.) applied at runtime via `document.documentElement.style.setProperty()`. Theme saved to Firebase and restored on load.

### Security Model
- Client-side PIN validation (4-digit owner + dev PINs stored in Firebase)
- AI Studio has a whitelist of mutable fields; `phone` is never changeable via AI
- No JWT/OAuth — appropriate for a small-business internal tool

## Key Constraints

- **No npm, no bundler, no transpilation.** Keep everything as plain HTML/JS/CSS.
- Firebase URL and `beelal_coffee` namespace are hardcoded — do not abstract unless changing the Firebase project.
- Phone number (`60122203743`) is hardcoded in `index.html` for WhatsApp ordering.
- The repo shares a Firebase project with another app (`duit_raya_2026/` namespace) — changes to Firebase rules affect both.
- Always validate hex colors with `/^#[0-9a-fA-F]{6}$/` before applying theme values.
