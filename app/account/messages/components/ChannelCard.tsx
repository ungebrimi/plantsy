"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Tables } from "@/database";
import { createClient } from "@/app/utils/supabase/client";
import { getFormattedDate } from "@/app/utils/general-functions/getFormattedDate";
import Link from "next/link";

interface ChannelData {
  lastMessage: Tables<"messages"> | null;
  user: Tables<"professionals" | "clients"> | null;
  profilePicture: Tables<"files"> | null;
  formattedDate: string | null;
}

const ChannelCard = ({ channel }: { channel: Tables<"channels"> }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [channelData, setChannelData] = useState<ChannelData>({
    lastMessage: null,
    user: null,
    profilePicture: null,
    formattedDate: null,
  });

  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      try {
        if (channel) {
          // Start loading
          setLoading(true);

          // Fetch last message
          const { data: message } = await supabase
            .from("messages")
            .select()
            .eq("channel_id", channel.id)
            .order("inserted_at", { ascending: false })
            .limit(1)
            .single();
          setChannelData((prevData) => ({ ...prevData, lastMessage: message }));

          // Fetch user
          if (message) {
            const { data: user } = await supabase
              .from(message.professional_id ? "professionals" : "clients")
              .select()
              .eq("id", message.professional_id || message.client_id)
              .single();
            const messageDate: Date = new Date(message.inserted_at);
            const formattedDate = getFormattedDate(messageDate);
            setChannelData((prevData) => ({
              ...prevData,
              user,
              formattedDate,
            }));

            // Fetch profile picture
            if (user && user.profile_picture) {
              setChannelData((prevData) => ({
                ...prevData,
                profilePicture: JSON.parse(user.profile_picture as string),
              }));
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // Stop loading
        setLoading(false);
      }
    }

    fetchData();
  }, [channel, supabase]);

  const Loading = () => (
    <li className="flex gap-x-4 py-5 hover:bg-gray/90">
      <svg
        className="h-12 w-12 flex-none rounded-full bg-sky-100 animate-pulse"
        fill="currentColor"
        viewBox="0 0 24 24"
      />
      <div className="flex-auto">
        <div className="flex items-baseline justify-between gap-x-4">
          <span className="w-1/5 rounded-md h-4 bg-sky-100 animate-pulse" />
          <span className="w-1/5 h-4 rounded-md bg-sky-100 animate-pulse" />
        </div>
        <svg
          className="h-8 w-32 flex-none mt-1 rounded-md bg-sky-100 animate-pulse"
          fill="currentColor"
          viewBox="0 0 24 24"
        />
      </div>
    </li>
  );
  if (loading) return <Loading />;

  return (
    <Link href={`/account/messages/channels/${channel.id}`}>
      <li className="flex gap-x-4 py-5">
        {channelData ? (
          channelData.profilePicture ? (
            <Image
              width={399}
              height={399}
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={channelData.profilePicture?.url as string}
              alt=""
            />
          ) : (
            <p className="hidden xs:flex items-center text-white justify-center uppercase font-bold h-10 w-10 rounded-full bg-sky-500 flex-shrink-0">
              {channelData.user?.first_name &&
                channelData.user?.first_name.charAt(0)}
              {channelData.user?.last_name &&
                channelData.user?.last_name.charAt(0)}
            </p>
          )
        ) : (
          <svg
            className="h-12 w-12 flex-none rounded-full bg-sky-100 animate-pulse"
            fill="currentColor"
            viewBox="0 0 24 24"
          />
        )}
        <div className="flex-auto">
          <div className="flex items-baseline justify-between gap-x-4">
            {channelData ? (
              <>
                <p className="text-sm font-semibold leading-6 text-gray-700">
                  {channelData.user &&
                    channelData.user?.first_name +
                      " " +
                      channelData.user?.last_name}
                </p>
                {channelData.formattedDate && (
                  <p className="flex-none text-xs text-gray-600">
                    <time dateTime={channel.inserted_at}>
                      {channelData.formattedDate}
                    </time>
                  </p>
                )}
              </>
            ) : (
              <>
                <span className="w-1/5 rounded-md h-4 bg-sky-100 animate-pulse" />
                <span className="w-1/5 h-4 rounded-md bg-sky-100 animate-pulse" />
              </>
            )}
          </div>
          {channelData ? (
            channelData.lastMessage && (
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">
                {channelData.lastMessage.message}
              </p>
            )
          ) : (
            <svg
              className="h-8 w-32 flex-none mt-1 rounded-md bg-sky-100 animate-pulse"
              fill="currentColor"
              viewBox="0 0 24 24"
            />
          )}
        </div>
      </li>
    </Link>
  );
};
export default ChannelCard;
