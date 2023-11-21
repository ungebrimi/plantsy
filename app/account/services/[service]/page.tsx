import React from "react";
import { redirect } from "next/navigation";
import Service from "@/app/discover/[service]/components/Service";
import Reviews from "@/app/discover/[service]/components/Reviews";
import { Tables } from "@/database";
import { getServerSession } from "@/app/supabase-server";

async function page({ params }: { params: { service: number } }) {
  const { supabase, session } = await getServerSession();

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

  if (!serviceError && !professionalError && service && professional) {
    let images: Tables<"files">[] = [];
    if (professional.profile_picture)
      professional.profile_picture = JSON.parse(
        professional.profile_picture,
      ) as Tables<"files">;
    if (service.thumbnail) {
      try {
        service.thumbnail = JSON.parse(service.thumbnail) as Tables<"files">;
        images = [service.thumbnail];
      } catch (e) {
        console.error(e);
      }
    }
    if (service.images) {
      try {
        service.images = JSON.parse(service.images) as Tables<"files">[];
        images = [service.thumbnail, ...service.images];
      } catch (e) {
        console.error(e);
      }
    }

    return (
      <main>
        <Service
          service={service}
          professional={professional}
          session={session}
          images={images}
        />
        <Reviews
          reviews={null}
          average={4}
          totalReviewsCount={1}
          serviceId={service.id}
          professional={professional.id}
          client={null}
        />
      </main>
    );
  } else {
    redirect("/");
  }
}

export default page;