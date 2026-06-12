import SectionHead from '../ui/SectionHead.jsx'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'
import { useSite } from '../../context/SiteContext.jsx'

// A small "×" mark between a creator avatar and a brand wordmark.
const CrossMark = () => (
  <svg className="collab-card__x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
)

// Creator × brand proof, pulled onto the home page as social proof.
export default function CollaborationsSection() {
  const { collaborations } = useSite()
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow="Creator × Brand"
          title={<>Partnerships that move <span className="gold-fill italic-serif">real numbers.</span></>}
          text="Every collaboration is briefed, produced and measured by the same studio — so the brand and the creator both win."
        />
        <div className="collab-grid">
          {collaborations.slice(0, 6).map((c, i) => (
            <Reveal key={c.id} className={`collab-card accent-${c.accent}`} delay={(i % 3) * 0.07}>
              <div className="collab-card__pair">
                <span className="collab-card__creator">
                  <img src={c.creatorImg} alt={c.creator} loading="lazy" />
                </span>
                <CrossMark />
                <span className="collab-card__brand">{c.brand}</span>
              </div>
              <div className="collab-card__meta">
                <span className="collab-card__tag">{c.category}</span>
                <span className="collab-card__creator-name">{c.creator}</span>
              </div>
              <div className="collab-card__result">{c.result}</div>
            </Reveal>
          ))}
        </div>
        <div className="collab-cta">
          <Button to="/collaborations" arrow>See all collaborations</Button>
        </div>
      </div>
    </section>
  )
}
