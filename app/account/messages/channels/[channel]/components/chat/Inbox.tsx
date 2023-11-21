"use client";
import React, { useEffect, useState } from "react";
import { Tables } from "@/database";
import { createClient } from "@/app/utils/supabase/client";
import Image from "next/image";
import Message from "./Message";

interface InboxProps {
  serverMessages: Tables<"messages">[];
  client: Tables<"clients">;
  professional: Tables<"professionals">;
}

const Inbox = ({ serverMessages, client, professional }: InboxProps) => {
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
    <section className="flex w-full flex-col">
      {messages && messages.length > 0 ? (
        messages.map((message: Tables<"messages">, idx) => {
          if (message.client_id === client.id) {
            return <Message message={message} user={client} key={idx} />;
          }
          if (message.professional_id === professional.id) {
            return <Message message={message} user={professional} key={idx} />;
          } else {
            return null;
          }
        })
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
    </section>
  );
};

export default Inbox;
