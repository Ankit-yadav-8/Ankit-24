import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHead from '../components/ui/SectionHead.jsx'
import CTABand from '../components/sections/CTABand.jsx'
import FaqSection from '../components/sections/FaqSection.jsx'
import { useSite } from '../context/SiteContext.jsx'

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const promises = [
  { v: '48h', l: 'Edit turnaround' },
  { v: '90d', l: 'First growth thesis' },
  { v: '100%', l: 'You own everything' },
  { v: 'Weekly', l: 'Iteration cadence' },
]

export default function Process() {
  const { processDetail } = useSite()
  return (
    <>
      <PageHeader
        eyebrow="How We Work"
        title={<>From a blank channel to a <span className="gold-fill italic-serif">growth engine.</span></>}
        text="A documented, repeatable system — not a freelancer queue. Six stages that turn attention into authority and authority into revenue."
        crumbs={[{ label: 'Process' }]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="proc-promise">
            {promises.map((p, i) => (
              <Reveal key={p.l} className="proc-promise__item" delay={(i % 4) * 0.06}>
                <span className="proc-promise__v">{p.v}</span>
                <span className="proc-promise__l">{p.l}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--smoke2">
        <div className="container">
          <SectionHead
            eyebrow="The System"
            title={<>Six stages, one compounding <span className="gold-fill italic-serif">loop.</span></>}
          />
          <div className="proc-flow">
            {processDetail.map((s, i) => (
              <Reveal key={s.step} className={`proc-flow__step accent-${s.accent}`} delay={(i % 2) * 0.08}>
                <div className="proc-flow__rail">
                  <span className="proc-flow__num">{s.step}</span>
                </div>
                <div className="proc-flow__card card">
                  <span className="card-gold-line" />
                  <div className="proc-flow__head">
                    <h3>{s.title}</h3>
                    <span className="proc-flow__dur">{s.duration}</span>
                  </div>
                  <p className="text-soft">{s.summary}</p>
                  <ul className="proc-flow__points">
                    {s.points.map((pt) => (
                      <li key={pt}><span className="proc-flow__check"><Check /></span>{pt}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />
      <CTABand />
    </>
  )
}
