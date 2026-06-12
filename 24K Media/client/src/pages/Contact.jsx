import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Magnetic from '../components/ui/Magnetic.jsx'
import { submitLead } from '../api/client.js'
import { useSite } from '../context/SiteContext.jsx'

const EMPTY = { name: '', email: '', company: '', revenue: '', goal: '', budget: '', message: '' }

const ease = [0.22, 1, 0.36, 1]
const I = (paths) => () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{paths}</svg>
)
const UserIcon = I(<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>)
const MailIcon = I(<><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" /></>)
const BuildingIcon = I(<><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h6" /></>)
const TrendIcon = I(<><polyline points="3 17 9 11 13 15 21 7" /><polyline points="15 7 21 7 21 13" /></>)
const TargetIcon = I(<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>)
const WalletIcon = I(<><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /><circle cx="17" cy="14" r="1.2" /></>)
const ChatIcon = I(<><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-4.5A8.4 8.4 0 1 1 21 11.5z" /></>)
const WaIcon = I(<><path d="M21 11.5a8.4 8.4 0 0 1-12.5 7.4L3 21l2.1-5.5A8.4 8.4 0 1 1 21 11.5z" /><path d="M8.5 9.5c0 3 2 5 5 5" /></>)
const CalIcon = I(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></>)
const ClockIcon = I(<><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></>)
const ArrowIcon = I(<><line x1="7" y1="17" x2="17" y2="7" /><polyline points="8 7 17 7 17 16" /></>)

export default function Contact() {
  const { company } = useSite()
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [feedback, setFeedback] = useState('')

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setFeedback('')
    const res = await submitLead(form)
    if (res.ok) {
      setStatus('success')
      setFeedback(res.message)
      setForm(EMPTY)
    } else {
      setStatus('error')
      setFeedback(res.error)
    }
  }

  const wa = `https://wa.me/${(company?.whatsapp || '').replace(/[^0-9]/g, '')}`
  const methods = [
    { key: 'email', accent: 'blue', Icon: MailIcon, label: 'Email us', value: company.email, href: `mailto:${company.email}`, cta: 'Write to us' },
    { key: 'wa', accent: 'green', Icon: WaIcon, label: 'WhatsApp', value: 'Quick replies, every day', href: wa, cta: 'Click to chat', ext: true },
    { key: 'cal', accent: 'purple', Icon: CalIcon, label: 'Book directly', value: 'Grab a slot on the calendar', href: company.calendly, cta: 'Open Calendly', ext: true },
  ]

  return (
    <>
      <PageHeader
        eyebrow="Book Growth Call"
        title={<>Let’s map your <span className="gold-fill italic-serif">next 90 days.</span></>}
        text="Tell us where you are and where you want to be. We reply within one business day — no pitch deck, just a plan."
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="contact__wrap">
            <Reveal className="contact__aside">
              {methods.map((m) => {
                const Ico = m.Icon
                return (
                  <a
                    key={m.key}
                    className={`contact__method accent-${m.accent}`}
                    href={m.href}
                    {...(m.ext ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    <span className="contact__method-ico"><Ico /></span>
                    <span className="contact__method-txt">
                      <b>{m.label}</b>
                      <em>{m.value}</em>
                    </span>
                    <span className="contact__method-cta">{m.cta} <ArrowIcon /></span>
                  </a>
                )
              })}

              <div className="contact__promise">
                <span className="contact__promise-ico"><ClockIcon /></span>
                <div>
                  <b>Response within 1 business day</b>
                  <p>A real strategist reads every enquiry — you’ll never hit a bot.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="card contact-form">
              <span className="card-gold-line" />
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    className="form-success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="form-success__icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem' }}>Request received.</h3>
                    <p className="text-soft" style={{ marginTop: '0.6rem' }}>{feedback}</p>
                    <button className="btn btn--ghost btn--sm" style={{ marginTop: '1.6rem' }} onClick={() => setStatus('idle')}>Send another</button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="contact-form__head">
                      <span className="eyebrow">Project brief</span>
                      <h3>Start your growth plan</h3>
                    </div>

                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="name">Name *</label>
                        <div className="field__wrap">
                          <span className="field__ico"><UserIcon /></span>
                          <input id="name" name="name" value={form.name} onChange={update} required placeholder="Your name" />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="email">Email *</label>
                        <div className="field__wrap">
                          <span className="field__ico"><MailIcon /></span>
                          <input id="email" name="email" type="email" value={form.email} onChange={update} required placeholder="you@brand.com" />
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="company">Company / Channel</label>
                        <div className="field__wrap">
                          <span className="field__ico"><BuildingIcon /></span>
                          <input id="company" name="company" value={form.company} onChange={update} placeholder="Brand or handle" />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="revenue">Monthly Revenue</label>
                        <div className="field__wrap">
                          <span className="field__ico"><TrendIcon /></span>
                          <select id="revenue" name="revenue" value={form.revenue} onChange={update}>
                            <option value="">Select…</option>
                            <option>Pre-revenue</option>
                            <option>₹0 – ₹5L</option>
                            <option>₹5L – ₹25L</option>
                            <option>₹25L – ₹1Cr</option>
                            <option>₹1Cr+</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="goal">Primary Goal</label>
                        <div className="field__wrap">
                          <span className="field__ico"><TargetIcon /></span>
                          <input id="goal" name="goal" value={form.goal} onChange={update} placeholder="e.g. Grow YouTube to 1M" />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="budget">Monthly Budget</label>
                        <div className="field__wrap">
                          <span className="field__ico"><WalletIcon /></span>
                          <select id="budget" name="budget" value={form.budget} onChange={update}>
                            <option value="">Select…</option>
                            <option>₹50k – ₹1L</option>
                            <option>₹1L – ₹3L</option>
                            <option>₹3L – ₹7L</option>
                            <option>₹7L+</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="field">
                      <label htmlFor="message">Message</label>
                      <div className="field__wrap field__wrap--area">
                        <span className="field__ico"><ChatIcon /></span>
                        <textarea id="message" name="message" value={form.message} onChange={update} placeholder="Tell us what you’re building…" />
                      </div>
                    </div>

                    {status === 'error' && <div className="form-error">{feedback}</div>}

                    <Magnetic strength={0.2}>
                      <button type="submit" className="btn btn--gold btn--lg contact-form__submit" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Sending…' : (<>Book Growth Call <ArrowIcon /></>)}
                      </button>
                    </Magnetic>
                    <p className="form-note">By submitting, you agree to be contacted about your enquiry. We never share your details.</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
