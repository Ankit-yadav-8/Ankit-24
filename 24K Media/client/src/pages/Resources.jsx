import PageHeader from '../components/ui/PageHeader.jsx'
import ResourceCard from '../components/ui/ResourceCard.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import CTABand from '../components/sections/CTABand.jsx'
import { useSite } from '../context/SiteContext.jsx'

export default function Resources() {
  const { resources } = useSite()
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title={<>The growth <span className="gold-fill italic-serif">playbooks.</span></>}
        text="Blogs, playbooks and reports — the SEO surface and authority engine behind 24K Media."
        crumbs={[{ label: 'Resources' }]}
      />
      <section className="section section--tight">
        <div className="container">
          <div className="grid grid-3">
            {resources.map((r, i) => (
              <Reveal key={r.slug} delay={(i % 3) * 0.07}>
                <ResourceCard resource={r} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  )
}
