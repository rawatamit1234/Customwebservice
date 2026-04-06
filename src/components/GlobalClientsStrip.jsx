export default function GlobalClientsStrip() {
  return (
    <div className="border-b border-slate-800/80 bg-slate-900/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3.5 text-center text-sm text-slate-400 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-2 sm:text-left">
        <p>
          <span className="font-semibold text-slate-300">India &amp; worldwide —</span>{' '}
          same process, clear milestones, invoices in <span className="text-slate-300">INR or USD</span> to match your
          team.
        </p>
        <span className="hidden text-slate-700 sm:inline" aria-hidden>
          |
        </span>
        <p>
          <span className="font-medium text-accent-400/90">AScustom web</span> · replies within{' '}
          <span className="text-slate-300">1 business day</span>.
        </p>
      </div>
    </div>
  )
}
