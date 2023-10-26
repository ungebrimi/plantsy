import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Tab } from "@headlessui/react";
import { Tables } from "@/database";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/20/solid";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import Service from "@/app/home/marketplace/[service]/Service";
import {getSession} from "@/app/supabase-server";
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
    let images: Tables<"files">[] = []
    if (professional.profile_picture)
      professional.profile_picture = JSON.parse(professional.profile_picture);
    if (service.thumbnail) {
      try {
        service.thumbnail = JSON.parse(service.thumbnail);
        images = [service.thumbnail]
      } catch (e) {
        console.error(e)
      }
    }
    if (service.images) {
      try {
        service.images = JSON.parse(service.images);
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
