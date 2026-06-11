import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Magnetic from '../components/ui/Magnetic.jsx'
import { submitLead } from '../api/client.js'
import { useSite } from '../context/SiteContext.jsx'

const EMPTY = { name: '', email: '', company: '', revenue: '', goal: '', budget: '', message: '' }

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
              <div className="card contact__card">
                <h4>Email</h4>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </div>
              <div className="card contact__card">
                <h4>WhatsApp</h4>
                <a href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer">Click to chat</a>
              </div>
              <div className="card contact__card">
                <h4>Book directly</h4>
                <a href={company.calendly} target="_blank" rel="noreferrer">Open Calendly →</a>
              </div>
              <div className="card contact__card" style={{ background: 'var(--gold-soft)', borderColor: 'var(--gold-soft)' }}>
                <h4 style={{ color: 'var(--gold)' }}>Response time</h4>
                <p>Within one business day, every time.</p>
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
                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="name">Name *</label>
                        <input id="name" name="name" value={form.name} onChange={update} required placeholder="Your name" />
                      </div>
                      <div className="field">
                        <label htmlFor="email">Email *</label>
                        <input id="email" name="email" type="email" value={form.email} onChange={update} required placeholder="you@brand.com" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="company">Company / Channel</label>
                        <input id="company" name="company" value={form.company} onChange={update} placeholder="Brand or handle" />
                      </div>
                      <div className="field">
                        <label htmlFor="revenue">Monthly Revenue</label>
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
                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="goal">Primary Goal</label>
                        <input id="goal" name="goal" value={form.goal} onChange={update} placeholder="e.g. Grow YouTube to 1M" />
                      </div>
                      <div className="field">
                        <label htmlFor="budget">Monthly Budget</label>
                        <select id="budget" name="budget" value={form.budget} onChange={update}>
                          <option value="">Select…</option>
                          <option>₹50k – ₹1L</option>
                          <option>₹1L – ₹3L</option>
                          <option>₹3L – ₹7L</option>
                          <option>₹7L+</option>
                        </select>
                      </div>
                    </div>
                    <div className="field">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" name="message" value={form.message} onChange={update} placeholder="Tell us what you’re building…" />
                    </div>

                    {status === 'error' && <div className="form-error">{feedback}</div>}

                    <Magnetic strength={0.2}>
                      <button type="submit" className="btn btn--gold btn--lg" disabled={status === 'loading'} style={{ marginTop: '0.6rem' }}>
                        {status === 'loading' ? 'Sending…' : 'Book Growth Call'}
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
