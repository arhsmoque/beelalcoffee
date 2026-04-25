# Coffee Shop Menu PWA — Reusable Template

A zero-dependency, single-file menu PWA for small food & beverage businesses.
Built on Firebase Realtime Database + Cloudflare Workers. No build step required.

## Files

| File | Purpose |
|---|---|
| `config.js` | **Edit this first** — all business-specific settings |
| `index.html` | Customer-facing menu PWA |
| `admin.html` | Owner/developer admin panel |
| `guide.html` | Owner reference guide |
| `wrangler.jsonc` | Cloudflare Workers deployment config |

## Quick Start (New Deployment)

### 1. Firebase Setup
1. Go to [console.firebase.google.com](https://console.firebase.google.com) and create a free project
2. Enable **Realtime Database** → start in test mode
3. Copy your database URL (e.g. `https://my-app-default-rtdb.firebaseio.com`)

### 2. Edit `config.js`
Open `config.js` and fill in:
```js
firebase: {
  url:  'YOUR_FIREBASE_RTDB_URL',   // from step above
  root: 'my_shop',                  // choose any namespace key
},
store: {
  name:     'My Coffee Shop',
  phone:    'YOUR_WHATSAPP_NUMBER', // e.g. 60122203743
  currency: 'RM',                   // your currency symbol
  ...
},
```
Also update `brand.appName`, `brand.adminName`, and `brand.locale` to match your business.

### 3. Update `wrangler.jsonc`
Change the `name` field to your Cloudflare Workers project name.

### 4. Deploy to Cloudflare
**Option A — Cloudflare Pages (recommended):**
1. Push all files to a GitHub repository
2. Cloudflare Dashboard → Pages → Create Project → Connect Git → select your repo
3. Build settings: Framework preset = None, Build command = (blank), Output directory = `/`
4. Save and Deploy — every push to `main` auto-deploys in ~30 seconds

**Option B — Cloudflare Workers:**
```bash
npx wrangler deploy
```

### 5. First-Time Admin Setup
1. Open `admin.html` in your browser
2. First-run screen appears — set your 4-digit Developer PIN
3. Log in with Developer PIN
4. Go to **Dev** tab → paste your OpenRouter API key → Test → Save
   *(Free key available at [openrouter.ai](https://openrouter.ai))*
5. **Dev** tab → **Take Master Snapshot** (sets factory reset baseline)
6. **Security** tab → confirm or change the Owner PIN (default: `1234`)
7. Share the menu URL with customers and the admin URL with the store owner

## Customising the Default Menu

The starter menu (3 coffee drinks, 2 non-coffee drinks, 2 food items) is defined in `config.js` under `defaultMenu`. It is seeded to Firebase on first run.

To replace it:
- Edit `config.js → defaultMenu` before first deployment, **or**
- Use the Admin panel (Menu tab) to add/edit items after deployment

## Recovery

| Problem | Fix |
|---|---|
| Owner forgot PIN | Log in with Dev PIN → Security tab → reset Owner PIN |
| Theme broken | Dev PIN → AI Studio → Factory Reset |
| Want to redeploy | Push files to GitHub — database is unaffected |
| Debug errors | Dev PIN → Dev tab → Error Log |

## Architecture

- **No build system** — vanilla HTML/CSS/JS, three static files
- **Firebase Realtime Database** — stores menu, theme, config, orders, PINs
- **Cloudflare Workers / Pages** — serves the static files globally
- **OpenRouter** — AI gateway for the theme studio feature (optional)
- **WhatsApp** — order delivery via `wa.me` deep link (no integration required)
