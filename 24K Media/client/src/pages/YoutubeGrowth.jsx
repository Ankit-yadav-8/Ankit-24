import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'
import ServiceCard from '../components/ui/ServiceCard.jsx'
import TrendChart from '../components/ui/TrendChart.jsx'
import PieChart from '../components/ui/PieChart.jsx'
import CTABand from '../components/sections/CTABand.jsx'
import { useSite } from '../context/SiteContext.jsx'

// Unsplash helper — same pattern used across content.js.
const U = (id, w = 1100) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const ACCENT = '#4928fd' // electric violet — the site's primary accent
const ACCENT_2 = '#7c5cff'

// Real, modelled trajectory for the flagship finance-creator engagement —
// subscribers in thousands across the first ten months on the system.
const SUBS = [18, 26, 41, 63, 92, 137, 198, 271, 348, 410]
const SUB_LABELS = SUBS.map((_, i) => `Month ${i + 1}`)
const subsGrowth = Math.round((SUBS[SUBS.length - 1] / SUBS[0] - 1) * 100)

// Where the lift actually shows up across the channel funnel.
const IMPACT = [
  { label: 'Watch-time', value: 38, color: ACCENT },
  { label: 'Subscribers', value: 27, color: ACCENT_2 },
  { label: 'Revenue', value: 21, color: '#a78bff' },
  { label: 'Authority', value: 14, color: '#cdbcff' },
]

const OUTCOMES = [
  { value: '23x', label: 'Avg. monthly views in 6 months' },
  { value: '+340%', label: 'Watch-time lift' },
  { value: '6.0%', label: 'Channel CTR (from 4.1%)' },
  { value: '48h', label: 'Edit turnaround, every cut' },
]

const PILLARS = [
  {
    k: '01',
    title: 'Channel thesis',
    desc: 'One sharp promise the channel keeps every upload — the reason a stranger subscribes and a subscriber returns.',
    img: U('photo-1626785774573-4b799315345d', 900),
  },
  {
    k: '02',
    title: 'Packaging lab',
    desc: 'Title + thumbnail engineered and A/B-tested as a pair. We protect the click before we earn the watch.',
    img: U('photo-1611162617474-5b21e879e113', 900),
  },
  {
    k: '03',
    title: 'Retention edit',
    desc: 'Every cut is built around the watch-time graph — ruthless openings, pattern interrupts, clean sound.',
    img: U('photo-1598550874175-4d0ef436c909', 900),
  },
  {
    k: '04',
    title: 'Analytics loop',
    desc: 'Weekly review of CTR, retention and AVD. We double down on what compounds and kill what stalls.',
    img: U('photo-1551288049-bebda4e38f71', 900),
  },
]

const STEPS = [
  ['Teardown', 'We audit your last 30 videos — formats, hooks, retention curves and the real growth ceiling holding you back.'],
  ['Format system', 'A documented set of repeatable formats, hook frameworks and a packaging language unique to your channel.'],
  ['Production engine', 'Scripting, retention-first editing and tested thumbnails shipped on a dependable 48-hour cycle.'],
  ['Compound', 'Weekly analytics reviews turn every winning video into the template for the next three.'],
]

const FEATURES = [
  'Channel strategy & documented format system',
  'Scripting & hook frameworks for every video',
  'Retention-first long-form editing',
  'Title + thumbnail concepts, A/B tested each upload',
  'Shorts repurposing from every long-form cut',
  'Weekly analytics review & iteration call',
]

const FAQS = [
  {
    q: 'How soon does YouTube Growth show results?',
    a: 'Packaging and retention lifts usually land inside 60–90 days. Subscriber and revenue compounding builds through months 3–6 as the format system and back-catalogue start pulling together.',
  },
  {
    q: 'Do I need to be on camera every day?',
    a: 'No. We design a cadence that protects your time — most creators record in focused batches while we run scripting, editing, packaging and publishing around them.',
  },
  {
    q: 'What exactly is included?',
    a: 'Channel strategy & format system · Scripting & hook frameworks · Retention-first editing · Thumbnail & title A/B testing · Weekly analytics review — tailored to your niche and goals.',
  },
  {
    q: 'Do I keep full ownership?',
    a: 'Always. The channel, content, thumbnails and every asset are 100% yours. We build infrastructure you own — never rent.',
  },
]

