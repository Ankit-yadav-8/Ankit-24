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
import Seo, { SITE_URL } from '../components/Seo.jsx'

// A full, content-heavy landing: proof → promise → services → why → work →
// results → who we serve → story → process → partnerships → resources →
// voices → answers → CTA. Image-rich throughout.
export default function Home() {
  return (
    <div className="home">
      <Seo
        bare
        title="24K Media — We Build Internet Brands | Creator Growth Agency India"
        description="24K Media is the growth partner behind modern creators, founders and businesses — turning attention into authority, and authority into durable, monetisable internet brands."
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: '24K Media',
          url: `${SITE_URL}/`,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${SITE_URL}/resources?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        }}
      />
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
      <FaqSection withSchema />
      <CTABand />
    </div>
  )
}
