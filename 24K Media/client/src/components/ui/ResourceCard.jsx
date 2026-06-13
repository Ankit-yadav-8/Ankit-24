import { Link } from 'react-router-dom'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return iso
  }
}

export default function ResourceCard({ resource }) {
  return (
    <Link to={`/resources/${resource.slug}`} className="card resource-card" data-cursor="hover">
      <span className="card-gold-line" />
      {resource.image && (
        <div className="resource-card__media">
          <img src={resource.image} alt="" loading="lazy" />
          <span className="tag tag--gold resource-card__cat">{resource.category}</span>
        </div>
      )}
      <div className="resource-card__body">
        {!resource.image && <span className="tag tag--gold resource-card__cat">{resource.category}</span>}
        <h3 className="resource-card__title">{resource.title}</h3>
        <p className="resource-card__excerpt">{resource.excerpt}</p>
        <div className="resource-card__meta">
          <span>{formatDate(resource.date)}</span>
          <span>{resource.readTime}</span>
        </div>
      </div>
    </Link>
  )
}
