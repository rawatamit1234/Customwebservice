import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const fmtUsd = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

const fmtInr = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

const tiers = [
  {
    name: 'Launch',
    usdFrom: 4500,
    inrFrom: 375000,
    desc: 'High-converting marketing site or landing system for a focused offer.',
    features: [
      'Up to 6 sections / pages',
      'Mobile-first responsive UI',
      'Contact & analytics setup',
      '2 revision rounds',
      '30-day bugfix window',
      'Dedicated project manager',
      'Dedicated developer',
      'Unlimited task requests',
    ],
    cta: 'Book Launch',
    highlight: false,
  },
  {
    name: 'Growth',
    usdFrom: 12000,
    inrFrom: 999000,
    desc: 'Multi-page site or light web app with CMS, integrations, and SEO foundations.',
    features: [
      'Custom components & CMS',
      'Performance & Core Web Vitals',
      'Schema + on-page SEO',
      '4 revision rounds',
      '60-day support',
      'Dedicated project manager',
      'Dedicated developer',
      'Unlimited task requests',
    ],
    cta: 'Most popular — Get quote',
    highlight: true,
  },
  {
    name: 'Product',
    desc: 'SaaS MVP, dashboards, APIs, and ongoing roadmap partnership.',
    features: [
      'Auth, roles, billing hooks',
      'API design & documentation',
      'Staging + CI guidance',
      'Dedicated slack/email',
      'Retainer optional',
      'Dedicated project manager',
      'Dedicated developer',
      'Unlimited task requests',
    ],
    cta: 'Scope your build',
    highlight: false,
    custom: true,
  },
]

function defaultCurrency() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') return 'inr'
  } catch {
    /* ignore */
  }
  return 'usd'
}

export default function Pricing() {
  const { ref, visible } = useReveal()
  const [currency, setCurrency] = useState(defaultCurrency)

  const isInr = currency === 'inr'

  function priceLabel(tier) {
    if (tier.custom) return 'Custom'
    const n = isInr ? tier.inrFrom : tier.usdFrom
    return `From ${isInr ? fmtInr(n) : fmtUsd(n)}`
  }

  return (
    <section id="pricing" ref={ref} className="scroll-mt-24 py-20 sm:py-24" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className={`reveal mx-auto max-w-2xl text-center ${visible ? 'is-visible' : ''}`}>
          <h2 id="pricing-heading" className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Simple packages. Clear upgrades.
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Final quotes depend on scope — we scope in writing before your deposit.{' '}
            <span className="text-slate-500">Shown in</span>{' '}
            <span className="font-medium text-slate-300">{isInr ? 'Indian rupees' : 'US dollars'}</span>
            <span className="text-slate-500"> — switch anytime.</span>
          </p>
        </div>

        <div
          className={`reveal mx-auto mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 ${visible ? 'is-visible' : ''}`}
        >
          <span className={`text-sm font-semibold ${!isInr ? 'text-white' : 'text-slate-500'}`} id="pricing-currency-usd">
            USD ($)
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={isInr}
            aria-labelledby="pricing-currency-usd pricing-currency-inr"
            onClick={() => setCurrency(isInr ? 'usd' : 'inr')}
            className={`relative h-7 w-12 shrink-0 rounded-full border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950 ${
              isInr ? 'border-accent-500/60 bg-accent-500/20' : 'border-slate-600 bg-slate-800'
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                isInr ? 'left-6 translate-x-0' : 'left-1'
              }`}
            />
            <span className="sr-only">Show prices in {isInr ? 'US dollars' : 'Indian rupees'}</span>
          </button>
          <span className={`text-sm font-semibold ${isInr ? 'text-white' : 'text-slate-500'}`} id="pricing-currency-inr">
            INR (₹)
          </span>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`reveal relative flex flex-col rounded-2xl border p-8 ${
                tier.highlight
                  ? 'border-accent-500/60 bg-gradient-to-b from-accent-500/10 to-brand-950 shadow-xl shadow-accent-500/10 ring-1 ring-accent-500/30'
                  : 'border-slate-800 bg-brand-950/50'
              } ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: visible ? `${80 + i * 70}ms` : undefined }}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-500 px-3 py-1 text-xs font-bold text-brand-950">
                  Best for most teams
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-white">{tier.name}</h3>
              <p className="mt-2 font-display text-2xl font-bold text-accent-300">{priceLabel(tier)}</p>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">{tier.desc}</p>
              <ul className="mt-8 flex-1 space-y-3 text-sm text-slate-300">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-accent-400" aria-hidden>
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#quote"
                className={`mt-8 inline-flex justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950 ${
                  tier.highlight
                    ? 'bg-accent-500 text-brand-950 hover:bg-accent-400'
                    : 'border border-slate-600 text-white hover:border-accent-500/50 hover:bg-slate-800/50'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        <p className={`reveal mx-auto mt-8 max-w-2xl text-center text-xs text-slate-500 ${visible ? 'is-visible' : ''}`}>
          Indicative starting ranges only. GST may apply for India billing; international invoices are ex-tax unless agreed.
          We confirm currency and taxes in your proposal.
        </p>
      </div>
    </section>
  )
}
