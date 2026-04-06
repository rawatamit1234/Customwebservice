import { useReveal } from '../hooks/useReveal'
import { useCountUp } from '../hooks/useCountUp'

const logos = ['Northwind', 'PulseLab', 'Atlas', 'Meridian', 'Brightline', 'Kite']

function StatCell({ target, decimals, suffix, label }) {
  const { ref, value } = useCountUp(target, { decimals })
  const display = decimals > 0 ? Number(value).toFixed(decimals) : value

  return (
    <div ref={ref} className="text-center sm:text-left">
      <dt className="sr-only">{label}</dt>
      <dd className="font-display text-3xl font-bold text-accent-300 sm:text-4xl">
        {display}
        {suffix}
      </dd>
      <dd className="mt-1 text-sm text-slate-500">{label}</dd>
    </div>
  )
}

function HeroDashboard() {
  const bars = [
    { label: 'Lead conversion lift', pct: 84, accent: 'from-violet-500 to-accent-400', delay: '0.15s', stat: '+284%' },
    { label: 'Core Web Vitals', pct: 96, accent: 'from-emerald-600 to-emerald-400', delay: '0.45s', stat: 'Pass' },
    { label: 'Delivery on spec', pct: 92, accent: 'from-accent-600 to-accent-300', delay: '0.75s', stat: '98%' },
  ]

  return (
    <div className="hero-visual-enter relative">
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/15 bg-slate-900/90 p-8 shadow-2xl shadow-black/40 backdrop-blur-sm">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400 to-transparent"
          aria-hidden
        />
        <div className="animate-float absolute -right-1 -top-2 flex items-center gap-2 rounded-full border border-cyan-500/20 bg-brand-900/95 px-3 py-1.5 text-[0.7rem] font-bold text-slate-200 shadow-lg">
          <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
          Live pipeline
        </div>

        <p className="mb-6 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500">Engagement snapshot</p>

        <ul className="space-y-5">
          {bars.map((b) => (
            <li key={b.label}>
              <div className="mb-1.5 flex justify-between text-[0.72rem] font-semibold">
                <span className="text-slate-500">{b.label}</span>
                <span className="text-accent-300">{b.stat}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-md bg-slate-800/90">
                <div
                  className={`dash-bar-inner h-full rounded-md bg-gradient-to-r ${b.accent}`}
                  style={{ width: `${b.pct}%`, '--bar-delay': b.delay }}
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-700/80 bg-brand-950/60 py-4 text-center">
            <p className="font-hero text-3xl text-accent-300">48h</p>
            <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">Kickoff</p>
          </div>
          <div className="rounded-xl border border-slate-700/80 bg-brand-950/60 py-4 text-center">
            <p className="font-hero text-3xl text-emerald-400">A+</p>
            <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">Performance</p>
          </div>
        </div>

        <div className="animate-float-delayed absolute -bottom-1 -left-2 flex items-center gap-2 rounded-full border border-cyan-500/20 bg-brand-900/95 px-3 py-1.5 text-[0.7rem] font-bold text-slate-200 shadow-lg">
          <span className="text-emerald-400" aria-hidden>
            ✓
          </span>
          On-time delivery
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const { ref, visible } = useReveal()

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20"
      aria-labelledby="hero-heading"
    >
      <div className="hero-grid-bg pointer-events-none absolute inset-0 z-0" aria-hidden />
      <div
        className="pointer-events-none absolute -right-24 top-0 h-[min(28rem,55vw)] w-[min(28rem,55vw)] rounded-full bg-violet-500/15 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-[min(22rem,45vw)] w-[min(22rem,45vw)] rounded-full bg-accent-500/10 blur-[90px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p
              className="hero-line mb-5 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-accent-300"
              style={{ animationDelay: '0.08s' }}
            >
              <span className="h-px w-8 bg-accent-400" aria-hidden />
              Limited onboarding slots
            </p>

            <h1
              id="hero-heading"
              className="font-hero text-[clamp(2.6rem,8vw,4.75rem)] font-normal leading-[0.95] tracking-[0.04em] text-white uppercase"
            >
              <span className="hero-line block" style={{ animationDelay: '0.18s' }}>
                Websites &amp; software
              </span>
              <span className="hero-line block text-outline" style={{ animationDelay: '0.32s' }}>
                engineered to convert
              </span>
              <span className="hero-line block text-glow-accent" style={{ animationDelay: '0.46s' }}>
                not decorate
              </span>
            </h1>

            <p
              className="hero-line mt-7 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
              style={{ animationDelay: '0.58s' }}
            >
              Fast, credible experiences for startups and SMBs — with analytics, SEO-ready structure, and code your team
              can extend.
            </p>

            <div className="hero-line mt-10 flex flex-col gap-4 sm:flex-row sm:items-center" style={{ animationDelay: '0.68s' }}>
              <a
                href="#quote"
                className="inline-flex items-center justify-center rounded-md bg-accent-500 px-8 py-3.5 text-sm font-extrabold uppercase tracking-wider text-brand-950 shadow-[0_0_40px_rgba(34,211,238,0.25)] transition hover:-translate-y-0.5 hover:bg-accent-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950"
              >
                Get free quote
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center rounded-md border border-slate-600 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5 hover:border-accent-500/50 hover:text-accent-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950"
              >
                View portfolio
              </a>
            </div>
            <p
              className="hero-line mt-6 max-w-xl text-sm leading-relaxed text-slate-500"
              style={{ animationDelay: '0.78s' }}
            >
              <span className="text-slate-400">Amit &amp; Sandy</span> — websites &amp; software for teams in India and
              abroad. Invoices in <span className="text-slate-400">INR or USD</span>.
            </p>
          </div>

          <div className="lg:col-span-5">
            <HeroDashboard />
          </div>
        </div>

        <div className={`reveal mt-16 space-y-8 lg:mt-20 ${visible ? 'is-visible' : ''}`}>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500 md:text-left">
            Trusted by teams shipping real revenue
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-80 md:justify-between">
            {logos.map((name) => (
              <span
                key={name}
                className="font-hero text-base tracking-widest text-slate-600 transition hover:text-slate-400 sm:text-lg"
              >
                {name}
              </span>
            ))}
          </div>
          <dl className="grid grid-cols-1 gap-8 border-t border-cyan-500/10 pt-10 sm:grid-cols-3">
            <StatCell target={120} suffix="+" label="Products shipped" />
            <StatCell target={6} suffix=" yrs" label="Building for scale" />
            <StatCell target={4.9} decimals={1} suffix="★" label="Avg. client rating" />
          </dl>
        </div>
      </div>
    </section>
  )
}
