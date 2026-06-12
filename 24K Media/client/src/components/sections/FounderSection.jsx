import SectionHead from '../ui/SectionHead.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useSite } from '../../context/SiteContext.jsx'

export default function FounderSection() {
  const { founder } = useSite()
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow="The Team"
          title={<>Built by operators, <span className="gold-fill italic-serif">run as a team.</span></>}
        />
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

          <Reveal delay={0.1}>
            <p className="text-soft" style={{ fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '52ch' }}>
              {founder.bio}
            </p>
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
  )
}
