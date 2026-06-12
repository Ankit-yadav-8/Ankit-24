import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHead from '../components/ui/SectionHead.jsx'
import Button from '../components/ui/Button.jsx'
import CTABand from '../components/sections/CTABand.jsx'
import { useSite } from '../context/SiteContext.jsx'

// A small "×" mark between a creator avatar and a brand wordmark.
const CrossMark = () => (
  <svg className="collab-card__x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
)

export default function Collaborations() {
  const { brandImpact, collaborations } = useSite()
  return (
    <>
      <PageHeader
        eyebrow="Brand Collaborations"
        title={<>Influencer marketing that <span className="gold-fill italic-serif">impacts.</span></>}
        text="We pair the right creators with the right brands and engineer campaigns to revenue — not vanity. Here’s the kind of impact those partnerships create."
        crumbs={[{ label: 'Collaborations' }]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="impact-grid">
            {brandImpact.map((s, i) => (
              <Reveal key={s.id} className={`impact-card accent-${s.accent}`} delay={(i % 2) * 0.08}>
                <span className="impact-card__bar" />
                {s.icon && <span className="impact-card__ico">{s.icon}</span>}
                <div className="impact-card__value">{s.value}</div>
                <h3 className="impact-card__title">{s.title}</h3>
                <p className="impact-card__desc">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Creator × Brand"
            title={<>Partnerships that move <span className="gold-fill italic-serif">real numbers.</span></>}
            text="Every collaboration is briefed, produced and measured by the same studio — so the brand and the creator both win."
          />
          <div className="collab-grid">
            {collaborations.map((c, i) => (
              <Reveal key={c.id} className={`collab-card accent-${c.accent}`} delay={(i % 2) * 0.07}>
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
            <Button to="/contact" arrow>Start a collaboration</Button>
            <Button to="/case-studies" variant="ghost" arrow>See full case studies</Button>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
