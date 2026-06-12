import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../ui/Button.jsx'
import { useSite } from '../../context/SiteContext.jsx'

const ease = [0.22, 1, 0.36, 1]

// Staggered reveal for dropdown items — each card/link slides up in sequence.
const MotionLink = motion(Link)
const panelContainer = { hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.04 } } }
const panelItem = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.34, ease } } }

const Chevron = () => (
  <svg className="nav__chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const RESOURCE_ITEMS = [
  { label: 'Playbooks & Guides', to: '/resources', desc: 'Field-tested frameworks for growth.', icon: '◈' },
  { label: 'Case Studies', to: '/case-studies', desc: 'Real results, real numbers.', icon: '◍' },
  { label: 'Portfolio', to: '/portfolio', desc: 'Selected work across every format.', icon: '❖' },
  { label: 'Brand Collaborations', to: '/collaborations', desc: 'Creator × brand campaigns that impact.', icon: '⬡' },
  { label: 'Free Tools', to: '/tools', desc: 'Calculators & templates for creators.', icon: '◇' },
]

const COMPANY_ITEMS = [
  { label: 'About 24K', to: '/about', desc: 'Who we are and how we operate.', icon: '✦' },
  { label: 'The Team', to: '/team', desc: 'The people behind the studio.', icon: '◓' },
  { label: 'Our Process', to: '/process', desc: 'Discovery to growth, step by step.', icon: '◎' },
  { label: 'Collaborations', to: '/collaborations', desc: 'Creator × brand partnerships.', icon: '⬡' },
  { label: 'Contact', to: '/contact', desc: 'Book a growth call with the team.', icon: '◆' },
]

// Featured promo shown on the right of each list dropdown (premium balance).
const PANEL_FEATURE = {
  solutions: { tag: 'Not sure?', title: 'Find your growth play', body: 'Tell us your niche and goals — we’ll map the fastest path to traction.', cta: 'Book a strategy call', to: '/contact' },
  resources: { tag: 'Free', title: 'Get a free channel audit', body: 'A no-pitch teardown of your channel with 3 things you can fix this week.', cta: 'Explore free tools', to: '/tools' },
  company: { tag: 'Say hi', title: 'Let’s build something', body: 'Meet the team and see whether 24K is the right partner for your next chapter.', cta: 'Start a conversation', to: '/contact' },
}

// One merged, tidy bar: two list menus + one mega + a direct Pricing link.
const MENU = [
  { key: 'services', label: 'Services', mega: true },
  { key: 'solutions', label: 'Solutions' },
  { key: 'resources', label: 'Resources' },
  { key: 'pricing', label: 'Pricing', to: '/pricing' },
  { key: 'company', label: 'Company' },
]

