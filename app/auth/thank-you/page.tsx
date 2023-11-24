import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";

const ThankYou = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.getSession();
  const { session } = data;

  if (!session) {
    return <h1>loading...</h1>;
  }

  return (
    <main className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="text-center max-w-xl mx-auto">
        <p className="text-base font-semibold text-green-600">
          Congratulations
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Thank you for registering
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          We are glad to have you as a {session.user.user_metadata.role}, We
          recommend you take the time to proceed to the tutorial it will only
          take a few minutes to get you started.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/" className="text-sm font-semibold text-gray-900">
            Head back home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ThankYou;
