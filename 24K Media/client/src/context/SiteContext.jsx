import { createContext, useContext, useEffect, useState } from 'react'
import { fetchSite } from '../api/client.js'
import * as fallback from '../data/content.js'

const SiteContext = createContext(null)

const initialData = {
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
  solutionsDetail: fallback.solutionsDetail,
  pricing: fallback.pricing,
  comparison: fallback.comparison,
  faqs: fallback.faqs,
  tools: fallback.tools,
  nicheRPM: fallback.nicheRPM,
  team: fallback.team,
  brandImpact: fallback.brandImpact,
  collaborations: fallback.collaborations,
  processDetail: fallback.processDetail,
  creators: fallback.creators,
  mergePillars: fallback.mergePillars,
}

export function SiteProvider({ children }) {
  // Start with bundled data (instant render) then hydrate from the API.
  const [data, setData] = useState(initialData)
  const [source, setSource] = useState('local')

  useEffect(() => {
    let alive = true
    fetchSite().then((res) => {
      if (!alive) return
      // Merge over the bundled defaults so a partial/older API payload can
      // never drop a field (which would crash a section that reads it).
      setData({ ...initialData, ...res.data })
      setSource(res.source)
    })
    return () => {
      alive = false
    }
  }, [])

  return <SiteContext.Provider value={{ ...data, source }}>{children}</SiteContext.Provider>
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used within SiteProvider')
  return ctx
}
