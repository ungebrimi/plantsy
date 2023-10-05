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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Inbox = ({ messages, client, professional }: InboxProps) => {
  let alignRight = true;
  return (
    <section className="h-full overflow-x-auto">
      <div className="flex flex-col w-full">
        {/*I map the messages, and use the client id in the data to see if the message is sent by the client or a professional*/}
        {messages && messages.length > 0 ? (
          messages.map((message: MessageType, idx) => {
            console.log(message);
            alignRight = !alignRight;
            return (
              <div
                key={idx}
                className={classNames(
                  alignRight ? "justify-start" : "justify-end",
                  "mb-2",
                )}
              >
                {message.client_id ? (
                  <ClientMessage message={message} client={client} />
                ) : (
                  <ProfessionalMessage
                    message={message}
                    professional={professional}
                  />
                )}
              </div>
            );
          })
        ) : (
          <h2> No messages have been sent yet </h2>
        )}
      </div>
    </section>
  );
};

export default Inbox;
