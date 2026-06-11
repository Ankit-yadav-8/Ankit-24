import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import SectionHead from '../ui/SectionHead.jsx'
import Button from '../ui/Button.jsx'
import { useSite } from '../../context/SiteContext.jsx'

// Pseudo "after vs before" bar — second value drives a fuller bar for visual delta.
function MetricBar({ m, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const fill = 40 + ((index * 17) % 55) // deterministic, lively
  return (
    <div className="metric" ref={ref}>
      <span className="metric__label">{m.label}</span>
      <span className="metric__delta">{m.delta}</span>
      <div className="metric__track">
        <motion.div
          className="metric__bar"
          initial={{ width: 0 }}
          animate={inView ? { width: `${fill}%` } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
      </div>
      <div className="metric__vals">
        <span>Before · {m.before}</span>
        <span>After · {m.after}</span>
      </div>
    </div>
  )
}

export default function Results() {
  const { caseStudies } = useSite()
  const featured = caseStudies.slice(0, 2)

  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow="Results, Not Promises"
          title={<>Outcomes you can <span className="gold-fill italic-serif">take to the bank.</span></>}
          text="Live, dashboard-style snapshots of what the system does — before versus after, with the deltas that matter."
        />
        <div className="grid grid-2">
          {featured.map((cs) => (
            <Link to={`/case-studies/${cs.slug}`} key={cs.slug} className="card result-card" data-cursor="hover">
              <span className="card-gold-line" />
              <div className="result-card__head">
                <div>
                  <div className="result-card__client">{cs.category} · {cs.client}</div>
                  <h3 className="result-card__headline">{cs.headline}</h3>
                </div>
              </div>
              <div className="metric-row">
                {cs.metrics.slice(0, 3).map((m, i) => (
                  <MetricBar m={m} index={i} key={m.label} />
                ))}
              </div>
              <p className="result-card__quote">“{cs.testimonial.quote}”</p>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: '2.6rem', display: 'flex', justifyContent: 'center' }}>
          <Button to="/case-studies" variant="ghost" arrow>All case studies</Button>
        </div>
      </div>
    </section>
  )
}
