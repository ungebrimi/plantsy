"use server";
import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getSession } from "@/app/supabase-server";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Services = async () => {
  const supabase = createServerComponentClient({ cookies });
  const session = (await getSession()) || null;

  const { data: gigs, error } = await supabase
    .from("services")
    .select()
    .eq("professional_id", session?.user.id);
  if (error) console.error(error);

  if (!error && gigs) {
    return (
      <main className="-mx-px space-y-4 md:space-y-0 md:space-x-4 grid grid-cols-1 sm:mx-0 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {gigs &&
          gigs.map((gig: any) => {
            const thumbnail = JSON.parse(gig.thumbnail);

            return (
              <div
                key={gig.id}
                className="group relative border border-gray-200 rounded-md px-2 pt-2 bg-white shadow-sm"
              >
                <div className="h-96 md:h-56 lg:h-72 w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                  <img
                    src={thumbnail.url}
                    alt={gig.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="py-4 text-center">
                  <h3 className="text-sm font-semibold text-gray-700">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {gig.title}
                  </h3>
                  <div className="mt-3 flex flex-col items-center">
                    <p className="sr-only">{4} out of 5 stars</p>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            4 > rating ? "text-yellow-400" : "text-gray-200",
                            "h-5 w-5 flex-shrink-0",
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{20} reviews</p>
                  </div>
                  <span className="isolate inline-flex rounded-md shadow-sm mt-2">
                    <Link
                      href={`/account/professional/services/${gig.id}/edit`}
                      className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                    >
                      <PencilIcon className="w-4" />
                      <span>Edit</span>
                    </Link>
                    <Link
                      href={`/account/professional/services/${gig.id}/`}
                      className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                    >
                      <MagnifyingGlassIcon className="w-4" />
                      <span>View</span>
                    </Link>
                    <button
                      type="button"
                      className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                    >
                      <TrashIcon className="w-4" />
                      <span>Delete</span>
                    </button>
                  </span>
                </div>
              </div>
            );
          })}
        <Link
          href="services/create-a-gig"
          className="items-center text-gray-400 hover:text-green-500 hover:border-green-500 flex justify-center cursor-pointer shadow border border-dashed border-gray-900/25 px-6 py-10 bg-white"
        >
          <div className="text-center">
            <StarIcon className="mx-auto h-12 w-12" aria-hidden="true" />
            <h2 className="text-sm font-bold mt-4 leading-5 ">
              Create a new gig
            </h2>
          </div>
        </Link>
      </main>
    );
  }
};

export default Services;
