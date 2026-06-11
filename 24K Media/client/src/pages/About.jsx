import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import ProcessSection from '../components/sections/ProcessSection.jsx'
import CTABand from '../components/sections/CTABand.jsx'
import { useSite } from '../context/SiteContext.jsx'

const values = [
  { t: 'Premium by default', d: 'Considered, never cheap. Every pixel earns its place.' },
  { t: 'Empire energy', d: 'We think in ecosystems, not one-off deliverables.' },
  { t: 'Proof over claims', d: 'Numbers, case studies and process — not superlatives.' },
  { t: 'Creator-first', d: 'We speak the language of attention, formats and distribution.' },
]

export default function About() {
  const { founder } = useSite()
  return (
    <>
      <PageHeader
        eyebrow="About 24K Media"
        title={<>Not freelancers. A media <span className="gold-fill italic-serif">empire in the making.</span></>}
        text={founder.bio}
        crumbs={[{ label: 'About' }]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="founder__wrap">
            <Reveal>
              <div className="founder__portrait"><span className="mono">24K</span></div>
              <div className="founder__mission">
                <span>The Mission</span>
                <p>{founder.mission}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="eyebrow">The Journey</span>
              <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', margin: '16px 0 2rem' }}>From IIT Roorkee to 24K Media.</h2>
              <div className="timeline">
                {founder.timeline.map((t, i) => (
                  <div className={`tl-item ${i === founder.timeline.length - 1 ? 'active' : ''}`} key={t.year}>
                    <div className="tl-year">{t.year}</div>
                    <div className="tl-title">{t.title}</div>
                    <p className="tl-desc">{t.description}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--smoke2">
        <div className="container">
          <div className="section-head"><span className="eyebrow">What we believe</span><h2 style={{ marginTop: 16, fontSize: 'clamp(1.9rem,4.4vw,3rem)' }}>The principles behind the craft.</h2></div>
          <div className="grid grid-2">
            {values.map((v, i) => (
              <Reveal key={v.t} className="card" delay={(i % 2) * 0.08} style={{ padding: '2rem' }}>
                <span className="card-gold-line" />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 500 }}>{v.t}</h3>
                <p className="text-soft" style={{ marginTop: '0.6rem' }}>{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />
      <CTABand />
    </>
  )
}
