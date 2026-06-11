// Read-only content endpoints — the "CMS" surface of the 24K Media API.
import { Router } from 'express'
import {
  company,
  stats,
  clients,
  whyPillars,
  process as processSteps,
  services,
  caseStudies,
  portfolio,
  portfolioFilters,
  testimonials,
  founder,
  resources,
} from '../data/content.js'

const router = Router()

// Everything the home page needs in a single request.
router.get('/site', (_req, res) => {
  res.json({
    company,
    stats,
    clients,
    whyPillars,
    process: processSteps,
    services,
    caseStudies,
    portfolio,
    portfolioFilters,
    testimonials,
    founder,
    resources,
  })
})

router.get('/company', (_req, res) => res.json(company))
router.get('/stats', (_req, res) => res.json(stats))
router.get('/why', (_req, res) => res.json(whyPillars))
router.get('/process', (_req, res) => res.json(processSteps))
router.get('/testimonials', (_req, res) => res.json(testimonials))
router.get('/founder', (_req, res) => res.json(founder))

router.get('/services', (_req, res) => res.json(services))
router.get('/services/:slug', (req, res) => {
  const item = services.find((s) => s.slug === req.params.slug)
  if (!item) return res.status(404).json({ error: 'Service not found' })
  res.json(item)
})

router.get('/case-studies', (_req, res) => res.json(caseStudies))
router.get('/case-studies/:slug', (req, res) => {
  const item = caseStudies.find((c) => c.slug === req.params.slug)
  if (!item) return res.status(404).json({ error: 'Case study not found' })
  res.json(item)
})

router.get('/portfolio', (req, res) => {
  const { category } = req.query
  const items =
    category && category !== 'All'
      ? portfolio.filter((p) => p.category === category)
      : portfolio
  res.json({ filters: portfolioFilters, items })
})

router.get('/resources', (_req, res) => res.json(resources))
router.get('/resources/:slug', (req, res) => {
  const item = resources.find((r) => r.slug === req.params.slug)
  if (!item) return res.status(404).json({ error: 'Resource not found' })
  res.json(item)
})

export default router
