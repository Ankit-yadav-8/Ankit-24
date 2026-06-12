import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSite } from '../../context/SiteContext.jsx'
import { getLenis } from './SmoothScroll.jsx'

const ease = [0.22, 1, 0.36, 1]

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.13c-1.52 0-3.01-.41-4.31-1.18l-.31-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.25-4.35c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23z" />
  </svg>
)

const UpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <line x1="12" y1="19" x2="12" y2="6" />
    <polyline points="6 12 12 6 18 12" />
  </svg>
)

// Floating quick-actions: WhatsApp chat (bottom-right, always) and
// back-to-top (bottom-left, appears after scrolling down a screen).
export default function FloatingActions() {
  const { company } = useSite()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => {
    const l = getLenis()
    if (l) l.scrollTo(0, { duration: 1.1 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const wa = `https://wa.me/${(company?.whatsapp || '').replace(/[^0-9]/g, '')}`

  return (
    <>
      <a className="fab fab--wa" href={wa} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <span className="fab__pulse" />
        <WhatsAppIcon />
        <span className="fab__label">Chat with us</span>
      </a>

      <AnimatePresence>
        {show && (
          <motion.button
            className="fab fab--top"
            onClick={toTop}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 12 }}
            transition={{ duration: 0.3, ease }}
          >
            <UpIcon />
            <span className="fab__label fab__label--right">Back to top</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
