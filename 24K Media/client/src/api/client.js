// 24K Media API client.
// Talks to the Express backend; gracefully falls back to bundled content
// so the site is always complete, even with the API offline.
import * as fallback from '../data/content.js'

const BASE = import.meta.env.VITE_API_BASE || ''

const localSite = {
  company: fallback.company,
  stats: fallback.stats,
  clients: fallback.clients,
  whyPillars: fallback.whyPillars,
  process: fallback.process,
  services: fallback.services,
  caseStudies: fallback.caseStudies,
  portfolio: fallback.portfolio,
  portfolioFilters: fallback.portfolioFilters,
  testimonials: fallback.testimonials,
  founder: fallback.founder,
  story: fallback.story,
  resources: fallback.resources,
  industries: fallback.industries,
  comparison: fallback.comparison,
  faqs: fallback.faqs,
  tools: fallback.tools,
  nicheRPM: fallback.nicheRPM,
}

export async function fetchSite() {
  try {
    const res = await fetch(`${BASE}/api/site`, { headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return { data: await res.json(), source: 'api' }
  } catch {
    // API not reachable — use the bundled snapshot.
    return { data: localSite, source: 'local' }
  }
}

export async function submitLead(payload) {
  let res
  try {
    res = await fetch(`${BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    // The request never reached a server (no network, wrong URL, CORS block).
    return {
      ok: false,
      error:
        "Couldn't reach the server. Check your connection and make sure the API is running.",
    }
  }

  // We got a response. Try to read its JSON body (may be empty on proxy errors).
  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    // Prefer the API's own message; otherwise explain by status code.
    if (data.error) return { ok: false, error: data.error }
    // A 5xx with no JSON body means the proxy/host couldn't reach the API
    // (e.g. the Express server isn't running) — our API always sends JSON.
    if (res.status >= 500) {
      return {
        ok: false,
        error: 'The API server is not responding. Is it running on port 4000?',
      }
    }
    return {
      ok: false,
      error: `Request failed (HTTP ${res.status}). Please try again.`,
    }
  }

  return { ok: true, message: data.message }
}
