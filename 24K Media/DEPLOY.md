# 24K Media — Setup & Deployment

Architecture:

```
Browser ──▶ Vercel (React/Vite frontend)
                      │  POST /api/leads
                      ▼
              Render (Express API)  ──▶  Supabase (Postgres: leads table)
```

The marketing content is static (bundled in the client). The only thing that
needs a database is **lead capture** from the contact form → that goes to Supabase.

---

## 1. Supabase — create the database (one time)

1. Open your project: <https://supabase.com/dashboard/project/bkhbyfedgaolbfflzhhg>
2. Left sidebar → **SQL Editor** → **New query**.
3. Paste the entire contents of [`supabase/schema.sql`](./supabase/schema.sql) and click **Run**.
4. Verify: **Table Editor** → you should see a `leads` table.

> ⚠️ **Rotate your service_role key.** It was shared in plain text. Go to
> **Project Settings → API → service_role → Reset**, then update the key in
> `server/.env` (local) and in Render (production).

Keys you'll need:
- **Project URL**: `https://bkhbyfedgaolbfflzhhg.supabase.co`
- **service_role key**: Project Settings → API (server-side secret — never in the browser)

---

## 2. Local development

```bash
npm run install:all     # installs root + client + server deps
npm run dev             # API on :4000, web on :5173
```

- `server/.env` already holds your Supabase URL + service_role key (gitignored).
- `client/.env` leaves `VITE_API_BASE` empty so the Vite proxy forwards `/api` to :4000.

Test a lead end-to-end:
```bash
curl -X POST http://localhost:4000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","goal":"hello"}'
```
Then check **Table Editor → leads** in Supabase. The server logs
`Leads store → Supabase` on boot when it's wired correctly.

---

## 3. Render — deploy the API (server/)

**Option A — Blueprint (uses `render.yaml`):**
1. Push this repo to GitHub.
2. Render Dashboard → **New → Blueprint** → select the repo → Apply.
3. When prompted, set the env vars:
   | Key | Value |
   |-----|-------|
   | `CORS_ORIGIN` | your Vercel URL, e.g. `https://24kmedia.vercel.app` |
   | `SUPABASE_URL` | `https://bkhbyfedgaolbfflzhhg.supabase.co` |
   | `SUPABASE_SERVICE_ROLE_KEY` | your (rotated) service_role key |

**Option B — manual Web Service:**
- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/api/health`
- Add the same env vars as above.

After deploy, note the API URL, e.g. `https://24k-media-api.onrender.com`.
Confirm `https://<your-api>.onrender.com/api/health` returns `{"status":"ok"}`.

> Render's free tier sleeps after inactivity; the first request may take ~30s.

---

## 4. Vercel — deploy the frontend (client/)

1. Vercel Dashboard → **Add New → Project** → import the repo.
2. **Root Directory: `client`** (important — it's a monorepo).
3. Framework preset: **Vite** (auto-detected; `client/vercel.json` already sets build + SPA routing).
4. **Environment Variables** → add:
   | Key | Value |
   |-----|-------|
   | `VITE_API_BASE` | your Render API URL, e.g. `https://24k-media-api.onrender.com` |
5. Deploy.

> After the first Vercel deploy, copy the live domain and set it as `CORS_ORIGIN`
> on Render (then redeploy Render) so the browser is allowed to call the API.

---

## 5. Final checklist

- [ ] `leads` table exists in Supabase (ran `schema.sql`)
- [ ] Render API `/api/health` returns ok
- [ ] Vercel `VITE_API_BASE` points at the Render URL
- [ ] Render `CORS_ORIGIN` points at the Vercel URL
- [ ] Submit the contact form on the live site → a row appears in Supabase → **leads**
- [ ] service_role key rotated after going live
