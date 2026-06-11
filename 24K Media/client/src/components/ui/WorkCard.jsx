const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
)

// Portfolio tile — gradient surface with gold wash, type badge and metric.
export default function WorkCard({ item }) {
  return (
    <article className="card work-card" data-cursor="hover">
      {item.image && <img className="work-card__img" src={item.image} alt={item.title} loading="lazy" />}
      <div className="work-card__bg" />
      <span className="work-card__type">{item.type}</span>
      <span className="work-card__play"><PlayIcon /></span>
      <span className="work-card__client">{item.client}</span>
      <h3 className="work-card__title">{item.title}</h3>
      <span className="work-card__metric">{item.metric}</span>
    </article>
  )
}
