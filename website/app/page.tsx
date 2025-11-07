import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import HowItWorks from '@/components/home/HowItWorks'
import Benefits from '@/components/home/Benefits'
import Stats from '@/components/home/Stats'
import Testimonials from '@/components/home/Testimonials'
import CTA from '@/components/home/CTA'
import BackgroundAnimation from '@/components/BackgroundAnimation'

export default function Home() {
  return (
    <>
      <BackgroundAnimation />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <CTA />
    </>
  )
}
