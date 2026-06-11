import { Link } from 'react-router-dom'
import SectionHead from '../ui/SectionHead.jsx'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'
import { useSite } from '../../context/SiteContext.jsx'

// Teaser grid of free tools — links through to the /tools page.
export default function ToolsSection() {
  const { tools } = useSite()
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow="Free Tools"
          title={<>Free tools to <span className="gold-fill italic-serif">grow faster.</span></>}
          text="Calculators, templates and teardowns we built for creators — no email wall."
        />
        <div className="tools-grid">
          {tools.map((t, i) => (
            <Reveal key={t.id} className="card tool-card" delay={(i % 3) * 0.07}>
              <span className="card-gold-line" />
              <div className="tool-card__top">
                <span className="tool-card__ico">{t.icon}</span>
                <span className={`tag ${t.tag === 'Live' ? 'tag--gold' : ''}`}>{t.tag}</span>
              </div>
              <h3 className="tool-card__title">{t.title}</h3>
              <p className="tool-card__desc">{t.desc}</p>
              <Link className="link-arrow" to="/tools">Open tool →</Link>
            </Reveal>
          ))}
        </div>
        <div style={{ marginTop: '2.6rem', display: 'flex', justifyContent: 'center' }}>
          <Button to="/tools" arrow>Explore all tools</Button>
        </div>
      </div>
    </section>
  )
}
