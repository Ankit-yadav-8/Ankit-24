import Counter from '../ui/Counter.jsx'
import Marquee from '../ui/Marquee.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useSite } from '../../context/SiteContext.jsx'

export default function SocialProof() {
  const { stats, clients } = useSite()
  return (
    <section className="section section--tight">
      <div className="container">
        <Reveal className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.id}>
              <div className="stat__value">
                <Counter value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>

      <div className="logowall" style={{ marginTop: 'clamp(48px, 7vw, 90px)' }}>
        <p className="logowall__label">Trusted by creators, founders & modern brands</p>
        <Marquee>
          {clients.map((c) => (
            <span className="logowall__item" key={c}>{c}</span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
