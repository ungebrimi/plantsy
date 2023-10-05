"use client";
import React from "react";
import { Client } from "@/dbtypes";
import ActiveToggle from "./ActiveToggle";

const Profile = ({ client }: { client: Client }) => {
  return (
    <>
      <section className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
        <div className="h-20 w-20 rounded-full border overflow-hidden">
          {client?.profile_picture ? (
            <img
              src={JSON.parse(client.profile_picture).url}
              alt={client?.first_name + " " + client?.last_name}
              className="h-full w-full"
            />
          ) : (
            <div className="flex items-center justify-center border-2 border-green-400 rounded-full w-full h-full p-2">
              {client && (
                <p className="text-2xl text-gray-800 uppercase">
                  {client.first_name.charAt(0) + client.last_name.charAt(0)}
                </p>
              )}
            </div>
          )}
        </div>
        <h2 className="text-sm font-semibold mt-2">
          {client?.first_name + " " + client.last_name || "Not specified"}
        </h2>
        <p className="text-xs text-gray-500">
          {client?.state || "Not specified"}
        </p>
        {client && <ActiveToggle client={client} />}
      </section>
    </>
  );
};

export default Profile;
