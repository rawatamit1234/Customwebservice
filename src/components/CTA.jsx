import { useState } from 'react'
import { submitLead } from '../lib/leadApi'
import { useReveal } from '../hooks/useReveal'
import { BookCallLink, WhatsAppLink } from './ContactShortcuts'

const initial = { name: '', email: '', phone: '', message: '' }

function validate(values) {
  const errors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const phone = values.phone.trim()
  const message = values.message.trim()

  if (name.length < 2) errors.name = 'Enter your name (at least 2 characters).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.'
  if (phone && !/^[\d\s\-+().]{7,}$/.test(phone)) errors.phone = 'Enter a valid phone number or leave blank.'
  if (message.length < 10) errors.message = 'Tell us about your project (at least 10 characters).'

  return errors
}

export default function CTA() {
  const { ref, visible } = useReveal()
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverMessage, setServerMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setServerMessage('')
    const v = validate(values)
    setErrors(v)
    if (Object.keys(v).length) return

    setStatus('loading')
    try {
      const res = await submitLead({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        message: values.message.trim(),
        company: honeypot,
        source: 'cta_section',
      })
      setStatus('success')
      setServerMessage(res.message || 'Thank you — we will be in touch soon.')
      setValues(initial)
      setHoneypot('')
    } catch (err) {
      setStatus('error')
      if (err.errors) {
        const fieldErrors = {}
        Object.entries(err.errors).forEach(([key, msg]) => {
          fieldErrors[key] = msg
        })
        setErrors(fieldErrors)
      }
      setServerMessage(err.message || 'Something went wrong. Please try again.')
    }
  }

  const loading = status === 'loading'

  return (
    <section
      id="quote"
      ref={ref}
      className="scroll-mt-24 py-20 sm:py-24"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={`reveal overflow-hidden rounded-3xl border border-accent-500/20 bg-gradient-to-br from-brand-800/80 via-brand-900 to-brand-950 shadow-2xl shadow-black/40 ${
            visible ? 'is-visible' : ''
          }`}
        >
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-10 lg:p-12">
              <h2 id="cta-heading" className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Get a free quote — response within one business day
              </h2>
              <p className="mt-4 text-lg text-slate-400 leading-relaxed">
                Tell us what you are building. We reply with honest fit, a rough timeline, and next steps — no pressure,
                no spam sequences.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-slate-300">
                <li className="flex gap-2">
                  <span className="text-accent-400" aria-hidden>
                    ✓
                  </span>
                  NDA available on request
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-400" aria-hidden>
                    ✓
                  </span>
                  Written scope before you commit
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-400" aria-hidden>
                    ✓
                  </span>
                  Slots limited — we cap concurrent builds for quality
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-400" aria-hidden>
                    ✓
                  </span>
                  Remote-friendly — async updates, Loom walkthroughs, and calls when you need them
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-400" aria-hidden>
                    ✓
                  </span>
                  Invoices in <span className="text-slate-200">INR or USD</span> — UPI / bank / cards / Wise / PayPal as agreed
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <BookCallLink />
                <WhatsAppLink />
              </div>
            </div>

            <div className="border-t border-slate-700/80 bg-brand-950/50 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <p className="mb-5 text-sm text-slate-400">
                Or send the form — we reply within one business day at{' '}
                <a href="mailto:rawatamit865@gmail.com" className="text-accent-400 hover:text-accent-300">
                  rawatamit865@gmail.com
                </a>
                .
              </p>
              <form onSubmit={onSubmit} className="relative space-y-5" noValidate aria-busy={loading}>
                <div>
                  <label htmlFor="lead-name" className="block text-sm font-medium text-slate-300">
                    Name <span className="text-accent-400">*</span>
                  </label>
                  <input
                    id="lead-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={onChange}
                    className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-600 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                    placeholder="Alex Morgan"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'lead-name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="lead-name-error" className="mt-1.5 text-sm text-red-400" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="lead-email" className="block text-sm font-medium text-slate-300">
                    Email <span className="text-accent-400">*</span>
                  </label>
                  <input
                    id="lead-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={onChange}
                    className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-600 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                    placeholder="you@company.com"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'lead-email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="lead-email-error" className="mt-1.5 text-sm text-red-400" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="lead-phone" className="block text-sm font-medium text-slate-300">
                    Phone <span className="text-slate-500">(optional)</span>
                  </label>
                  <input
                    id="lead-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={onChange}
                    className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-600 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                    placeholder="+91 or +1 · include country code"
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    aria-describedby={errors.phone ? 'lead-phone-error' : undefined}
                  />
                  {errors.phone && (
                    <p id="lead-phone-error" className="mt-1.5 text-sm text-red-400" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="lead-message" className="block text-sm font-medium text-slate-300">
                    Project details <span className="text-accent-400">*</span>
                  </label>
                  <textarea
                    id="lead-message"
                    name="message"
                    rows={4}
                    value={values.message}
                    onChange={onChange}
                    className="mt-1.5 w-full resize-y rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-600 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                    placeholder="Goals, timeline, links to current site or competitors…"
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'lead-message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="lead-message-error" className="mt-1.5 text-sm text-red-400" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="lead-company">Company website</label>
                  <input
                    id="lead-company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {serverMessage && status === 'success' && (
                  <p className="rounded-xl bg-emerald-500/15 px-4 py-3 text-sm font-medium text-emerald-300" role="status">
                    {serverMessage}
                  </p>
                )}
                {serverMessage && status === 'error' && (
                  <p className="rounded-xl bg-red-500/15 px-4 py-3 text-sm font-medium text-red-300" role="alert">
                    {serverMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-accent-500 py-3.5 text-base font-semibold text-brand-950 shadow-lg shadow-accent-500/20 transition hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950"
                >
                  {loading ? 'Sending…' : 'Request my quote'}
                </button>

                <p className="text-center text-xs text-slate-500">
                  We use your details only to respond to this inquiry (see{' '}
                  <a href="#privacy-policy" className="text-accent-400/90 underline hover:text-accent-300">
                    privacy policy
                  </a>
                  ). No newsletter spam.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
