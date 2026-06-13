import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'

// Shared hero band for interior pages.
export default function PageHeader({ eyebrow, title, text, crumbs = [] }) {
  return (
    <header className="pagehead">
      <div className="container pagehead__inner">
        {crumbs.length > 0 && (
          <Reveal as="nav" className="breadcrumb" y={10}>
            <Link to="/">Home</Link>
            {crumbs.map((c) => (
              <span key={c.label}>
                <span style={{ opacity: 0.5 }}> / </span>
                {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
              </span>
            ))}
          </Reveal>
        )}
        {eyebrow && <Reveal as="span" className="eyebrow" delay={0.05} y={12} style={{ marginTop: crumbs.length ? 18 : 0, display: 'inline-flex' }}>{eyebrow}</Reveal>}
        <Reveal as="h1" delay={0.1} className="display">{title}</Reveal>
        {text && <Reveal as="p" delay={0.16}>{text}</Reveal>}
      </div>
    </header>
  )
}
