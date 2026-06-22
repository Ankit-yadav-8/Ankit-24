import { useParams } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader.jsx'
import Seo from '../components/Seo.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHead from '../components/ui/SectionHead.jsx'
import Button from '../components/ui/Button.jsx'
import ServiceCard from '../components/ui/ServiceCard.jsx'
import TrendChart from '../components/ui/TrendChart.jsx'
import CTABand from '../components/sections/CTABand.jsx'
import NotFound from './NotFound.jsx'
import { seededTrend, seededValues } from '../lib/charts.js'
import { useSite } from '../context/SiteContext.jsx'

// One distinct accent per segment.
const COLORS = {
  creators: '#9b5de5', founders: '#3f8efc', d2c: '#ff9f43', saas: '#2bb673',
  education: '#f4607a', agencies: '#caa42a', podcasters: '#12b5b0', b2b: '#5e60ce',
}

// "You're feeling this if…" — the friction that sends each segment our way.
const SIGNALS = {
  creators: ['Uploads are random and growth feels like luck', 'Great videos die on weak titles and thumbnails', 'No idea which content actually drives subscribers'],
  founders: ['Respected offline, but invisible online', 'Posts get no traction and no narrative', 'Pipeline depends entirely on cold outbound'],
  d2c: ['Every sale is rented from the ad auction', 'CAC climbs higher every quarter', 'No owned audience to fall back on'],
  saas: ['Content is a treadmill of feature posts', 'Nobody can attribute content to pipeline', 'The category has no point of view to own'],
  education: ['The expertise is real, the audience is not', 'Every launch starts again from zero', 'Inconsistent posting kills all momentum'],
  agencies: ['Delivery is chaotic and talent is scarce', 'Every new client adds operational drag', 'Capacity is the ceiling on revenue'],
  podcasters: ['Great episodes nobody ever sees', 'Recordings pile up, clips never ship', 'Distribution stops at the audio feed'],
  b2b: ['Executive voices stay off-camera', 'Content is faceless and forgettable', 'Demand can’t be tied back to the brand'],
}

