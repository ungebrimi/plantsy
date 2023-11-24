import React from "react";
import ServiceGrid from "@/app/account/services/components/ServiceGrid";
import Link from "next/link";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";

const Services = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getSession();
  const { session } = data;

  const { data: services, error } = await supabase
    .from("services")
    .select()
    .eq("professional_id", session?.user.id);
  if (error) console.error(error);

  if (!error && services) {
    return (
      <div className="bg-white">
        <div className="relative isolate px-4 sm:px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-70"
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
          {/* give this section a frosted glass background, so I can see the colors behind but the colors more clearly*/}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 rounded-lg backdrop-blur bg-white/50 shadow-lg">
            <div className="flex flex-col xs:flex-row sm:items-center justify-between border-b border-gray-200 pb-2">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Services
              </h1>
              <Link
                href={"/account/services/create-a-service"}
                className="rounded-md justify-between items-center bg-green-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm mt-2 xs:mt-0"
              >
                Create New
              </Link>
            </div>
            <ServiceGrid serverServices={services} />
          </div>
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
};

export default Services;
