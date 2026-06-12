import Counter from '../ui/Counter.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useSite } from '../../context/SiteContext.jsx'

export default function SocialProof() {
  const { stats } = useSite()
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
    </section>
  )
}
