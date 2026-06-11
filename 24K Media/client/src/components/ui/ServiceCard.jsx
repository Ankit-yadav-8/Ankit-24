import { Link } from 'react-router-dom'

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)

export default function ServiceCard({ service }) {
  return (
    <Link to={`/services/${service.slug}`} className="card service-card" data-cursor="hover">
      <span className="card-gold-line" />
      <div className="service-card__top">
        <span className="service-card__num">{service.number}</span>
        <span className="service-card__icon">{service.icon}</span>
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.tagline}</p>
      <span className="service-card__arrow">Explore service <Arrow /></span>
    </Link>
  )
}
