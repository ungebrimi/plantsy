"use client";
import React, { useEffect, useState } from "react";
import { EnvelopeIcon, PhoneIcon, StarIcon } from "@heroicons/react/24/outline";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { FileType } from "@/dbtypes";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Service({ service, professional, session, client }: any) {
  const [images, setImages] = useState<FileType[]>([]);
  const [clientProfilePicture, setClientProfilePicture] = useState<FileType>(
    JSON.parse(client.profile_picture),
  );
  const [professionalProfilePicture, setProfessionalProfilePicture] =
    useState<FileType>(JSON.parse(professional.profile_picture));
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (!service) return;
    const thumbnail = JSON.parse(service.thumbnail);
    const resistingImages = JSON.parse(service.images);
    setImages([thumbnail, ...resistingImages]);
  }, [service]);

  console.log(client);
  async function handleContact() {
    if (session.user.user_metadata.role !== "client") return;

    const { data, error } = await supabase
      .from("channels")
      .insert({
        client_id: client.id,
        client_name: client.first_name + " " + client.last_name,
        client_profile_picture: clientProfilePicture.url,
        professional_id: professional.id,
        professional_name:
          professional.first_name + " " + professional.last_name,
        professional_profile_picture: professionalProfilePicture.url,
      })
      .select()
      .single();

    if (error) console.error(error);
    if (data) {
      console.log(data);
    }
  }

  return (
    <section className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {images &&
                  images.map((image: FileType, idx: number) => (
                    <Tab
                      key={idx}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img
                              src={image.url}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? "ring-indigo-500" : "ring-transparent",
                              "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2",
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
              </Tab.List>
            </div>
            <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
              {images &&
                images.map((image: FileType, idx: number) => (
                  <Tab.Panel key={idx}>
                    <img
                      src={image.url}
                      alt="#"
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
            </Tab.Panels>
          </Tab.Group>
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {service.title}
            </h1>

            <div className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
              <div className="flex flex-1 flex-col p-8">
                <Image
                  width={300}
                  height={300}
                  className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                  src={professionalProfilePicture.url}
                  alt=""
                />
                <h3 className="mt-6 text-sm font-medium text-gray-900">
                  {professional.first_name} {professional.last_name}
                </h3>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                  <dt className="sr-only">Title</dt>
                  <dd className="text-sm text-gray-500">
                    {professional.company}
                  </dd>
                  <dt className="sr-only">Role</dt>
                  <dd className="mt-3">
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {professional.role}
                    </span>
                  </dd>
                </dl>
              </div>
              <div>
                {!session && (
                  <Link
                    href="/account/auth/register"
                    className="relative w-full -mr-px inline-flex bg-red-50 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-red-400"
                  >
                    Sign up as a client to contact this professional
                  </Link>
                )}
                {session &&
                  session.user.user_metadata.role === "professional" && (
                    <Link
                      href="/account/auth/register"
                      className="relative -mr-px inline-flex w-full bg-red-50 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-red-400"
                    >
                      <EnvelopeIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      You need a client account to contact this professional
                    </Link>
                  )}
                {session && session.user.user_metadata.role === "client" && (
                  <button
                    onClick={handleContact}
                    type="button"
                    className="relative -mr-px inline-flex w-full flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-500"
                  >
                    <EnvelopeIcon
                      className="h-5 w-5 text-gray-500 "
                      aria-hidden="true"
                    />
                    Get in touch
                  </button>
                )}
              </div>
            </div>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="whitespace-pre-line text-base tracking-tight text-gray-900">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Service;
