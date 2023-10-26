"use client"
import React, {useState} from 'react'
import {createClientComponentClient, Session} from "@supabase/auth-helpers-nextjs";
import {Tables} from "@/database";
import {archiveData} from "@/utils/archive";
import {MagnifyingGlassIcon, PencilIcon, StarIcon, TrashIcon} from "@heroicons/react/24/outline";
import Link from "next/link";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

type ServiceGridProps = {
    serverServices: Tables<"services">[]
}
const ServiceGrid = ({serverServices}: ServiceGridProps) => {
    const supabase = createClientComponentClient()
    const [services, setServices] = useState<Tables<"services">[]>(serverServices)

    const deleteService = async (service: Tables<"services">) => {
        try {
            await archiveData(service.id, "services", JSON.stringify(service), "remove service")
            await supabase.from("services").delete().eq("id", service.id)
            console.log("removal of service was successful, and is not stored in archive")
            setServices(services.filter((prev) => prev.id !== service.id))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
        {services &&
        services.map((service: any) => {
            if (service.thumbnail) {
                try {
                    service.thumbnail = JSON.parse(service.thumbnail);
                    // If JSON.parse doesn't throw an error, it means the string is valid JSON.
                    console.log("service.thumbnail is valid JSON");
                } catch (error) {
                    console.log("service.thumbnail is not valid JSON");
                }
            }
            return (
                <div
                    key={service.id}
                    className="group relative border border-gray-200 rounded-md px-2 pt-2 bg-white shadow-sm"
                >
                    <div className="h-96 md:h-56 lg:h-72 w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                        {service.thumbnail  &&
                        typeof service.thumbnail === "object" &&
                        "url" in service.thumbnail ? (
                            <img
                                src={service.thumbnail?.url as string}
                                alt={service.title}
                                className="h-full w-full object-cover object-center"
                            />
                        ) : (
                            <div>Hello</div>
                        )}
                    </div>
                    <div className="py-4 text-center">
                        <h3 className="text-sm font-semibold text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0" />
                            {service.title}
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
                        href={`/account/professional/services/${service.id}/edit`}
                        className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                    >
                      <PencilIcon className="w-4" />
                      <span>Edit</span>
                    </Link>
                    <Link
                        href={`/account/professional/services/${service.id}/`}
                        className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                    >
                      <MagnifyingGlassIcon className="w-4" />
                      <span>View</span>
                    </Link>
                    <button
                        type="button"
                        className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                        onClick={() => deleteService(service)}
                    >
                      <TrashIcon className="w-4" />
                      <span>Delete</span>
                    </button>
                  </span>
                    </div>
                </div>
            );
        })}
            </>
    )
}
export default ServiceGrid
