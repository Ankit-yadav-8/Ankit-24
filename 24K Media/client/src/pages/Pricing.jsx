import PageHeader from '../components/ui/PageHeader.jsx'
import PricingSection from '../components/sections/PricingSection.jsx'
import ComparisonSection from '../components/sections/ComparisonSection.jsx'
import FaqSection from '../components/sections/FaqSection.jsx'
import CTABand from '../components/sections/CTABand.jsx'

export default function Pricing() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title={<>Plans that scale <span className="gold-fill italic-serif">with your ambition.</span></>}
        text="Transparent monthly engagements with a dedicated team and full ownership of every asset."
        crumbs={[{ label: 'Pricing' }]}
      />
      <PricingSection withHead={false} />
      <ComparisonSection />
      <FaqSection />
      <CTABand />
    </>
  )
}
