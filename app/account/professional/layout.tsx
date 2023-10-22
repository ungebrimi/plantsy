export const dynamic = "force-dynamic";
import React from "react";
import { getSession } from "@/app/supabase-server";
import Navigation from "./layout/Navigation";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NotificationProvider } from '@/context/NotificationContext';

export default async function ProfessionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getSession()) || null;
  const supabase = createServerComponentClient({ cookies });

  if (!session) {
    console.log("session is missing");
    redirect("/");
  }

  if (session.user.user_metadata.role !== "professional") {
    console.log("You do not have a professional account");
    redirect("/");
  }

  const { data: professional, error } = await supabase
    .from("professionals")
    .select("*")
    .eq("id", session.user.id)
    .single();
  if (error) {
    console.error(error);
    return;
  }

  return (
    <>
      <Navigation professional={professional} />
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  );
}
