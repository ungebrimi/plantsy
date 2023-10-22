"use client";
import React, { useState, useEffect } from "react";
import Inbox from "./components/chat/Inbox";
import Editor from "./components/editor/Editor";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { Tables } from "@/database";

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
  const supabase = createClientComponentClient();

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
          audio.play();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <div className="flex-auto flex-wrap h-full rounded-xl bg-gray-100 p-4 py-12">
      {messages.length > 0 ? (
        <Inbox
          messages={messages}
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
            We{`'`}re sorry we could not find any messages
          </h1>
        </div>
      )}
      <Editor channel={channel} professional={professional} />
    </div>
  );
};

export default ChatPanel;
