import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getSession } from "@/app/supabase-server";
import { redirect } from "next/navigation";
import ServiceForm from "../components/ServiceForm";
import { Tables } from "@/database";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });
  const session = (await getSession()) || null;

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
    vat: 0,
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
