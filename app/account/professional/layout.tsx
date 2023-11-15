import { createClient } from "@/app/utils/supabase/server";
import ErrorNotifications from "@/app/account/professional/layout/ErrorNotifications";
import React from "react";
import Navigation from "./layout/Navigation";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NotificationProvider } from "@/context/NotificationContext";

export const dynamic = "force-dynamic";

export default async function ProfessionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.getSession();
  const { session } = data;

  if (!session || error) {
    console.log("session is missing");
    redirect("/");
  }

  if (session.user.user_metadata.role !== "professional") {
    console.log("You do not have a professional account");
    redirect("/");
  }

  const { data: professional, error: professionalError } = await supabase
    .from("professionals")
    .select("*")
    .eq("id", session.user.id)
    .single();
  if (error) {
    console.error(error);
    return;
  }
  if (professional) {
    return (
      <>
        <NotificationProvider>
          <Navigation professional={professional} />
          <main className="py-10 lg:pl-72">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
          <ErrorNotifications />
        </NotificationProvider>
      </>
    );
  } else {
    console.log("Professional not found");
    redirect("/");
  }
}
