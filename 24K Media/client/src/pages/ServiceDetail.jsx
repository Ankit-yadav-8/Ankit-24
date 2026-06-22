import { useParams, Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader.jsx'
import Seo from '../components/Seo.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'
import ServiceCard from '../components/ui/ServiceCard.jsx'
import TrendChart from '../components/ui/TrendChart.jsx'
import PieChart from '../components/ui/PieChart.jsx'
import CTABand from '../components/sections/CTABand.jsx'
import NotFound from './NotFound.jsx'
import { seededTrend, seededValues } from '../lib/charts.js'
import { useSite } from '../context/SiteContext.jsx'

// A distinct accent per service so no two detail pages read the same.
const ACCENTS = [
  '#caa24a', '#9b5de5', '#3f8efc', '#2bb673', '#ff7a59', '#e85d9a',
  '#5e60ce', '#0fb5ba', '#e0922f', '#7c5cff', '#2dc7a8', '#cf6f8a',
]

// Category-specific "how we run it" — so a Content page and a Strategy page
// don't just swap copy, they walk through a different operating loop.
const PLAYBOOK = {
  Content: [
    ['Audit', 'We tear down your current channel, formats and retention curve to find the real ceiling.'],
    ['System', 'A documented format + packaging system, tuned to your niche and audience.'],
    ['Produce', 'Retention-first editing and design, shipped on a dependable 48-hour cycle.'],
    ['Iterate', 'Weekly review of CTR, retention and watch-time — we double down on what compounds.'],
  ],
  Brand: [
    ['Position', 'We define the sharp positioning and narrative only you can credibly own.'],
    ['Identity', 'A visual and verbal system that reads premium across every surface.'],
    ['Activate', 'Pillars, formats and a cadence that ship your point of view every week.'],
    ['Compound', 'We track share-of-voice and inbound, then sharpen what actually lands.'],
  ],
  Strategy: [
    ['Discover', 'Goals, audience and the unfair advantage only you have — fully mapped.'],
    ['Architect', 'A documented thesis: pillars, formats, calendar and the metrics that matter.'],
    ['Instrument', 'Tracking from content to pipeline, so growth is bankable — not vanity.'],
    ['Optimise', 'Quarterly reviews turn every win into a repeatable, scalable system.'],
  ],
  Distribution: [
    ['Adapt', 'One content engine reshaped natively for each platform and feed.'],
    ['Publish', 'A reliable calendar across every channel, always in your brand voice.'],
    ['Engage', 'Daily community management that turns raw reach into a real audience.'],
    ['Scale', 'We pair the winners with paid to compound the reach that already works.'],
  ],
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const { services } = useSite()
  const idx = services.findIndex((s) => s.slug === slug)
  const service = services[idx]
  if (!service) return <NotFound />

  const accent = ACCENTS[idx % ACCENTS.length]
  const variant = idx % 3 // small layout shifts so pages feel distinct

  const related = services.filter((s) => s.slug !== slug && s.category === service.category).slice(0, 3)
  const fallbackRelated = services.filter((s) => s.slug !== slug).slice(0, 3)
  const recos = related.length ? related : fallbackRelated

  // Deterministic, service-specific charts — unique shape every time.
  const trend = seededTrend(service.slug, 10)
  const growth = Math.round((trend[trend.length - 1] / trend[0] - 1) * 100)
  const labels = trend.map((_, i) => `Month ${i + 1}`)

  const split = seededValues(service.slug + 'impact', 4, 16, 40)
  const impact = ['Reach', 'Retention', 'Revenue', 'Authority'].map((label, i) => ({
    label,
    value: split[i],
    color: ACCENTS[(idx + i) % ACCENTS.length],
  }))

  const playbook = PLAYBOOK[service.category] || PLAYBOOK.Content

  const faqs = [
    {
      q: `How soon does ${service.title} show results?`,
      a: 'Most clients see measurable lifts in retention and reach within 60–90 days, with compounding subscriber and revenue growth through months 3–6.',
    },
    {
      q: 'What exactly is included?',
      a: `${service.deliverables.slice(0, 4).join(' · ')} — and more, tailored to your goals.`,
    },
    {
      q: 'Do I keep full ownership?',
      a: 'Always. Every asset, channel, account and piece of content is 100% yours — we build infrastructure you own, never rent.',
    },
    {
      q: 'Is there a minimum commitment?',
      a: 'We work in 90-day engagements because compounding needs runway. After that it’s month-to-month — we earn the renewal with results.',
    },
  ]

  return (
    <div className="svc-detail" style={{ '--svc-accent': accent }}>
      <Seo
        title={`${service.title} — Creator Growth Service`}
        description={service.summary || service.tagline}
        path={`/services/${slug}`}
      />
      <PageHeader
        eyebrow={`${service.category} Service`}
        title={<>{service.title.split(' ').slice(0, -1).join(' ')} <span className="gold-fill italic-serif">{service.title.split(' ').slice(-1)}</span></>}
        text={service.summary}
        crumbs={[{ label: 'Services', to: '/services' }, { label: service.title }]}
      />

      {/* Hero: pitch + headline outcomes */}
      <section className="section section--tight">
        <div className="container">
          <div className="svc-detail__hero">
            <Reveal>
              <div className="svc-detail__icon">{service.icon}</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '1rem' }}>{service.tagline}</h2>
              <p className="text-soft" style={{ fontSize: '1.1rem', maxWidth: '52ch' }}>{service.summary}</p>
              <div className="svc-cta-row">
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

      {/* Dual charts: trajectory line + impact donut */}
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={`svc-duo ${variant === 1 ? 'svc-duo--rev' : ''}`}>
            <Reveal className="card svc-chart">
              <div className="svc-chart__head">
                <div className="svc-chart__intro">
                  <span className="eyebrow">Typical Trajectory</span>
                  <h3>{service.outcomes[0].label}</h3>
                  <p className="text-soft">Modeled growth over the first 10 months on the {service.title} system — hover the line to inspect each month.</p>
                </div>
                <div className="svc-chart__delta">
                  <b>+{growth}%</b>
                  <span>over 10 months</span>
                </div>
              </div>
              <TrendChart data={trend} labels={labels} color={accent} height={200} format={(v) => `${v} index`} />
            </Reveal>

            <Reveal className="card svc-pie" delay={0.08}>
              <span className="eyebrow">Where the lift shows up</span>
              <h3>Impact mix</h3>
              <p className="text-soft" style={{ marginBottom: '1rem' }}>How the gains from {service.title} typically distribute across the funnel.</p>
              <PieChart data={impact} size={172} thickness={22} centerLabel={`+${growth}%`} centerSub="blended" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Problem / Approach / Proof */}
      <section className="section section--smoke2">
        <div className="container">
          <div className="svc-blocks">
            <Reveal className="card svc-block">
              <span className="svc-block__k">01</span>
              <h3>The Problem</h3>
              <p>{service.problem}</p>
            </Reveal>
            <Reveal className="card svc-block" delay={0.08}>
              <span className="svc-block__k">02</span>
              <h3>Our Approach</h3>
              <p>{service.approach}</p>
            </Reveal>
            <Reveal className="card svc-block" delay={0.16}>
              <span className="svc-block__k">03</span>
              <h3>The Proof</h3>
              <p>{service.proof}</p>
            </Reveal>
          </div>

          <Reveal className="card" style={{ marginTop: '24px', padding: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
            <span className="eyebrow">What you get</span>
            <ul className={`svc-deliverables ${variant !== 2 ? 'svc-deliverables--grid' : ''}`} style={{ marginTop: '1.4rem' }}>
              {service.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* How we run it — category playbook */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The Engagement</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>How we run {service.title}</h2>
          </div>
          <div className="svc-playbook">
            {playbook.map(([title, desc], i) => (
              <Reveal className="svc-step" key={title} delay={(i % 4) * 0.07}>
                <span className="svc-step__num">{String(i + 1).padStart(2, '0')}</span>
                <h4>{title}</h4>
                <p>{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service FAQ */}
      <section className="section section--smoke2">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Questions</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>{service.title}, answered</h2>
          </div>
          <div className="svc-faq">
            {faqs.map((f, i) => (
              <Reveal className="svc-faq__item" key={f.q} delay={(i % 2) * 0.06}>
                <h4>{f.q}</h4>
                <p>{f.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="section">
        <div className="container">
          <div className="section-head"><h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>Related services</h2></div>
          <div className="grid grid-3">
            {recos.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  )
}
