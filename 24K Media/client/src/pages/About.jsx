import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader.jsx'
import Seo from '../components/Seo.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHead from '../components/ui/SectionHead.jsx'
import ProcessSection from '../components/sections/ProcessSection.jsx'
import StorySection from '../components/sections/StorySection.jsx'
import CTABand from '../components/sections/CTABand.jsx'
import { useSite } from '../context/SiteContext.jsx'

const values = [
  { t: 'Premium by default', d: 'Considered, never cheap. Every pixel earns its place.', accent: 'purple' },
  { t: 'Empire energy', d: 'We think in ecosystems, not one-off deliverables.', accent: 'blue' },
  { t: 'Proof over claims', d: 'Numbers, case studies and process — not superlatives.', accent: 'orange' },
  { t: 'Creator-first', d: 'We speak the language of attention, formats and distribution.', accent: 'green' },
]

export default function About() {
  const { founder, stats } = useSite()
  return (
    <>
      <Seo
        title="About 24K Media"
        description="24K Media is a premium creator-growth studio — premium by default, proof over claims, creator-first. Meet the team building durable internet brands."
      />
      <PageHeader
        eyebrow="About 24K Media"
        title={<>Not freelancers. A media <span className="gold-fill italic-serif">empire in the making.</span></>}
        text={founder.bio}
        crumbs={[{ label: 'About' }]}
      />

      {/* Studio at a glance */}
      <section className="section section--tight">
        <div className="container">
          <div className="about-stats">
            {stats.map((s, i) => (
              <Reveal key={s.id} className="about-stat" delay={(i % 4) * 0.06}>
                <span className="about-stat__value">{s.prefix}{s.value}{s.suffix}</span>
                <span className="about-stat__label">{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder + journey */}
      <section className="section section--smoke2">
        <div className="container">
          <div className="founder__wrap">
            <Reveal>
              <div className="founder__portrait">
                {founder.image && <img src={founder.image} alt="24K Media studio" loading="lazy" />}
                <span className="mono">24K</span>
              </div>
              <div className="founder__mission">
                <span>The Mission</span>
                <p>{founder.mission}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="founder__journey">
              <span className="eyebrow">The Team</span>
              <h2 className="founder__journey-title">Built by operators, <span className="gold-fill italic-serif">run as a team.</span></h2>
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

      {/* Our Story — origin narrative + animated timeline */}
      <StorySection />

      {/* Principles */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="What we believe"
            title={<>The principles behind the <span className="gold-fill italic-serif">craft.</span></>}
            text="Four convictions that decide how we work, what we ship and the brands we choose to build."
          />
          <div className="values-grid">
            {values.map((v, i) => (
              <Reveal key={v.t} className={`value-card accent-${v.accent}`} delay={(i % 2) * 0.08}>
                <span className="value-card__bar" />
                <span className="value-card__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="value-card__title">{v.t}</h3>
                <p className="value-card__desc">{v.d}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="about-links" delay={0.1}>
            <Link to="/team" className="about-link accent-purple">
              <span className="about-link__k">Meet the team</span>
              <span className="about-link__v">The people behind the studio →</span>
            </Link>
            <Link to="/process" className="about-link accent-blue">
              <span className="about-link__k">Our process</span>
              <span className="about-link__v">Discovery to growth, step by step →</span>
            </Link>
            <Link to="/collaborations" className="about-link accent-orange">
              <span className="about-link__k">Collaborations</span>
              <span className="about-link__v">Creator × brand campaigns →</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <ProcessSection />
      <CTABand />
    </>
  )
}
