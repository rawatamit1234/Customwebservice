import { social, whatsappHref } from '../config/contact'

const socialItems = [
  { label: 'LinkedIn', href: social.linkedin },
  { label: 'GitHub', href: social.github },
  { label: 'Dribbble', href: social.dribbble },
  { label: 'Instagram', href: social.instagram },
].filter((item) => item.href)

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-brand-950 py-14" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg font-bold text-white">
              AScustom <span className="text-accent-400">web</span>
            </p>
            <p className="mt-1 text-xs font-medium text-slate-500">Rawat &amp; Sandy · custom websites &amp; software</p>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
              Built for leads, speed, and code you can grow on — working with clients in India and worldwide, with
              invoices in <span className="text-slate-400">INR or USD</span> when it suits your team.
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-600">Payments we support</p>
            <p className="mt-2 text-sm text-slate-400">
              India: <span className="text-slate-300">UPI</span>, bank transfer, cards · International:{' '}
              <span className="text-slate-300">cards</span>, <span className="text-slate-300">Wise</span>,{' '}
              <span className="text-slate-300">PayPal</span> (as agreed in your proposal)
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Navigate</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href="#services" className="text-slate-400 hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="text-slate-400 hover:text-white">
                    Work
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-slate-400 hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#quote" className="text-slate-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contact</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li>
                  <a href="mailto:rawatamit865@gmail.com" className="break-all hover:text-white">
                    rawatamit865@gmail.com
                  </a>
                </li>
                <li>
                  <a href="mailto:Sb79079@gmail.com" className="break-all hover:text-white">
                    Sb79079@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+919548493378" className="hover:text-white">
                    +91 95484 93378
                  </a>
                </li>
                <li>
                  <a href="tel:+918755327242" className="hover:text-white">
                    +91 8755327242
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#25D366] hover:text-[#34eb75]"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Social</h3>
              {socialItems.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-4 text-sm">
                  {socialItems.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-accent-400"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
                  Add your profile links in Netlify: <span className="text-slate-500">VITE_SOCIAL_LINKEDIN</span>,{' '}
                  <span className="text-slate-500">VITE_SOCIAL_GITHUB</span>, etc. (see <code className="text-xs">.env.example</code>
                  ).
                </p>
              )}
              <ul className="mt-6 space-y-2 border-t border-slate-800 pt-4 text-sm">
                <li>
                  <a href="#privacy-policy" className="text-slate-500 hover:text-accent-400">
                    Privacy policy
                  </a>
                </li>
                <li>
                  <a href="#terms-of-service" className="text-slate-500 hover:text-accent-400">
                    Terms of service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AScustom web · Amit &amp; Sandy. All rights reserved.</p>
          <p className="text-slate-600">Replies within one business day · proposals in INR or USD</p>
        </div>

        <div id="privacy-policy" className="scroll-mt-28 border-t border-slate-800/80 pt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Privacy policy</h2>
          <p className="mt-3 max-w-3xl text-xs leading-relaxed text-slate-600">
            We use the information you submit (name, email, phone, project details) only to respond to your inquiry and,
            if you become a client, to deliver our services. We do not sell your data. Messages sent through our contact
            form are processed on our infrastructure; you may request deletion of your inquiry at any time by emailing{' '}
            <a href="mailto:rawatamit865@gmail.com" className="text-slate-500 underline hover:text-accent-400">
              rawatamit865@gmail.com
            </a>
            . For international clients, we aim to handle personal data consistent with common expectations for B2B
            inquiries; contact us for a full policy or DPA if your organisation requires one.
          </p>
        </div>

        <div id="terms-of-service" className="scroll-mt-28 mt-8 border-t border-slate-800/80 pt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Terms of service</h2>
          <p className="mt-3 max-w-3xl text-xs leading-relaxed text-slate-600">
            This website describes our services in general terms; a written statement of work or proposal governs each
            engagement. Pricing on this site is indicative. Payment terms, deliverables, intellectual property
            transfer, and warranties are defined per project in your contract. By submitting the contact form you agree
            we may reply using the contact details you provide.
          </p>
        </div>
      </div>
    </footer>
  )
}
