
import {getServerSession} from "@/app/supabase-server";
import React from "react";
import {
  StarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import ServiceGrid from "@/app/account/professional/services/components/ServiceGrid";

const Services = async () => {
  const { supabase, session } = await getServerSession()

  const { data: services, error } = await supabase
    .from("services")
    .select()
    .eq("professional_id", session?.user.id);
  if (error) console.error(error);

  if (!error && services) {
    return (
      <main className="-mx-px space-y-4 md:space-y-0 md:space-x-4 grid grid-cols-1 sm:mx-0 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <Link
          href={"services/create-a-service"}
          className="items-center text-gray-400 hover:text-green-500 hover:border-green-500 flex justify-center cursor-pointer shadow border border-dashed border-gray-900/25 px-6 py-10 bg-white"
        >
          <div className="text-center">
            <StarIcon className="mx-auto h-12 w-12" aria-hidden="true" />
            <h2 className="text-sm font-bold mt-4 leading-5 ">
              Create a new service
            </h2>
          </div>
        </Link>
        <ServiceGrid serverServices={services} />
      </main>
    );
  }
};

export default Services;
