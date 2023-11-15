import React from "react";
import { redirect } from "next/navigation";
import { Tables } from "@/database";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";
import Inbox from "@/app/components/messages/components/chat/Inbox";
import Editor from "@/app/components/messages/components/editor/Editor";

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

  if (!session || !channel) {
    redirect("/");
  }
  const typedServerMessages: Tables<"messages">[] = serverMessages || [];

  return (
    <main className="h-full overflow-x-hidden">
      <section className="flex-auto flex-wrap h-full rounded-xl bg-gray-100 p-4 py-12">
        <Inbox
          serverMessages={typedServerMessages}
          client={client}
          professional={professional}
          userType={"professionals"}
        />
        <Editor
          channel={channel}
          user={professional}
          userType={"professionals"}
        />
      </section>
    </main>
  );
};

export default Channel;