export default function Navbar() {
  const { services, industries } = useSite()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)
  const [mobileSection, setMobileSection] = useState(null)
  const location = useLocation()
  const closeTimer = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    setOpen(false)
    setActive(null)
    setMobileSection(null)
  }, [location.pathname])

  const serviceGroups = useMemo(() => {
    return services.reduce((acc, s) => {
      ;(acc[s.category] ||= []).push(s)
      return acc
    }, {})
  }, [services])

  const solutions = useMemo(
    () => (industries || []).map((i) => ({ label: i.title, to: `/solutions/${i.id}`, desc: i.desc, icon: i.icon })),
    [industries]
  )

  const childrenFor = (key) => {
    if (key === 'services') return services.map((s) => ({ label: s.title, to: `/services/${s.slug}` }))
    if (key === 'solutions') return solutions
    if (key === 'resources') return RESOURCE_ITEMS
    if (key === 'company') return COMPANY_ITEMS
    return []
  }

  const openMenu = (key) => { clearTimeout(closeTimer.current); setActive(key) }
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setActive(null), 120) }

  const renderPanel = (key) => {
    if (key === 'services') {
      return (
        <div className="mega mega--services">
          <div className="mega__cols">
            {Object.entries(serviceGroups).map(([cat, items]) => (
              <motion.div className="mega__col" key={cat} variants={panelContainer} initial="hidden" animate="show">
                <motion.h6 className="mega__cat" variants={panelItem}>{cat}</motion.h6>
                {items.map((s) => (
                  <MotionLink className="mega__svc" to={`/services/${s.slug}`} key={s.slug} variants={panelItem}>
                    <span className="mega__ico">{s.icon}</span>
                    <span className="mega__svc-txt">
                      <b>{s.title}</b>
                      <em>{s.tagline}</em>
                    </span>
                  </MotionLink>
                ))}
              </motion.div>
            ))}
          </div>
          <aside className="mega__feature">
            <span className="tag tag--gold">New here?</span>
            <h4>Get a free channel audit</h4>
            <p>A no-pitch teardown of your channel with 3 things you can fix this week.</p>
            <Button to="/tools" size="sm" arrow magnetic={false}>Explore free tools</Button>
            <Link className="mega__viewall" to="/services">View all 12 services →</Link>
          </aside>
        </div>
      )
    }
    const items = childrenFor(key)
    const feature = PANEL_FEATURE[key]
    return (
      <div className={`mega mega--rich ${feature ? '' : 'mega--rich-solo'}`}>
        <motion.div className="mega__grid" variants={panelContainer} initial="hidden" animate="show">
          {items.map((it) => (
            <MotionLink className="mega__card" to={it.to} key={it.label + it.to} variants={panelItem}>
              <span className="mega__ico">{it.icon || '◇'}</span>
              <span className="mega__card-txt">
                <b>{it.label}</b>
                {it.desc && <em>{it.desc}</em>}
              </span>
              <span className="mega__card-arrow" aria-hidden>→</span>
            </MotionLink>
          ))}
        </motion.div>
        {feature && (
          <aside className="mega__feature">
            <span className="tag tag--gold">{feature.tag}</span>
            <h4>{feature.title}</h4>
            <p>{feature.body}</p>
            <Button to={feature.to} size="sm" arrow magnetic={false}>{feature.cta}</Button>
          </aside>
        )}
      </div>
    )
  }

  return (
    <header
      className={`nav ${scrolled ? 'nav--scrolled' : ''} ${active ? 'nav--mega' : ''}`}
      onMouseLeave={scheduleClose}
    >
      <div className="container nav__inner">
        <Link to="/" className="nav__logo" onClick={() => setOpen(false)}>
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="24K Media" />
          <span>24K<b> Media</b></span>
        </Link>

        <nav className="nav__links">
          {MENU.map((item) =>
            item.to ? (
              <NavLink
                key={item.key}
                to={item.to}
                className={({ isActive }) => `nav__link ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setActive(null)}
              >
                {item.label}
              </NavLink>
            ) : (
              <button
                key={item.key}
                className={`nav__link nav__trigger ${active === item.key ? 'is-open' : ''}`}
                onMouseEnter={() => openMenu(item.key)}
                onClick={() => setActive((a) => (a === item.key ? null : item.key))}
              >
                {item.label}
                <Chevron />
              </button>
            )
          )}
        </nav>

        <div className="nav__right">
          <Link to="/contact" className="nav__cta">
            Let’s Collaborate
            <span className="nav__cta-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="8 7 17 7 17 16" />
              </svg>
            </span>
          </Link>
          <button
            className={`nav__menu-btn ${open ? 'open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span />
          </button>
        </div>
      </div>

      {/* Desktop mega dropdown */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="nav__dropdown"
            key={active}
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.99 }}
            transition={{ duration: 0.28, ease }}
            style={{ transformOrigin: 'top center' }}
            onMouseEnter={() => openMenu(active)}
          >
            <div className="container">{renderPanel(active)}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile accordion menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__mobile"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.3, ease }}
          >
            {MENU.map((item) =>
              item.to ? (
                <NavLink key={item.key} to={item.to} className="nav__mlink" onClick={() => setOpen(false)}>
                  {item.label}
                </NavLink>
              ) : (
                <div className="nav__msection" key={item.key}>
                  <button
                    className={`nav__mhead ${mobileSection === item.key ? 'is-open' : ''}`}
                    onClick={() => setMobileSection((s) => (s === item.key ? null : item.key))}
                  >
                    {item.label}
                    <Chevron />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileSection === item.key && (
                      <motion.div
                        className="nav__msub"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease }}
                      >
                        {childrenFor(item.key).map((c) => (
                          <Link key={c.label + c.to} to={c.to} onClick={() => setOpen(false)}>
                            {c.icon && <span className="nav__mico">{c.icon}</span>}
                            {c.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            )}
            <Button to="/contact" arrow magnetic={false} onClick={() => setOpen(false)} className="nav__mcta">
              Book Growth Call
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
