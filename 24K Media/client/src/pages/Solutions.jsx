import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHead from '../components/ui/SectionHead.jsx'
import Button from '../components/ui/Button.jsx'
import TrendChart from '../components/ui/TrendChart.jsx'
import CTABand from '../components/sections/CTABand.jsx'
import { seededTrend } from '../lib/charts.js'
import { useSite } from '../context/SiteContext.jsx'

const ACCENTS = ['accent-purple', 'accent-blue', 'accent-orange', 'accent-green', 'accent-pink', 'accent-yellow']
const COLORS = ['#9b5de5', '#3f8efc', '#ff9f43', '#2bb673', '#f4607a', '#caa42a']

// The concrete play + a headline metric for each segment (distinct data).
const SOLUTION = {
  creators: { stat: '11x', statLabel: 'avg. views in 6mo', plays: ['Documented format & packaging system', 'Retention-first long & short-form edits', 'A/B-tested thumbnails every upload'] },
  founders: { stat: '5x', statLabel: 'inbound pipeline', plays: ['Sharp positioning & narrative', 'Weekly founder-led content engine', 'Inbound your sales team can close'] },
  d2c: { stat: '-38%', statLabel: 'blended CAC', plays: ['Owned-audience content engine', 'UGC & creator collaborations', 'Funnels that compound and lower CAC'] },
  saas: { stat: '4x', statLabel: 'qualified demos', plays: ['Category-defining point of view', 'Demand-gen content system', 'Pipeline you can attribute to content'] },
  education: { stat: '#1', statLabel: 'voice in niche', plays: ['Signature framework content', 'Course & cohort launch funnels', 'Authority that compounds monthly'] },
  agencies: { stat: '3x', statLabel: 'delivery capacity', plays: ['White-label production at scale', 'Systems that remove delivery chaos', 'AI-assisted output multipliers'] },
  podcasters: { stat: '20+', statLabel: 'clips per episode', plays: ['Multicam record-to-publish ops', 'Short-form clip engine', 'Cross-platform distribution'] },
  b2b: { stat: '+850%', statLabel: 'attributed demand', plays: ['Executive thought-leadership', 'Account-aware content', 'Sales-to-content feedback loop'] },
}

// Every engagement ships on the same operating system.
const SYSTEM = [
  { icon: '◈', title: 'Documented strategy', desc: 'A thesis, pillars and a calendar — before a single shoot.' },
  { icon: '✦', title: 'Full production pod', desc: 'Strategy, editing, design and motion under one roof.' },
  { icon: '◐', title: 'Native distribution', desc: 'Adapted to every platform’s format, published on cadence.' },
  { icon: '◍', title: 'Measured to revenue', desc: 'Dashboards that tie attention to pipeline, not vanity.' },
]

export default function Solutions() {
  const { industries } = useSite()
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title={<>One growth engine, <span className="gold-fill italic-serif">tuned to your world.</span></>}
        text="Whether you’re a solo creator or a funded enterprise, we adapt the same proven media system natively to your audience, format and goals."
        crumbs={[{ label: 'Solutions' }]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="solutions__grid">
            {industries.map((it, i) => {
              const color = COLORS[i % COLORS.length]
              const meta = SOLUTION[it.id] || { stat: '', statLabel: '', plays: [] }
              const trend = seededTrend(it.id, 10)
              const growth = Math.round((trend[trend.length - 1] / trend[0] - 1) * 100)
              return (
                <Reveal key={it.id} className={`card solution-card ${ACCENTS[i % ACCENTS.length]}`} delay={(i % 3) * 0.07}>
                  <span className="card-gold-line" />
                  <div className="solution-card__top">
                    <span className="solution-card__ico">{it.icon}</span>
                    <span className="solution-card__delta">▲ +{growth}%</span>
                  </div>
                  <h3 className="solution-card__title">{it.title}</h3>
                  <p className="solution-card__desc">{it.desc}</p>

                  {meta.stat && (
                    <div className="solution-card__stat">
                      <b>{meta.stat}</b>
                      <span>{meta.statLabel}</span>
                    </div>
                  )}

                  <div className="solution-card__chart">
                    <TrendChart data={trend} color={color} height={66} showDots={false} showGrid={false} interactive={false} />
                    <span className="solution-card__chart-label">Typical 10-month trajectory</span>
                  </div>

                  <ul className="solution-card__list">
                    {meta.plays.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>

                  <Button to={`/solutions/${it.id}`} size="sm" arrow magnetic={false}>Explore {it.title.split(' ')[0]}</Button>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* What every engagement includes — the shared system */}
      <section className="section section--smoke2">
        <div className="container">
          <SectionHead
            eyebrow="One System"
            title={<>Every solution ships on the <span className="gold-fill italic-serif">same engine.</span></>}
            text="The segment changes. The operating system doesn’t — that’s why results stay consistent across creators, founders and brands."
          />
          <div className="system-grid">
            {SYSTEM.map((s, i) => (
              <Reveal key={s.title} className="card system-card" delay={(i % 4) * 0.07}>
                <span className="system-card__ico">{s.icon}</span>
                <h3 className="system-card__title">{s.title}</h3>
                <p className="system-card__desc">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
