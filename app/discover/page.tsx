import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";
import Filters from "@/app/discover/Filters";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const chargeOptions = [
  { name: "Hourly", href: "", current: true },
  { name: "Project", href: "#", current: false },
];

export default async function page({
  searchParams,
}: {
  searchParams: {
    category: string;
    city: string;
    county: string;
    sort_by: string;
  };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  let loading = true;

  const { data: categories, error: categoriesError } = await supabase
    .from("service_categories")
    .select();

  const serviceQuery = supabase.from("services").select().range(0, 10);

  // Get the categories from the URL parameters
  const urlCategories = searchParams.category;

  // Apply filters based on the URL categories
  if (urlCategories) {
    const categoriesArray = urlCategories.split(",");
    serviceQuery.in("service_category", categoriesArray);
  }

  const { data: services, error: servicesError } = await serviceQuery;
  loading = false;
  const filterOptions = [
    { id: "category", name: "Service Category", options: categories },
    { id: "city", name: "City", options: [] },
    { id: "county", name: "County", options: [] },
    { id: "state", name: "State", options: [] },
  ];

  if (loading) return <div>Loading...</div>;

  if (servicesError) console.error(servicesError);
  if (categoriesError) console.error(categoriesError);
  if (services) {
    return (
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Discover
            </h1>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Discover offered services
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <Filters filterOptions={filterOptions} />
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8">
                {services &&
                  services.map((service: any) => {
                    const thumbnail = JSON.parse(service.thumbnail);
                    return (
                      <Link
                        key={service.id}
                        href={`/discover/${service.id}`}
                        className="group text-sm"
                      >
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                          <Image
                            width={400}
                            height={400}
                            src={thumbnail.url}
                            alt={"#"}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <h3 className="mt-4 font-medium text-gray-900">
                          {service.title}
                        </h3>
                        <p className="italic text-gray-500">
                          {service.city} in {service.county}
                        </p>
                        <p className="mt-2 font-medium text-gray-900">
                          {service.price} $
                        </p>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}
