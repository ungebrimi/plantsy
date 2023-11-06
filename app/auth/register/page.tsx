"use client";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Modal from "./Modal";
import { createClient } from "@/utils/supabase/client";

const roleOptions = [
  {
    title: "Customer",
    role: "client",
    description:
      "Join as a customer, we have hundreds of professionals ready to serve your plants right",
    current: true,
  },
  {
    title: "Professional",
    role: "professional",
    description:
      "Be come a part of plantsy and offer your services to our nationwide market",
    current: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Register({
  searchParams,
}: {
  searchParams: { message: string; email: string };
}) {
  const supabase = createClient();

  const handleSignUp = async (formData: FormData) => {
    let email = formData.get("email") as string;
    let password = formData.get("password") as string;
    let confirmPassword = formData.get("confirm_password") as string;
    let firstName = formData.get("first_name") as string;
    let lastName = formData.get("last_name") as string;
    let checked = formData.get("checked") as string;
    let role = formData.get("role[role]") as string;
    // Password requirements checker
    // Password validation check
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    if (
      password.length < 8 ||
      !uppercaseRegex.test(password) ||
      !numberRegex.test(password)
    ) {
      return redirect(
        "/auth/register?message=Password does not meet requirements",
      );
    }

    if (!email || !password || !checked || !firstName || !lastName) {
      return redirect("/auth/register?message=Please fill out all fields");
    }

    if (password !== confirmPassword) {
      return redirect("/auth/register?message=Passwords do not match");
    }

    try {
      await supabase.auth.signUp({
        email,
        password,
        options: {
          // captchaToken,
          data: {
            role: role,
            first_name: firstName,
            last_name: lastName,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
    return redirect("/auth/register?email=" + email);
  };

  return (
    <main>
      {" "}
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        {" "}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {" "}
          <Link href="/">
            <Image
              width={300}
              height={300}
              className="mx-auto h-28 w-auto"
              src="/plantsy.png"
              alt="Your Company"
            />
          </Link>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register an account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" action={handleSignUp}>
              <div className="col-span-1">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name<span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="first_name"
                    name="first_name"
                    type="first_name"
                    autoComplete="first_name"
                    required
                    className="block px-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name<span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="last_name"
                    name="last_name"
                    type="last_name"
                    autoComplete="last_name"
                    required
                    className="block px-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address<span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block px-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password<span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm password<span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    autoComplete="confirm_password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <Listbox defaultValue={roleOptions[0]} name="role">
                  {({ open }) => (
                    <>
                      <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                        Role<span className="text-red-500">*</span>
                      </Listbox.Label>
                      <div className="relative">
                        <div className="inline-flex divide-x divide-green-700 rounded-md shadow-sm">
                          <div className="inline-flex items-center gap-x-1.5 rounded-l-md bg-green-600 px-3 py-2 text-white shadow-sm">
                            <CheckIcon
                              className="-ml-0.5 h-5 w-5"
                              aria-hidden="true"
                            />
                          </div>
                          <Listbox.Button className="inline-flex text-sm font-medium text-white items-center rounded-l-none rounded-r-md bg-green-600 p-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-gray-50">
                            {({ value }) => (
                              <>
                                {value.title}
                                <ChevronDownIcon
                                  className="h-5 w-5 text-white"
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </Listbox.Button>
                        </div>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {roleOptions.map((option) => (
                              <Listbox.Option
                                key={option.title}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "bg-green-600 text-white"
                                      : "text-gray-900",
                                    "cursor-default select-none p-4 text-sm",
                                  )
                                }
                                value={option}
                              >
                                {({ selected, active }) => (
                                  <div className="flex flex-col">
                                    <div className="flex justify-between">
                                      <p
                                        className={
                                          selected
                                            ? "font-semibold"
                                            : "font-normal"
                                        }
                                      >
                                        {option.title}
                                      </p>
                                      {selected ? (
                                        <span
                                          className={
                                            active
                                              ? "text-white"
                                              : "text-green-600"
                                          }
                                        >
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </div>
                                    <p
                                      className={classNames(
                                        active
                                          ? "text-green-200"
                                          : "text-gray-500",
                                        "mt-2",
                                      )}
                                    >
                                      {option.description}
                                    </p>
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="checked"
                    name="checked"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                  />
                  <label
                    htmlFor="checked"
                    className="ml-3 block text-sm leading-6 text-gray-900"
                  >
                    By checking I accept Plantsy{`'`}s
                    <Link
                      href={"/legal"}
                      className="text-green-500 underline font-bold"
                    >
                      {" "}
                      terms & conditions
                    </Link>
                  </label>
                </div>
              </div>
              {searchParams?.message && (
                <p className="text-sm font-medium leading-6 mt-4 text-red-500">
                  {searchParams.message}
                </p>
              )}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Register
                </button>
              </div>
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              href={"/auth/login"}
              className="font-semibold leading-6 text-green-600 hover:text-green-500"
            >
              Go to login
            </Link>
          </p>
        </div>
      </div>
      {searchParams?.email && <Modal email={searchParams.email} />}
    </main>
  );
}
