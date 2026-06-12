import { useParams, Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'
import ServiceCard from '../components/ui/ServiceCard.jsx'
import TrendChart from '../components/ui/TrendChart.jsx'
import CTABand from '../components/sections/CTABand.jsx'
import NotFound from './NotFound.jsx'
import { seededTrend } from '../lib/charts.js'
import { useSite } from '../context/SiteContext.jsx'

const CAT_COLOR = {
  Content: 'var(--gold)',
  Brand: '#9b5de5',
  Strategy: '#3f8efc',
  Distribution: '#2bb673',
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const { services } = useSite()
  const service = services.find((s) => s.slug === slug)
  if (!service) return <NotFound />

  const related = services.filter((s) => s.slug !== slug && s.category === service.category).slice(0, 3)
  const fallbackRelated = services.filter((s) => s.slug !== slug).slice(0, 3)
  const recos = related.length ? related : fallbackRelated

  const color = CAT_COLOR[service.category] || 'var(--gold)'
  const trend = seededTrend(service.slug, 10)
  const growth = Math.round((trend[trend.length - 1] / trend[0] - 1) * 100)
  const labels = trend.map((_, i) => `Month ${i + 1}`)

  return (
    <>
      <PageHeader
        eyebrow={`${service.category} Service`}
        title={<>{service.title.split(' ').slice(0, -1).join(' ')} <span className="gold-fill italic-serif">{service.title.split(' ').slice(-1)}</span></>}
        text={service.summary}
        crumbs={[{ label: 'Services', to: '/services' }, { label: service.title }]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="svc-detail__hero">
            <Reveal>
              <div className="svc-detail__icon">{service.icon}</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '1rem' }}>{service.tagline}</h2>
              <p className="text-soft" style={{ fontSize: '1.1rem', maxWidth: '52ch' }}>{service.summary}</p>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button to="/contact" arrow>Book Growth Call</Button>
                <Button to="/case-studies" variant="ghost">See results</Button>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="svc-outcomes grid-3" style={{ gridTemplateColumns: '1fr' }}>
                {service.outcomes.map((o) => (
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
                <h3>{service.outcomes[0].label}</h3>
                <p className="text-soft">Modeled growth over the first 10 months on the {service.title} system — hover the line to inspect each month.</p>
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
              <h3>The Problem</h3>
              <p>{service.problem}</p>
            </Reveal>
            <Reveal className="card svc-block" delay={0.08}>
              <h3>Our Approach</h3>
              <p>{service.approach}</p>
            </Reveal>
            <Reveal className="card svc-block" delay={0.16}>
              <h3>The Proof</h3>
              <p>{service.proof}</p>
            </Reveal>
          </div>

          <Reveal className="card" style={{ marginTop: '24px', padding: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
            <span className="eyebrow">What you get</span>
            <ul className="svc-deliverables" style={{ marginTop: '1.4rem' }}>
              {service.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>Related services</h2></div>
          <div className="grid grid-3">
            {recos.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
