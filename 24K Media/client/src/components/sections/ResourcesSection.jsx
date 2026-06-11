import SectionHead from '../ui/SectionHead.jsx'
import ResourceCard from '../ui/ResourceCard.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useSite } from '../../context/SiteContext.jsx'

export default function ResourcesSection() {
  const { resources } = useSite()
  return (
    <section className="section section--smoke2">
      <div className="container">
        <SectionHead
          eyebrow="Resources"
          title={<>Playbooks from the <span className="gold-fill italic-serif">growth desk.</span></>}
          text="The frameworks we use with clients — written for creators and founders who want the system, not the slogans."
        />
        <div className="grid grid-3">
          {resources.slice(0, 3).map((r, i) => (
            <Reveal key={r.slug} delay={i * 0.08}>
              <ResourceCard resource={r} />
            </Reveal>
          ))}
        </div>
        <div style={{ marginTop: '2.6rem', display: 'flex', justifyContent: 'center' }}>
          <Button to="/resources" variant="ghost" arrow>Read all resources</Button>
        </div>
      </div>
    </section>
  )
}
