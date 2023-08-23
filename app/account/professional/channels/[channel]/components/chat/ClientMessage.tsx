import { MessageType, Client } from "@/dbtypes";
import React from "react";

interface ClientMessageProps {
  message: MessageType;
  client: Client;
}

const ClientMessage = ({ message, client }: ClientMessageProps) => {
  const messageDate: any = new Date(message.inserted_at);
  const currentDate: any = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - messageDate;

  let formattedDate;

  if (timeDifference < 86400000) {
    // Less than a day
    formattedDate = messageDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (timeDifference < 604800000) {
    // Less than a week
    formattedDate = messageDate.toLocaleString("en-US", {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    formattedDate = messageDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div
      key={message.id}
      className="col-start-1 col-end-13 lg:col-end-8 rounded-lg "
    >
      <div className="flex items-center justify-self-start">
        <div className="">
          {client.profile_picture ? (
            <img
              className="hidden xs:inline-block h-10 w-10 rounded-full"
              src={client.profile_picture}
              alt={client.first_name + " " + client.last_name}
            />
          ) : (
            <p className="hidden xs:flex items-center text-white justify-center uppercase font-bold h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
              {client.first_name.charAt(0) + client.last_name.charAt(0)}
            </p>
          )}
        </div>
        <article className="ml-3 max-w-xl">
          <h3 className="text-xs mb-1 ml-2 font-medium text-gray-500">
            {client.first_name + " " + client.last_name}
          </h3>
          <div className="relative text-sm bg-indigo-100 py-2 px-2 shadow rounded-xl">
            <div>{message.message}</div>
          </div>
          <span className="text-xs mt-1 ml-2 font-medium text-gray-500">
            {formattedDate}
          </span>
        </article>
      </div>
    </div>
  );
};

export default ClientMessage;
