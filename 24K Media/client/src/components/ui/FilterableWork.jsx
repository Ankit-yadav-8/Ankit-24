import { useMemo, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import WorkCard from './WorkCard.jsx'

// Filterable portfolio grid with animated layout — shared by home + portfolio page.
export default function FilterableWork({ items, filters, limit }) {
  const [active, setActive] = useState('All')

  const filtered = useMemo(() => {
    const base = active === 'All' ? items : items.filter((i) => i.category === active)
    return limit ? base.slice(0, limit) : base
  }, [items, active, limit])

  return (
    <>
      <div className="portfolio__filters">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${active === f ? 'active' : ''}`}
            onClick={() => setActive(f)}
            data-cursor="hover"
          >
            {f}
          </button>
        ))}
      </div>

      <LayoutGroup>
        <motion.div layout className="portfolio__grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <WorkCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </>
  )
}
