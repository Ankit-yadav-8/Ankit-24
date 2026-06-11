import SectionHead from '../ui/SectionHead.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useSite } from '../../context/SiteContext.jsx'

// "Who we serve" — the segments 24K builds internet brands for.
export default function IndustriesSection() {
  const { industries } = useSite()
  return (
    <section className="section">
      <div className="glow glow--gold" style={{ width: 420, height: 420, top: '8%', left: '-160px', opacity: 0.4 }} />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHead
          eyebrow="Who We Serve"
          title={<>Built for the people <span className="gold-fill italic-serif">building in public.</span></>}
          text="From solo creators to funded startups — one media engine, adapted natively to your world."
        />
        <div className="industries">
          {industries.map((it, i) => (
            <Reveal key={it.id} className="card industry" delay={(i % 3) * 0.08}>
              <span className="card-gold-line" />
              <span className="industry__ico">{it.icon}</span>
              <h3 className="industry__title">{it.title}</h3>
              <p className="industry__desc">{it.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
