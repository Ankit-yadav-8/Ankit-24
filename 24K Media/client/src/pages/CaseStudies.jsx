import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import CTABand from '../components/sections/CTABand.jsx'
import { useSite } from '../context/SiteContext.jsx'

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
)

export default function CaseStudies() {
  const { caseStudies } = useSite()
  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title={<>Outcomes with <span className="gold-fill italic-serif">real metrics.</span></>}
        text="Interactive, dashboard-style breakdowns of how the system performed — before versus after."
        crumbs={[{ label: 'Case Studies' }]}
      />
      <section className="section section--tight">
        <div className="container" style={{ display: 'grid', gap: '24px' }}>
          {caseStudies.map((cs, idx) => (
            <Reveal key={cs.slug} delay={(idx % 2) * 0.06}>
              <Link to={`/case-studies/${cs.slug}`} className="card" data-cursor="hover" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'clamp(24px,4vw,56px)', padding: 'clamp(1.8rem,3vw,2.6rem)', alignItems: 'center' }}>
                <span className="card-gold-line" />
                <div>
                  <span className="tag tag--gold">{cs.category}</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,3.4vw,2.3rem)', fontWeight: 500, margin: '1rem 0 0.6rem' }}>{cs.headline}</h3>
                  <p className="text-soft">{cs.summary}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.2rem' }}>
                    {cs.services.map((s) => <span className="tag" key={s}>{s}</span>)}
                  </div>
                  <span className="link-arrow" style={{ marginTop: '1.4rem' }}>Read the breakdown <Arrow /></span>
                </div>
                <div className="cs-dashboard" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  {cs.metrics.slice(0, 2).map((m) => (
                    <div className="cs-metric" key={m.label} style={{ background: 'var(--smoke-2)' }}>
                      <div className="cs-metric__label">{m.label}</div>
                      <div className="cs-metric__nums">
                        <span className="cs-metric__after">{m.after}</span>
                      </div>
                      <div className="cs-metric__delta">▲ {m.delta}</div>
                    </div>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CTABand />
    </>
  )
}
