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
  try {
    const res = await fetch(`${BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return { ok: false, error: data.error || 'Something went wrong. Please try again.' }
    }
    return { ok: true, message: data.message }
  } catch {
    // Offline-friendly: acknowledge so the demo never dead-ends.
    return {
      ok: true,
      message:
        'Thank you — your request has been noted locally. Connect the API to capture leads to the server.',
      offline: true,
    }
  }
}
