import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '../components/ui/PageHeader.jsx'
import Seo from '../components/Seo.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'
import Counter from '../components/ui/Counter.jsx'
import ServiceCard from '../components/ui/ServiceCard.jsx'
import TrendChart from '../components/ui/TrendChart.jsx'
import PieChart from '../components/ui/PieChart.jsx'
import CTABand from '../components/sections/CTABand.jsx'
import { useSite } from '../context/SiteContext.jsx'

// Unsplash helper — same pattern used across content.js.
const U = (id, w = 1100) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const ACCENT = '#4928fd' // electric violet — the site's primary accent
const ACCENT_2 = '#7c5cff'
const ease = [0.22, 1, 0.36, 1]

// Modelled avg-views index across 10 months on the system (month 1 = 100).
const VIEW_INDEX = [100, 108, 117, 128, 141, 157, 175, 195, 216, 231]
const INDEX_LABELS = VIEW_INDEX.map((_, i) => `Month ${i + 1}`)
const indexGrowth = VIEW_INDEX[VIEW_INDEX.length - 1] - VIEW_INDEX[0]

// Audience-retention curve — % of viewers still watching across video length.
const RETENTION = [100, 86, 78, 73, 70, 68, 66, 65, 64, 63]
const RET_LABELS = RETENTION.map((_, i) => `${i * 10 + 10}%`)

// Monthly views (millions) — the compounding output the system produces.
const VIEWS = [
  { label: 'M1', value: 2.1 }, { label: 'M2', value: 3.4 }, { label: 'M3', value: 5.6 },
  { label: 'M4', value: 8.9 }, { label: 'M5', value: 13.2 }, { label: 'M6', value: 19.7 },
  { label: 'M7', value: 27.4 }, { label: 'M8', value: 36.5 },
]
const viewsMax = Math.max(...VIEWS.map((v) => v.value))

// Where the lift shows up — kept on our violet palette (no theme change).
const IMPACT = [
  { label: 'Reach', value: 26, color: ACCENT },
  { label: 'Retention', value: 23, color: ACCENT_2 },
  { label: 'Revenue', value: 26, color: '#a78bff' },
  { label: 'Authority', value: 25, color: '#cdbcff' },
]

const HERO_STATS = [
  { value: 11, suffix: 'x', label: 'Avg. views in 6 months' },
  { value: 340, prefix: '+', suffix: '%', label: 'Watch-time lift' },
  { value: 48, suffix: 'h', label: 'Edit turnaround' },
]

const METRICS = [
  { value: 11, suffix: 'x', label: 'Avg. views per video', sub: 'measured at 6 months' },
  { value: 340, prefix: '+', suffix: '%', label: 'Watch-time lift', sub: 'vs. baseline at start' },
  { value: 48, suffix: 'h', label: 'Edit turnaround', sub: 'delivery SLA, every video' },
  { text: '18K → 410K', label: 'Subscribers in 9 months', sub: 'finance creator case study' },
]

// Icon helper — small stroked glyphs in the accent colour.
const Ico = ({ d, children }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children || <path d={d} />}
  </svg>
)

const PILLARS = [
  {
    k: '01 — The Problem',
    title: 'Talented creators plateau',
    desc: 'Publishing is random, packaging is weak and retention is never measured. The ceiling is not talent — it is the absence of a system.',
    icon: <Ico><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></Ico>,
  },
  {
    k: '02 — Our Approach',
    title: 'Install the system',
    desc: 'A documented format system, A/B-tested packaging and retention-curve editing — built once, refined every week on real data.',
    icon: <Ico><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></Ico>,
  },
  {
    k: '03 — The Proof',
    title: '18K → 410K subscribers',
    desc: 'A finance creator grew from obscurity to authority in nine months on this exact system — keeping every subscriber, account and asset.',
    icon: <Ico><polyline points="20 6 9 17 4 12" /></Ico>,
  },
]

