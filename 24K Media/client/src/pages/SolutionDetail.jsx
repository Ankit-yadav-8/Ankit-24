import { useParams } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'
import ServiceCard from '../components/ui/ServiceCard.jsx'
import TrendChart from '../components/ui/TrendChart.jsx'
import CTABand from '../components/sections/CTABand.jsx'
import NotFound from './NotFound.jsx'
import { seededTrend } from '../lib/charts.js'
import { useSite } from '../context/SiteContext.jsx'

const COLORS = {
  creators: '#9b5de5', founders: '#3f8efc', d2c: '#ff9f43', saas: '#2bb673',
  education: '#f4607a', agencies: '#caa42a', podcasters: '#9b5de5', b2b: '#3f8efc',
}

export default function SolutionDetail() {
  const { slug } = useParams()
  const { industries, solutionsDetail, services } = useSite()
  const base = (industries || []).find((i) => i.id === slug)
  const detail = solutionsDetail?.[slug]
  if (!base || !detail) return <NotFound />

  const color = COLORS[slug] || 'var(--gold)'
  const trend = seededTrend(slug, 10)
  const growth = Math.round((trend[trend.length - 1] / trend[0] - 1) * 100)
  const labels = trend.map((_, i) => `Month ${i + 1}`)
  const related = (detail.services || [])
    .map((s) => services.find((x) => x.slug === s))
    .filter(Boolean)
    .slice(0, 3)

  const words = base.title.split(' ')

  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title={<>{words.slice(0, -1).join(' ')} <span className="gold-fill italic-serif">{words.slice(-1)}</span></>}
        text={detail.summary}
        crumbs={[{ label: 'Solutions', to: '/solutions' }, { label: base.title }]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="svc-detail__hero">
            <Reveal>
              <div className="svc-detail__icon">{base.icon}</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '1rem' }}>{detail.tagline}</h2>
              <p className="text-soft" style={{ fontSize: '1.1rem', maxWidth: '52ch' }}>{detail.summary}</p>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button to="/contact" arrow>Book Growth Call</Button>
                <Button to="/solutions" variant="ghost">All solutions</Button>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="svc-outcomes grid-3" style={{ gridTemplateColumns: '1fr' }}>
                {detail.outcomes.map((o) => (
                  <div className="svc-outcome" key={o.label}>
                    <div className="svc-outcome__value">{o.value}</div>
                    <div className="svc-outcome__label">{o.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="card svc-chart" style={{ '--svc-accent': color }}>
            <div className="svc-chart__head">
              <div className="svc-chart__intro">
                <span className="eyebrow">Typical Trajectory</span>
                <h3>What growth looks like</h3>
                <p className="text-soft">Modeled growth over the first 10 months running the {base.title} system — hover to inspect each month.</p>
              </div>
              <div className="svc-chart__delta">
                <b>+{growth}%</b>
                <span>compounded over 10 months</span>
              </div>
            </div>
            <TrendChart data={trend} labels={labels} color={color} height={190} format={(v) => `${v} index`} />
          </Reveal>
        </div>
      </section>

      <section className="section section--smoke2">
        <div className="container">
          <div className="svc-blocks">
            <Reveal className="card svc-block">
              <h3>The Challenge</h3>
              <p>{detail.problem}</p>
            </Reveal>
            <Reveal className="card svc-block" delay={0.08}>
              <h3>Our Approach</h3>
              <p>{detail.approach}</p>
            </Reveal>
            <Reveal className="card svc-block" delay={0.16}>
              <h3>The Proof</h3>
              <p>{detail.proof}</p>
            </Reveal>
          </div>

          <Reveal className="card" style={{ marginTop: '24px', padding: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
            <span className="eyebrow">What’s included</span>
            <ul className="svc-deliverables" style={{ marginTop: '1.4rem' }}>
              {detail.includes.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head"><h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>Services that power this</h2></div>
            <div className="grid grid-3">
              {related.map((s) => <ServiceCard key={s.slug} service={s} />)}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  )
}
