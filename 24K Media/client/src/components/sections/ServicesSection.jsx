import { motion } from 'framer-motion'
import SectionHead from '../ui/SectionHead.jsx'
import ServiceCard from '../ui/ServiceCard.jsx'
import Button from '../ui/Button.jsx'
import { useSite } from '../../context/SiteContext.jsx'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } }
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function ServicesSection({ limit }) {
  const { services } = useSite()
  const list = limit ? services.slice(0, limit) : services

  return (
    <section className="section section--smoke2" id="services">
      <div className="container">
        <SectionHead
          eyebrow="The Ecosystem"
          title={<>Twelve offerings. <span className="gold-fill italic-serif">One growth engine.</span></>}
          text="Every service plugs into a single content and distribution system — so growth compounds instead of scattering."
        />
        <motion.div
          className="grid grid-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {list.map((s) => (
            <motion.div key={s.slug} variants={item}>
              <ServiceCard service={s} />
            </motion.div>
          ))}
        </motion.div>

        {limit && (
          <div style={{ marginTop: '2.6rem', display: 'flex', justifyContent: 'center' }}>
            <Button to="/services" variant="ghost" arrow>See all 12 services</Button>
          </div>
        )}
      </div>
    </section>
  )
}
