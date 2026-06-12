import Hero from '../components/sections/Hero.jsx'
import CreatorWall from '../components/sections/CreatorWall.jsx'
import SocialProof from '../components/sections/SocialProof.jsx'
import ServicesSection from '../components/sections/ServicesSection.jsx'
import WhyUs from '../components/sections/WhyUs.jsx'
import StorySection from '../components/sections/StorySection.jsx'
import CollaborationsSection from '../components/sections/CollaborationsSection.jsx'
import PricingSection from '../components/sections/PricingSection.jsx'
import Testimonials from '../components/sections/Testimonials.jsx'
import FaqSection from '../components/sections/FaqSection.jsx'
import CTABand from '../components/sections/CTABand.jsx'

// Short, focused home: proof → services → why → partnerships → pricing →
// voices → answers → CTA. (ShowReel, Portfolio & Process now live only on
// their own pages so the landing stays tight; brand partnerships moved here.)
export default function Home() {
  return (
    <>
      <Hero />
      <CreatorWall />
      <SocialProof />
      <ServicesSection limit={6} />
      <WhyUs />
      <StorySection />
      <CollaborationsSection />
      <PricingSection />
      <Testimonials />
      <FaqSection />
      <CTABand />
    </>
  )
}
