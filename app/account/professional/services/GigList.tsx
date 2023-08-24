"use client";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { StarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment, useState } from "react";

const people = [
  {
    name: "Jane Cooper",
    title: "Paradigm Representative",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  // More people...
];

export default function GigList({ serverGigs }: { serverGigs: any }) {
  const [gigs, setGigs] = useState<any>(serverGigs);

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {gigs && gigs.length > 0 ? (
        <Fragment>
          {people.map((person) => (
            <li
              key={person.email}
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
            >
              <div className="flex flex-1 flex-col p-8">
                <img
                  className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                  src={person.imageUrl}
                  alt=""
                />
                <h3 className="mt-6 text-sm font-medium text-gray-900">
                  {person.name}
                </h3>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                  <dt className="sr-only">Title</dt>
                  <dd className="text-sm text-gray-500">{person.title}</dd>
                  <dt className="sr-only">Role</dt>
                  <dd className="mt-3">
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {person.role}
                    </span>
                  </dd>
                </dl>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <a
                      href={`mailto:${person.email}`}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <EnvelopeIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Email
                    </a>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <a
                      href={`tel:${person.telephone}`}
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <PhoneIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Call
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </Fragment>
      ) : (
        <Link
          href="services/create-a-gig"
          className="mt-2 h-64 items-center text-gray-400 hover:text-green-500 hover:border-green-500 flex justify-center cursor-pointer rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
        >
          <div className="text-center">
            <StarIcon className="mx-auto h-12 w-12" aria-hidden="true" />
            <h2 className="text-sm font-bold mt-4 leading-5 ">
              Create a new gig
            </h2>
          </div>
        </Link>
      )}
    </ul>
  );
}
