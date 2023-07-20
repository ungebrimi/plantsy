import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"
import ProfileInformation from "./components/ProfileInformation";
import PersonalInformation from "./components/PersonalInformation";
import Notifications from "./components/Notifications";

/*
 * this is a server component, where we first create a createServerComponentClient and pass it the cookies from the next headers.
 * this is to check if we have a signed in user session, if not we redirect the user back to home page.
 * */

export default async function Profile() {
  const supabase = createServerComponentClient<any>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()
  const { data: { user } } = await supabase.auth.getUser()

  if (!session || !user) {
    redirect("/")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="space-y-10 lg:px-8 divide-y divide-gray-900/10 max-w-7xl">
        <div className="grid mx-auto grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>
          <ProfileInformation user={user} />
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
          </div>

          <PersonalInformation user={user} />
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              We &apos; ll always let you know about important changes, but you pick what else you want to hear about.
            </p>
          </div>
          <Notifications user={user} />
        </div>
      </div>
    </main>
  )
}
