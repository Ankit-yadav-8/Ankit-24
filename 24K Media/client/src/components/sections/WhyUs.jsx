import SectionHead from '../ui/SectionHead.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useSite } from '../../context/SiteContext.jsx'

export default function WhyUs() {
  const { whyPillars } = useSite()
  return (
    <section className="section section--ink" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="glow glow--gold" style={{ width: 480, height: 480, top: -160, left: -120, opacity: 0.5 }} />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHead
          eyebrow="Why 24K Media"
          title={<>Why fast-growing brands <span className="gold-fill italic-serif">choose us.</span></>}
          text="Not freelancers. A media operation built to make your growth predictable."
        />
        <div className="grid grid-3">
          {whyPillars.map((p, i) => (
            <Reveal key={p.id} className="card pillar" delay={(i % 3) * 0.08}>
              <span className="card-gold-line" />
              <div className="pillar__num">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="pillar__title">{p.title}</h3>
              <p className="pillar__desc">{p.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
