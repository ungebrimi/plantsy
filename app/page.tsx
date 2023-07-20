import Hero from './components/home/Hero'
import Categories from './components/home/Categories'
import Features from './components/home/Features'
import Testimonials from './components/home/Testimonials'
import Navigation from './layout/Navigation'
import Footer from './layout/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Categories />
      <Features />
      <Testimonials />
      <Footer />
    </main>
  )
}
