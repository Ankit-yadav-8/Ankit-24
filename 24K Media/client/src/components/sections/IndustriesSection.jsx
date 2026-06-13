import SectionHead from '../ui/SectionHead.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useSite } from '../../context/SiteContext.jsx'

// "Who we serve" — the segments 24K builds internet brands for.
export default function IndustriesSection() {
  const { industries } = useSite()
  return (
    <section className="section">
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
              <div className="industry__media">
                <img src={it.image} alt="" loading="lazy" />
                <span className="industry__ico">{it.icon}</span>
              </div>
              <div className="industry__body">
                <h3 className="industry__title">{it.title}</h3>
                <p className="industry__desc">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
