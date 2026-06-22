import { useParams, Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader.jsx'
import Seo from '../components/Seo.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import ResourceCard from '../components/ui/ResourceCard.jsx'
import CTABand from '../components/sections/CTABand.jsx'
import NotFound from './NotFound.jsx'
import { useSite } from '../context/SiteContext.jsx'

export default function ResourceDetail() {
  const { slug } = useParams()
  const { resources } = useSite()
  const r = resources.find((x) => x.slug === slug)
  if (!r) return <NotFound />

  const more = resources.filter((x) => x.slug !== slug).slice(0, 3)

  return (
    <>
      <Seo
        title={r.title}
        description={r.excerpt}
        path={`/resources/${slug}`}
      />
      <PageHeader
        eyebrow={`${r.category} · ${r.readTime}`}
        title={r.title}
        text={r.excerpt}
        crumbs={[{ label: 'Resources', to: '/resources' }, { label: r.category }]}
      />
      <article className="section section--tight">
        <div className="container" style={{ maxWidth: 760 }}>
          {r.body.map((para, i) => (
            <Reveal as="p" key={i} delay={i * 0.04} style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--ink-2)', marginBottom: '1.5rem' }}>
              {para}
            </Reveal>
          ))}
          <hr className="divider" style={{ margin: '2.5rem 0' }} />
          <Reveal className="card" style={{ padding: '1.8rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>Want this run for your brand?</strong>
              <p className="text-soft">Book a growth call and we’ll map it to your channel.</p>
            </div>
            <Link to="/contact" className="btn btn--gold btn--sm">Book Growth Call</Link>
          </Reveal>
        </div>
      </article>

      <section className="section section--smoke2">
        <div className="container">
          <div className="section-head"><h2 style={{ fontSize: 'clamp(1.7rem,4vw,2.4rem)' }}>More from the desk</h2></div>
          <div className="grid grid-3">
            {more.map((m) => <ResourceCard key={m.slug} resource={m} />)}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  )
}
