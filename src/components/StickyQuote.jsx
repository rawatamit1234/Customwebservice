export default function StickyQuote() {
  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden">
      <a
        href="#quote"
        className="pointer-events-auto flex w-full items-center justify-center rounded-full bg-accent-500 py-3.5 text-sm font-bold text-brand-950 shadow-2xl shadow-black/40 ring-2 ring-brand-950/20"
      >
        Get free quote
      </a>
    </div>
  )
}
