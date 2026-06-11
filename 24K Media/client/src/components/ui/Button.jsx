import { Link } from 'react-router-dom'
import Magnetic from './Magnetic.jsx'

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

// Unified CTA — renders a router Link, external anchor, or button, with magnetic hover.
export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'gold',
  size = '',
  arrow = false,
  type,
  magnetic = true,
  className = '',
  ...rest
}) {
  const cls = `btn btn--${variant} ${size ? `btn--${size}` : ''} ${className}`.trim()
  const inner = (
    <>
      {children}
      {arrow && <ArrowIcon />}
    </>
  )

  let el
  if (to) el = <Link to={to} className={cls} {...rest}>{inner}</Link>
  else if (href) el = <a href={href} target="_blank" rel="noreferrer" className={cls} {...rest}>{inner}</a>
  else el = <button type={type || 'button'} onClick={onClick} className={cls} {...rest}>{inner}</button>

  return magnetic ? <Magnetic strength={0.25}>{el}</Magnetic> : el
}
