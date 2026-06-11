import { useParams } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'
import CTABand from '../components/sections/CTABand.jsx'
import NotFound from './NotFound.jsx'
import { useSite } from '../context/SiteContext.jsx'

function MetricCard({ m, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const fill = 55 + ((i * 13) % 40)
  return (
    <motion.div
      ref={ref}
      className="cs-metric"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="cs-metric__label">{m.label}</div>
      <div className="cs-metric__nums">
        <span className="cs-metric__after">{m.after}</span>
        <span className="cs-metric__before">{m.before}</span>
      </div>
      <div className="metric__track" style={{ marginTop: '1rem' }}>
        <motion.div className="metric__bar" initial={{ width: 0 }} animate={inView ? { width: `${fill}%` } : {}} transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} />
      </div>
      <div className="cs-metric__delta">▲ {m.delta}</div>
    </motion.div>
  )
}

export default function CaseStudyDetail() {
  const { slug } = useParams()
  const { caseStudies } = useSite()
  const cs = caseStudies.find((c) => c.slug === slug)
  if (!cs) return <NotFound />

  return (
    <>
      <PageHeader
        eyebrow={`${cs.category} · Case Study`}
        title={cs.headline}
        text={cs.summary}
        crumbs={[{ label: 'Case Studies', to: '/case-studies' }, { label: cs.client }]}
      />

      <section className="section section--tight">
        <div className="container">
          <Reveal as="span" className="eyebrow">The Numbers</Reveal>
          <Reveal as="h2" delay={0.06} style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', margin: '14px 0 2rem' }}>
            Before vs after — the live dashboard.
          </Reveal>
          <div className="cs-dashboard">
            {cs.metrics.map((m, i) => <MetricCard key={m.label} m={m} i={i} />)}
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container" style={{ maxWidth: 820, textAlign: 'center' }}>
          <Reveal as="div" className="testi-card__stars" style={{ justifyContent: 'center', color: 'var(--gold-bright)', marginBottom: '1.4rem' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" /></svg>
            ))}
          </Reveal>
          <Reveal as="p" delay={0.05} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,3.6vw,2.4rem)', fontWeight: 400, lineHeight: 1.35 }}>
            “{cs.testimonial.quote}”
          </Reveal>
          <Reveal as="div" delay={0.1} style={{ marginTop: '1.6rem', color: 'var(--gold-2)', fontWeight: 600 }}>
            {cs.testimonial.name} · {cs.testimonial.role}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal as="div" style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {cs.services.map((s) => <span className="tag tag--gold" key={s}>{s}</span>)}
          </Reveal>
          <Button to="/contact" size="lg" arrow>Get results like these</Button>
        </div>
      </section>

      <CTABand />
    </>
  )
}
