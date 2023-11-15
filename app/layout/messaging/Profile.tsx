"use client";
import React from "react";
import ActiveToggle from "@/app/layout/messaging/ActiveToggle";
import { Tables } from "@/database";
import Image from "next/image";

const Profile = ({
  user,
  userType,
}: {
  user: Tables<"professionals"> | Tables<"clients">;
  userType: string;
}) => {
  const profilePicture = (user.profile_picture as Tables<"files">) ?? null;
  return (
    <>
      <section className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
        <div className="h-20 w-20 rounded-full border overflow-hidden">
          {profilePicture ? (
            <Image
              width={300}
              height={300}
              src={profilePicture.url}
              alt={user?.first_name + " " + user?.last_name}
              className="h-full w-full"
            />
          ) : (
            <div className="flex items-center justify-center border-2 border-green-400 rounded-full w-full h-full p-2">
              {user && (
                <p className="text-2xl text-gray-800 uppercase">
                  {user.first_name?.charAt(0)}
                  {user.last_name?.charAt(0)}
                </p>
              )}
            </div>
          )}
        </div>
        <h2 className="text-sm font-semibold mt-2">
          {user?.company || "Not specified"}
        </h2>
        {user && <ActiveToggle user={user} userType={userType} />}
      </section>
    </>
  );
};

export default Profile;
