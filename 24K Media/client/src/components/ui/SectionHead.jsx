import Reveal from './Reveal.jsx'

// Consistent eyebrow + headline + lede block used across every section/page.
export default function SectionHead({ eyebrow, title, text, className = '' }) {
  return (
    <div className={`section-head ${className}`}>
      {eyebrow && (
        <Reveal as="span" className="eyebrow" y={14}>{eyebrow}</Reveal>
      )}
      <Reveal as="h2" delay={0.06}>{title}</Reveal>
      {text && <Reveal as="p" delay={0.12}>{text}</Reveal>}
    </div>
  )
}
