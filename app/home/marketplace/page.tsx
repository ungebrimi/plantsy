import ClientPage from "./ClientPage";
import { cookies } from "next/headers";
import {redirect} from "next/navigation";
import {createServerClient} from "@supabase/ssr";

export default async function page() {
  const cookieStore = cookies()

  const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }
  )
  const { data: session, error } = await supabase.auth.getSession()

  const { data: services, error: servicesError } = await supabase
    .from("services")
    .select();
  const { data: categories, error: categoriesError } = await supabase
    .from("service_categories")
    .select();

  if (servicesError) console.error(servicesError);
  if(categoriesError) console.error(categoriesError)
  if (services && categories) {
    return <ClientPage serverServices={services} categories={categories} />;
  }
  else {
    redirect("/")
  }
}
