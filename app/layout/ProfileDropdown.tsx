"use client";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { User } from "@/dbtypes";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ProfileDropdown = ({ session }: { session: any }) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUserData() {
      try {
        // query for professional
        const { data: professional, error: PE } = await supabase
          .from("professionals")
          .select()
          .eq("id", session.user.id);
        // query for clients
        const { data: client, error: CE } = await supabase
          .from("clients")
          .select()
          .eq("id", session.user.id);

        // Sorry for horrible naming of errors.
        if (PE) {
          console.error(PE);
          return;
        }
        if (CE) {
          console.error(CE);
          return;
        }
        if (professional) {
          return professional[0];
        }
        if (client) {
          return client[0];
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (session) {
      getUserData().then((res: User) => {
        setUser(res);
      });
    }
  }, [session, supabase, router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          {user && user.profile_picture ? (
            <Image
              className="h-8 w-8 rounded-full"
              src={user.profile_picture}
              width={300}
              height={300}
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
        enter="transition ease-out duration-200"
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
                href={`/account/${user?.role}`}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Dashboard
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/"
                onClick={handleSignOut}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Sign out
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;
