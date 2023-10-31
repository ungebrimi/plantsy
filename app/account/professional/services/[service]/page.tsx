import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Service from "@/app/home/marketplace/[service]/Service";
import Reviews from "@/app/home/marketplace/[service]/Reviews";
import {Tables} from "@/database";
import {getServerSession} from "@/app/supabase-server";

const reviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};

async function page({ params }: { params: { service: number } }) {
  const { supabase, session } = await getServerSession()

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
    let images: Tables<"files">[] = []
    if (professional.profile_picture)
      professional.profile_picture = JSON.parse(professional.profile_picture)  as Tables<"files">;
    if (service.thumbnail) {
      try {
        service.thumbnail = JSON.parse(service.thumbnail) as Tables<"files">;
        images = [service.thumbnail]
      } catch (e) {
        console.error(e)
      }
    }
    if (service.images) {
      try {
        service.images = JSON.parse(service.images) as Tables<"files">[];
        images = [service.thumbnail, ...service.images]
      } catch (e) {
        console.error(e)
      }
    }

    return (
      <main>
        <Service service={service} professional={professional} session={session} images={images}/>
        <Reviews />
      </main>
    );
  } else {
    redirect("/");
  }
}

export default page;
