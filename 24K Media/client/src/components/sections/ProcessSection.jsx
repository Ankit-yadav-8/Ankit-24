import { motion } from 'framer-motion'
import SectionHead from '../ui/SectionHead.jsx'
import { useSite } from '../../context/SiteContext.jsx'

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function ProcessSection() {
  const { process } = useSite()
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow="The Process"
          title={<>A repeatable path <span className="gold-fill italic-serif">from zero to authority.</span></>}
          text="Six steps that turn raw attention into durable, monetisable internet brands."
        />
        <motion.div
          className="process__grid"
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {process.map((p) => (
            <motion.div className="proc-step" key={p.step} variants={item}>
              <span className="proc-step__num">{p.step}</span>
              <h3 className="proc-step__title">{p.title}</h3>
              <p className="proc-step__desc">{p.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
