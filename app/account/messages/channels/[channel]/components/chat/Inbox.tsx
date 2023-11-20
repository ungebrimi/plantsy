"use client";
import React, { useEffect, useState } from "react";
import ClientMessage from "./ClientMessage";
import ProfessionalMessage from "./ProfessionalMessage";
import { Tables } from "@/database";
import { createClient } from "@/app/utils/supabase/client";
import Image from "next/image";

interface InboxProps {
  serverMessages: Tables<"messages">[];
  client: Tables<"clients">;
  professional: Tables<"professionals">;
  userType: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Inbox = ({
  serverMessages,
  client,
  professional,
  userType,
}: InboxProps) => {
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
  // unoReverse is used to reverse the position of the messages. whereas false is professional and true is client
  // whichever is true is positioned on the right hand side of the screen
  let unoReverse = false;
  if (userType === "client") {
    unoReverse = true;
  }

  return (
    <section className="flex flex-col w-full">
      {messages && messages.length > 0 ? (
        messages.map((message: Tables<"messages">, idx) => {
          return (
            <div
              key={message.id}
              className={classNames(
                idx % 2 === 0 ? "justify-start" : "justify-end",
                "mb-2",
              )}
            >
              {message.client_id ? (
                <ClientMessage
                  message={message}
                  client={client}
                  unoReverse={unoReverse}
                />
              ) : (
                <ProfessionalMessage
                  message={message}
                  professional={professional}
                  unoReverse={unoReverse}
                />
              )}
            </div>
          );
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
