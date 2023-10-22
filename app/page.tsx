export const dynamic = "force-dynamic";
import Hero from "./components/home/Hero";
import Categories from "./components/home/Categories";
import Features from "./components/home/Features";
import Testimonials from "./components/home/Testimonials";
import Footer from "./layout/Footer";
import ServerNav from "@/app/layout/ServerNav";

export default async function Home() {
  return (
    <main>
        <ServerNav />
      <Hero />
      <Categories />
      <Features />
      <Testimonials />
      <Footer />
    </main>
  );
}