export default function SolutionDetail() {
  const { slug } = useParams()
  const { industries, solutionsDetail, services } = useSite()
  const idx = (industries || []).findIndex((i) => i.id === slug)
  const base = (industries || [])[idx]
  const detail = solutionsDetail?.[slug]
  if (!base || !detail) return <NotFound />

  const color = COLORS[slug] || 'var(--gold)'
  const variant = idx % 3
  const trend = seededTrend(slug, 10)
  const growth = Math.round((trend[trend.length - 1] / trend[0] - 1) * 100)
  const labels = trend.map((_, i) => `Month ${i + 1}`)
  const barW = seededValues(slug + 'bars', detail.outcomes.length, 62, 96)
  const signals = SIGNALS[slug] || []
  const segment = base.title.toLowerCase()

  const related = (detail.services || [])
    .map((s) => services.find((x) => x.slug === s))
    .filter(Boolean)
    .slice(0, 3)

  const faqs = [
    { q: `Is this built for ${segment}?`, a: detail.summary },
    { q: 'How fast will we see movement?', a: `Most ${segment} see measurable lifts in retention and reach within 60–90 days, with compounding growth through months 3–6.` },
    { q: 'What does it cost?', a: 'Engagements start at ₹75K/month and scale with scope. Book a growth call and we’ll map a plan to your goals and budget — no obligation.' },
  ]

  const words = base.title.split(' ')

  const trendCard = (
    <Reveal className="card sol-trend">
      <div className="svc-chart__head">
        <div className="svc-chart__intro">
          <span className="eyebrow">Typical Trajectory</span>
          <h3>Where this goes</h3>
          <p className="text-soft">Modeled growth over the first 10 months running the {base.title} system — hover to inspect each month.</p>
        </div>
        <div className="svc-chart__delta"><b>+{growth}%</b><span>over 10 months</span></div>
      </div>
      <TrendChart data={trend} labels={labels} color={color} height={200} format={(v) => `${v} index`} />
    </Reveal>
  )

  const barsCard = (
    <Reveal className="card sol-bars" delay={0.08}>
      <span className="eyebrow">Outcome benchmarks</span>
      <h3>What {segment} see</h3>
      <div className="sol-bar-list">
        {detail.outcomes.map((o, i) => (
          <div className="sol-bar" key={o.label}>
            <div className="sol-bar__top"><span>{o.label}</span><b>{o.value}</b></div>
            <div className="sol-bar__track"><span className="sol-bar__fill" style={{ width: `${barW[i]}%` }} /></div>
          </div>
        ))}
      </div>
    </Reveal>
  )

  return (
    <div className="sol-detail" style={{ '--sol-accent': color }}>
      <Seo
        title={`${base.title} — Growth Solution`}
        description={detail.summary}
        path={`/solutions/${slug}`}
      />
      <PageHeader
        eyebrow={`Solutions · ${base.title}`}
        title={<>{words.slice(0, -1).join(' ')} <span className="gold-fill italic-serif">{words.slice(-1)}</span></>}
        text={detail.summary}
        crumbs={[{ label: 'Solutions', to: '/solutions' }, { label: base.title }]}
      />

      {/* Hero: pitch + oversized KPI panel */}
      <section className="section section--tight">
        <div className="container">
          <div className="sol-hero">
            <Reveal className="sol-hero__main">
              <div className="sol-hero__ico">{base.icon}</div>
              <span className="sol-kicker">For {base.title}</span>
              <h2 className="sol-hero__title">{detail.tagline}</h2>
              <p className="sol-hero__sum text-soft">{detail.summary}</p>
              <div className="svc-cta-row">
                <Button to="/contact" arrow>Book Growth Call</Button>
                <Button to="/solutions" variant="ghost">All solutions</Button>
              </div>
            </Reveal>
            <Reveal delay={0.1} className={`sol-kpis ${variant === 2 ? 'sol-kpis--row' : ''}`}>
              {detail.outcomes.map((o) => (
                <div className="sol-kpi" key={o.label}>
                  <b className="sol-kpi__v">{o.value}</b>
                  <span className="sol-kpi__l">{o.label}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* The shift — before vs after */}
      <section className="section section--smoke2">
        <div className="container">
          <SectionHead
            eyebrow="The Shift"
            title={<>From scattered effort to a <span className="gold-fill italic-serif">compounding system.</span></>}
          />
          <div className="sol-shift">
            <Reveal className="sol-shift__col sol-shift__col--bad">
              <span className="sol-shift__tag">Without a system</span>
              <p>{detail.problem}</p>
              <ul className="sol-x">
                {signals.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </Reveal>
            <span className="sol-shift__arrow" aria-hidden>→</span>
            <Reveal className="sol-shift__col sol-shift__col--good" delay={0.08}>
              <span className="sol-shift__tag">With 24K Media</span>
              <p>{detail.approach}</p>
              <ul className="sol-check">
                {detail.includes.slice(0, 3).map((s) => <li key={s}>{s}</li>)}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trajectory + outcome bars (order flips by variant) */}
      <section className="section section--tight">
        <div className="container">
          <div className={`sol-metrics ${variant === 1 ? 'sol-metrics--rev' : ''}`}>
            {trendCard}
            {barsCard}
          </div>
        </div>
      </section>

      {/* What we ship — numbered roadmap */}
      <section className="section section--smoke2">
        <div className="container">
          <SectionHead eyebrow="What We Ship" title={<>Your {base.title} <span className="gold-fill italic-serif">operating system.</span></>} />
          <div className="sol-ship">
            {detail.includes.map((d, i) => (
              <Reveal className="sol-ship__item" key={d} delay={(i % 3) * 0.06}>
                <span className="sol-ship__n">{String(i + 1).padStart(2, '0')}</span>
                <p>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Proof pull-quote */}
      <section className="section">
        <div className="container">
          <Reveal className="sol-proof">
            <span className="eyebrow">The Proof</span>
            <p className="sol-proof__q">{detail.proof}</p>
          </Reveal>
        </div>
      </section>

      {/* Segment FAQ */}
      <section className="section section--smoke2">
        <div className="container">
          <SectionHead eyebrow="Questions" title={<>{base.title}, <span className="gold-fill italic-serif">answered.</span></>} />
          <div className="sol-faq">
            {faqs.map((f, i) => (
              <Reveal className="sol-faq__item" key={f.q} delay={(i % 2) * 0.06}>
                <h4>{f.q}</h4>
                <p>{f.a}</p>
              </Reveal>
            ))}
          </div>
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
    </div>
  )
}
