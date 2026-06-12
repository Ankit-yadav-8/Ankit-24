import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'
import TrendChart from '../components/ui/TrendChart.jsx'
import CTABand from '../components/sections/CTABand.jsx'
import { seededTrend } from '../lib/charts.js'
import { useSite } from '../context/SiteContext.jsx'

const ACCENTS = ['accent-purple', 'accent-blue', 'accent-orange', 'accent-green', 'accent-pink', 'accent-yellow']
const COLORS = ['#9b5de5', '#3f8efc', '#ff9f43', '#2bb673', '#f4607a', '#caa42a']

// The concrete play we run for each segment.
const PLAYS = {
  creators: ['Documented format & packaging system', 'Retention-first long & short-form edits', 'A/B-tested thumbnails every upload'],
  founders: ['Sharp positioning & narrative', 'Weekly founder-led content engine', 'Inbound your sales team can close'],
  d2c: ['Owned-audience content engine', 'UGC & creator collaborations', 'Funnels that compound and lower CAC'],
  saas: ['Category-defining point of view', 'Demand-gen content system', 'Pipeline you can attribute to content'],
  education: ['Signature framework content', 'Course & cohort launch funnels', 'Authority that compounds monthly'],
  agencies: ['White-label production at scale', 'Systems that remove delivery chaos', 'AI-assisted output multipliers'],
}

export default function Solutions() {
  const { industries } = useSite()
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title={<>One growth engine, <span className="gold-fill italic-serif">tuned to your world.</span></>}
        text="Whether you’re a solo creator or a funded startup, we adapt the same proven media system natively to your audience, format and goals."
        crumbs={[{ label: 'Solutions' }]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="solutions__grid">
            {industries.map((it, i) => {
              const color = COLORS[i % COLORS.length]
              const trend = seededTrend(it.id, 10)
              const growth = Math.round((trend[trend.length - 1] / trend[0] - 1) * 100)
              return (
                <Reveal key={it.id} className={`card solution-card ${ACCENTS[i % ACCENTS.length]}`} delay={(i % 3) * 0.08}>
                  <span className="card-gold-line" />
                  <div className="solution-card__top">
                    <span className="solution-card__ico">{it.icon}</span>
                    <span className="solution-card__delta">▲ +{growth}%</span>
                  </div>
                  <h3 className="solution-card__title">{it.title}</h3>
                  <p className="solution-card__desc">{it.desc}</p>

                  <div className="solution-card__chart">
                    <TrendChart data={trend} color={color} height={66} showDots={false} showGrid={false} interactive={false} />
                    <span className="solution-card__chart-label">Typical 10-month trajectory</span>
                  </div>

                  <ul className="solution-card__list">
                    {(PLAYS[it.id] || []).map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>

                  <Button to="/contact" size="sm" arrow magnetic={false}>Get your growth plan</Button>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
