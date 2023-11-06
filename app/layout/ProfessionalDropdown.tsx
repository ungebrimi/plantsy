"use client";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Tables } from "@/database";
import { getClientSupabase } from "@/app/supabase-client";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function ProfessionalDropdown({
  professional,
}: {
  professional: Tables<"professionals">;
}) {
  const { supabase } = getClientSupabase();
  const router = useRouter();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          {professional.profile_picture &&
          typeof professional.profile_picture === "object" &&
          "url" in professional.profile_picture ? (
            <Image
              width={300}
              className="h-8 w-8 rounded-full"
              height={300}
              src={professional.profile_picture.url as string}
              alt=""
            />
          ) : (
            <svg
              className="h-8 w-8 rounded-full bg-gray-100 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link
                href={"/account/professional"}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700",
                )}
              >
                Dashboard
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleSignOut}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700",
                )}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default ProfessionalDropdown;
