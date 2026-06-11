import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHead from '../components/ui/SectionHead.jsx'
import CTABand from '../components/sections/CTABand.jsx'
import { useSite } from '../context/SiteContext.jsx'

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.966 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
)
const InIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
)

const culture = [
  { t: 'Small pod, senior hands', d: 'No junior queue. The people who scope your brand are the ones who ship it.' },
  { t: 'Craft is non-negotiable', d: 'Every edit, thumbnail and line of copy is held to a premium bar before it leaves the studio.' },
  { t: 'Owned, not rented', d: 'We build infrastructure you keep — channels, assets and systems that stay yours forever.' },
]

export default function Team() {
  const { team } = useSite()
  return (
    <>
      <PageHeader
        eyebrow="The Team"
        title={<>The people behind the <span className="gold-fill italic-serif">internet brands.</span></>}
        text="A senior, founder-led pod of strategists, editors, designers and distribution leads — assigned to your brand, accountable to your numbers."
        crumbs={[{ label: 'Team' }]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="team-grid">
            {team.map((m, i) => (
              <Reveal key={m.id} className={`team-card accent-${m.accent}`} delay={(i % 3) * 0.08}>
                <span className="team-card__line" />
                <div className="team-card__photo">
                  <img src={m.image} alt={m.name} loading="lazy" />
                </div>
                <div className="team-card__body">
                  <h3 className="team-card__name">{m.name}</h3>
                  <span className="team-card__role">{m.role}</span>
                  <p className="team-card__bio">{m.bio}</p>
                  <div className="team-card__socials">
                    <a href={m.socials.x} aria-label={`${m.name} on X`}><XIcon /></a>
                    <a href={m.socials.linkedin} aria-label={`${m.name} on LinkedIn`}><InIcon /></a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--smoke2">
        <div className="container">
          <SectionHead
            eyebrow="How we operate"
            title={<>A studio culture built for <span className="gold-fill italic-serif">compounding.</span></>}
          />
          <div className="grid grid-3">
            {culture.map((c, i) => (
              <Reveal key={c.t} className="card culture-card" delay={(i % 3) * 0.08}>
                <span className="card-gold-line" />
                <span className="culture-card__dot" />
                <h3>{c.t}</h3>
                <p className="text-soft">{c.d}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="team-join" delay={0.1}>
            <div>
              <h3>We’re always meeting sharp operators.</h3>
              <p className="text-soft">Editors, designers and strategists who care about craft — say hello.</p>
            </div>
            <a className="btn btn--gold" href="mailto:hello@24kmedia.in">Join the studio</a>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  )
}
