import Hero from '../components/sections/Hero.jsx'
import CreatorWall from '../components/sections/CreatorWall.jsx'
import SocialProof from '../components/sections/SocialProof.jsx'
import ShowReel from '../components/sections/ShowReel.jsx'
import ServicesSection from '../components/sections/ServicesSection.jsx'
import WhyUs from '../components/sections/WhyUs.jsx'
import PortfolioSection from '../components/sections/PortfolioSection.jsx'
import ProcessSection from '../components/sections/ProcessSection.jsx'
import PricingSection from '../components/sections/PricingSection.jsx'
import Testimonials from '../components/sections/Testimonials.jsx'
import FaqSection from '../components/sections/FaqSection.jsx'
import CTABand from '../components/sections/CTABand.jsx'

// A tighter home narrative — one focused scroll: proof → work → services →
// why us → process → pricing → social proof → answers → CTA.
// (Industries, story, comparison, founder, tools & resources now live on
// their dedicated pages so the landing page stays short and fast.)
export default function Home() {
  return (
    <>
      <Hero />
      <CreatorWall />
      <SocialProof />
      <ShowReel />
      <ServicesSection limit={6} />
      <WhyUs />
      <PortfolioSection />
      <ProcessSection />
      <PricingSection />
      <Testimonials />
      <FaqSection />
      <CTABand />
    </>
  )
}
