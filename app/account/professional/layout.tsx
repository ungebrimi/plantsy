export const dynamic = "force-dynamic";
import { getSession } from "@/app/supabase-server";
import Navigation from "./layout/Navigation";
import { redirect } from "next/navigation";

export default async function ProfessionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getSession()) || null;
  if (!session) {
    console.log("session is missing");
    redirect("/");
  }
  if (session.user.user_metadata.role !== "professional") {
    console.log("You do not have a professsional account");
    redirect("/");
  }

  return (
    <>
      <Navigation session={session} />
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  );
}
