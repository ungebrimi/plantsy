"use client";
import React, { useState, useEffect } from "react";
import Inbox from "./components/chat/Inbox";
import Editor from "./components/editor/Editor";
import {
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { Tables } from "@/database";

type ChatPanelProps = {
  serverMessages: Tables<"messages">[];
  channel: Tables<"channels">;
  professional: Tables<"professionals">;
  client: Tables<"clients">;
};

const ChatPanel = ({
  serverMessages,
  channel,
  professional,
  client,
}: ChatPanelProps) => {
  const [messages, setMessages] =
    useState<Tables<"messages">[]>(serverMessages);
  const supabase = createClientComponentClient();
  async function playAudio() {
    const audio = new Audio('audio-file.mp3');
    try {
      await audio.play();
      console.log('Audio played successfully');
      // Perform any other actions after the audio has finished playing.
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }

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
          playAudio()
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
            width={600}
            height={500}
            src={"/message-not-found.svg"}
            className="mx-auto max-w-md"
            alt="no message found"
          />
          <h1 className="mx-auto mt-3 text-center md:text-xl text-gray-600">
            Be the first to send a message
          </h1>
        </div>
      )}
      <Editor channel={channel} client={client} />
    </div>
  );
};

export default ChatPanel;
