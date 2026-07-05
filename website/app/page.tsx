import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import HowItWorks from '@/components/home/HowItWorks'
import ExampleWalkthrough from '@/components/home/ExampleWalkthrough'
import Benefits from '@/components/home/Benefits'
import Stats from '@/components/home/Stats'
import Testimonials from '@/components/home/Testimonials'
import CTA from '@/components/home/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <ExampleWalkthrough />
      <Benefits />
      <Testimonials />
      <CTA />
    </>
  )
}
