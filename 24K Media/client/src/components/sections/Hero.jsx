import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Button from '../ui/Button.jsx'
import { useSite } from '../../context/SiteContext.jsx'

const PARTICLES = Array.from({ length: 24 }).map((_, i) => ({
  id: i,
  size: 3 + (i % 5),
  top: (i * 67) % 100,
  left: (i * 41) % 100,
  delay: (i % 6) * 0.4,
  dur: 6 + (i % 5),
}))

const U = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`
const AVATARS = [
  'photo-1500648767791-00dcc994a43e',
  'photo-1494790108377-be9c29b29330',
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1438761681033-6461ffad8d80',
].map((id) => U(id, 80))

const Star = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" /></svg>
)

export default function Hero() {
  const { company } = useSite()
  const [line, setLine] = useState(0)
  const { scrollY } = useScroll()
  const yGrid = useTransform(scrollY, [0, 600], [0, 120])
  const yContent = useTransform(scrollY, [0, 600], [0, 70])
  const opacity = useTransform(scrollY, [0, 460], [1, 0])

  useEffect(() => {
    const id = setInterval(() => setLine((l) => (l + 1) % company.supportingLines.length), 3000)
    return () => clearInterval(id)
  }, [company.supportingLines.length])

  const ease = [0.22, 1, 0.36, 1]

  return (
    <section className="hero">
      <div className="hero__bg">
        <motion.div className="hero__grid" style={{ y: yGrid }} />
        <motion.div
          className="hero__orb"
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        />
        <div className="glow glow--gold hero__glow-1" />
        <div className="glow glow--gold hero__glow-2" />
        <div className="glow hero__glow-3" />
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
        <div className="hero__grid2">
          <div className="hero__lead">
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
              <span className="hero__shine" aria-hidden />
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

            <motion.div
              className="hero__trust"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease }}
            >
              <div className="hero__avatars">
                {AVATARS.map((a) => <img key={a} src={a} alt="" loading="lazy" />)}
              </div>
              <div>
                <span className="hero__stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}</span>
                <span className="hero__trust-txt"> Rated 5.0 by 260+ creators & founders</span>
              </div>
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
          </div>

          {/* Floating media collage */}
          <div className="hero__media" aria-hidden>
            <motion.div
              className="hero__card hero__card--1"
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              animate={{ opacity: 1, y: [0, -14, 0], rotate: -2 }}
              transition={{ opacity: { duration: 0.8, delay: 0.4 }, y: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }}
            >
              <img src={U('photo-1605810230434-7631ac76ec81')} alt="" loading="lazy" />
            </motion.div>
            <motion.div
              className="hero__card hero__card--2"
              initial={{ opacity: 0, y: 30, rotate: 3 }}
              animate={{ opacity: 1, y: [0, 16, 0], rotate: 3 }}
              transition={{ opacity: { duration: 0.8, delay: 0.6 }, y: { duration: 8, repeat: Infinity, ease: 'easeInOut' } }}
            >
              <img src={U('photo-1611162617474-5b21e879e113')} alt="" loading="lazy" />
            </motion.div>

            <motion.div
              className="hero__card hero__card--3"
              initial={{ opacity: 0, y: 30, rotate: -5 }}
              animate={{ opacity: 1, y: [0, -10, 0], rotate: -5 }}
              transition={{ opacity: { duration: 0.8, delay: 0.75 }, y: { duration: 9, repeat: Infinity, ease: 'easeInOut' } }}
            >
              <img src={U('photo-1600880292089-90a7e086ee0c')} alt="" loading="lazy" />
            </motion.div>

            <motion.div
              className="hero__chip hero__chip--stat"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <b>2.4B+</b>
              <span>views generated</span>
            </motion.div>
            <motion.div
              className="hero__chip hero__chip--rating"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.15 }}
            >
              <span className="hero__stars"><Star /></span>
              5.0 · 260+ brands
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="hero__scroll">
        <span className="mouse" />
        Scroll
      </div>
    </section>
  )
}
