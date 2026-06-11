import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Button from '../ui/Button.jsx'
import { useSite } from '../../context/SiteContext.jsx'

const PARTICLES = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  size: 3 + (i % 4),
  top: (i * 67) % 100,
  left: (i * 41) % 100,
  delay: (i % 6) * 0.4,
  dur: 6 + (i % 5),
}))

export default function Hero() {
  const { company } = useSite()
  const [line, setLine] = useState(0)
  const { scrollY } = useScroll()
  const yGrid = useTransform(scrollY, [0, 600], [0, 120])
  const yContent = useTransform(scrollY, [0, 600], [0, 80])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  useEffect(() => {
    const id = setInterval(() => setLine((l) => (l + 1) % company.supportingLines.length), 3000)
    return () => clearInterval(id)
  }, [company.supportingLines.length])

  const ease = [0.22, 1, 0.36, 1]

  return (
    <section className="hero">
      <div className="hero__bg">
        <motion.div className="hero__grid" style={{ y: yGrid }} />
        <div className="glow glow--gold hero__glow-1" />
        <div className="glow glow--gold hero__glow-2" />
        {PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            className="hero__particle"
            style={{ width: p.size, height: p.size, top: `${p.top}%`, left: `${p.left}%` }}
            animate={{ y: [0, -22, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.div className="container hero__inner" style={{ y: yContent, opacity }}>
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="dot" /> India’s most premium creator-growth studio
        </motion.div>

        <h1 className="display hero__headline">
          {['We Build', 'Internet Brands', 'That People'].map((w, i) => (
            <motion.span
              key={w}
              style={{ display: 'block' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease }}
            >
              {w}
            </motion.span>
          ))}
          <motion.span
            style={{ display: 'block' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
          >
            Can’t <span className="gold-fill italic-serif ignore">Ignore.</span>
          </motion.span>
        </h1>

        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease }}
        >
          {company.heroSub}
        </motion.p>

        <motion.div
          className="hero__ctas"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.68, ease }}
        >
          <Button to="/contact" size="lg" arrow>Book Strategy Call</Button>
          <Button to="/case-studies" variant="ghost" size="lg">View Case Studies</Button>
        </motion.div>

        <div className="hero__rotator">
          <AnimatePresence mode="wait">
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <b>—</b> {company.supportingLines[line]}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="hero__scroll">
        <span className="mouse" />
        Scroll
      </div>
    </section>
  )
}
