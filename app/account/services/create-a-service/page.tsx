import { redirect } from "next/navigation";
import ServiceForm from "../components/ServiceForm";
import { Tables } from "@/database";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";

export default async function page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getSession();
  const { session } = data;

  if (!session) redirect("/");

  const { data: professional, error } = await supabase
    .from("professionals")
    .select()
    .eq("id", session.user.id)
    .single();
  if (error) console.error(error);

  const defaultForm: Tables<"services"> = {
    city: "",
    county: "",
    created_at: null,
    description: "",
    id: 0,
    images: null,
    keywords: [],
    price: 0,
    professional_id: professional.id,
    service_category: "",
    state: "",
    thumbnail: null,
    title: "",
    vat: 25,
    vat_included: false,
    zip: "",
  };

  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <ServiceForm
        professional={professional}
        service={defaultForm}
        edit={false}
      />
    </div>
  );
}
