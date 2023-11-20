import { redirect } from "next/navigation";
import ProfileInformation from "./components/ProfileInformation";
import PersonalInformation from "./components/PersonalInformation";
import { Tables } from "@/database";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";

export default async function Profile() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.getSession();
  const { session } = data;

  if (!session) {
    // redirect("/");
  }

  const { data: professional, error: professionalError } = await supabase
    .from("professionals")
    .select()
    .eq("id", session?.user.id)
    .single();

  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select()
    .eq("id", session?.user.id)
    .single();

  if (!client && !professional) {
    redirect("/auth/login");
  }

  if (clientError || professionalError) {
    // redirect("/");
  }

  const userType = professional ? "professionals" : "clients";
  const user = professional || client;

  return (
    <div className="flex min-h-screen flex-col items-center justify-between py-12">
      <div className="space-y-10 divide-y divide-gray-900/10 max-w-7xl">
        <section className="grid mx-auto grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly, so be careful what
              you share.
            </p>
          </div>
          <ProfileInformation
            user={user as Tables<"professionals" | "clients">}
            userType={userType}
          />
        </section>

        <section className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>
          </div>
          <PersonalInformation
            user={user as Tables<"professionals" | "clients">}
            userType={userType}
          />
        </section>
      </div>
    </div>
  );
}
