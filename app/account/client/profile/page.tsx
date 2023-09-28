import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProfileInformation from "./components/ProfileInformation";
import PersonalInformation from "./components/PersonalInformation";
import Notifications from "./components/Notifications";
import { getSession } from "@/app/supabase-server";

export default async function Profile() {
  const supabase = createServerComponentClient({ cookies });
  const session = (await getSession()) || null;
  if (!session) {
    redirect("/");
  }
  // console.log(session);
  //
  const { data: client, error } = await supabase
    .from("clients")
    .select()
    .eq("id", session.user.id)
    .single();
  //
  if (error) {
    console.error(error);
    throw error;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="space-y-10 lg:px-8 divide-y divide-gray-900/10 max-w-7xl">
        <div className="grid mx-auto grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
          <ProfileInformation client={client} />
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>
          </div>

          <PersonalInformation client={client} />
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Notifications
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              We &apos; ll always let you know about important changes, but you
              pick what else you want to hear about.
            </p>
          </div>
          <Notifications client={client} />
        </div>
      </div>
    </main>
  );
}
