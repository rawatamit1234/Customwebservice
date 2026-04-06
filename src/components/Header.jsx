import { useEffect, useState } from 'react'
import { BookCallLink, WhatsAppLink } from './ContactShortcuts'

const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-300 ${
        scrolled ? 'bg-brand-950/90 shadow-lg shadow-black/20 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <a
          href="#top"
          className="font-display text-base font-bold tracking-tight text-white sm:text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950"
        >
          AScustom <span className="text-accent-400">web</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-400 transition hover:text-white focus:outline-none focus-visible:text-accent-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#quote"
            className="hidden rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-brand-950 shadow-lg shadow-accent-500/25 transition hover:bg-accent-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950 sm:inline-flex"
          >
            Get free quote
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-200 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            {open ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-slate-800 bg-brand-950/98 px-4 py-4 backdrop-blur-md md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile primary">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-slate-200 hover:bg-slate-800/80"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <BookCallLink className="w-full !py-3" />
              <WhatsAppLink className="w-full !justify-center !py-3">WhatsApp</WhatsAppLink>
            </div>
            <a
              href="#quote"
              className="mt-2 rounded-full bg-accent-500 py-3 text-center text-sm font-semibold text-brand-950"
              onClick={() => setOpen(false)}
            >
              Get free quote
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
