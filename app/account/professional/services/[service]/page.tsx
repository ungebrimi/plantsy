import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {getSession} from "@/app/supabase-server";
import Service from "@/app/home/marketplace/[service]/Service";
import Reviews from "@/app/home/marketplace/[service]/Reviews";

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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

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

  if (!serviceError && !professionalError && service && professional) {
    if (professional.profile_picture)
      professional.profile_picture = JSON.parse(professional.profile_picture);
    if (service.thumbnail) service.thumbnail = JSON.parse(service.thumbnail);
    if (service.images) service.images = JSON.parse(service.images);

    const images = [service.thumbnail, ...service.images];

    return (
      <main>
        <Service service={service} professional={professional} session={session}/>
        <Reviews />
      </main>
    );
  } else {
    redirect("/");
  }
}

export default page;
