import { Link } from 'react-router-dom'
import TrendChart from './TrendChart.jsx'
import { seededTrend } from '../../lib/charts.js'

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)

// Each service category gets its own accent so the cards read as a palette.
const CAT_COLOR = {
  Content: 'var(--gold)',
  Brand: '#9b5de5',
  Strategy: '#3f8efc',
  Distribution: '#2bb673',
}

export default function ServiceCard({ service }) {
  const color = CAT_COLOR[service.category] || 'var(--gold)'
  const trend = seededTrend(service.slug, 12)
  const growth = Math.round((trend[trend.length - 1] / trend[0] - 1) * 100)

  return (
    <Link to={`/services/${service.slug}`} className="card service-card" data-cursor="hover">
      <span className="card-gold-line" />
      <div className="service-card__top">
        <span className="service-card__num">{service.number}</span>
        <span className="service-card__icon" style={{ '--svc-accent': color }}>{service.icon}</span>
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.tagline}</p>

      <div className="service-card__spark">
        <TrendChart data={trend} color={color} height={48} showDots={false} showGrid={false} interactive={false} />
        <span className="service-card__delta" style={{ '--svc-accent': color }}>↗ +{growth}%</span>
      </div>

      <span className="service-card__arrow">Explore service <Arrow /></span>
    </Link>
  )
}
