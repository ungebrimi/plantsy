import { redirect } from "next/navigation";
import ServiceForm from "../components/ServiceForm";
import { Tables } from "@/database";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";
import React from "react";

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
    pricing_type: "Hourly",
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
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/*top green blur*/}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#bef264] to-[#d9f99d] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        {/* Content container */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 rounded-lg backdrop-blur bg-white/50 shadow-lg">
          <ServiceForm
            professional={professional}
            service={defaultForm}
            edit={false}
          />
        </div>
        {/*center green blur*/}
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#d9f99d] to-[#bef264] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        {/*bottom green blur*/}
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#d9f99d] to-[#bef264] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
