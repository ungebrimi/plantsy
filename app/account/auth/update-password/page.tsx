"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";

export default function UpdatePassword() {
  const [event, setEvent] = useState<any>(null);
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const supabase = createClientComponentClient();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      setEvent(event);
    });
  }, []);
  console.log(event);

  const handleUpdatePassword = async (e: any) => {
    e.preventDefault();

    if (password !== confirmedPassword) {
      setMessage("Passwords don't match. Please try again.");
      return;
    }
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

    try {
      await supabase.auth.updateUser({ password: password });
      setMessage("Password has been updated successfully.");
      setPassword("");
      setConfirmedPassword("");
    } catch (error: any) {
      console.error("Error updating password:", error.message);
      setMessage("Error updating password. Please try again later.");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        {/* Rest of the component code */}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <p>{message}</p>
            <form className="space-y-6" onSubmit={handleUpdatePassword}>
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
                    autoComplete="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmed_password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm your password
                </label>
                <div className="mt-2">
                  <input
                    id="confirmed_password"
                    name="confirmed_password"
                    type="password"
                    autoComplete="confirmed_password"
                    required
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Reset and sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
