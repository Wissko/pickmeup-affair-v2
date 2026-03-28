import Loader from '@/components/Loader'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import PhotoBreak from '@/components/PhotoBreak'
import Experiences from '@/components/Experiences'
import Gallery from '@/components/Gallery'
import Occasions from '@/components/Occasions'
import Workshops from '@/components/Workshops'
import Markets from '@/components/Markets'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Loader />
      <Nav />
      <main>
        <Hero />
        <About />
        <PhotoBreak
          src="/images/spoon.jpg"
          alt="Tiramisu portion lifted on a palette knife"
          quote="Every dessert is a small act of care. We take that seriously."
          quoteSource="Pick Me Up Affair"
          objectPosition="center 40%"
          tint="rgba(10,8,6,0.55)"
        />
        <Experiences />
        <Gallery />
        <PhotoBreak
          src="/images/events.jpg"
          alt="Just Married tiramisu wedding cake"
          quote="The centrepiece that guests photograph before they eat."
          quoteSource="Wedding Creations"
          objectPosition="center 30%"
          tint="rgba(10,8,6,0.5)"
        />
        <Occasions />
        <Workshops />
        <Markets />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
