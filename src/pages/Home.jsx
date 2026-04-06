import Header from '../components/Header'
import CursorGlow from '../components/CursorGlow'
import Hero from '../components/Hero'
import MarqueeTicker from '../components/MarqueeTicker'
import GlobalClientsStrip from '../components/GlobalClientsStrip'
import Services from '../components/Services'
import Portfolio from '../components/Portfolio'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import StickyQuote from '../components/StickyQuote'
import FloatingContact from '../components/FloatingContact'

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent-500 focus:px-4 focus:py-2 focus:text-brand-950 focus:font-semibold"
      >
        Skip to main content
      </a>
      <CursorGlow />
      <Header />
      <main id="main">
        <Hero />
        <MarqueeTicker />
        <GlobalClientsStrip />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <FloatingContact />
      <StickyQuote />
    </>
  )
}
