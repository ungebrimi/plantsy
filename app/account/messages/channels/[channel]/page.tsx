import React from "react";
import { redirect } from "next/navigation";
import { Tables } from "@/database";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Inbox from "@/app/account/messages/channels/[channel]/components/chat/Inbox";
import Image from "next/image";
import Editor from "@/app/account/messages/channels/[channel]/components/editor/Editor";

interface PageProps {
  params: { channel: string };
}

const Channel = async ({ params }: PageProps) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.getSession();
  const { session } = data;

  const { data: serverMessages } = await supabase
    .from("messages")
    .select()
    .eq("channel_id", params.channel);

  const { data: channel } = await supabase
    .from("channels")
    .select("*")
    .eq("id", params.channel)
    .single();

  const { data: professional } = await supabase
    .from("professionals")
    .select()
    .eq("id", channel.professional_id)
    .single();

  const { data: client } = await supabase
    .from("clients")
    .select()
    .eq("id", channel.client_id)
    .single();

  const { error: update_error } = await supabase
    .from("channels")
    .update({ unread_messages: false })
    .eq("id", channel.id);

  if (update_error) console.log(update_error);

  if (!session || !channel || error) {
    redirect("/");
  }
  const typedServerMessages: Tables<"messages">[] = serverMessages || [];

  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#bef264] to-[#d9f99d] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        {/* Content container */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 rounded-lg backdrop-blur bg-white/50 shadow-lg divide-y divide-gray-200">
          <div className="px-4 py-3 sm:px-6">
            <Link
              href={"/account/messages"}
              className="text-sm font-medium inline-flex items-center gap-2 text-sky-600 hover:text-sky-700"
            >
              <ArrowLeftIcon className="w-4"></ArrowLeftIcon>
              Back to messages
            </Link>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flex-auto flex-wrap">
              {typedServerMessages && typedServerMessages.length > 0 ? (
                <Inbox
                  serverMessages={typedServerMessages}
                  professional={professional}
                  client={client}
                />
              ) : (
                <div className="flex items-center flex-col py-12">
                  <Image
                    src={"/message-not-found.svg"}
                    className="mx-auto max-w-md"
                    alt="no message found"
                    width={300}
                    height={400}
                  />
                  <h1 className="mx-auto mt-3 text-center md:text-xl text-gray-600">
                    Be the first to send a message!
                  </h1>
                </div>
              )}
              {session.user.user_metadata.role === "client" && (
                <Editor channel={channel} user={client} userType={"clients"} />
              )}
              {session.user.user_metadata.role === "professional" && (
                <Editor
                  channel={channel}
                  user={professional}
                  userType={"professionals"}
                />
              )}
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#d9f99d] to-[#bef264] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Channel;
