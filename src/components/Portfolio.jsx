import { useReveal } from '../hooks/useReveal'

const cases = [
  {
    name: 'Finscribe',
    type: 'B2B SaaS',
    problem: 'Prospects bounced on a slow marketing site; demo requests were flat.',
    solution: 'Rebuilt the funnel with clearer ICP messaging, interactive product previews, and sub-second LCP.',
    results: '+47% demo requests in 90 days · 62% faster landing load',
    tag: 'SaaS',
    image: '/portfolio/saas-dashboard.svg',
    imageAlt: 'Illustration: SaaS marketing site and dashboard concept',
  },
  {
    name: 'Harbor & Co.',
    type: 'Local services',
    problem: 'Outdated WordPress theme hurt mobile trust; calls leaked to competitors.',
    solution: 'Mobile-first redesign with click-to-call, review highlights, and local schema.',
    results: '+31% qualified calls · top 3 map pack for primary keyword',
    tag: 'Web',
    image: '/portfolio/local-business.svg',
    imageAlt: 'Illustration: local business website hero and layout concept',
  },
  {
    name: 'Pulse Athletics',
    type: 'E‑commerce',
    problem: 'Checkout friction and unclear shipping policy crushed conversion.',
    solution: 'Streamlined PDPs, sticky cart summary, and transparent delivery messaging.',
    results: '+18% checkout completion · lower support tickets',
    tag: 'E‑com',
    image: '/portfolio/ecommerce-store.svg',
    imageAlt: 'Illustration: ecommerce product grid and storefront concept',
  },
]

export default function Portfolio() {
  const { ref, visible } = useReveal()

  return (
    <section id="portfolio" ref={ref} className="scroll-mt-24 border-y border-slate-800/80 bg-slate-900/30 py-20 sm:py-24" aria-labelledby="portfolio-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className={`reveal flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${visible ? 'is-visible' : ''}`}>
          <div className="max-w-2xl">
            <h2 id="portfolio-heading" className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Selected work & outcomes
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Sample project narratives with visuals you can swap for real screenshots when ready — same layout, drop in
              your PNG or JPG.
            </p>
          </div>
          <a
            href="#quote"
            className="shrink-0 rounded-full border border-slate-600 px-5 py-2.5 text-sm font-semibold text-white hover:border-accent-500/50 hover:text-accent-300"
          >
            Start a similar project
          </a>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          {cases.map((c, i) => (
            <article
              key={c.name}
              className={`reveal flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-brand-950/60 ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: visible ? `${100 + i * 70}ms` : undefined }}
            >
              <div className="border-b border-slate-800/80 bg-slate-900/50 p-2">
                <img
                  src={c.image}
                  alt={c.imageAlt}
                  className="aspect-[5/3] w-full rounded-lg object-cover object-top"
                  width={800}
                  height={480}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">{c.name}</h3>
                    <p className="text-sm text-slate-500">{c.type}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-accent-500/15 px-3 py-1 text-xs font-semibold text-accent-300">
                    {c.tag}
                  </span>
                </div>
                <dl className="mt-6 space-y-4 text-sm leading-relaxed">
                  <div>
                    <dt className="font-semibold text-slate-500">Problem</dt>
                    <dd className="mt-1 text-slate-300">{c.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-500">Solution</dt>
                    <dd className="mt-1 text-slate-300">{c.solution}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-accent-400">Results</dt>
                    <dd className="mt-1 font-medium text-white">{c.results}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
