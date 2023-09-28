import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Service from "./Service";
import Reviews from "./Reviews";
import { getSession } from "@/app/supabase-server";

async function page({ params }: { params: { service: number } }) {
  const supabase = createServerComponentClient({ cookies });
  const session = (await getSession()) || null;

  const { data: service, error: serviceError } = await supabase
    .from("services")
    .select()
    .eq("id", params.service)
    .single();

  const { data: professional, error: professionalError } = await supabase
    .from("professionals")
    .select()
    .eq("id", service.professional_id)
    .single();
  if (serviceError || professionalError) {
    console.error(serviceError);
    console.error(professionalError);
    // redirect("/");
  }
  if (!serviceError && !professionalError && service && professional) {
    return (
      <main>
        <Service
          service={service}
          professional={professional}
          session={session}
        />
        <Reviews />
      </main>
    );
  }
}

export default page;
