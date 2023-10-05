import { FileType, MessageType, Professional } from "@/dbtypes";
import { DocumentIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import FileDownloader from "./FileDownloader";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

interface ProfessionalMessageProps {
  message: MessageType;
  professional: Professional;
}

const ProfessionalMessage = ({
  message,
  professional,
}: ProfessionalMessageProps) => {
  const [profilePicture, setProfilePicture] = useState<FileType>(
    professional.profile_picture,
  );
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
  console.log(profilePicture);

  return (
    <div
      key={message.id}
      className="col-start-1 lg:col-start-6 col-end-13 p-3 rounded-lg"
    >
      <div className="flex items-center justify-self-end flex-row-reverse">
        {profilePicture ? (
          <Image
            width={150}
            height={150}
            className="hidden xs:inline-block h-10 w-10 rounded-full"
            src={profilePicture.url}
            alt={professional.first_name + " " + professional.last_name}
          />
        ) : (
          <p className="xs:flex items-center hidden sm:block text-white justify-center h-10 w-10 uppercase font-bold rounded-full bg-green-500 flex-shrink-0">
            {professional.first_name.charAt(0) +
              professional.last_name.charAt(0)}
          </p>
        )}
        <article className="mr-3 max-w-xl flex flex-col justify-end items-end">
          <h3 className="text-xs mb-1 mr-2 font-medium text-gray-500">
            {professional.first_name + " " + professional.last_name}
          </h3>
          <div className="whitespace-break-spaces relative text-sm bg-green-100 py-2 px-2 shadow rounded-xl">
            <p>{message.message}</p>
          </div>
          {message.files && <FileDownloader urls={message.files} />}
          {message.images && (
            <div className="bg-green-100 max-w-sm mt-2 py-2 px-2 shadow rounded-xl relative">
              <div className="bg-white rounded-md shadow-sm p-2">
                <Carousel showThumbs={true} infiniteLoop={true}>
                  {message.images.map((imageUrl, index) => (
                    <div key={index} className="border-b ">
                      <img src={imageUrl} key={index} alt={`Image ${index}`} />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          )}
          <span className="text-xs mt-1 mr-2 font-medium text-gray-500">
            {formattedDate}
          </span>
        </article>
      </div>
    </div>
  );
};

export default ProfessionalMessage;
