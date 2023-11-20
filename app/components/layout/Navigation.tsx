"use client";
import { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  FingerPrintIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CalendarIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Tables } from "@/database";
import Link from "next/link";
import Image from "next/image";
import UserDropdown from "@/app/components/layout/UserDropdown";

const DashboardNavigation = {
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
    {
      name: "Orders",
      description: "View your orders and payments",
      href: "/account/orders",
      icon: CalendarIcon,
    },
    // Add more client-specific items as needed
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
      href: "/account/professional/services",
      icon: CursorArrowRaysIcon,
    },
    {
      name: "Insight",
      description: "Learn more about your services and customers",
      href: "/account/professionals/create-a-service",
      icon: ChartPieIcon,
    },
    {
      name: "Profile",
      description: "Your profile and settings",
      href: "/account/profile",
      icon: FingerPrintIcon,
    },
    {
      name: "Orders",
      description: "Manage your orders and payments",
      href: "/account/orders",
      icon: CalendarIcon,
    },
    // Add more professional-specific items as needed
  ],
};

type NavbarProps = {
  serverClient: Tables<"clients"> | null;
  serverProfessional: Tables<"professionals"> | null;
  userType: string | null;
};

export default function Navigation({
  serverClient,
  serverProfessional,
  userType,
}: NavbarProps) {
  const [professional, setProfessional] =
    useState<Tables<"professionals"> | null>(serverProfessional ?? null);
  const [client, setClient] = useState<Tables<"clients"> | null>(
    serverClient ?? null,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let userDashboard;
  if (userType === "client") {
    userDashboard = DashboardNavigation.client;
  } else if (userType === "professional") {
    userDashboard = DashboardNavigation.professional;
  }

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
              className="h-8 w-auto"
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
          {userDashboard && (
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
                    {userDashboard.map((item) => (
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
          {client && <UserDropdown user={client} setUser={setClient} />}
          {professional && (
            <UserDropdown user={professional} setUser={setProfessional} />
          )}
          {!client && !professional && (
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
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 flex w-full flex-col justify-between overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <Image
                  className="h-8 w-auto"
                  src="/plantsy.png"
                  alt=""
                  width={300}
                  height={300}
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {userDashboard &&
                    userDashboard.map((item) => (
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
                    ))}
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
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
