import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHead from '../ui/SectionHead.jsx'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'
import { useSite } from '../../context/SiteContext.jsx'

const ease = [0.22, 1, 0.36, 1]

// Animated FAQ accordion.
export default function FaqSection() {
  const { faqs } = useSite()
  const [open, setOpen] = useState(0)

  return (
    <section className="section section--smoke2">
      <div className="container faq">
        <div className="faq__head">
          <SectionHead
            eyebrow="FAQ"
            title={<>Questions, <span className="gold-fill italic-serif">answered.</span></>}
            text="Everything worth knowing before you book a call."
          />
          <Button to="/contact" variant="ghost" arrow>Still curious? Talk to us</Button>
        </div>

        <div className="faq__list">
          {faqs.map((f, i) => (
            <Reveal key={f.q} className={`faq-item ${open === i ? 'is-open' : ''}`} delay={(i % 4) * 0.05}>
              <button className="faq-item__q" onClick={() => setOpen((o) => (o === i ? -1 : i))}>
                <span>{f.q}</span>
                <span className="faq-item__plus" aria-hidden />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    className="faq-item__a"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <p>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
