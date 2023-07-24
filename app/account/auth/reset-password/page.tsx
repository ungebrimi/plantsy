"use client";
import { useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Image from "next/image";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | undefined>();
  const captcha = useRef<any>();

  const supabase = createClientComponentClient();

  const handleResetPassword = async (e: any) => {
    e.preventDefault();
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/account/update-password`,
        captchaToken,
      });
      captcha.current.resetCaptcha();
      setMessage(
        "Reset password email has been sent. Please check your inbox."
      );
      setEmail("");
    } catch (error: any) {
      console.error("Error resetting password:", error.message);
      setMessage("Error resetting password. Please try again later.");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            width={300}
            height={300}
            className="mx-auto h-10 w-auto"
            src="/plantsy.png"
            alt="Plantsy"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <p>{message}</p>
            <form className="space-y-6" onSubmit={handleResetPassword}>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
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
                  className="flex mt-8 w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
