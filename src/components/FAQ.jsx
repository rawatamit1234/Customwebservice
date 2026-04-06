import { useReveal } from '../hooks/useReveal'

const faqs = [
  {
    q: 'How much will my project cost?',
    a: 'We price from agreed scope — not hourly surprises. After a short discovery call, you receive a written proposal with milestones and optional phases so you can stage investment.',
  },
  {
    q: 'How long does a typical build take?',
    a: 'Marketing sites often land in 4–8 weeks. SaaS MVPs vary by workflow depth; we give a range up front and flag dependencies (content, APIs, legal) early so dates stay honest.',
  },
  {
    q: 'What happens after launch?',
    a: 'You get handoff documentation and a stabilization window. Many clients choose a light retainer for updates, monitoring, and conversion experiments — but you are never locked in.',
  },
  {
    q: 'How do revisions work?',
    a: 'Revisions are batched per milestone so we stay efficient. Major scope changes get a change order in writing — no silent bill creep.',
  },
  {
    q: 'Do you offer ongoing support?',
    a: 'Yes — prioritized response, security updates, and small improvements. Retainers are month-to-month with clear hour banks.',
  },
  {
    q: 'Who owns the code?',
    a: 'You do, after final payment. We can transfer repos, environments, and credentials cleanly so your team or another vendor can take over.',
  },
  {
    q: 'Do you work with clients outside India?',
    a: 'Yes. We collaborate remotely with async updates, Loom or live calls, and shared docs. Proposals can be billed in INR or USD, with payment methods (UPI, bank transfer, cards, Wise, PayPal) spelled out before you commit.',
  },
]

export default function FAQ() {
  const { ref, visible } = useReveal()

  return (
    <section id="faq" ref={ref} className="scroll-mt-24 border-t border-slate-800/80 py-20 sm:py-24" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className={`reveal text-center ${visible ? 'is-visible' : ''}`}>
          <h2 id="faq-heading" className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Questions, answered
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Removing friction before you ever hit “send” on the form.
          </p>
        </div>

        <dl className={`reveal mt-12 space-y-4 ${visible ? 'is-visible' : ''}`}>
          {faqs.map((item) => (
            <div key={item.q} className="rounded-xl border border-slate-800 bg-slate-900/40 px-5 py-4">
              <dt className="font-semibold text-white">{item.q}</dt>
              <dd className="mt-2 text-sm text-slate-400 leading-relaxed">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
