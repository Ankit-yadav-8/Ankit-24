import Reveal from '../ui/Reveal.jsx'
import { useSite } from '../../context/SiteContext.jsx'

// "We merge [Fresh Ideas] [Proven Systems] [Smart Execution] …" — inline pastel
// pill highlights, CreatorTube style. Centered, high-contrast, black type.
export default function MergeBand() {
  const { mergePillars } = useSite()
  return (
    <section className="section section--tight mergeband">
      <div className="container">
        <Reveal as="h2" className="mergeband__head">
          We merge{' '}
          {mergePillars.map((p, i) => (
            <span className={`pill-hl accent-${p.accent}`} key={p.id}>
              <span className="pill-hl__ico">{p.icon}</span>
              {p.label}
            </span>
          ))}{' '}
          to create content that engages your audience, grows your subscriber base &amp; frees up your time.
        </Reveal>
      </div>
    </section>
  )
}
