"use client";
import { Client, MessageType, Professional } from "@/dbtypes";
import React from "react";
import ClientMessage from "./ClientMessage";
import ProfessionalMessage from "./ProfessionalMessage";

interface InboxProps {
  messages: MessageType[];
  client: Client;
  professional: Professional;
}

const Inbox = ({ messages, client, professional }: InboxProps) => {
  return (
    <section className="h-full overflow-x-auto">
      <div className="grid grid-cols-12 gap-y-2 w-full ">
        {/*I map the messages, and use the client id in the data to see if the message is sent by the client or a professional*/}
        {messages && messages.length > 0 ? (
          messages.map((message: MessageType, idx) => (
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
