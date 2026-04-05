# Beelal Coffee — Menu PWA

Customer menu: `index.html`  
Admin panel: `admin.html`

## Deploy to Cloudflare Pages

1. Push both files to GitHub repo `beelalcoffee`
2. Cloudflare Dashboard → Pages → Create Project
3. Connect to Git → select `beelalcoffee`
4. Build settings:
   - Framework preset: None
   - Build command: (leave blank)
   - Build output directory: /
5. Save and Deploy

URL: `beelalcoffee.pages.dev`

Every push to `main` auto-deploys in ~30 seconds.
No action needed from store owner on deployments.

## First Time Setup (Developer)

1. Open `admin.html`
2. First run screen appears — set your 4-digit Dev PIN
3. Log in with Dev PIN
4. Go to **Dev** tab → paste OpenRouter API key → Test → Save
5. **Dev** tab → Take Master Snapshot (factory reset baseline)
6. **Security** tab → confirm Owner PIN is `1234`, change if needed
7. Lock panel → share URL to store owner

## Firebase

Project: ash-2026-photobook  
RTDB: ash-2026-photobook-default-rtdb.asia-southeast1.firebasedatabase.app  
Namespace: `beelal_coffee/` (separate from `duit_raya_2026/`)

## Recovery

**Owner forgot PIN:** You log in with Dev PIN → Security tab → reset Owner PIN  
**Complete theme disaster:** Log in with Dev PIN → AI Studio → Factory Reset  
**File corrupted:** Push fresh files to GitHub — database untouched  
**Debug errors:** Dev tab → Error Log (last 20 errors with timestamp)
