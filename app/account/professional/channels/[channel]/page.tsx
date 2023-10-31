import React from "react";
import { redirect } from "next/navigation";
import ChatPanel from "./ChatPanel";
import { Tables } from "@/database";
import {getServerSession} from "@/app/supabase-server";

interface PageProps {
  params: { channel: string };
}

const Channel = async ({ params }: PageProps) => {

  const { supabase, session } = await getServerSession()

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

  if (!session) {
    redirect("/");
  }
  const typedServerMessages: Tables<"messages">[] = serverMessages || [];

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
