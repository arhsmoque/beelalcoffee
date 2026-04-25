/**
 * config.js — Business Configuration
 *
 * Edit this file once to deploy the template for your business.
 * All Firebase, store identity, branding, and AI settings live here.
 * Everything else (theme, full menu, PIN security) is managed via the Admin panel.
 */
const APP_CONFIG = {

  // ── Firebase Realtime Database ──────────────────────────────────────────────
  // 1. Create a free Firebase project at https://console.firebase.google.com
  // 2. Enable Realtime Database → start in test mode
  // 3. Copy the database URL (looks like https://YOUR-APP-default-rtdb.firebaseio.com)
  firebase: {
    url:  'YOUR_FIREBASE_RTDB_URL',   // e.g. https://my-app-default-rtdb.firebaseio.com
    root: 'my_shop',                  // Namespace key in the DB (no slashes, no spaces)
  },

  // ── Store Defaults ──────────────────────────────────────────────────────────
  // Fallback values shown when Firebase has no data yet.
  // Once saved via the Admin panel (Store tab), Firebase values take over permanently.
  store: {
    name:     'My Coffee Shop',
    slogan:   'Freshly brewed every morning',
    phone:    'YOUR_WHATSAPP_NUMBER',  // Digits only, country code first. e.g. 60122203743
    hours:    '8:00 AM – 10:00 PM daily',
    currency: 'RM',                    // Symbol shown before all prices  (RM, $, £, €, …)

    // Informational size chips shown above coffee/drink categories
    sizeLegend: ['HOT 8oz', 'COLD 12oz', 'FRAPPÉ 16oz', 'LARGE +4'],

    // Display-only add-on rows shown at the bottom of the Food section
    foodAddons: [
      { name: 'Extra Double Shot', price: 4 },
      { name: 'Extra Cheese',      price: 2 },
    ],
  },

  // ── App Branding ────────────────────────────────────────────────────────────
  brand: {
    appName:   'My Coffee Shop',   // Shown in menu loader, page title, WhatsApp order footer
    adminName: 'Admin Panel',      // Shown in admin topbar and PIN screen
    locale:    'en-MY',            // Date/time locale  (en-US, en-GB, ms-MY, …)
  },

  // ── AI Studio ───────────────────────────────────────────────────────────────
  // Requires an OpenRouter API key (free tier available at openrouter.ai).
  // Set the key via Admin → Dev tab after first login.
  ai: {
    model: 'google/gemma-4-26b-it:free',   // Default OpenRouter model

    systemPrompt: `You are a calm, precise assistant helping a small food & beverage business manage their digital menu and storefront appearance.

PERSONA: Warm but efficient. Like a knowledgeable trusted advisor, not a chatbot. Think Jarvis — composed, helpful, never robotic. Never say sorry. Never say "As an AI". Never be sycophantic.

RESPONSE STRUCTURE (always follow this order):
1. [Understood] — Brief restatement showing you understood
2. [Action] — What action you are taking
3. [Done] — Confirm what changed
4. [Suggestion] — One optional enhancement suggestion (keep short)

AMBIGUITY THRESHOLD — slot filling:
Every request needs: WHAT (what to change) | WHERE (which section/element) | HOW (bold, italic, color, size) | CONSTRAINT (what not to touch)
- 3 or 4 slots filled → proceed, state any assumed slot
- 2 slots filled → ask ONE targeted clarifying question only
- 1 slot filled → ask for more detail before proceeding

SCOPE RULES:
- Only change what is explicitly requested
- Never touch WhatsApp button color (must stay green)
- Never change layout, spacing, or grid structure
- Never change store phone number or name unless explicitly asked
- When in doubt, do less not more

OUTPUT FORMAT for theme/CSS changes:
Return a JSON object only, no explanation outside the JSON:
{
  "understood": "brief restatement",
  "action": "what you did",
  "changes": { "theme": {...}, "store": {...}, "menu_availability": {...} },
  "suggestion": "one optional tip"
}

CONTEXT: You receive full store state as YAML before each request. Use it to understand current values before making changes.

LANGUAGE: Match the user's language. If mixed language, match the mix.`,

    quickChips: [
      { label: '🌸 Seasonal Theme',  prompt: 'Retheme for the current season — warm and inviting tones' },
      { label: '🎉 Festive Theme',   prompt: 'Apply a festive theme — bright, cheerful, celebratory colours' },
      { label: '↩ Reset to Default', prompt: 'Reset all theme colours and fonts back to the original warm cream and espresso brown defaults' },
      { label: '✏️ Change Slogan',   prompt: 'Change the slogan to: ' },
      { label: '🚫 Category Off',    prompt: 'Mark all items in category [name] as sold out for today' },
      { label: '✅ All Available',   prompt: 'Mark all menu items as available' },
    ],
  },

  // ── Default Theme ───────────────────────────────────────────────────────────
  // Warm coffee-shop colour palette. Fully customisable via Admin → AI Studio.
  defaultTheme: {
    bg:           '#FEF7EE',
    bg2:          '#F9F0E1',
    bg3:          '#F2E6CE',
    surface:      '#FFFFFF',
    primary:      '#2C1A0E',
    accent:       '#C8962A',
    accent2:      '#E8B84B',
    text:         '#1C110A',
    text2:        '#7A5C3E',
    text3:        '#B89070',
    font_display: "'Playfair Display', Georgia, serif",
    font_body:    "'DM Sans', sans-serif",
  },

  // ── Default Menu ────────────────────────────────────────────────────────────
  // Starter menu shown when Firebase has no menu data yet.
  // Replace these sample items via the Admin panel (Menu tab) or edit here directly.
  //
  // Item fields:
  //   id       — unique string (no spaces)
  //   cat      — must match a category id below
  //   name     — displayed name
  //   desc     — short description (optional)
  //   emoji    — fallback when no photo is set
  //   hot/cold/frappe — prices for drink sizes (null = size not offered)
  //   price    — fixed price for food items (null for drinks)
  //   avail    — true = available, false = sold out
  defaultMenu: {
    categories: [
      { id: 'coffee',    label: 'Coffee',     emoji: '☕' },
      { id: 'noncoffee', label: 'Non-Coffee', emoji: '🥤' },
      { id: 'food',      label: 'Food',       emoji: '🥪' },
    ],
    items: [
      // COFFEE
      { id:'c1', cat:'coffee',    name:'Americano',     desc:'', emoji:'☕', hot:6,   cold:8,   frappe:10,  price:null, avail:true },
      { id:'c2', cat:'coffee',    name:'Cafe Latte',    desc:'', emoji:'☕', hot:7,   cold:9,   frappe:12,  price:null, avail:true },
      { id:'c3', cat:'coffee',    name:'Cappuccino',    desc:'', emoji:'☕', hot:7,   cold:9,   frappe:null,price:null, avail:true },
      // NON-COFFEE
      { id:'n1', cat:'noncoffee', name:'Hot Chocolate', desc:'', emoji:'🍫', hot:6,   cold:8,   frappe:11,  price:null, avail:true },
      { id:'n2', cat:'noncoffee', name:'Matcha Latte',  desc:'', emoji:'🍵', hot:8,   cold:10,  frappe:13,  price:null, avail:true },
      // FOOD
      { id:'f1', cat:'food',      name:'Club Sandwich', desc:'', emoji:'🥪', hot:null,cold:null,frappe:null,price:9.90, avail:true },
      { id:'f2', cat:'food',      name:'Cheesy Fries',  desc:'', emoji:'🍟', hot:null,cold:null,frappe:null,price:7.90, avail:true },
    ],
  },
};
