import PageHeader from '../components/ui/PageHeader.jsx'
import FilterableWork from '../components/ui/FilterableWork.jsx'
import CTABand from '../components/sections/CTABand.jsx'
import { useSite } from '../context/SiteContext.jsx'

export default function Portfolio() {
  const { portfolio, portfolioFilters } = useSite()
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title={<>A filterable body <span className="gold-fill italic-serif">of work.</span></>}
        text="Thumbnails, videos, websites and campaigns — filter by the kind of brand you’re building."
        crumbs={[{ label: 'Portfolio' }]}
      />
      <section className="section section--tight">
        <div className="container">
          <FilterableWork items={portfolio} filters={portfolioFilters} />
        </div>
      </section>
      <CTABand />
    </>
  )
}
