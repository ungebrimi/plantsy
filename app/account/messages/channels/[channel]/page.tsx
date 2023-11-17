import React from "react";
import { redirect } from "next/navigation";
import ChatPanel from "@/app/components/messages/components/ChatPanel";
import { Tables } from "@/database";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";

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

  if (!session || !channel || error) {
    redirect("/");
  }
  const typedServerMessages: Tables<"messages">[] = serverMessages || [];

  // function to set messages to read
  if (channel) {
    await supabase
      .from("messages")
      .update({ is_read: true })
      .eq("id", channel.id);
  }

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
