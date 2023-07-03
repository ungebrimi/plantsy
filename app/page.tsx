import Hero from './components/home/Hero'
import Categories from './components/home/Categories'
import Features from './components/home/Features'
import Testimonials from './components/home/Testimonials'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Hero />
      <Categories />
      <Features />
      <Testimonials />
    </main>
  )
}
