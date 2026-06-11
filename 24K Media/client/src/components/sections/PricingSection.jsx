import SectionHead from '../ui/SectionHead.jsx'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'
import { useSite } from '../../context/SiteContext.jsx'

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
)

// Pricing tiers — used on the home page and the /pricing page.
export default function PricingSection({ withHead = true }) {
  const { pricing } = useSite()
  return (
    <section className="section" id="pricing">
      <div className="container">
        {withHead && (
          <SectionHead
            eyebrow="Pricing"
            title={<>Simple plans, <span className="gold-fill italic-serif">serious growth.</span></>}
            text="Transparent monthly engagements. Month-to-month after the first 90-day sprint."
          />
        )}
        <div className="pricing">
          {pricing.map((p, i) => (
            <Reveal key={p.id} className={`card price-card ${p.featured ? 'is-featured' : ''}`} delay={i * 0.08}>
              <span className="card-gold-line" />
              {p.featured && <span className="price-card__badge">Most popular</span>}
              <h3 className="price-card__name">{p.name}</h3>
              <p className="price-card__tag">{p.tagline}</p>
              <div className="price-card__price">
                {p.price}
                {p.period && <span>{p.period}</span>}
              </div>
              <ul className="price-card__features">
                {p.features.map((f) => (
                  <li key={f}><span className="price-card__check"><Check /></span>{f}</li>
                ))}
              </ul>
              <Button
                to="/contact"
                variant={p.featured ? 'gold' : 'ghost'}
                arrow
                magnetic={false}
                className="price-card__cta"
              >
                {p.cta}
              </Button>
            </Reveal>
          ))}
        </div>
        <p className="pricing__note">
          Every plan includes a dedicated strategist, monthly reporting and full ownership of every asset.
        </p>
      </div>
    </section>
  )
}
