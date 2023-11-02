"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Image from "next/image";
import {createBrowserClient} from "@supabase/ssr";
export default function Login() {
  const router = useRouter();
  const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | undefined>();
  const captcha = useRef<any>();

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values: any = Object.fromEntries(data.entries());
    const email = values.email;
    const password = values.password;

    await supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .then((res) => {
        if (res.error) {
          setError(res.error.message);
        } else {
          // captcha.current.resetCaptcha()
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
      });
  };

  return (
    <>
      <main className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            width={300}
            height={300}
            className="mx-auto h-10 w-auto"
            src="/plantsy.png"
            alt="Plantsy"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSignIn}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <HCaptcha
                sitekey={"8c6238de-63ae-47f6-8007-0421360fb824"}
                onVerify={(token: string) => {
                  setCaptchaToken(token);
                }}
              />
              {error && (
                <p className="text-red-500 font-medium text-sm">{error}</p>
              )}
              <div className="flex items-center justify-between">
                <div className="text-sm leading-6">
                  <Link
                    href={"/auth/reset-password"}
                    className="font-semibold text-green-600 hover:text-green-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="/account/auth/register"
              className="font-semibold leading-6 text-green-600 hover:text-green-500"
            >
              Register now for free
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}