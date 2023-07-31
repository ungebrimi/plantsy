import React from "react";
import Link from "next/link";
import { getSession } from "@/app/supabase-server";
import { redirect } from "next/navigation";

const ThankYou = async () => {
  const session = (await getSession()) || null;

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
          <Link
            href={`/account/${session.user.user_metadata.role}`}
            className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Show me the ropes!
          </Link>
          <Link href="/" className="text-sm font-semibold text-gray-900">
            I can manage myself thanks.
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ThankYou;
