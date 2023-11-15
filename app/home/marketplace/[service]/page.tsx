import React from "react";
import { redirect } from "next/navigation";
import { Tables } from "@/database";
import Service from "@/app/home/marketplace/[service]/Service";
import Reviews from "@/app/components/services/Reviews";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";

async function page({ params }: { params: { service: number } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    const { session } = sessionData;

    const { data: service, error: serviceError } = await supabase
      .from("services")
      .select()
      .eq("id", params.service)
      .single();

    const { data: professional, error: professionalError } = await supabase
      .from("professionals")
      .select()
      .eq("id", service?.professional_id)
      .single();

    const { data: reviews, error: reviewsError } = await supabase
      .from("reviews")
      .select()
      .eq("service_id", service?.id);

    const { data: client, error } = await supabase
      .from("clients")
      .select()
      .eq("id", session?.user.id)
      .single();

    if (!serviceError && !professionalError && service && professional) {
      let images: Tables<"files">[] = [];

      if (professional.profile_picture) {
        professional.profile_picture = JSON.parse(professional.profile_picture);
      }

      if (service.thumbnail) {
        try {
          service.thumbnail = JSON.parse(service.thumbnail);
          images = [service.thumbnail];
        } catch (e) {
          console.error(e);
        }
      }

      if (service.images) {
        try {
          service.images = JSON.parse(service.images);
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
            reviews={reviews}
            average={4}
            totalReviewsCount={1}
            serviceId={service.id}
            professional={professional}
            client={client}
          />
        </main>
      );
    } else {
      redirect("/");
    }
  } catch (error) {
    console.error(error);
    redirect("/");
  }
}

export default page;
