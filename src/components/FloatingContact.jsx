import { BookCallLink, WhatsAppLink } from './ContactShortcuts'
import { calendlyUrl } from '../config/contact'

export default function FloatingContact() {
  return (
    <div
      className="pointer-events-none fixed bottom-20 right-4 z-40 flex flex-col items-end gap-3 md:bottom-8 md:right-6"
      aria-label="Quick contact"
    >
      {calendlyUrl ? <BookCallLink className="pointer-events-auto shadow-lg shadow-black/30 !py-3" /> : null}
      <WhatsAppLink className="pointer-events-auto shadow-lg shadow-black/40 !rounded-full !px-4 !py-3.5 md:!px-5">
        <span className="hidden sm:inline">WhatsApp</span>
      </WhatsAppLink>
    </div>
  )
}
