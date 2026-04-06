import { useReveal } from '../hooks/useReveal'

const items = [
  {
    title: 'Web development',
    desc: 'Marketing sites and web apps that load fast, rank well, and guide visitors to contact you — not bounce.',
    benefits: ['Performance-first builds', 'CMS you can actually use', 'Analytics & conversion tracking'],
    cta: 'Discuss your site',
  },
  {
    title: 'SaaS & custom software',
    desc: 'From MVP to v2: auth, billing, dashboards, and APIs your team can extend without a rewrite every year.',
    benefits: ['Secure, documented APIs', 'Scalable architecture', 'CI-ready codebase'],
    cta: 'Plan your product',
  },
  {
    title: 'UI / UX design',
    desc: 'Interfaces that reduce friction: clear hierarchy, persuasive flows, and accessibility baked in from day one.',
    benefits: ['User-tested patterns', 'Design systems', 'Dev-ready handoff'],
    cta: 'See design process',
  },
  {
    title: 'Care & maintenance',
    desc: 'Stay fast and safe after launch: updates, monitoring, and small improvements that compound over time.',
    benefits: ['Uptime & security patches', 'Speed budgets', 'Priority support channel'],
    cta: 'Ask about retainers',
  },
]

export default function Services() {
  const { ref, visible } = useReveal()

  return (
    <section id="services" ref={ref} className="scroll-mt-24 py-20 sm:py-24" aria-labelledby="services-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className={`reveal max-w-2xl ${visible ? 'is-visible' : ''}`}>
          <h2 id="services-heading" className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to launch and grow online
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Not getting leads from your website? Outdated design hurting trust? We fix the funnel — strategy, design,
            and engineering in one partner.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {items.map((item, i) => (
            <article
              key={item.title}
              className={`reveal group rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-brand-950 p-8 transition hover:border-accent-500/40 hover:shadow-lg hover:shadow-accent-500/5 ${
                visible ? 'is-visible' : ''
              }`}
              style={{ transitionDelay: visible ? `${120 + i * 60}ms` : undefined }}
            >
              <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-slate-400 leading-relaxed">{item.desc}</p>
              <ul className="mt-6 space-y-2">
                {item.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="mt-0.5 text-accent-400" aria-hidden>
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href="#quote"
                className="mt-8 inline-flex items-center text-sm font-semibold text-accent-400 transition group-hover:text-accent-300"
              >
                {item.cta}
                <span className="ml-1 transition group-hover:translate-x-0.5" aria-hidden>
                  →
                </span>
              </a>
            </article>
          ))}
        </div>

        <div className={`reveal mt-16 rounded-2xl border border-slate-800 bg-brand-800/40 p-8 sm:p-10 ${visible ? 'is-visible' : ''}`}>
          <h3 className="font-display text-xl font-bold text-white sm:text-2xl">Why teams choose us</h3>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Fast delivery', d: 'Milestones you can plan around — no black-box timelines.' },
              { t: 'Clean, scalable code', d: 'Readable patterns your future devs will thank you for.' },
              { t: 'SEO-ready foundations', d: 'Technical SEO, metadata, and performance budgets built in.' },
              { t: 'Ongoing support', d: 'We do not disappear after launch — retainers available.' },
            ].map((x) => (
              <li key={x.t}>
                <p className="font-semibold text-white">{x.t}</p>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{x.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
