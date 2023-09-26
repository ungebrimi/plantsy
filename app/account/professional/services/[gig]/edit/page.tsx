import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ServiceForm from "../../components/ServiceForm";

async function page({ params }: { params: { gig: number } }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: service, error: serviceError } = await supabase
    .from("services")
    .select()
    .eq("id", params.gig)
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
        <ServiceForm
          professional={professional}
          service={service}
          edit={true}
        />
      </main>
    );
  }
}

export default page;