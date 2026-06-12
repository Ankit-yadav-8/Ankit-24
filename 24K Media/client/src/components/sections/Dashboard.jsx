import { motion } from 'framer-motion'
import Reveal from '../ui/Reveal.jsx'
import SectionHead from '../ui/SectionHead.jsx'
import TrendChart from '../ui/TrendChart.jsx'
import PieChart from '../ui/PieChart.jsx'
import { seededTrend, seededValues } from '../../lib/charts.js'

const ease = [0.22, 1, 0.36, 1]
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// A live-looking creator analytics dashboard. All numbers derive from `seed`,
// so every place it appears shows different (but stable) data.
export default function Dashboard({
  seed = 'home',
  channel = 'Your Channel',
  handle = '@yourchannel',
  eyebrow = 'Creator Dashboard',
  title = (<>The clarity every creator gets <span className="gold-fill italic-serif">from day one.</span></>),
  text = 'Not screenshots — real dashboards. Views, watch-time, traffic and revenue in one place, reviewed with your strategist every week.',
}) {
  const j = seededValues(seed + '-kpi', 8, 0, 40)
  const viewsSeries = seededTrend(seed + '-views', 12)
  const subsSeries = seededTrend(seed + '-subs', 12)
  const watchSeries = seededTrend(seed + '-watch', 12)
  const revSeries = seededTrend(seed + '-rev', 12)

  const kpis = [
    { label: 'Subscribers', value: `${210 + j[0]}K`, delta: `+${8 + (j[1] % 12)}%`, series: subsSeries, color: '#4928fd' },
    { label: 'Views · 28d', value: `${(4 + j[2] / 10).toFixed(1)}M`, delta: `+${12 + (j[3] % 18)}%`, series: viewsSeries, color: '#70b5ff' },
    { label: 'Watch time', value: `${180 + j[4]}K hrs`, delta: `+${6 + (j[5] % 14)}%`, series: watchSeries, color: '#ba81ee' },
    { label: 'Est. revenue', value: `₹${(3 + j[6] / 12).toFixed(1)}L`, delta: `+${9 + (j[7] % 16)}%`, series: revSeries, color: '#79d45e' },
  ]

  const p = seededValues(seed + '-pie', 4, 14, 40)
  const traffic = [
    { label: 'Browse feed', value: p[0], color: '#4928fd' },
    { label: 'Search', value: p[1], color: '#70b5ff' },
    { label: 'Suggested', value: p[2], color: '#ba81ee' },
    { label: 'External', value: p[3], color: '#ffaf68' },
  ]
  const trafficTotal = traffic.reduce((a, t) => a + t.value, 0)
  const dominant = traffic.reduce((a, t) => (t.value > a.value ? t : a))
  const topPct = Math.round((dominant.value / trafficTotal) * 100)

  const vv = seededValues(seed + '-vids', 4, 42, 100)
  const topVideos = [
    { title: 'How I grew to 100K', val: vv[0] },
    { title: 'My exact upload system', val: vv[1] },
    { title: 'The retention secret', val: vv[2] },
    { title: '₹0 → creator business', val: vv[3] },
  ].sort((a, b) => b.val - a.val)
  const maxVid = Math.max(...topVideos.map((v) => v.val))

  return (
    <section className="section">
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} text={text} />

        <Reveal className="card dashboard">
          <span className="card-gold-line" />

          <div className="dashboard__bar">
            <div className="dashboard__channel">
              <span className="dashboard__avatar">{channel.charAt(0)}</span>
              <span>
                <b>{channel}</b>
                <em>{handle}</em>
              </span>
            </div>
            <div className="dashboard__range">
              <span className="dashboard__live"><i /> Live</span>
              <span className="dashboard__pill">Last 12 months</span>
            </div>
          </div>

          <div className="dashboard__kpis">
            {kpis.map((k, i) => (
              <motion.div
                className="dash-kpi"
                key={k.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              >
                <span className="dash-kpi__label">{k.label}</span>
                <span className="dash-kpi__value">{k.value}</span>
                <span className="dash-kpi__delta">▲ {k.delta}</span>
                <div className="dash-kpi__spark">
                  <TrendChart data={k.series} color={k.color} height={34} showDots={false} showGrid={false} interactive={false} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="dashboard__main">
            <div className="dash-panel">
              <div className="dash-panel__head">
                <h4>Views over time</h4>
                <span className="dash-panel__tag">monthly</span>
              </div>
              <TrendChart data={viewsSeries} labels={MONTHS.slice(0, 12)} color="#4928fd" height={180} format={(v) => `${v}K views`} />
            </div>

            <div className="dash-panel">
              <div className="dash-panel__head">
                <h4>Traffic sources</h4>
                <span className="dash-panel__tag">28 days</span>
              </div>
              <PieChart data={traffic} size={184} thickness={26} centerLabel={`${topPct}%`} centerSub={dominant.label.split(' ')[0]} />
            </div>
          </div>

          <div className="dash-panel dashboard__videos">
            <div className="dash-panel__head">
              <h4>Top performing videos</h4>
              <span className="dash-panel__tag">by retention</span>
            </div>
            <ul className="dash-bars">
              {topVideos.map((v, i) => (
                <li className="dash-bar" key={v.title}>
                  <span className="dash-bar__title">{v.title}</span>
                  <span className="dash-bar__track">
                    <motion.span
                      className="dash-bar__fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(v.val / maxVid) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease }}
                    />
                  </span>
                  <span className="dash-bar__val">{v.val}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
