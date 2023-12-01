import Hero from "./components/home/Hero";
import Categories from "./components/home/Categories";
import Features from "./components/home/Features";
import CTA from "@/app/components/general/CTA";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: serviceCategories, error } = await supabase
    .from("service_categories")
    .select("*");

  return (
    <div>
      <Hero serviceCategories={serviceCategories} />
      <Categories />
      <Features />
      <CTA />
    </div>
  );
}
