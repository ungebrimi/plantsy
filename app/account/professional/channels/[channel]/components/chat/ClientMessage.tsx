import { MessageType, Client, FileType } from "@/dbtypes";
import Image from "next/image";
import React, { useState } from "react";
import FileDownloader from "./FileDownloader";
import { Carousel } from "react-responsive-carousel";

interface ClientMessageProps {
  message: MessageType;
  client: Client;
}

const ClientMessage = ({ message, client }: ClientMessageProps) => {
  const messageDate: any = new Date(message.inserted_at);
  const currentDate: any = new Date();
  const [profilePicture, setProfilePicture] = useState<FileType>(
    JSON.parse(client.profile_picture),
  );

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
    <div>
      <div className="p-3 flex items-center justify-self-start">
        <div className="">
          {profilePicture ? (
            <Image
              width={100}
              height={100}
              className="hidden xs:inline-block h-10 w-10 rounded-full"
              src={profilePicture.url}
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
          <div className="whitespace-break-spaces relative text-sm bg-indigo-100 py-2 px-2 shadow rounded-xl">
            <div>{message.message}</div>
          </div>
          {message.files && <FileDownloader urls={message.files} />}
          {message.images && (
            <div className="bg-green-100 max-w-sm mt-2 py-2 px-2 shadow rounded-xl relative">
              <div className="bg-white rounded-md shadow-sm p-2">
                <Carousel showThumbs={true} infiniteLoop={true}>
                  {message.images.map((imageUrl, index) => (
                    <div key={index} className="border-b ">
                      <Image
                        width={400}
                        height={300}
                        src={imageUrl}
                        key={index}
                        alt={`Image ${index}`}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          )}
          <span className="text-xs mt-1 ml-2 font-medium text-gray-500">
            {formattedDate}
          </span>
        </article>
      </div>
    </div>
  );
};

export default ClientMessage;
