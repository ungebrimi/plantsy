"use client";
import { Fragment, useState, useRef } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Image from "next/image";

const publishingOptions = [
  {
    title: "Customer",
    role: "client",
    description:
      "Join as a customer, we have hundreds of proffesionals ready to serve your plants right",
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

export default function Register() {
  const [message, setMessage] = useState<string | undefined>();
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState<string | undefined>();
  const [userType, setUserType] = useState(publishingOptions[0]);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  // should be supabase DB type this any as well
  const supabase = createClientComponentClient<any>();
  const captcha = useRef<any>();

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values: any = Object.fromEntries(data.entries());
    setMessage(undefined);
    let email = values.email.trim();
    let password = values.password.trim();
    let confirmPassword = values.confirm_password.trim();
    let firstName = values.first_name.trim();
    let lastName = values.last_name.trim();

    // Password requirements checker
    // Password validation check
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    if (
      password.length < 8 ||
      !uppercaseRegex.test(password) ||
      !numberRegex.test(password)
    ) {
      setMessage(
        "Password must be at least 8 characters long, contain an uppercase letter, and a number."
      );
      return;
    }

    if (!email || !password || !acceptTerms || !firstName || !lastName) {
      setMessage(
        "You need to fill in all required fields and accept the terms and conditions to continue"
      );
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    setMessage(
      `Thanks for registering! We have sent you a confirmation email to ${email}`
    );

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback?next=/account/auth/thank-you`, // Specify the desired next URL
          captchaToken,
          data: {
            role: userType.role,
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        console.error(error);
        return null; // Handle the error appropriately
      }
      // captcha.current.resetCaptcha();
      setTimeout(() => {
        router.push("/");
      }, 10000);
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
    }
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
            <form
              className="space-y-6"
              action="#"
              ref={formRef}
              onSubmit={handleSignUp}
              method="POST"
            >
              <div>
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
              <div>
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
                <Listbox value={userType} onChange={setUserType}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                        Join as a
                      </Listbox.Label>
                      <div className="relative">
                        <div className="inline-flex divide-x divide-green-700 rounded-md shadow-sm">
                          <div className="inline-flex items-center gap-x-1.5 rounded-l-md bg-green-600 px-3 py-2 text-white shadow-sm">
                            <CheckIcon
                              className="-ml-0.5 h-5 w-5"
                              aria-hidden="true"
                            />
                            <p className="text-sm font-semibold">
                              {userType.title}
                            </p>
                          </div>
                          <Listbox.Button className="inline-flex items-center rounded-l-none rounded-r-md bg-green-600 p-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-gray-50">
                            <span className="sr-only">
                              Change published status
                            </span>
                            <ChevronDownIcon
                              className="h-5 w-5 text-white"
                              aria-hidden="true"
                            />
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
                            {publishingOptions.map((option) => (
                              <Listbox.Option
                                key={option.title}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "bg-green-600 text-white"
                                      : "text-gray-900",
                                    "cursor-default select-none p-4 text-sm"
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
                                        "mt-2"
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
                    onChange={() => setAcceptTerms(!acceptTerms)}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                  />
                  <label
                    htmlFor="checked"
                    className="ml-3 block text-sm leading-6 text-gray-900"
                  >
                    By checking I accept Plantsy{`'`}s
                    <Link
                      href="/legal"
                      className="text-green-500 underline font-bold"
                    >
                      {" "}
                      terms & conditions
                    </Link>
                  </label>
                </div>
              </div>

              <HCaptcha
                sitekey={"8c6238de-63ae-47f6-8007-0421360fb824"}
                onVerify={(token: string) => {
                  setCaptchaToken(token);
                }}
              />

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Register
                </button>
              </div>
            </form>
            <p className="text-sm font-medium leading-6 mt-4">{message}</p>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              href="/account/login"
              className="font-semibold leading-6 text-green-600 hover:text-green-500"
            >
              Go to login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
