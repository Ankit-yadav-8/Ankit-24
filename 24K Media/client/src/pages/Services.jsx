import { motion } from 'framer-motion'
import PageHeader from '../components/ui/PageHeader.jsx'
import ServiceCard from '../components/ui/ServiceCard.jsx'
import ProcessSection from '../components/sections/ProcessSection.jsx'
import CTABand from '../components/sections/CTABand.jsx'
import { useSite } from '../context/SiteContext.jsx'

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Services() {
  const { services } = useSite()
  return (
    <>
      <PageHeader
        eyebrow="Service Catalogue"
        title={<>The full content & <span className="gold-fill italic-serif">growth ecosystem.</span></>}
        text="Twelve offerings that plug into one system. Each links to a detailed page with its own outcomes, deliverables and proof."
        crumbs={[{ label: 'Services' }]}
      />
      <section className="section section--tight">
        <div className="container">
          <motion.div
            className="grid grid-3"
            variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
          >
            {services.map((s) => (
              <motion.div key={s.slug} variants={item}>
                <ServiceCard service={s} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <ProcessSection />
      <CTABand />
    </>
  )
}
