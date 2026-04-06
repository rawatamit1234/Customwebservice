import { useReveal } from '../hooks/useReveal'

const quotes = [
  {
    text: 'They turned our vague “we need a better site” into a pipeline. Leads doubled within two months — and the codebase is actually maintainable.',
    name: 'Sarah Chen',
    role: 'COO, Finscribe',
  },
  {
    text: 'Clear communication, no jargon. We shipped our MVP on time and had five serious conversations before public launch.',
    name: 'Marcus Webb',
    role: 'Founder, Ledgerly',
  },
  {
    text: 'Our old site embarrassed us on mobile. Now load times are fast, and customers comment that we “look like a real company.” That matters in our market.',
    name: 'Elena Ruiz',
    role: 'Owner, Harbor & Co.',
  },
]

export default function Testimonials() {
  const { ref, visible } = useReveal()

  return (
    <section ref={ref} className="border-y border-slate-800/80 bg-slate-900/20 py-20 sm:py-24" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className={`reveal text-center ${visible ? 'is-visible' : ''}`}>
          <h2 id="testimonials-heading" className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What clients say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Social proof you can verify — we are happy to introduce you to past clients when you are serious about a fit.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <blockquote
              key={q.name}
              className={`reveal flex h-full flex-col rounded-2xl border border-slate-800 bg-brand-950/70 p-8 ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: visible ? `${100 + i * 80}ms` : undefined }}
            >
              <p className="flex-1 text-slate-300 leading-relaxed">&ldquo;{q.text}&rdquo;</p>
              <footer className="mt-6 border-t border-slate-800 pt-6">
                <cite className="not-italic">
                  <span className="font-semibold text-white">{q.name}</span>
                  <span className="mt-1 block text-sm text-slate-500">{q.role}</span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
