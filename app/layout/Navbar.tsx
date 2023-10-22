"use client";
import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

import ClientDropdown from "./ClientDropdown";
import ProfessionalDropdown from "./ProfessionalDropdown";
import Link from "next/link";
import {Tables} from "@/database";
import Image from "next/image";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
type NavType = {
  name: string;
  href: string;
  current: boolean
}

type NavbarProps = {
  client: Tables<"clients"> | null
  professional: Tables<"professionals"> |null
}
export default function Navbar({ client, professional }: NavbarProps) {
  const [navigation, setNavigation] = useState<NavType[]>([
    { name: "Home", href: "/", current: true },
    { name: "Marketplace", href: "/home/marketplace", current: false },
    { name: "Company", href: "/home/company", current: false },
    { name: "Get in touch", href: "/home/contact", current: false },
  ]);

  const currentPathname = usePathname();

  useEffect(() => {
    // Get the current pathname from the router

    // Update the navigation array to set the 'current' property
    const updatedNavigation = navigation.map((item: any) => ({
      ...item,
      current: item.href === currentPathname,
    }));
    setNavigation(updatedNavigation);
  }, [currentPathname, navigation]);

  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    className="h-8 w-auto"
                    src="/plantsy.png"
                    width={300}
                    height={300}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item: any) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-100 text-gray-600"
                            : "text-gray-600 hover:bg-gray-200 hover:text-gray-700",
                          "rounded-md px-3 py-2 text-sm font-medium",
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button */}
                {/*   type="button" */}
                {/*   className="relative rounded-full bg-gray-100 p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" */}
                {/* > */}
                {/*   <span className="absolute -inset-1.5" /> */}
                {/*   <span className="sr-only">View notifications</span> */}
                {/*   <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                {/* </button> */}

                {client && <ClientDropdown client={client} />}
                {professional && (
                  <ProfessionalDropdown professional={professional} />
                )}
                {!client && !professional && (
                  <div className="ml-2 sm:ml-4 flex flex-col md:flex-row justify-center mt-8 md:mt-0 items-center gap-x-2 sm:gap-x-6">
                    <Link
                      href={"/account/auth/register"}
                      className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                      Get started
                    </Link>
                    <Link
                      href={"/account/auth/login"}
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Log in <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item: any) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-200 text-gray-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-700",
                    "block rounded-md px-3 py-2 text-base font-medium",
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
