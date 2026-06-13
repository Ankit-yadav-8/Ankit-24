import SectionHead from '../ui/SectionHead.jsx'
import FilterableWork from '../ui/FilterableWork.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useSite } from '../../context/SiteContext.jsx'

export default function PortfolioSection({ limit = 6 }) {
  const { portfolio, portfolioFilters } = useSite()
  return (
    <section className="section section--smoke2">
      <div className="container">
        <SectionHead
          eyebrow="Selected Work"
          title={<>Proof of work, <span className="gold-fill italic-serif">filtered for you.</span></>}
          text="Thumbnails, videos, websites and campaigns across creators, startups and modern brands."
        />
        <Reveal>
          <FilterableWork items={portfolio} filters={portfolioFilters} limit={limit} />
        </Reveal>
        <div style={{ marginTop: '2.6rem', display: 'flex', justifyContent: 'center' }}>
          <Button to="/portfolio" variant="ghost" arrow>View full portfolio</Button>
        </div>
      </div>
    </section>
  )
}
