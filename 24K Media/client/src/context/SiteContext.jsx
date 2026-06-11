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
}

export function SiteProvider({ children }) {
  // Start with bundled data (instant render) then hydrate from the API.
  const [data, setData] = useState(initialData)
  const [source, setSource] = useState('local')

  useEffect(() => {
    let alive = true
    fetchSite().then((res) => {
      if (!alive) return
      setData(res.data)
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
