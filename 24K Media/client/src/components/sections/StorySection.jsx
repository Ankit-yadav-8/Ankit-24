import { motion } from 'framer-motion'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'
import { useSite } from '../../context/SiteContext.jsx'

const ease = [0.22, 1, 0.36, 1]

// "Our Story" — company origin narrative (left) + animated timeline card (right).
export default function StorySection() {
  const { story } = useSite()
  if (!story) return null

  return (
    <section className="section story">
      <div className="container">
        <div className="story__wrap">
          {/* LEFT — narrative */}
          <Reveal className="story__intro">
            <span className="eyebrow">Our Story</span>
            <h2 className="story__title display">
              It started in <span className="gold-fill italic-serif">May 2026.</span>
            </h2>
            <p className="story__lede">{story.intro}</p>

            <div className="story__highlight">
              <span className="story__highlight-bar" />
              <p>{story.highlight}</p>
            </div>

            <div className="story__meta">
              <div className="story__meta-item">
                <span className="story__meta-num gold-fill">{story.founded}</span>
                <span className="story__meta-label">Founded</span>
              </div>
              <div className="story__meta-item">
                <span className="story__meta-num gold-fill">Day&nbsp;One</span>
                <span className="story__meta-label">Energy, every day</span>
              </div>
            </div>

            <Button to="/about" variant="ghost" arrow>Read the full story</Button>
          </Reveal>

          {/* RIGHT — story card with animated timeline */}
          <Reveal delay={0.12} className="card story-card">
            <div className="card-gold-line" />
            <div className="story-card__head">
              <span className="story-card__badge">The 24K Journey</span>
              <span className="story-card__since">Since {story.founded}</span>
            </div>

            <div className="story-tl">
              <motion.span
                className="story-tl__line"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.1, ease }}
              />
              {story.milestones.map((m, i) => (
                <motion.div
                  className={`story-tl__item ${m.current ? 'is-current' : ''}`}
                  key={m.title}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, delay: 0.15 + i * 0.12, ease }}
                >
                  <span className="story-tl__dot" />
                  <div className="story-tl__date">
                    {m.date}
                    {m.current && <em> · Now</em>}
                  </div>
                  <h4 className="story-tl__title">{m.title}</h4>
                  <p className="story-tl__desc">{m.description}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
