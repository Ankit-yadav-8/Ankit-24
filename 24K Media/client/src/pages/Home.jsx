import Hero from '../components/sections/Hero.jsx'
import CreatorWall from '../components/sections/CreatorWall.jsx'
import SocialProof from '../components/sections/SocialProof.jsx'
import MergeBand from '../components/sections/MergeBand.jsx'
import ServicesSection from '../components/sections/ServicesSection.jsx'
import WhyUs from '../components/sections/WhyUs.jsx'
import ShowReel from '../components/sections/ShowReel.jsx'
import PortfolioSection from '../components/sections/PortfolioSection.jsx'
import Results from '../components/sections/Results.jsx'
import IndustriesSection from '../components/sections/IndustriesSection.jsx'
import StorySection from '../components/sections/StorySection.jsx'
import ProcessSection from '../components/sections/ProcessSection.jsx'
import CollaborationsSection from '../components/sections/CollaborationsSection.jsx'
import ResourcesSection from '../components/sections/ResourcesSection.jsx'
import Testimonials from '../components/sections/Testimonials.jsx'
import FaqSection from '../components/sections/FaqSection.jsx'
import CTABand from '../components/sections/CTABand.jsx'

// A full, content-heavy landing: proof → promise → services → why → work →
// results → who we serve → story → process → partnerships → resources →
// voices → answers → CTA. Image-rich throughout.
export default function Home() {
  return (
    <div className="home">
      <Hero />
      <CreatorWall />
      <SocialProof />
      <MergeBand />
      <ServicesSection limit={6} />
      <WhyUs />
      <ShowReel />
      <PortfolioSection limit={6} />
      <Results />
      <IndustriesSection />
      <StorySection />
      <ProcessSection />
      <CollaborationsSection />
      <ResourcesSection />
      <Testimonials />
      <FaqSection />
      <CTABand />
    </div>
  )
}
