import Reveal from '../ui/Reveal.jsx'

// One clear thought, simply styled — the brand promise in a single line.
export default function MergeBand() {
  return (
    <section className="section section--tight mergeband">
      <div className="container mergeband__stack">
        <Reveal as="h2" className="mergeband__head">
          Your story <span className="mergeband__op">+</span> our strategy{' '}
          <span className="mergeband__op">=</span> content people{' '}
          <span className="gold-fill italic-serif">can’t stop sharing.</span>
        </Reveal>
      </div>
    </section>
  )
}
