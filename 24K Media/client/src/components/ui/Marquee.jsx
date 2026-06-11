// Infinite marquee — renders the track twice for a seamless loop.
export default function Marquee({ children, className = '' }) {
  return (
    <div className={`marquee ${className}`}>
      <div className="marquee__track" aria-hidden="false">{children}</div>
      <div className="marquee__track" aria-hidden="true">{children}</div>
    </div>
  )
}
