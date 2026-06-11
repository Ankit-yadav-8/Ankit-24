import { useRef } from 'react'
import { motion } from 'framer-motion'
import SectionHead from '../ui/SectionHead.jsx'
import { useSite } from '../../context/SiteContext.jsx'

const Star = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" /></svg>
)

export default function Testimonials() {
  const { testimonials } = useSite()
  const trackRef = useRef(null)

  return (
    <section className="section section--smoke2">
      <div className="container">
        <SectionHead
          eyebrow="Testimonials"
          title={<>Words from the <span className="gold-fill italic-serif">decision point.</span></>}
          text="Drag to explore — what founders and creators say after the growth compounds."
        />
      </div>

      <div className="container">
        <div className="testi__viewport">
          <motion.div
            className="testi__track"
            ref={trackRef}
            drag="x"
            dragConstraints={{ left: -((testimonials.length - 1) * 360), right: 0 }}
            dragElastic={0.08}
          >
            {testimonials.map((t) => (
              <article className="card testi-card" key={t.id}>
                <div className="testi-card__stars">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} />)}
                </div>
                <p className="testi-card__quote">“{t.quote}”</p>
                <div className="testi-card__who">
                  <div className="testi-card__avatar"><img src={t.avatar} alt={t.name} loading="lazy" /></div>
                  <div>
                    <div className="testi-card__name">{t.name}</div>
                    <div className="testi-card__role">{t.role} · {t.company}</div>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
