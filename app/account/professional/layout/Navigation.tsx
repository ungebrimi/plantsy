"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ChatBubbleLeftIcon,
  CheckBadgeIcon,
  HomeModernIcon,
  PuzzlePieceIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import MessageSidebar from "@/app/layout/messaging/MessageSidebar";
import Link from "next/link";
import { Tables } from "@/database";

const navigation = [
  {
    name: "Dashboard",
    href: "/account/professional",
    icon: HomeModernIcon,
    current: true,
  },
  {
    name: "Messages",
    href: "/account/professional/channels",
    icon: ChatBubbleLeftIcon,
    current: false,
  },
  {
    name: "Services",
    href: "/account/professional/services",
    icon: PuzzlePieceIcon,
    current: false,
  },
  {
    name: "Orders",
    href: "/account/professional/orders",
    icon: CheckBadgeIcon,
    current: false,
  },
  {
    name: "Profile",
    href: "/account/professional/profile",
    icon: UserIcon,
    current: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation({
  professional,
}: {
  professional: Tables<"professionals">;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMessageTab, setOpenMessageTab] = useState<boolean>(false);
  const profilePicture = JSON.parse(professional.profile_picture as string);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center">
                      <Image
                        width={300}
                        height={300}
                        className="h-8 w-auto"
                        src="/plantsy.png"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => {
                              if (item.name !== "Messages")
                                return (
                                  <li key={item.name}>
                                    <Link
                                      href={item.href}
                                      className={classNames(
                                        item.current
                                          ? "bg-gray-50 text-green-600"
                                          : "text-gray-700 hover:text-green-600 hover:bg-gray-50",
                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                                      )}
                                    >
                                      <item.icon
                                        className={classNames(
                                          item.current
                                            ? "text-green-600"
                                            : "text-gray-400 group-hover:text-green-600",
                                          "h-6 w-6 shrink-0",
                                        )}
                                        aria-hidden="true"
                                      />
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              else
                                return (
                                  <li key={item.name}>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setOpenMessageTab(!openMessageTab);
                                        setSidebarOpen(false);
                                      }}
                                      className={classNames(
                                        item.current
                                          ? "bg-gray-50 text-green-600"
                                          : "text-gray-700 hover:text-green-600 hover:bg-gray-50",
                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                                      )}
                                    >
                                      <item.icon
                                        className={classNames(
                                          item.current
                                            ? "text-green-600"
                                            : "text-gray-400 group-hover:text-green-600",
                                          "h-6 w-6 shrink-0",
                                        )}
                                        aria-hidden="true"
                                      />
                                      {item.name}
                                    </button>
                                  </li>
                                );
                            })}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center">
              <Image
                width={300}
                height={300}
                className="h-12 border-2 w-auto object-fill mr-6"
                src="/plantsy.png"
                alt="Plantsy"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => {
                      if (item.name !== "Messages")
                        return (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-gray-50 text-green-600"
                                  : "text-gray-700 hover:text-green-600 hover:bg-gray-50",
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  item.current
                                    ? "text-green-600"
                                    : "text-gray-400 group-hover:text-green-600",
                                  "h-6 w-6 shrink-0",
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </Link>
                          </li>
                        );
                      else
                        return (
                          <li key={item.name}>
                            <button
                              onClick={() => setOpenMessageTab(!openMessageTab)}
                              className={classNames(
                                item.current
                                  ? "bg-gray-50 text-green-600"
                                  : "text-gray-700 hover:text-green-600 hover:bg-gray-50",
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  item.current
                                    ? "text-green-600"
                                    : "text-gray-400 group-hover:text-green-600",
                                  "h-6 w-6 shrink-0",
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </button>
                          </li>
                        );
                    })}
                  </ul>
                </li>

                <li className="-mx-6 mt-auto">
                  <Link
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                  >
                    {profilePicture ? (
                      <Image
                        width={300}
                        height={300}
                        className="h-8 w-8 rounded-full bg-gray-50"
                        src={profilePicture.url}
                        alt=""
                      />
                    ) : (
                      <p className="hidden xs:flex items-center text-white justify-center uppercase font-bold h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        {professional.first_name?.charAt(0)}
                        {professional.last_name?.charAt(0)}
                      </p>
                    )}

                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">
                      {professional?.first_name + " " + professional?.last_name}
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </div>
          <Link href="#">
            <span className="sr-only">Your profile</span>
            {profilePicture ? (
              <Image
                width={300}
                height={300}
                className="h-8 w-8 rounded-full bg-gray-50"
                src={profilePicture.url}
                alt=""
              />
            ) : (
              <Image
                width={300}
                height={300}
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            )}
          </Link>
        </div>
      </div>
      <MessageSidebar
        open={openMessageTab}
        setOpen={setOpenMessageTab}
        user={professional}
        userType={"professionals"}
      />
    </>
  );
}
