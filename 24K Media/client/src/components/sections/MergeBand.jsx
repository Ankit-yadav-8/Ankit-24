import Reveal from '../ui/Reveal.jsx'

// A pastel pill highlight used inside the merge-band statements.
const Pill = ({ accent, icon, children }) => (
  <span className={`pill-hl accent-${accent}`}>
    <span className="pill-hl__ico">{icon}</span>
    {children}
  </span>
)

// Two stacked "equation" thoughts, each with inline pill highlights —
// CreatorTube style, centered, high-contrast black type.
export default function MergeBand() {
  return (
    <section className="section section--tight mergeband">
      <div className="container mergeband__stack">
        <Reveal as="h2" className="mergeband__head">
          Your <Pill accent="purple" icon="✦">Story</Pill> + our{' '}
          <Pill accent="orange" icon="◎">Strategy</Pill> ={' '}
          <Pill accent="blue" icon="◐">Content That Grows</Pill>.
        </Reveal>
        <Reveal as="h2" className="mergeband__head" delay={0.1}>
          We help you go from <Pill accent="pink" icon="✦">Hidden Gem</Pill> to{' '}
          <Pill accent="blue" icon="◐">Go-To Creator</Pill> with content people{' '}
          <Pill accent="green" icon="◎">Can’t Stop Sharing</Pill>.
        </Reveal>
      </div>
    </section>
  )
}
