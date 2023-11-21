import {
  ChatBubbleBottomCenterIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { RssIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const links = [
  {
    name: "Contact Support",
    href: "#",
    description: "We are here to help",
    icon: ChatBubbleBottomCenterIcon,
  },
  {
    name: "News",
    href: "#",
    description: "Check our latest news",
    icon: RssIcon,
  },
];

export default function page() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 pb-16 pt-10 sm:pb-24 lg:px-8">
      <Image
        width={440}
        height={400}
        className="mx-auto h-10 w-auto sm:h-12"
        src="/plantsy.png"
        alt="Your Company"
      />
      <div className="mx-auto mt-20 max-w-2xl text-center sm:mt-24">
        <p className="text-base font-semibold leading-8 text-green-600">500</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Authorization error
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
          Sorry, we have encountered an issue authorizing your request. Please
          try again later. If the problem persists, please contact support.
        </p>
      </div>
      <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
        <h2 className="sr-only">Popular pages</h2>
        <ul
          role="list"
          className="-mt-6 divide-y divide-gray-900/5 border-b border-gray-900/5"
        >
          {links.map((link, linkIdx) => (
            <li key={linkIdx} className="relative flex gap-x-6 py-6">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-sm ring-1 ring-gray-900/10">
                <link.icon
                  className="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-auto">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  <a href={link.href}>
                    <span className="absolute inset-0" aria-hidden="true" />
                    {link.name}
                  </a>
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {link.description}
                </p>
              </div>
              <div className="flex-none self-center">
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-green-600"
          >
            <span aria-hidden="true">&larr;</span>
            Back to home
          </a>
        </div>
      </div>
    </main>
  );
}
