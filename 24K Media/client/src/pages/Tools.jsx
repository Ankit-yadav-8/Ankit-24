import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'
import CTABand from '../components/sections/CTABand.jsx'
import { useSite } from '../context/SiteContext.jsx'

const inr = (n) => (isFinite(n) ? '₹' + Math.round(n).toLocaleString('en-IN') : '₹0')

function RevenueEstimator({ niches }) {
  const [views, setViews] = useState(500000)
  const [nicheId, setNicheId] = useState(niches[0].id)
  const niche = niches.find((n) => n.id === nicheId) || niches[0]
  const ad = (views / 1000) * niche.rpm
  const sponsor = ad * 1.4
  const total = ad + sponsor

  return (
    <div className="card tool-panel">
      <span className="card-gold-line" />
      <div className="tool-panel__head">
        <span className="tool-card__ico">◍</span>
        <h3>Creator Revenue Estimator</h3>
      </div>
      <p className="tool-panel__sub">A rough monthly estimate from ad RPM plus typical sponsorship value. Real numbers vary by audience and deals.</p>

      <div className="tool-field">
        <label>Monthly views</label>
        <input type="range" min="10000" max="10000000" step="10000" value={views} onChange={(e) => setViews(+e.target.value)} />
        <div className="tool-field__val">{Number(views).toLocaleString('en-IN')} views / month</div>
      </div>

      <div className="tool-field">
        <label>Niche (sets RPM)</label>
        <div className="tool-chips">
          {niches.map((n) => (
            <button key={n.id} className={`tool-chip ${n.id === nicheId ? 'is-active' : ''}`} onClick={() => setNicheId(n.id)}>
              {n.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tool-result">
        <div><span>Ad revenue (RPM ₹{niche.rpm})</span><b>{inr(ad)}</b></div>
        <div><span>Est. sponsorships</span><b>{inr(sponsor)}</b></div>
        <div className="tool-result__total"><span>Est. monthly total</span><b className="gold-fill">{inr(total)}</b></div>
      </div>
    </div>
  )
}

function EngagementCalculator() {
  const [followers, setFollowers] = useState(50000)
  const [likes, setLikes] = useState(2400)
  const [comments, setComments] = useState(180)
  const er = followers > 0 ? ((likes + comments) / followers) * 100 : 0
  const rating = er >= 6 ? 'Elite' : er >= 3 ? 'Strong' : er >= 1 ? 'Healthy' : 'Needs work'

  return (
    <div className="card tool-panel">
      <span className="card-gold-line" />
      <div className="tool-panel__head">
        <span className="tool-card__ico">◐</span>
        <h3>Engagement Rate Calculator</h3>
      </div>
      <p className="tool-panel__sub">Engagement rate = (likes + comments) ÷ followers × 100. Benchmark your real reach, not vanity counts.</p>

      <div className="tool-grid2">
        <div className="tool-field"><label>Followers</label><input type="number" min="0" value={followers} onChange={(e) => setFollowers(+e.target.value || 0)} /></div>
        <div className="tool-field"><label>Avg. likes</label><input type="number" min="0" value={likes} onChange={(e) => setLikes(+e.target.value || 0)} /></div>
        <div className="tool-field"><label>Avg. comments</label><input type="number" min="0" value={comments} onChange={(e) => setComments(+e.target.value || 0)} /></div>
      </div>

      <div className="tool-result">
        <div className="tool-result__total"><span>Engagement rate</span><b className="gold-fill">{er.toFixed(2)}%</b></div>
        <div><span>Verdict</span><b>{rating}</b></div>
      </div>
    </div>
  )
}

export default function Tools() {
  const { tools, nicheRPM } = useSite()
  const moreTools = tools.filter((t) => t.kind !== 'calc')

  return (
    <>
      <PageHeader
        eyebrow="Free Tools"
        title={<>Tools that make you <span className="gold-fill italic-serif">grow faster.</span></>}
        text="Free calculators, templates and teardowns we use inside the studio — no email wall, no catch."
        crumbs={[{ label: 'Tools' }]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="tools-panels">
            <Reveal><RevenueEstimator niches={nicheRPM} /></Reveal>
            <Reveal delay={0.1}><EngagementCalculator /></Reveal>
          </div>
        </div>
      </section>

      <section className="section section--smoke2">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">More tools</span>
            <h2 style={{ marginTop: 16, fontSize: 'clamp(1.9rem,4.4vw,3rem)' }}>Templates & teardowns.</h2>
          </div>
          <div className="tools-grid">
            {moreTools.map((t, i) => (
              <Reveal key={t.id} className="card tool-card" delay={(i % 3) * 0.07}>
                <span className="card-gold-line" />
                <div className="tool-card__top">
                  <span className="tool-card__ico">{t.icon}</span>
                  <span className={`tag ${t.tag === 'Live' ? 'tag--gold' : ''}`}>{t.tag}</span>
                </div>
                <h3 className="tool-card__title">{t.title}</h3>
                <p className="tool-card__desc">{t.desc}</p>
                <Button to="/contact" variant="ghost" size="sm" arrow magnetic={false}>
                  {t.kind === 'cta' ? 'Book audit' : 'Get it free'}
                </Button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
