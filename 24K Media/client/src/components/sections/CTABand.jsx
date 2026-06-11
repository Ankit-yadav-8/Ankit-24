import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'
import { useSite } from '../../context/SiteContext.jsx'

export default function CTABand() {
  const { company } = useSite()
  return (
    <section className="section section--ink cta-band">
      <div className="glow glow--gold cta-band__glow" />
      <div className="container">
        <div className="cta-band__inner">
          <Reveal as="span" className="eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>
            Book Growth Call
          </Reveal>
          <Reveal as="h2" delay={0.06} style={{ marginTop: 18 }}>
            Ready to build a brand people <span className="gold-fill italic-serif">can’t ignore?</span>
          </Reveal>
          <Reveal as="p" delay={0.12}>
            One conversation to map your growth. No pitch deck — just a clear plan for the next 90 days.
          </Reveal>
          <Reveal className="cta-band__ctas" delay={0.18}>
            <Button to="/contact" size="lg" arrow>Book Growth Call</Button>
            <Button href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}`} variant="ghost" size="lg">
              Chat on WhatsApp
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
