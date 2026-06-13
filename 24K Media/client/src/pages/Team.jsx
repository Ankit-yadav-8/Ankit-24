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
const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.59-.07-4.74-.07Zm0 2.76a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6Zm0 1.62a3.68 3.68 0 1 0 0 7.36 3.68 3.68 0 0 0 0-7.36Zm5.5-2.9a1.24 1.24 0 1 1 0 2.48 1.24 1.24 0 0 1 0-2.48Z" />
  </svg>
)
const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M2.5 12h19M12 2.5a14 14 0 0 1 0 19M12 2.5a14 14 0 0 0 0 19" />
  </svg>
)

// Social icons, rendered in this order when a member has the link.
const SOCIALS = [
  ['instagram', IgIcon, 'Instagram'],
  ['linkedin', InIcon, 'LinkedIn'],
  ['portfolio', LinkIcon, 'Portfolio'],
  ['x', XIcon, 'X'],
]

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
            {team.map((m, i) => {
              const links = SOCIALS.filter(([k]) => m.socials?.[k])
              return (
                <Reveal
                  key={m.id}
                  className={`team-card accent-${m.accent}${m.placeholder ? ' team-card--placeholder' : ''}${m.image ? '' : ' team-card--nophoto'}`}
                  delay={(i % 3) * 0.08}
                >
                  <span className="team-card__line" />
                  <div className="team-card__photo">
                    {m.image ? (
                      <img src={`${import.meta.env.BASE_URL}${m.image}`} alt={m.name} loading="lazy" />
                    ) : m.placeholder ? (
                      <span className="team-card__seat" aria-hidden>+</span>
                    ) : null}
                  </div>
                  <div className="team-card__body">
                    <h3 className="team-card__name">{m.name}</h3>
                    <span className="team-card__role">{m.role}</span>
                    <p className="team-card__bio">{m.bio}</p>
                    {links.length > 0 && (
                      <div className="team-card__socials">
                        {links.map(([k, Icon, label]) => (
                          <a
                            key={k}
                            href={m.socials[k]}
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label={`${m.name} on ${label}`}
                          >
                            <Icon />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </Reveal>
              )
            })}
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
