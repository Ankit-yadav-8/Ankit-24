import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSite } from '../../context/SiteContext.jsx'

const Social = ({ d, label, href }) => (
  <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg>
  </a>
)

// Feather-style line icons for the contact strip.
const Stroke = ({ children }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
)
const MailIcon = () => (
  <Stroke><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></Stroke>
)
const ChatIcon = () => (
  <Stroke><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></Stroke>
)
const PinIcon = () => (
  <Stroke><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></Stroke>
)

export default function Footer() {
  const { company, services } = useSite()
  const year = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = (e) => {
    e.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const month = new Date().toLocaleString('en-US', { month: 'long' })

  return (
    <footer className="footer">
      <div className="container">
        {/* —— Newsletter / CTA band —— */}
        <div className="footer__cta">
          <div>
            <span className="footer__status"><i />Now onboarding · {month} — limited creator slots</span>
            <h3>Build an internet brand people can’t ignore.</h3>
            <p>Get the playbooks, frameworks and case studies we use to grow creators and founders — straight to your inbox.</p>
          </div>
          {subscribed ? (
            <p className="footer__subscribe-ok">✓ You’re in. Watch your inbox for the first playbook.</p>
          ) : (
            <form className="footer__subscribe" onSubmit={subscribe}>
              <div className="footer__subscribe-row">
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                />
                <button type="submit" className="btn btn--gold">Subscribe</button>
              </div>
              <small>No spam. Unsubscribe anytime. ~1 email a week.</small>
            </form>
          )}
        </div>

        {/* —— Main columns —— */}
        <div className="footer__top">
          <div className="footer__brand">
            <div className="nav__logo">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="24K Media" />
              <span>24K<b style={{ color: 'var(--gold-2)' }}> Media</b></span>
            </div>
            <p className="footer__tagline">{company.positioning}</p>

            <div className="footer__contact">
              <a href={`mailto:${company.email}`}><MailIcon /> {company.email}</a>
              <a href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer"><ChatIcon /> {company.whatsapp}</a>
              <span><PinIcon /> {company.location}</span>
            </div>

            <div className="footer__social">
              <Social label="YouTube" href="#" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z" />
              <Social label="Instagram" href="#" d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.1.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.1-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.8 3.8 0 0 1-1.4-.9 3.8 3.8 0 0 1-.9-1.4c-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.1 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4zm0 10.9A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3zm6.8-11.2a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5z" />
              <Social label="LinkedIn" href="#" d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.3a1.8 1.8 0 1 1 1.8-1.8 1.8 1.8 0 0 1-1.8 1.8zM19 19h-3v-4.7c0-1.1 0-2.5-1.5-2.5S12.7 13 12.7 14.2V19h-3v-9h2.9v1.2h.04a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.7 2 3.7 4.7z" />
              <Social label="X" href="#" d="M18.9 1.2h3.5l-7.6 8.7L23.7 22h-7l-5.5-7.2L4.9 22H1.4l8.1-9.3L.7 1.2h7.2l5 6.6zm-1.2 18.7h1.9L6.4 3.1H4.3z" />
            </div>
          </div>

          <div className="footer__col">
            <h5>Company</h5>
            <Link to="/about">About</Link>
            <Link to="/case-studies">Case Studies</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer__col">
            <h5>Services</h5>
            {services.slice(0, 6).map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`}>{s.title}</Link>
            ))}
          </div>

          <div className="footer__col">
            <h5>Get in touch</h5>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a href={company.calendly} target="_blank" rel="noreferrer">Book a Growth Call</a>
            <a href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer">WhatsApp Us</a>
            <Link to="/resources">Free Playbooks</Link>
            <span className="footer__hours">Mon–Sat · 10am–7pm IST</span>
          </div>
        </div>

        {/* —— Bottom bar —— */}
        <div className="footer__bottom">
          <span>© {year} 24K Media. We Build Internet Brands. · Made with care in India.</span>
          <div className="footer__legal">
            <Link to="/about">About</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/contact">Contact</Link>
            <button type="button" className="footer__backtop" onClick={toTop}>
              Back to top
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
