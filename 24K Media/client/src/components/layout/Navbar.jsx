import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Button from '../ui/Button.jsx'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/about', label: 'About' },
  { to: '/resources', label: 'Resources' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

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

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__logo" onClick={() => setOpen(false)}>
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="24K Media" />
          <span>24K<b> Media</b></span>
        </Link>

        <nav className="nav__links">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `nav__link ${isActive ? 'active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__right">
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

      {open && (
        <div className="nav__mobile">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <Button to="/contact" arrow magnetic={false} onClick={() => setOpen(false)}>
            Book Growth Call
          </Button>
        </div>
      )}
    </header>
  )
}
