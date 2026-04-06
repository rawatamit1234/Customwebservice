/** @type {string} Calendly booking URL — set in Netlify: VITE_CALENDLY_URL */
export const calendlyUrl = (import.meta.env.VITE_CALENDLY_URL || '').trim()

export const WHATSAPP_E164 = '919548493378'

const defaultWaText = encodeURIComponent(
  "Hi AScustom web — Rawat & Sandy, I'd like to discuss a website or software project.",
)

export const whatsappHref = `https://wa.me/${WHATSAPP_E164}?text=${defaultWaText}`

function trimEnv(key) {
  return (import.meta.env[key] || '').trim()
}

const DEFAULT_LINKEDIN = 'https://www.linkedin.com/in/amitrawatuk01/'
const DEFAULT_GITHUB = 'https://github.com/rawatamit1234'

/** Env vars override these defaults; dribbble/instagram stay env-only */
export const social = {
  linkedin: trimEnv('VITE_SOCIAL_LINKEDIN') || DEFAULT_LINKEDIN,
  github: trimEnv('VITE_SOCIAL_GITHUB') || DEFAULT_GITHUB,
  dribbble: trimEnv('VITE_SOCIAL_DRIBBBLE'),
  instagram: trimEnv('VITE_SOCIAL_INSTAGRAM'),
}
