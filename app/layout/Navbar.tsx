import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";
import Image from "next/image.js";
import { getSession } from "@/app/supabase-server";
import MobileMenu from "./MobileMenu";

const navigation = [
  { name: "Marketplace", href: "/home/marketplace" },
  { name: "Company", href: "/home/company" },
  { name: "Get in touch", href: "/home/contact" },
];

export default async function Navbar() {
  const session = (await getSession()) || null;

  return (
    <header className="">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Plantsy</span>
            <Image
              width={300}
              height={300}
              className="h-16 w-auto"
              src="/plantsy.png"
              alt=""
            />
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        {session !== null ? (
          <div className="flex flex-1 items-center justify-end gap-x-6">
            <ProfileDropdown session={session} />
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-end gap-x-6">
            <Link
              href="/account/auth/login"
              className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
            >
              Log in
            </Link>
            <Link
              href="/account/auth/register"
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Sign up
            </Link>
          </div>
        )}
      </nav>
      <MobileMenu navigation={navigation} />
    </header>
  );
}
