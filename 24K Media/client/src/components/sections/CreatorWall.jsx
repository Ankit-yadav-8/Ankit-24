import Marquee from '../ui/Marquee.jsx'
import { useSite } from '../../context/SiteContext.jsx'

// Single-line, auto-scrolling wall of creators we work with — CreatorTube style.
export default function CreatorWall() {
  const { creators } = useSite()
  return (
    <section className="creatorwall">
      <p className="creatorwall__label">Loved by Top Content Creators in India</p>
      <Marquee className="creatorwall__marquee">
        {creators.map((c) => (
          <div className={`creator-chip accent-${c.accent}`} key={c.id}>
            <span className="creator-chip__avatar">
              <img src={c.img} alt={c.name} loading="lazy" />
            </span>
            <span className="creator-chip__text">
              <b className="creator-chip__subs">{c.subs} Subscribers</b>
              <em className="creator-chip__name">{c.name}</em>
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  )
}
