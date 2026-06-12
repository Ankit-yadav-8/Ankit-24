import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import ScrollToTop from './ScrollToTop.jsx'
import FloatingActions from './FloatingActions.jsx'

// Shell: persistent nav + footer with a premium fade/curtain page transition.
export default function Layout() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {outlet}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingActions />
    </>
  )
}
