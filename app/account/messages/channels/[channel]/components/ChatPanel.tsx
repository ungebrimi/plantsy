"use client";
import React, { useEffect, useState } from "react";
import Inbox from "@/app/account/messages/channels/[channel]/components/chat/Inbox";
import Editor from "@/app/account/messages/channels/[channel]/components/editor/Editor";
import Image from "next/image";
import { Tables } from "@/database";
import { Session } from "@supabase/supabase-js";
import { createClient } from "@/app/utils/supabase/client";

type ChatPanelProps = {
  session: Session;
  serverMessages: Tables<"messages">[];
  channel: Tables<"channels">;
  professional: Tables<"professionals">;
  client: Tables<"clients">;
};

const ChatPanel = ({
  session,
  serverMessages,
  channel,
  professional,
  client,
}: ChatPanelProps) => {
  const [messages, setMessages] =
    useState<Tables<"messages">[]>(serverMessages);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("realtime messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          // Use functional update to ensure you're working with the latest state
          setMessages((prevMessages) => [
            ...prevMessages,
            payload.new as Tables<"messages">,
          ]);
          // Play the notification sound
          const audio = new Audio("/notification.mp3");
          audio.play().then((r) => console.log(r));
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel).then((r) => {
        if (r === "error") {
          console.error("Error removing channel");
        }
        if (r === "ok") {
          console.log("Channel removed");
        }
        if (r === "timed out") {
          console.log("Channel already closed");
        }
      });
    };
  }, [supabase]);

  return (
    <div className="flex-auto flex-wrap">
      {messages.length > 0 ? (
        <Inbox
          serverMessages={messages}
          professional={professional}
          client={client}
          userType={session.user.user_metadata.role + "s"}
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
            We{`'`}re sorry we could not find any messages
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
  );
};

export default ChatPanel;
