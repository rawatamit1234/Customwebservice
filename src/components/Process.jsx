import { useReveal } from '../hooks/useReveal'

const steps = [
  {
    n: '01',
    title: 'Discovery',
    body: 'We align on goals, audience, and success metrics — so we build what moves the needle, not assumptions.',
  },
  {
    n: '02',
    title: 'Planning',
    body: 'Sitemap, user flows, and a milestone plan. You see scope, timeline, and risks before a line of code.',
  },
  {
    n: '03',
    title: 'Development',
    body: 'Iterative builds with staging previews. You get frequent updates and a channel for feedback.',
  },
  {
    n: '04',
    title: 'Testing',
    body: 'Performance, accessibility, and cross-device QA — plus analytics checks so you can trust the data.',
  },
  {
    n: '05',
    title: 'Launch',
    body: 'Go-live, monitoring, and handoff docs. Optional training so your team owns day-two updates.',
  },
]

export default function Process() {
  const { ref, visible } = useReveal()

  return (
    <section id="process" ref={ref} className="scroll-mt-24 py-20 sm:py-24" aria-labelledby="process-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className={`reveal max-w-2xl ${visible ? 'is-visible' : ''}`}>
          <h2 id="process-heading" className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            A process that protects your timeline and budget
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Transparent phases, no surprise invoices. You always know what is happening next.
          </p>
        </div>

        <ol className="relative mt-16 space-y-0">
          <div className="absolute left-[1.125rem] top-4 bottom-4 hidden w-px bg-gradient-to-b from-accent-500/50 to-slate-800 md:block" aria-hidden />
          {steps.map((step, i) => (
            <li
              key={step.n}
              className={`reveal relative flex flex-col gap-4 pb-12 md:flex-row md:gap-10 md:pb-14 ${
                visible ? 'is-visible' : ''
              }`}
              style={{ transitionDelay: visible ? `${80 + i * 50}ms` : undefined }}
            >
              <div className="flex items-start gap-4 md:w-40 md:flex-shrink-0 md:flex-col md:items-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent-500/40 bg-brand-900 font-display text-sm font-bold text-accent-400 md:relative md:z-10">
                  {step.n}
                </span>
                <span className="font-display text-lg font-bold text-white md:hidden">{step.title}</span>
              </div>
              <div className="md:flex-1 md:pt-0.5">
                <h3 className="hidden font-display text-lg font-bold text-white md:block">{step.title}</h3>
                <p className="mt-0 text-slate-400 leading-relaxed md:mt-3">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
