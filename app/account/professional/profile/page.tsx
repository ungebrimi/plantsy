import { redirect } from "next/navigation";
import ProfileInformation from "@/app/components/profile/components/ProfileInformation";
import PersonalInformation from "@/app/components/profile/components/PersonalInformation";
import { Tables } from "@/database";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";

export default async function Profile() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getSession();
  const { session } = data;

  if (!session) {
    redirect("/");
  }

  const { data: professional, error } = await supabase
    .from("professionals")
    .select()
    .eq("id", session.user.id)
    .single();

  if (error) {
    console.error(error);
    throw error;
  }
  if (professional) {
    if (professional.profile_picture) {
      console.log("there is a profile picture");
      professional.profile_picture = JSON.parse(professional.profile_picture);
    }
    return (
      <main className="flex min-h-screen flex-col items-center justify-between py-12">
        <div className="space-y-10 lg:px-8 divide-y divide-gray-900/10 max-w-7xl">
          <div className="grid mx-auto grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
            <ProfileInformation
              user={professional as Tables<"professionals">}
              userType={"professionals"}
            />
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

            <PersonalInformation
              user={professional as Tables<"professionals">}
              userType={"professionals"}
            />
          </div>
          {/* Hidden as long as notifications are not setup
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
              <Notifications user={professional  as Tables<"professionals">} userType={"professionals"}/>
            </div>
            */}
        </div>
      </main>
    );
  }
}
