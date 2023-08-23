import React from "react";
import { getSession } from "@/app/supabase-server";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ChatPanel from "./ChatPanel";
import { MessageType } from "@/dbtypes";

interface PageProps {
  params: { channel: string };
}

const Channel = async ({ params }: PageProps) => {
  const supabase = createServerComponentClient({ cookies });
  const session = (await getSession()) || null;

  const { data: serverMessages } = await supabase
    .from("messages")
    .select()
    .eq("channel_id", params.channel);

  const { data: channel } = await supabase
    .from("channels")
    .select("*")
    .eq("id", 1)
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

  if (!session) {
    redirect("/");
  }
  const typedServerMessages: MessageType[] = serverMessages || [];

  return (
    <main className="flex flex-auto h-full max-w-7xl mx-auto">
      <ChatPanel
        session={session}
        serverMessages={typedServerMessages}
        channel={channel}
        professional={professional}
        client={client}
      />
    </main>
  );
};

export default Channel;