const FEATURES = [
  { title: 'Channel strategy & format system', desc: 'A documented playbook of series, formats and niche positioning that compounds over time.', icon: <Ico><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></Ico> },
  { title: 'Scripting & hook frameworks', desc: 'Repeatable hook structures that pull viewers past the 30-second mark, every single video.', icon: <Ico><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" /></Ico> },
  { title: 'Retention-first editing', desc: 'Every cut and pacing decision built around the retention curve, not just aesthetics.', icon: <Ico><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></Ico> },
  { title: 'Thumbnail & title A/B testing', desc: 'Systematic packaging tests that push CTR to the ceiling of your niche, month over month.', icon: <Ico><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></Ico> },
  { title: 'Analytics review & iteration', desc: 'Weekly data review on CTR, retention and watch-time — acted on, never just reported.', icon: <Ico><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></Ico> },
]

const STEPS = [
  ['Audit', 'We tear down your channel, formats and retention curve to find the real ceiling.'],
  ['System', 'A documented format + packaging system, tuned to your niche, audience and growth thesis.'],
  ['Produce', 'Retention-first editing and design, shipped on a dependable 48-hour cycle, every video.'],
  ['Iterate', 'Weekly review of CTR, retention and watch-time. We double down on what compounds.'],
]

const CASE_METRICS = [
  { value: 22, suffix: 'x', label: 'subscriber growth' },
  { prefix: '$', value: 30, suffix: 'K', label: 'monthly revenue' },
  { value: 0, label: 'viral moments needed' },
]

const FAQS = [
  { q: 'How soon does YouTube Growth show results?', a: 'Most clients see measurable lifts in retention and reach within 60–90 days, with compounding subscriber and revenue growth through months 3–6. The system is built for long-term compounding, not short-term spikes.' },
  { q: 'What exactly is included in the engagement?', a: 'Channel strategy & format system, scripting & hook frameworks, retention-first editing, thumbnail & title A/B testing, weekly analytics review, and iteration on everything that compounds — tailored to your niche and audience.' },
  { q: 'Do I keep full ownership of my channel?', a: 'Always. Every asset, channel, account and piece of content is 100% yours. We build infrastructure you own and operate — never rent. You can walk away with everything intact at any time.' },
  { q: 'Is there a minimum commitment?', a: 'We work in 90-day engagements because compounding needs runway. After the initial period it is month-to-month — we earn the renewal with documented results, never lock-in contracts.' },
]

// Animated vertical bar chart — bars grow in on scroll, lift on hover.
function BarChart({ data, max, format = (v) => v }) {
  return (
    <div className="ytg-bars" role="img" aria-label="Monthly views">
      {data.map((d, i) => (
        <div className="ytg-bar" key={d.label}>
          <span className="ytg-bar__val">{format(d.value)}</span>
          <motion.span
            className="ytg-bar__fill"
            initial={{ height: 0 }}
            whileInView={{ height: `${(d.value / max) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.06 * i, ease }}
          />
          <span className="ytg-bar__lbl">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function YoutubeGrowth() {
  const { services } = useSite()
  const [open, setOpen] = useState(0)
  const related = services.filter((s) => s.slug !== 'youtube-growth' && s.category === 'Content').slice(0, 3)
  const recos = related.length ? related : services.filter((s) => s.slug !== 'youtube-growth').slice(0, 3)

  return (
    <div className="svc-detail ytg" style={{ '--svc-accent': ACCENT }}>
      <Seo
        title="YouTube Growth Agency — Channel Strategy, Packaging & Scaling"
        description="Predictable, compounding YouTube growth from 24K Media — channel thesis, packaging, thumbnails, retention-first editing and a weekly optimisation loop."
        path="/services/youtube-growth"
      />
      <PageHeader
        eyebrow="Content Service · 01"
        title={<>YouTube <span className="gold-fill italic-serif">Growth</span></>}
        text="We build predictable, compounding YouTube growth — from channel thesis to thumbnail to the retention curve that keeps viewers watching."
        crumbs={[{ label: 'Services', to: '/services' }, { label: 'YouTube Growth' }]}
      />

      {/* HERO — pitch + visual card */}
      <section className="section section--tight">
        <div className="container">
          <div className="ytg-hero">
            <Reveal>
              <div className="svc-detail__icon">▶</div>
              <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', marginBottom: '1rem' }}>
                Turn your channel into a <span className="gold-fill italic-serif">growth engine.</span>
              </h2>
              <p className="text-soft" style={{ fontSize: '1.1rem', maxWidth: '50ch' }}>
                No guessing, no hoping for a viral moment. We install the system that makes every
                upload compound — from channel thesis to thumbnail to retention curve.
              </p>
              <div className="svc-cta-row">
                <Button to="/contact" arrow>Book Growth Call</Button>
                <Button to="/case-studies" variant="ghost">See results</Button>
              </div>
              <div className="ytg-herostats">
                {HERO_STATS.map((s) => (
                  <div key={s.label}>
                    <div className="ytg-herostats__v">
                      <Counter value={s.value} prefix={s.prefix || ''} suffix={s.suffix || ''} />
                    </div>
                    <div className="ytg-herostats__l">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="ytg-hero__media">
              <img src={U('photo-1593720213428-28a5b9e94613', 1100)} alt="Creator studio" loading="lazy" />
              <motion.div className="ytg-hero__badge ytg-hero__badge--a" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                <b>410K</b>
                <span>subscribers in 9 months</span>
              </motion.div>
              <motion.div className="ytg-hero__badge ytg-hero__badge--b" animate={{ y: [0, 10, 0] }} transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}>
                <b>6.0%</b>
                <span>channel CTR</span>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* METRICS STRIP */}
      <div className="ytg-metrics">
        <div className="container">
          <Reveal className="ytg-metrics__grid">
            {METRICS.map((m) => (
              <div className="ytg-metric" key={m.label}>
                <span className="ytg-metric__n">
                  {m.text ? m.text : <Counter value={m.value} prefix={m.prefix || ''} suffix={m.suffix || ''} />}
                </span>
                <div className="ytg-metric__l">{m.label}</div>
                <div className="ytg-metric__s">{m.sub}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      {/* GROWTH TRAJECTORY */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Typical Trajectory</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>Avg. views over 10 months</h2>
            <p>Modelled performance on the YouTube Growth system — hover each month to inspect the lift.</p>
          </div>
          <Reveal className="card svc-chart">
            <div className="svc-chart__head">
              <div className="svc-chart__intro">
                <span className="eyebrow">Views index · month 1 = 100</span>
              </div>
              <div className="svc-chart__delta"><b>+{indexGrowth}%</b><span>over 10 months</span></div>
            </div>
            <TrendChart data={VIEW_INDEX} labels={INDEX_LABELS} color={ACCENT} height={260} format={(v) => `${v} index`} />
          </Reveal>
        </div>
      </section>

      {/* IMPACT DISTRIBUTION */}
      <section className="section section--smoke2">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Impact Mix</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>Where the lift shows up</h2>
            <p>How the gains from YouTube Growth distribute across your entire funnel.</p>
          </div>
          <Reveal className="card">
            <div className="ytg-impact">
              <div className="ytg-impact__donut">
                <PieChart data={IMPACT} size={240} thickness={28} centerLabel="+131%" centerSub="blended lift" />
              </div>
              <div>
                <div className="ytg-impact__rows">
                  {IMPACT.map((d, i) => (
                    <div className="ytg-impact__row" key={d.label}>
                      <div className="ytg-impact__top">
                        <span><span className="ytg-impact__dot" style={{ background: d.color }} />{d.label}</span>
                        <b>{d.value}%</b>
                      </div>
                      <div className="ytg-impact__track">
                        <motion.span
                          className="ytg-impact__fill"
                          style={{ background: d.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${d.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: 0.1 * i, ease }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="ytg-impact__note">
                  <p>Growth compounds simultaneously — reach unlocks retention, retention drives revenue, and both build the authority that accelerates the entire flywheel.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILLARS — Problem / Approach / Proof */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The System</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>Problem. Approach. Proof.</h2>
          </div>
          <div className="ytg-pills">
            {PILLARS.map((p, i) => (
              <Reveal className="ytg-pill" key={p.k} delay={(i % 3) * 0.08}>
                <span className="ytg-pill__k">{p.k}</span>
                <span className="ytg-pill__ico">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET — feature list + image */}
      <section className="section section--smoke2">
        <div className="container">
          <div className="ytg-feat">
            <div>
              <div className="section-head" style={{ marginBottom: 28 }}>
                <span className="eyebrow">Deliverables</span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)' }}>What you get</h2>
                <p>A full stack of owned infrastructure — nothing rented, nothing locked away.</p>
              </div>
              <div className="ytg-feat__list">
                {FEATURES.map((f, i) => (
                  <Reveal className="ytg-feat__item" key={f.title} delay={(i % 3) * 0.05}>
                    <span className="ytg-feat__ico">{f.icon}</span>
                    <div>
                      <div className="ytg-feat__t">{f.title}</div>
                      <p className="ytg-feat__d">{f.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal className="ytg-feat__vis" delay={0.1}>
              <div className="ytg-feat__img">
                <img src={U('photo-1574717024653-61fd2cf4d44d', 800)} alt="Editing workspace" loading="lazy" />
              </div>
              <div className="ytg-feat__float">
                <div className="ytg-feat__float-n">48h</div>
                <div className="ytg-feat__float-l">Edit turnaround</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <div className="section-head" style={{ textAlign: 'center', margin: '0 auto clamp(40px, 5vw, 60px)' }}>
            <span className="eyebrow">The Engagement</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>How we run YouTube Growth</h2>
            <p style={{ marginInline: 'auto' }}>Four phases. Documented outcomes. No surprises.</p>
          </div>
          <div className="ytg-proc">
            {STEPS.map(([title, desc], i) => (
              <Reveal className="ytg-pstep" key={title} delay={(i % 4) * 0.08}>
                <span className="ytg-pnum">{String(i + 1).padStart(2, '0')}</span>
                <h4>{title}</h4>
                <p>{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MORE SIGNALS — extra charts */}
      <section className="section section--smoke2">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Read the whole funnel</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>More than a subscriber count</h2>
            <p>The two signals that actually move the algorithm — retention and compounding reach.</p>
          </div>
          <div className="svc-duo">
            <Reveal className="card svc-chart">
              <div className="svc-chart__head">
                <div className="svc-chart__intro">
                  <span className="eyebrow">Audience Retention</span>
                  <h3>Still watching (%)</h3>
                  <p className="text-soft">Average retention across video length after the retention-first edit.</p>
                </div>
                <div className="svc-chart__delta"><b>63%</b><span>at the finish</span></div>
              </div>
              <TrendChart data={RETENTION} labels={RET_LABELS} color={ACCENT_2} height={200} format={(v) => `${v}% watching`} />
            </Reveal>
            <Reveal className="card svc-chart" delay={0.08}>
              <div className="svc-chart__head">
                <div className="svc-chart__intro">
                  <span className="eyebrow">Monthly Views</span>
                  <h3>Reach (millions)</h3>
                  <p className="text-soft">Monthly views compounding as the system and back-catalogue work together.</p>
                </div>
                <div className="svc-chart__delta"><b>36.5M</b><span>by month 8</span></div>
              </div>
              <BarChart data={VIEWS} max={viewsMax} format={(v) => `${v}M`} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Case Study</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>The proof in practice</h2>
          </div>
          <Reveal className="card ytg-case2">
            <div className="ytg-case2__nums">
              <div><div className="ytg-case2__big ytg-case2__big--dim">18K</div><div className="ytg-case2__lbl">Start</div></div>
              <div className="ytg-case2__arr"><span>→</span><small>9 months</small></div>
              <div><div className="ytg-case2__big">410K</div><div className="ytg-case2__lbl">Subscribers</div></div>
            </div>
            <div className="ytg-case2__body">
              <span className="eyebrow">Finance Creator · 9-Month Sprint</span>
              <h3>From unknown to channel authority in under a year</h3>
              <p className="text-soft">
                Using the complete YouTube Growth stack — format system, retention editing, systematic
                packaging and weekly iteration — this finance creator 22x'd their subscriber count and
                built a ₹30L/month revenue engine. No viral moments required.
              </p>
              <div className="ytg-case2__row">
                {CASE_METRICS.map((m) => (
                  <div key={m.label}>
                    <div className="ytg-case2__rn">
                      <Counter value={m.value} prefix={m.prefix || ''} suffix={m.suffix || ''} />
                    </div>
                    <div className="ytg-case2__rl">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="section section--smoke2">
        <div className="container">
          <div className="section-head" style={{ maxWidth: 760, marginInline: 'auto', textAlign: 'center' }}>
            <span className="eyebrow">FAQ</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>Questions, answered</h2>
          </div>
          <div className="ytg-acc">
            {FAQS.map((f, i) => {
              const isOpen = open === i
              return (
                <Reveal className={`ytg-acc__item ${isOpen ? 'is-open' : ''}`} key={f.q} delay={(i % 3) * 0.05}>
                  <button className="ytg-acc__q" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                    <span>{f.q}</span>
                    <span className="ytg-acc__icon" aria-hidden>{isOpen ? '–' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div className="ytg-acc__a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.34, ease }}>
                        <p>{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="section">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Related</span><h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>Services that compound together</h2></div>
          <div className="grid grid-3">
            {recos.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  )
}
