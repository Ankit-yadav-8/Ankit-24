import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import TrendChart from '../ui/TrendChart.jsx'
import PieChart from '../ui/PieChart.jsx'
import { seededTrend, seededValues } from '../../lib/charts.js'

const ease = [0.22, 1, 0.36, 1]
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 3v18h18" />
    <polyline points="7 14 11 10 14 13 20 6" />
  </svg>
)

// A floating, collapsible "personal dashboard" — the proof every creator gets
// their own 1-to-1 analytics dashboard after the growth call.
export default function DashboardFloat() {
  const [open, setOpen] = useState(false)
  const seed = 'float'

  const j = seededValues(seed + '-kpi', 8, 0, 40)
  const views = seededTrend(seed + '-views', 12)
  const subs = seededTrend(seed + '-subs', 12)
  const watch = seededTrend(seed + '-watch', 12)
  const rev = seededTrend(seed + '-rev', 12)
  const kpis = [
    { label: 'Subscribers', value: `${210 + j[0]}K`, delta: `+${8 + (j[1] % 12)}%`, color: '#4928fd', series: subs },
    { label: 'Views · 28d', value: `${(4 + j[2] / 10).toFixed(1)}M`, delta: `+${12 + (j[3] % 18)}%`, color: '#70b5ff', series: views },
    { label: 'Watch time', value: `${180 + j[4]}K`, delta: `+${6 + (j[5] % 14)}%`, color: '#ba81ee', series: watch },
    { label: 'Revenue', value: `₹${(3 + j[6] / 12).toFixed(1)}L`, delta: `+${9 + (j[7] % 16)}%`, color: '#79d45e', series: rev },
  ]

  const p = seededValues(seed + '-pie', 4, 14, 40)
  const traffic = [
    { label: 'Browse', value: p[0], color: '#4928fd' },
    { label: 'Search', value: p[1], color: '#70b5ff' },
    { label: 'Suggested', value: p[2], color: '#ba81ee' },
    { label: 'External', value: p[3], color: '#ffaf68' },
  ]

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            className="dashfloat__tab"
            onClick={() => setOpen(true)}
            aria-label="Open your dashboard preview"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3, ease }}
          >
            <i className="dashfloat__pulse" />
            <ChartIcon />
            <span>Dashboard</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="dashfloat__scrim"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.aside
              className="dashfloat"
              initial={{ opacity: 0, x: 44 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 44 }}
              transition={{ duration: 0.38, ease }}
            >
              <div className="dashfloat__head">
                <div>
                  <span className="dashfloat__eyebrow"><i /> Live · 1-to-1</span>
                  <h4>Your personal dashboard</h4>
                </div>
                <button className="dashfloat__close" onClick={() => setOpen(false)} aria-label="Close dashboard">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
                </button>
              </div>

              <p className="dashfloat__note">
                Every creator gets this — a personal dashboard built live <b>after your growth call</b>, reviewed 1-to-1 every week.
              </p>

              <div className="dashfloat__kpis">
                {kpis.map((k) => (
                  <div className="dashfloat__kpi" key={k.label}>
                    <span className="dashfloat__kpi-label">{k.label}</span>
                    <span className="dashfloat__kpi-value">{k.value}</span>
                    <span className="dashfloat__kpi-delta">▲ {k.delta}</span>
                    <div className="dashfloat__kpi-spark">
                      <TrendChart data={k.series} color={k.color} height={26} showDots={false} showGrid={false} interactive={false} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="dashfloat__panel">
                <div className="dashfloat__panel-h"><h5>Views over time</h5><span>12 mo</span></div>
                <TrendChart data={views} labels={MONTHS} color="#4928fd" height={120} format={(v) => `${v}K`} />
              </div>

              <div className="dashfloat__panel">
                <div className="dashfloat__panel-h"><h5>Traffic sources</h5><span>28 d</span></div>
                <PieChart data={traffic} size={150} thickness={22} />
              </div>

              <Link to="/contact" className="dashfloat__cta" onClick={() => setOpen(false)}>
                Book your growth call
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
