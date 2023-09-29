import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import ClientPage from "./ClientPage";
import { cookies } from "next/headers";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });
  const { data: services, error: servicesError } = await supabase
    .from("services")
    .select();
  const { data: categories, error: categoriesError } = await supabase
    .from("service_categories")
    .select();

  if (servicesError) console.error(servicesError);
  if (services) {
    return <ClientPage serverServices={services} categories={categories} />;
  }
}
