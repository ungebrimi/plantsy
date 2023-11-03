"use client";
import React from "react";
import ClientMessage from "./ClientMessage";
import ProfessionalMessage from "./ProfessionalMessage";
import { Tables } from "@/database";

interface InboxProps {
  messages: Tables<"messages">[];
  client: Tables<"clients">;
  professional: Tables<"professionals">;
  userType: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Inbox = ({ messages, client, professional, userType }: InboxProps) => {
  // unoReverse is used to reverse the position of the messages. whereas false is professional and true is client
  // whichever is true is positioned on the right hand side of the screen
  let unoReverse = false;
  if (userType === "client") {
    unoReverse = true;
  }

  return (
    <section className="h-full overflow-x-auto">
      <div className="flex flex-col w-full">
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
          <h2> No messages have been sent yet </h2>
        )}
      </div>
    </section>
  );
};

export default Inbox;
