# 24K Media — We Build Internet Brands

A premium, fully responsive and dynamic agency website for **24K Media** — India's most premium creator-growth studio. Built to an *8club-or-greater* bar with a **white-smoke luxury** theme and a **24K-gold** signal accent.

> Stack: **React (Vite) · Node.js · Express** — exactly as requested.
> Content is served dynamically by the Express API, with a bundled offline fallback so the site is always complete.

---

## ✨ What's inside

**Experience**
- Premium white-smoke canvas, gold signal, editorial (Fraunces) + grotesk (Manrope) type
- Custom gold cursor with magnetic hover on CTAs & cards
- Lenis buttery smooth scroll + scroll-progress bar
- Framer Motion everywhere — staggered reveals, page transitions, layout animations
- Animated stat counters, marquee logo wall, filterable portfolio, drag testimonials
- Subtle grain + gold glow, fully `prefers-reduced-motion` aware, mobile-first

**Pages**
- `/` Home — hero, social proof, services, why, results, portfolio, process, founder, testimonials, resources, contact CTA
- `/services` + `/services/:slug` — catalogue + 12 detailed service pages
- `/case-studies` + `/case-studies/:slug` — dashboard-style before/after metrics
- `/portfolio` — filterable body of work
- `/about` — founder timeline + mission + values
- `/resources` + `/resources/:slug` — playbooks / editorial articles
- `/contact` — qualifying form wired to the API (saved as leads)

**API (Express)**
- `GET /api/site` — everything the site needs in one call
- `GET /api/services`, `/api/services/:slug`
- `GET /api/case-studies`, `/api/case-studies/:slug`
- `GET /api/portfolio?category=`
- `GET /api/resources`, `/api/resources/:slug`
- `POST /api/leads` — captures contact submissions to `server/data/leads.json` (+ optional webhook)
- `GET /api/health`

---

## 🚀 Getting started

From the project root (`24K Media/`):

```bash
# 1. Install everything (client + server)
npm run install:all

# 2. Run the API and the web app together
npm run dev
```

- Web app → http://localhost:5173
- API → http://localhost:4000

The Vite dev server proxies `/api` to the Express backend automatically.

### Run them separately

```bash
npm run dev:server   # Express API on :4000
npm run dev:client   # Vite React app on :5173
```

### Production build

```bash
npm run build        # builds the React app into client/dist
npm start            # Express serves the API *and* the built site on :4000
```

Then open http://localhost:4000.

---

## 🔧 Configuration

Copy the example env files and adjust as needed:

```bash
# client/.env       (optional — defaults to the dev proxy)
VITE_API_BASE=

# server/.env
PORT=4000
CORS_ORIGIN=http://localhost:5173
LEAD_WEBHOOK_URL=        # optional CRM / Zapier / n8n webhook
```

---

## 🗂 Project structure

```
24K Media/
├── package.json          # root scripts (dev / build / start)
├── client/               # React + Vite front-end
│   ├── public/           # logo, favicon
│   └── src/
│       ├── components/   # layout · ui · sections
│       ├── pages/        # all routes
│       ├── context/      # SiteProvider (fetches /api/site)
│       ├── data/         # bundled content fallback
│       └── styles/       # design system (index.css + components.css)
└── server/               # Express API
    ├── routes/           # content + leads
    └── data/             # content.js (source of truth) + leads.json (runtime)
```

## 🎨 Brand tokens

| Token        | Value      | Use                    |
|--------------|------------|------------------------|
| White smoke  | `#F4F3EF`  | Primary canvas         |
| Ink          | `#14130F`  | Primary text           |
| 24K Gold     | `#D4AF37`  | Signal / CTA / accent  |
| Deep gold    | `#B1842B`  | Gold text on light     |

Gold is a *signal of value* — used sparingly for emphasis, CTAs and key metrics.

---

© 24K Media — *We Build Internet Brands.*
