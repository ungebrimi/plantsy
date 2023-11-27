"use client";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Tables } from "@/database";
import Link from "next/link";
import Image from "next/image";
import UserDropdown from "@/app/layout/UserDropdown";
import { createClient } from "@/app/utils/supabase/client";
import { useRouter } from "next/navigation";

interface UserSpecificNavigation {
  name: string;
  description: string;
  href: string;
  icon: any;
}

interface UserSpecificNavigationList {
  [key: string]: UserSpecificNavigation[];
}

const userSpecificNavigation: UserSpecificNavigationList = {
  client: [
    {
      name: "Messages",
      description: "Communicate with professionals",
      href: "/account/messages",
      icon: EnvelopeOpenIcon,
    },
    {
      name: "Profile",
      description: "Your client profile and settings",
      href: "/account/profile",
      icon: FingerPrintIcon,
    },
  ],
  professional: [
    {
      name: "Messages",
      description: "Speak directly to your customers",
      href: "/account/messages",
      icon: EnvelopeOpenIcon,
    },
    {
      name: "Services",
      description: "Create new services and manage existing ones",
      href: "/account/services",
      icon: CursorArrowRaysIcon,
    },
    {
      name: "Profile",
      description: "Your profile and settings",
      href: "/account/profile",
      icon: FingerPrintIcon,
    },
  ],
};
type NavbarProps = {
  serverUser: Tables<"professionals"> | Tables<"clients"> | null;
  userType: string | null;
};

export default function Navigation({ serverUser, userType }: NavbarProps) {
  const [user, setUser] = useState<
    Tables<"professionals"> | Tables<"clients"> | null
  >(serverUser ? serverUser : null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // const [userDashboard, setUserDashboard] = useState<>(initialDashboard)
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (!serverUser) return;
    if (serverUser) {
      setUser(serverUser);
    }
  }, [serverUser, setUser]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.replace("/");
  };

  // @ts-ignore
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 relative z-10"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Plantsy</span>
            <Image
              className="h-8 w-auto object-cover"
              src="/plantsy.png"
              alt=""
              width={300}
              height={300}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          {user && (
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                Dashboard
                <ChevronDownIcon
                  className="h-5 w-5 flex-none text-gray-400"
                  aria-hidden="true"
                />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {userSpecificNavigation[user.role].map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon
                            className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex-auto">
                          <Link
                            href={item.href}
                            className="block font-semibold text-gray-900"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          )}
          <Link
            href={"/discover"}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Discover
          </Link>
          <Link
            href={"/company"}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Company
          </Link>
          <Link
            href={"/contact"}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Get in touch
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user && <UserDropdown user={user} setUser={setUser} />}
          {!user && (
            <div className="ml-2 sm:ml-4 flex flex-col md:flex-row justify-center mt-8 md:mt-0 items-center gap-x-2 sm:gap-x-6">
              <Link
                href={"/auth/register"}
                className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Get started
              </Link>
              <Link
                href={"/auth/login"}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </div>
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={setMobileMenuOpen}
          >
            <div className="fixed inset-0" />

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                              <Link
                                href="/"
                                className=""
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <span className="sr-only">Plantsy</span>
                                <Image
                                  className="h-8 w-auto object-cover"
                                  src="/plantsy.png"
                                  alt=""
                                  width={300}
                                  height={300}
                                />
                              </Link>
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <span className="absolute -inset-2.5" />
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="relative flex-1 px-4 sm:px-6">
                          <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                              <div className="space-y-2 py-6">
                                {user &&
                                  userSpecificNavigation[user.role].map(
                                    (item) => (
                                      <Link
                                        key={item.name}
                                        href={item.href}
                                        className="group -mx-3 flex items-center gap-x-6 rounded-lg p-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                      >
                                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                          <item.icon
                                            className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                            aria-hidden="true"
                                          />
                                        </div>
                                        {item.name}
                                      </Link>
                                    ),
                                  )}
                              </div>
                              <div className="space-y-2 py-6">
                                <Link
                                  href={"/discover"}
                                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                  Discover
                                </Link>
                                <Link
                                  href={"/company"}
                                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                  Company
                                </Link>
                                <Link
                                  href={"/contact"}
                                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                  Get in touch
                                </Link>
                              </div>
                              <div className="py-6">
                                {user ? (
                                  <button
                                    onClick={handleSignOut}
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                  >
                                    Log out
                                  </button>
                                ) : (
                                  <>
                                    <Link
                                      href={"/auth/login"}
                                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                      Log in
                                    </Link>
                                    <Link
                                      href={"/auth/register"}
                                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                      Register
                                    </Link>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </nav>
    </header>
  );
}
