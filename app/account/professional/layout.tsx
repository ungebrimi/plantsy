import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Navigation from "./layout/Navigation";
import { cookies } from "next/headers";

export default async function ProfessionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<any>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <>
      <Navigation session={session} />
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  );
}
