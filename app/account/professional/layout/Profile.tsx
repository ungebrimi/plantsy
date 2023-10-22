"use client";
import React from "react";
import ActiveToggle from "./ActiveToggle";
import { Tables } from "@/database";
import Image from "next/image";

const Profile = ({
  professional,
}: {
  professional: Tables<"professionals">;
}) => {
  const profilePicture = JSON.parse(professional.profile_picture as string);
  return (
    <>
      <section className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
        <div className="h-20 w-20 rounded-full border overflow-hidden">
          {profilePicture ? (
            <Image
                width={300}
                height={300}
              src={profilePicture.url}
              alt={professional?.first_name + " " + professional?.last_name}
              className="h-full w-full"
            />
          ) : (
            <div className="flex items-center justify-center border-2 border-green-400 rounded-full w-full h-full p-2">
              {professional && (
                <p className="text-2xl text-gray-800 uppercase">
                  {professional.first_name?.charAt(0)}
                  {professional.last_name?.charAt(0)}
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
