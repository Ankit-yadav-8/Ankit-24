import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import TrendChart from '../ui/TrendChart.jsx'
import PieChart from '../ui/PieChart.jsx'
import { seededTrend, seededValues } from '../../lib/charts.js'

const ease = [0.22, 1, 0.36, 1]
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 3v18h18" />
    <polyline points="7 14 11 10 14 13 20 6" />
  </svg>
)

const ChevIcon = () => (
  <svg className="dash-panel__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

// True on phone widths — drives the collapsible (dropdown) panel layout.
function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const sync = () => setMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return mobile
}

// A dashboard section. On desktop it's always open; on mobile it collapses
// behind a dropdown arrow so the full report is easy to review on a phone.
function Panel({ id, title, tag, className = '', isMobile, isOpen, onToggle, children }) {
  const open = !isMobile || isOpen
  return (
    <div className={`dash-panel ${className} ${isMobile ? 'dash-panel--collapsible' : ''} ${open ? 'is-open' : ''}`}>
      {isMobile ? (
        <button type="button" className="dash-panel__head dash-panel__toggle" onClick={() => onToggle(id)} aria-expanded={open}>
          <h4>{title}</h4>
          <span className="dash-panel__head-right">
            <span className="dash-panel__tag">{tag}</span>
            <ChevIcon />
          </span>
        </button>
      ) : (
        <div className="dash-panel__head"><h4>{title}</h4><span className="dash-panel__tag">{tag}</span></div>
      )}
      {open && <div className="dash-panel__body">{children}</div>}
    </div>
  )
}

