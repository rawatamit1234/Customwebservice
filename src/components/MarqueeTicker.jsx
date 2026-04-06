const items = [
  'Web development',
  'SaaS platforms',
  'UI / UX',
  'Performance',
  'SEO foundations',
  'APIs & integrations',
  'Launch support',
]

export default function MarqueeTicker() {
  const loop = [...items, ...items]

  return (
    <div className="overflow-hidden border-y border-cyan-500/10 bg-cyan-500/[0.03] py-2.5" role="presentation">
      <div className="ticker-track flex w-max">
        {loop.map((label, i) => (
          <span key={`${label}-${i}`} className="flex shrink-0 items-center">
            <span className="px-8 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-slate-500">
              {label}
            </span>
            <span className="text-[0.45rem] text-accent-400" aria-hidden>
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
