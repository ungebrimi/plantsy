'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import Link from 'next/link'
import HCaptcha from '@hcaptcha/react-hcaptcha'

export default function Register() {
  const [message, setMessage] = useState<string | undefined>()
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false)
  const [captchaToken, setCaptchaToken] = useState<string | undefined>()
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter()
  // should be supabase DB type this any as well
  const supabase = createClientComponentClient<any>()
  const captcha = useRef<any>()

  const createBucket = async (id: string) => {
    console.log(id)
    try {
      const { data, error } = await supabase
        .storage
        .createBucket(id, {
          public: false,
          allowedMimeTypes: ['image/*'],
          fileSizeLimit: 5024
        });
      if (error) {
        console.error(error);
        return null; // Handle the error appropriately
      }
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return null; // Handle the error appropriately
    }
  };

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values: any = Object.fromEntries(data.entries());
    setMessage(undefined);
    let email = values.email.trim();
    let password = values.password.trim();
    let confirmPassword = values.confirm_password.trim();

    // Password requirements checker
    // Password validation check
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    if (password.length < 8 || !uppercaseRegex.test(password) || !numberRegex.test(password)) {
      setMessage('Password must be at least 8 characters long, contain an uppercase letter, and a number.');
      return;
    }

    if (!email || !password || !acceptTerms) {
      setMessage("You need to fill in all required fields and accept the terms and conditions to continue");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    setMessage(`Thanks for registering! We have sent you a confirmation email to ${email}`);

    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback?next=/account/thank-you`, // Specify the desired next URL
          captchaToken
        },
      });

      if (error) {
        console.error(error);
        return null; // Handle the error appropriately
      }

      if (user) {
        await createBucket(user.id);
      }

      // captcha.current.resetCaptcha();
      setTimeout(() => {
        router.push("/account/profile");
      }, 5000);
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
    }
  };

  return (
    <main>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" action="#" ref={formRef} onSubmit={handleSignUp} method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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
                <label htmlFor="confirm_password" className="block text-sm font-medium leading-6 text-gray-900">
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

              <HCaptcha
                sitekey={"8c6238de-63ae-47f6-8007-0421360fb824"}
                onVerify={(token: string) => { setCaptchaToken(token) }} />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="checked"
                    name="checked"
                    type="checkbox"
                    onChange={() => setAcceptTerms(!acceptTerms)}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                  />
                  <label htmlFor="checked" className="ml-3 block text-sm leading-6 text-gray-900">
                    By checking I accept Plantsy{`'`}s<Link href="/legal" className="text-green-500 underline font-bold"> terms & conditions</Link>
                  </label>
                </div>
              </div>
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
            Already a member?{' '}
            <Link href="/login" className="font-semibold leading-6 text-green-600 hover:text-green-500">
              Go to login
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

