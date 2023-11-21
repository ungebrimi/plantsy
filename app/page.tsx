import Hero from "./components/home/Hero";
import Categories from "./components/home/Categories";
import Features from "./components/home/Features";
import CTA from "@/app/components/general/CTA";

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <Features />
      <CTA />
    </div>
  );
}
