# AScustom web — lead-focused studio landing

React (Vite) + Tailwind CSS v4 frontend with a Netlify serverless function for lead capture. Brand: **AScustom web** (Amit & Sandy).

## Local development

**Frontend only** (form POST will 404 without functions):

```bash
npm install
npm run dev
```

**Frontend + `/.netlify/functions/lead`** (recommended):

```bash
npm run dev:netlify
```

This runs `npx netlify dev` (downloads the CLI on first use). Opens the Netlify dev proxy (default `http://localhost:8888`) so `fetch('/.netlify/functions/lead')` matches production.

For local email tests, add `RESEND_API_KEY` (and optional vars below) to a root `.env` file — Netlify CLI loads it for functions when you use `netlify dev`.

## Build

```bash
npm run build
npm run preview
```

## Deploy on Netlify

1. Push the repo to GitHub/GitLab/Bitbucket.
2. In [Netlify](https://www.netlify.com/), **Add new site** → Import from Git.
3. Build settings (also in `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`
4. Deploy. The SPA fallback in `netlify.toml` serves `index.html` for client routes; API calls go to `/.netlify/functions/lead`.

### Environment variables (Netlify → Site settings → Environment variables)

Copy from `.env.example`. Important:

| Variable | Where | Purpose |
|----------|--------|---------|
| `RESEND_API_KEY` | **Server** (no `VITE_`) | Sends you an email on every valid form submit via [Resend](https://resend.com/). |
| `LEAD_NOTIFY_EMAIL` | Server | Inbox that receives leads (e.g. `rawatamit865@gmail.com`). |
| `RESEND_FROM_EMAIL` | Server | Optional. Default `AScustom web <onboarding@resend.dev>`. After you [verify a domain](https://resend.com/docs/dashboard/domains/introduction) on Resend, switch to your own from-address. |
| `VITE_CALENDLY_URL` | Client | Full Calendly URL. If empty, “Book a call” buttons are hidden. |
| `VITE_SOCIAL_LINKEDIN`, `VITE_SOCIAL_GITHUB`, … | Client | Real profile URLs for the footer. Empty = that link hidden. |

**Resend setup (free tier):** Create an account → API Keys → create a key → paste as `RESEND_API_KEY` on Netlify. With `onboarding@resend.dev`, delivery rules follow Resend’s docs (verify your recipient if needed). Your **durable** copy of each lead is the email in your inbox; the function also appends to `/tmp` on Netlify (ephemeral).

### Lead form spam protection

A hidden `company` field (honeypot) is filled by many bots. If it is non-empty, the API returns success without storing or emailing.

### Portfolio images

Placeholders live in `public/portfolio/*.svg`. Replace with your own `png`/`jpg` and update paths in `src/components/Portfolio.jsx`.

### Contact config

WhatsApp number and default message: `src/config/contact.js`. Email/phone in footer: `src/components/Footer.jsx`. Pricing: `src/components/Pricing.jsx` (`inrFrom` / `usdFrom`).
