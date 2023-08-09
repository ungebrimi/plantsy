"use client";
import React, { useEffect, useState } from "react";
import { getSession } from "@/app/supabase-client";
import { User } from "@/dbtypes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import ActiveToggle from "./ActiveToggle";

const Profile = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [professional, setProfessional] = useState<User | null>(null);

  useEffect(() => {
    async function getUserData() {
      const session = (await getSession()) || null;
      if (!session) return;
      const { data: professional, error } = await supabase
        .from("professionals")
        .select("*")
        .eq("id", session.user.id);
      if (error) {
        console.error(error);
        return;
      }
      setProfessional(professional[0]);
    }
    getUserData();
  }, [supabase, router]);

  return (
    <>
      <section className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
        <div className="h-20 w-20 rounded-full border overflow-hidden">
          {professional?.profile_picture ? (
            <img
              src={professional.profile_picture}
              alt={professional?.first_name + " " + professional?.last_name}
              className="h-full w-full"
            />
          ) : (
            <div className="flex items-center justify-center border-2 border-green-400 rounded-full w-full h-full p-2">
              {professional && (
                <p className="text-2xl text-gray-800 uppercase">
                  {professional.first_name.charAt(0) +
                    professional.last_name.charAt(0)}
                </p>
              )}
            </div>
          )}
        </div>
        <h2 className="text-sm font-semibold mt-2">
          {professional?.company || "Not specified"}
        </h2>
        <p className="text-xs text-gray-500">
          {professional?.company_role || "Not specified"}
        </p>
        {professional && <ActiveToggle professional={professional} />}
      </section>
    </>
  );
};

export default Profile;
