import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../ui/Button.jsx'
import { useSite } from '../../context/SiteContext.jsx'

const ease = [0.22, 1, 0.36, 1]

const Chevron = () => (
  <svg className="nav__chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const RESOURCE_ITEMS = [
  { label: 'Playbooks & Guides', to: '/resources', desc: 'Field-tested frameworks for growth.' },
  { label: 'Case Studies', to: '/case-studies', desc: 'Real results, real numbers.' },
  { label: 'Portfolio', to: '/portfolio', desc: 'Selected work across every format.' },
  { label: 'Free Tools', to: '/tools', desc: 'Calculators & templates for creators.' },
]

const COMPANY_ITEMS = [
  { label: 'About 24K', to: '/about', desc: 'Who we are and how we operate.' },
  { label: 'Our Story', to: '/about', desc: 'Founded May 2026 — the journey so far.' },
  { label: 'Our Process', to: '/about', desc: 'Discovery to growth, step by step.' },
  { label: 'Contact', to: '/contact', desc: 'Book a growth call with the team.' },
]

const MENU = [
  { key: 'services', label: 'Services', mega: true },
  { key: 'solutions', label: 'Solutions' },
  { key: 'pricing', label: 'Pricing', to: '/pricing' },
  { key: 'tools', label: 'Tools', to: '/tools' },
  { key: 'resources', label: 'Resources' },
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
    () => (industries || []).map((i) => ({ label: i.title, to: '/contact', desc: i.desc })),
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
              <div className="mega__col" key={cat}>
                <h6 className="mega__cat">{cat}</h6>
                {items.map((s) => (
                  <Link className="mega__svc" to={`/services/${s.slug}`} key={s.slug}>
                    <span className="mega__ico">{s.icon}</span>
                    <span className="mega__svc-txt">
                      <b>{s.title}</b>
                      <em>{s.tagline}</em>
                    </span>
                  </Link>
                ))}
              </div>
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
    return (
      <div className="mega mega--list">
        {items.map((it) => (
          <Link className="mega__item" to={it.to} key={it.label}>
            <b>{it.label}</b>
            {it.desc && <em>{it.desc}</em>}
          </Link>
        ))}
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
          <a className="nav__cta-ghost" href="tel:+919000024000">Free audit</a>
          <Button to="/contact" size="sm" arrow>Book Growth Call</Button>
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.24, ease }}
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