export default function YoutubeGrowth() {
  const { services } = useSite()
  const related = services
    .filter((s) => s.slug !== 'youtube-growth' && s.category === 'Content')
    .slice(0, 3)
  const recos = related.length
    ? related
    : services.filter((s) => s.slug !== 'youtube-growth').slice(0, 3)

  return (
    <div className="svc-detail ytg" style={{ '--svc-accent': ACCENT }}>
      <PageHeader
        eyebrow="Content Service"
        title={<>YouTube <span className="gold-fill italic-serif">Growth</span></>}
        text="We turn a channel into a predictable growth engine — from thesis to thumbnail to the retention curve that keeps viewers watching."
        crumbs={[{ label: 'Services', to: '/services' }, { label: 'YouTube Growth' }]}
      />

      {/* Hero: pitch + media with floating proof */}
      <section className="section section--tight">
        <div className="container">
          <div className="ytg-hero">
            <Reveal>
              <div className="svc-detail__icon">▶</div>
              <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', marginBottom: '1rem' }}>
                Growth that stops being luck.
              </h2>
              <p className="text-soft" style={{ fontSize: '1.1rem', maxWidth: '52ch' }}>
                Talented creators plateau because publishing is random, packaging is weak and
                retention is never measured. We install the system that makes every upload
                compound — and report the numbers that prove it.
              </p>
              <div className="svc-cta-row">
                <Button to="/contact" arrow>Book Growth Call</Button>
                <Button to="/case-studies" variant="ghost">See results</Button>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="ytg-hero__media">
              <img src={U('photo-1593720213428-28a5b9e94613', 1100)} alt="Creator studio" loading="lazy" />
              <div className="ytg-hero__badge ytg-hero__badge--a">
                <b>410K</b>
                <span>subscribers in 9 months</span>
              </div>
              <div className="ytg-hero__badge ytg-hero__badge--b">
                <b>6.0%</b>
                <span>channel CTR</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Outcomes strip */}
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="ytg-stats">
            {OUTCOMES.map((o) => (
              <div className="ytg-stat" key={o.label}>
                <div className="ytg-stat__value">{o.value}</div>
                <div className="ytg-stat__label">{o.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Dual charts: trajectory + impact donut */}
      <section className="section section--smoke2">
        <div className="container">
          <div className="svc-duo">
            <Reveal className="card svc-chart">
              <div className="svc-chart__head">
                <div className="svc-chart__intro">
                  <span className="eyebrow">Typical Trajectory</span>
                  <h3>Subscribers (K)</h3>
                  <p className="text-soft">
                    Modelled subscriber growth over the first 10 months on the system — hover the
                    line to inspect each month.
                  </p>
                </div>
                <div className="svc-chart__delta">
                  <b>+{subsGrowth}%</b>
                  <span>over 10 months</span>
                </div>
              </div>
              <TrendChart
                data={SUBS}
                labels={SUB_LABELS}
                color={ACCENT}
                height={200}
                format={(v) => `${v}K subscribers`}
              />
            </Reveal>

            <Reveal className="card svc-pie" delay={0.08}>
              <span className="eyebrow">Where the lift shows up</span>
              <h3>Impact mix</h3>
              <p className="text-soft" style={{ marginBottom: '1rem' }}>
                How the gains from YouTube Growth typically distribute across the channel funnel.
              </p>
              <PieChart data={IMPACT} size={172} thickness={22} centerLabel={`+${subsGrowth}%`} centerSub="blended" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Problem / Approach / Proof */}
      <section className="section">
        <div className="container">
          <div className="svc-blocks">
            <Reveal className="card svc-block">
              <span className="svc-block__k">01</span>
              <h3>The Problem</h3>
              <p>Great videos stay unwatched. The thumbnail loses the click, the first 30 seconds lose the viewer, and nobody is measuring why.</p>
            </Reveal>
            <Reveal className="card svc-block" delay={0.08}>
              <span className="svc-block__k">02</span>
              <h3>Our Approach</h3>
              <p>We install a documented format system, test packaging on every upload, and edit each video around the retention curve.</p>
            </Reveal>
            <Reveal className="card svc-block" delay={0.16}>
              <span className="svc-block__k">03</span>
              <h3>The Proof</h3>
              <p>A finance creator went from 18K to 410K subscribers in nine months on this exact system — with revenue following the watch-time.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Four pillars with imagery */}
      <section className="section section--smoke2">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The Engine</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>Four parts, one compounding system</h2>
          </div>
          <div className="ytg-pillars">
            {PILLARS.map((p, i) => (
              <Reveal className="ytg-pillar" key={p.k} delay={(i % 2) * 0.08}>
                <div className="ytg-pillar__media">
                  <img src={p.img} alt={p.title} loading="lazy" />
                  <span className="ytg-pillar__k">{p.k}</span>
                </div>
                <div className="ytg-pillar__body">
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="section">
        <div className="container">
          <Reveal className="card" style={{ padding: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
            <span className="eyebrow">What you get</span>
            <ul className="svc-deliverables svc-deliverables--grid" style={{ marginTop: '1.4rem' }}>
              {FEATURES.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* How we run it */}
      <section className="section section--smoke2">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The Engagement</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>How we run YouTube Growth</h2>
          </div>
          <div className="svc-playbook">
            {STEPS.map(([title, desc], i) => (
              <Reveal className="svc-step" key={title} delay={(i % 4) * 0.07}>
                <span className="svc-step__num">{String(i + 1).padStart(2, '0')}</span>
                <h4>{title}</h4>
                <p>{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case-study callout */}
      <section className="section">
        <div className="container">
          <Reveal className="ytg-case">
            <div className="ytg-case__media">
              <img src={U('photo-1605810230434-7631ac76ec81', 1100)} alt="Creator on the growth system" loading="lazy" />
            </div>
            <div className="ytg-case__body">
              <span className="eyebrow">Case Study · Finance</span>
              <h3>18K → 410K subscribers in 9 months</h3>
              <p className="text-soft">
                We rebuilt the channel around three repeatable formats, tested every thumbnail as a
                pair with its title, and re-cut openings for retention. Watch-time climbed +340% and
                the channel CTR moved from 4.1% to 6.0% — turning attention into a real business.
              </p>
              <Button to="/case-studies" variant="ghost" arrow>Read the case studies</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--smoke2">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Questions</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>YouTube Growth, answered</h2>
          </div>
          <div className="svc-faq">
            {FAQS.map((f, i) => (
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
