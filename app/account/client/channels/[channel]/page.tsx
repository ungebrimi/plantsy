import React from "react";
import { getSession } from "@/app/supabase-server";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ChatPanel from "./ChatPanel";
import { Tables } from "@/database";

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
    .eq("id", params.channel)
    .single();

  const { data: professional } = await supabase
    .from("professionals")
    .select()
    .eq("id", channel.professional_id)
    .single();

  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select()
    .eq("id", channel.client_id)
    .single();

  if (!session) {
    redirect("/");
  }
  const typedServerMessages: Tables<"messages">[] = serverMessages || [];

  if(client && !clientError) {
    if(client.profile_picture) {
      JSON.parse(client.profile_picture)
    }
    return (
        <main className="flex flex-auto h-full max-w-7xl mx-auto">
          <ChatPanel
              serverMessages={typedServerMessages}
              channel={channel}
              professional={professional}
              client={client}
          />
        </main>
    );
  } else {
    redirect("/")
  }
};

export default Channel;
