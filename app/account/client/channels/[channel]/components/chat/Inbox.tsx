"use client";
import React from "react";
import ClientMessage from "./ClientMessage";
import ProfessionalMessage from "./ProfessionalMessage";
import { Tables } from "@/database";

interface InboxProps {
  messages: Tables<"messages">[];
  client: Tables<"clients">;
  professional: Tables<"professionals">;
}

const Inbox = ({ messages, client, professional }: InboxProps) => {
  return (
    <section className="h-full overflow-x-auto">
      <div className="flex flex-col w-full">
        {/*I map the messages, and use the client id in the data to see if the message is sent by the client or a professional*/}
        {messages && messages.length > 0 ? (
          messages.map((message: Tables<"messages">, idx) => (
            <>
              {message.client_id ? (
                <ClientMessage key={idx} message={message} client={client} />
              ) : (
                <ProfessionalMessage
                  message={message}
                  key={idx}
                  professional={professional}
                />
              )}
            </>
          ))
        ) : (
          <h2> No messages have been sent yet </h2>
        )}
      </div>
    </section>
  );
};

export default Inbox;
