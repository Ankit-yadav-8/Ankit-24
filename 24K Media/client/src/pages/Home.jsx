import Hero from '../components/sections/Hero.jsx'
import SocialProof from '../components/sections/SocialProof.jsx'
import ShowReel from '../components/sections/ShowReel.jsx'
import ServicesSection from '../components/sections/ServicesSection.jsx'
import IndustriesSection from '../components/sections/IndustriesSection.jsx'
import WhyUs from '../components/sections/WhyUs.jsx'
import Results from '../components/sections/Results.jsx'
import StorySection from '../components/sections/StorySection.jsx'
import PortfolioSection from '../components/sections/PortfolioSection.jsx'
import ProcessSection from '../components/sections/ProcessSection.jsx'
import ComparisonSection from '../components/sections/ComparisonSection.jsx'
import PricingSection from '../components/sections/PricingSection.jsx'
import FounderSection from '../components/sections/FounderSection.jsx'
import Testimonials from '../components/sections/Testimonials.jsx'
import ToolsSection from '../components/sections/ToolsSection.jsx'
import ResourcesSection from '../components/sections/ResourcesSection.jsx'
import FaqSection from '../components/sections/FaqSection.jsx'
import CTABand from '../components/sections/CTABand.jsx'

// The full home narrative, section by section (per the brief).
export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <ShowReel />
      <ServicesSection limit={6} />
      <IndustriesSection />
      <WhyUs />
      <Results />
      <StorySection />
      <PortfolioSection />
      <ProcessSection />
      <ComparisonSection />
      <PricingSection />
      <FounderSection />
      <Testimonials />
      <ToolsSection />
      <ResourcesSection />
      <FaqSection />
      <CTABand />
    </>
  )
}
