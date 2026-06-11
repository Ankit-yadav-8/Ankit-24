import SectionHead from '../ui/SectionHead.jsx'
import Reveal from '../ui/Reveal.jsx'
import { useSite } from '../../context/SiteContext.jsx'

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
)
const Cross = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
)

// "The difference" — a feature comparison vs freelancers / in-house.
export default function ComparisonSection() {
  const { comparison } = useSite()
  return (
    <section className="section section--ink">
      <div className="container">
        <SectionHead
          eyebrow="The Difference"
          title={<>Why teams switch to <span className="gold-fill italic-serif">24K Media.</span></>}
          text="A media operation, not a queue of freelancers or the cost of an in-house team."
        />
        <Reveal className="compare">
          <div className="compare__row compare__row--head">
            <div className="compare__label" />
            {comparison.columns.map((c, i) => (
              <div className={`compare__col ${i === 0 ? 'is-us' : ''}`} key={c}>{c}</div>
            ))}
          </div>
          {comparison.rows.map((r) => (
            <div className="compare__row" key={r.label}>
              <div className="compare__label">{r.label}</div>
              {r.values.map((v, i) => (
                <div className={`compare__col ${i === 0 ? 'is-us' : ''}`} key={i}>
                  <span className={`compare__mark ${v ? 'yes' : 'no'}`}>{v ? <Check /> : <Cross />}</span>
                </div>
              ))}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
