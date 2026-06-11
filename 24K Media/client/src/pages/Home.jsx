import Hero from '../components/sections/Hero.jsx'
import SocialProof from '../components/sections/SocialProof.jsx'
import ShowReel from '../components/sections/ShowReel.jsx'
import ServicesSection from '../components/sections/ServicesSection.jsx'
import WhyUs from '../components/sections/WhyUs.jsx'
import Results from '../components/sections/Results.jsx'
import StorySection from '../components/sections/StorySection.jsx'
import PortfolioSection from '../components/sections/PortfolioSection.jsx'
import FounderSection from '../components/sections/FounderSection.jsx'
import Testimonials from '../components/sections/Testimonials.jsx'
import ProcessSection from '../components/sections/ProcessSection.jsx'
import ResourcesSection from '../components/sections/ResourcesSection.jsx'
import CTABand from '../components/sections/CTABand.jsx'

// The full home narrative, section by section (per the brief).
export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <ShowReel />
      <ServicesSection limit={6} />
      <WhyUs />
      <Results />
      <StorySection />
      <PortfolioSection />
      <ProcessSection />
      <FounderSection />
      <Testimonials />
      <ResourcesSection />
      <CTABand />
    </>
  )
}
