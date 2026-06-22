// Lead capture — stores qualified contact submissions in Supabase
// (Postgres) when configured, otherwise falls back to a local JSON file.
// Optionally forwards each lead to an external CRM/webhook.
import { Router } from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import { promises as fs } from 'fs'
import { supabase, isSupabaseEnabled } from '../lib/supabase.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const LEADS_FILE = path.resolve(__dirname, '../data/leads.json')

const router = Router()

async function readLeads() {
  try {
    const raw = await fs.readFile(LEADS_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function writeLeads(leads) {
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8')
}

function isEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

// POST /api/leads — capture a contact / "Book Growth Call" submission.
router.post('/', async (req, res) => {
  const { name, email, company, revenue, goal, budget, message } = req.body || {}

  if (!name || !isEmail(email)) {
    return res
      .status(400)
      .json({ ok: false, error: 'A valid name and email are required.' })
  }

  const lead = {
    name: String(name).slice(0, 120),
    email: String(email).slice(0, 160),
    company: company ? String(company).slice(0, 160) : '',
    revenue: revenue ? String(revenue).slice(0, 80) : '',
    goal: goal ? String(goal).slice(0, 200) : '',
    budget: budget ? String(budget).slice(0, 80) : '',
    message: message ? String(message).slice(0, 2000) : '',
    source: '24kmedia.in/contact',
  }

  try {
    if (isSupabaseEnabled) {
      const { data, error } = await supabase
        .from('leads')
        .insert(lead)
        .select('id')
        .single()
      if (error) throw error
      lead.id = data?.id
    } else {
      // Local / offline fallback: append to a JSON file.
      lead.id = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
      lead.createdAt = new Date().toISOString()
      const leads = await readLeads()
      leads.push(lead)
      await writeLeads(leads)
    }
  } catch (err) {
    console.error('Failed to persist lead:', err)
    return res
      .status(500)
      .json({ ok: false, error: 'Could not save your request. Please try again.' })
  }

  // Optional: forward to a CRM / automation webhook.
  if (process.env.LEAD_WEBHOOK_URL) {
    try {
      await fetch(process.env.LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      })
    } catch (err) {
      console.warn('Lead webhook failed (lead still saved):', err.message)
    }
  }

  res.status(201).json({
    ok: true,
    message: 'Thank you — your growth call request is in. We reply within one business day.',
    id: lead.id,
  })
})

export default router
