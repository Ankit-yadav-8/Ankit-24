import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useSite } from '../../context/SiteContext.jsx'

const KEY = 'gcpop:dismissed'
const COOLDOWN = 1000 * 60 * 60 * 24 // re-offer at most once a day
const ease = [0.22, 1, 0.36, 1]

// A single, polite "Book a Growth Call" prompt that surfaces on every page
// once the visitor is engaged (scrolled halfway or ~15s in). Dismissals are
// remembered for 24h so it never nags, and it never shows on /contact.
export default function GrowthCallPopup() {
  const { company } = useSite()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (location.pathname.startsWith('/contact')) return
    const last = Number(localStorage.getItem(KEY) || 0)
    if (Date.now() - last < COOLDOWN) return

    let shown = false
    const reveal = () => {
      if (shown) return
      shown = true
      setOpen(true)
      teardown()
    }
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max > 0 && window.scrollY / max > 0.5) reveal()
    }
    const timer = setTimeout(reveal, 15000)
    window.addEventListener('scroll', onScroll, { passive: true })
    function teardown() {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
    return teardown
  }, [location.pathname])

  const remember = () => localStorage.setItem(KEY, String(Date.now()))
  const dismiss = () => { remember(); setOpen(false) }
  const wa = `https://wa.me/${(company?.whatsapp || '').replace(/[^0-9]/g, '')}`

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.aside
          className="gcpop"
          role="dialog"
          aria-label="Book a free growth call"
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 48 }}
          transition={{ duration: 0.42, ease }}
        >
          <button className="gcpop__close" onClick={dismiss} aria-label="Dismiss">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
          <span className="gcpop__tag"><i />Free 30-min growth call</span>
          <h3 className="gcpop__title">Map your next 90 days with the 24K team.</h3>
          <p className="gcpop__sub">No pitch deck — a real strategist reviews your channel and hands you a clear plan. We reply within one business day.</p>
          <div className="gcpop__ctas">
            <Link to="/contact" className="btn btn--gold" onClick={remember}>Book Growth Call</Link>
            <a className="btn btn--ghost" href={wa} target="_blank" rel="noreferrer" onClick={remember}>WhatsApp</a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>,
    document.body,
  )
}