// Floating tab → opens a centered modal with the full creator dashboard.
export default function DashboardFloat() {
  const [open, setOpen] = useState(typeof window !== 'undefined' && window.location.search.includes('dashopen'))
  const isMobile = useIsMobile()
  // On mobile, start with the headline chart open; the rest expand on tap.
  const [openPanels, setOpenPanels] = useState(() => new Set(['views']))
  const togglePanel = (id) =>
    setOpenPanels((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  const seed = 'float'

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const j = seededValues(seed + '-kpi', 8, 0, 40)
  const views = seededTrend(seed + '-views', 12)
  const subs = seededTrend(seed + '-subs', 12)
  const watch = seededTrend(seed + '-watch', 12)
  const rev = seededTrend(seed + '-rev', 12)
  const kpis = [
    { label: 'Subscribers', value: `${210 + j[0]}K`, delta: `+${8 + (j[1] % 12)}%`, color: '#4928fd', series: subs },
    { label: 'Views · 28d', value: `${(4 + j[2] / 10).toFixed(1)}M`, delta: `+${12 + (j[3] % 18)}%`, color: '#70b5ff', series: views },
    { label: 'Watch time', value: `${180 + j[4]}K hrs`, delta: `+${6 + (j[5] % 14)}%`, color: '#ba81ee', series: watch },
    { label: 'Est. revenue', value: `₹${(3 + j[6] / 12).toFixed(1)}L`, delta: `+${9 + (j[7] % 16)}%`, color: '#79d45e', series: rev },
  ]

  const p = seededValues(seed + '-pie', 4, 14, 40)
  const traffic = [
    { label: 'Browse', value: p[0], color: '#4928fd' },
    { label: 'Search', value: p[1], color: '#70b5ff' },
    { label: 'Suggested', value: p[2], color: '#ba81ee' },
    { label: 'External', value: p[3], color: '#ffaf68' },
  ]
  const trafficTotal = traffic.reduce((a, t) => a + t.value, 0)
  const dom = traffic.reduce((a, t) => (t.value > a.value ? t : a))

  const dv = seededValues(seed + '-dev', 3, 18, 60)
  const devices = [
    { label: 'Mobile', value: dv[0], color: '#4928fd' },
    { label: 'Desktop', value: dv[1], color: '#79d45e' },
    { label: 'TV / Tablet', value: dv[2], color: '#ffaf68' },
  ]

  const weekly = seededValues(seed + '-week', 7, 32, 100)
  const maxWeek = Math.max(...weekly)
  const bestDay = DAYS[weekly.indexOf(maxWeek)]

  const vv = seededValues(seed + '-vids', 4, 42, 100)
  const topVideos = [
    { title: 'How I grew to 100K subs', val: vv[0] },
    { title: 'My exact upload system', val: vv[1] },
    { title: 'The retention secret nobody shares', val: vv[2] },
    { title: '₹0 → a creator business', val: vv[3] },
  ].sort((a, b) => b.val - a.val)
  const maxVid = Math.max(...topVideos.map((v) => v.val))

  const sm = seededValues(seed + '-sum', 4, 0, 50)
  const summary = [
    { label: 'Best day this week', value: bestDay },
    { label: 'Avg. view duration', value: `${5 + (sm[0] % 4)}:${String(5 + (sm[1] % 54)).padStart(2, '0')}` },
    { label: 'New subs · 7d', value: `+${(2 + sm[2] / 12).toFixed(1)}K` },
    { label: 'Avg. CTR', value: `${(4 + sm[3] / 14).toFixed(1)}%` },
  ]

  const panelProps = { isMobile, onToggle: togglePanel }

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            className="dashfloat__tab"
            onClick={() => setOpen(true)}
            aria-label="Open your dashboard"
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

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="dashmodal__scrim"
              data-lenis-prevent
              onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="dashmodal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.35, ease }}
              role="dialog"
              aria-modal="true"
            >
              <div className="dashmodal__head">
                <div className="dashmodal__channel">
                  <span className="dashmodal__avatar">R</span>
                  <span>
                    <b>Rahul Creates</b>
                    <em>@rahulcreates · YouTube</em>
                  </span>
                </div>
                <div className="dashmodal__head-right">
                  <span className="dashmodal__live"><i /> Live · 1-to-1</span>
                  <button className="dashmodal__close" onClick={() => setOpen(false)} aria-label="Close dashboard">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
                  </button>
                </div>
              </div>

              <div className="dashmodal__body">
                <p className="dashmodal__note">
                  Every creator gets this — a personal dashboard built live <b>after your growth call</b>, reviewed 1-to-1 with your strategist every week.
                </p>

                <div className="dashmodal__kpis">
                  {kpis.map((k, i) => (
                    <motion.div
                      className="dash-kpi"
                      key={k.label}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease }}
                    >
                      <span className="dash-kpi__label">{k.label}</span>
                      <span className="dash-kpi__value">{k.value}</span>
                      <span className="dash-kpi__delta">▲ {k.delta}</span>
                      <div className="dash-kpi__spark">
                        <TrendChart data={k.series} color={k.color} height={32} showDots={false} showGrid={false} interactive={false} />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="dashmodal__grid">
                  <Panel id="views" title="Views over time" tag="monthly" className="dashmodal__wide" isOpen={openPanels.has('views')} {...panelProps}>
                    <TrendChart data={views} labels={MONTHS} color="#4928fd" height={180} format={(v) => `${v}K views`} />
                  </Panel>

                  <Panel id="traffic" title="Traffic sources" tag="28d" isOpen={openPanels.has('traffic')} {...panelProps}>
                    <PieChart data={traffic} size={172} thickness={24} centerLabel={`${Math.round((dom.value / trafficTotal) * 100)}%`} centerSub={dom.label} />
                  </Panel>

                  <Panel id="weekly" title="Weekly views report" tag="last 7 days" className="dashmodal__wide" isOpen={openPanels.has('weekly')} {...panelProps}>
                    <div className="weekbars">
                      {DAYS.map((d, i) => (
                        <div className={`weekbar ${weekly[i] === maxWeek ? 'is-best' : ''}`} key={d}>
                          <span className="weekbar__val">{weekly[i]}K</span>
                          <div className="weekbar__col">
                            <motion.span
                              className="weekbar__fill"
                              initial={{ height: 0 }}
                              animate={{ height: `${(weekly[i] / maxWeek) * 100}%` }}
                              transition={{ duration: 0.8, delay: 0.2 + i * 0.07, ease }}
                            />
                          </div>
                          <span className="weekbar__day">{d}</span>
                        </div>
                      ))}
                    </div>
                  </Panel>

                  <Panel id="devices" title="Audience devices" tag="share" isOpen={openPanels.has('devices')} {...panelProps}>
                    <PieChart data={devices} size={172} thickness={24} />
                  </Panel>

                  <Panel id="topvids" title="Top performing videos" tag="by retention" className="dashmodal__full" isOpen={openPanels.has('topvids')} {...panelProps}>
                    <ul className="dash-bars">
                      {topVideos.map((v, i) => (
                        <li className="dash-bar" key={v.title}>
                          <span className="dash-bar__title">{v.title}</span>
                          <span className="dash-bar__track">
                            <motion.span
                              className="dash-bar__fill"
                              initial={{ width: 0 }}
                              animate={{ width: `${(v.val / maxVid) * 100}%` }}
                              transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease }}
                            />
                          </span>
                          <span className="dash-bar__val">{v.val}%</span>
                        </li>
                      ))}
                    </ul>
                  </Panel>

                  <Panel id="summary" title="This week at a glance" tag="summary" className="dashmodal__full" isOpen={openPanels.has('summary')} {...panelProps}>
                    <div className="dashmodal__summary">
                      {summary.map((s) => (
                        <div className="dashmodal__sum" key={s.label}>
                          <span>{s.label}</span>
                          <b>{s.value}</b>
                        </div>
                      ))}
                    </div>
                  </Panel>
                </div>

                <Link to="/contact" className="dashmodal__cta" onClick={() => setOpen(false)}>
                  Book your growth call to get yours
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </Link>
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
