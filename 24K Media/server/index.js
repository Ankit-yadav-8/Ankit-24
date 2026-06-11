// 24K Media API — Express backend.
// Serves all CMS content and captures leads from the contact form.
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { fileURLToPath } from 'url'
import path from 'path'
import contentRouter from './routes/content.js'
import leadsRouter from './routes/leads.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORT = process.env.PORT || 4000
const CORS_ORIGIN = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())

const app = express()

app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))
app.use(
  cors({
    origin(origin, cb) {
      // allow same-origin / curl (no origin) and any whitelisted dev origin
      if (!origin || CORS_ORIGIN.includes('*') || CORS_ORIGIN.includes(origin)) {
        return cb(null, true)
      }
      return cb(null, true) // permissive in this starter; tighten for production
    },
    credentials: true,
  })
)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: '24K Media API', time: new Date().toISOString() })
})

// Content + leads
app.use('/api', contentRouter)
app.use('/api/leads', leadsRouter)

// Serve the built client in production (single-service deploy)
const clientDist = path.resolve(__dirname, '../client/dist')
app.use(express.static(clientDist))
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next()
  res.sendFile(path.join(clientDist, 'index.html'), (err) => {
    if (err) {
      res
        .status(200)
        .send(
          '<h1>24K Media API is running.</h1><p>Build the client (npm run build --prefix client) to serve the site from here, or run the Vite dev server on :5173.</p>'
        )
    }
  })
})

app.listen(PORT, () => {
  console.log(`\n  24K Media API  →  http://localhost:${PORT}`)
  console.log(`  Health         →  http://localhost:${PORT}/api/health\n`)
})
