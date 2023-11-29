import Image from "next/image";
import React from "react";
import FileDownloader from "./FileDownloader";
import { Tables } from "@/database";
import { getFormattedDate } from "@/app/utils/general-functions/getFormattedDate";
import { Tab } from "@headlessui/react";

interface MessageProps {
  message: Tables<"messages">;
  user: Tables<"clients"> | Tables<"professionals">;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Message = ({ message, user }: MessageProps) => {
  const messageDate: Date = new Date(message.inserted_at);
  const profilePicture: Tables<"files"> = JSON.parse(
    user.profile_picture as string,
  );
  const images: Tables<"files">[] = parseIfJson(message.images as any);
  const formattedDate = getFormattedDate(messageDate);

  function parseIfJson(subject: any) {
    try {
      return JSON.parse(subject);
    } catch (e) {
      return subject;
    }
  }

  return (
    <div key={message.id} className="flex items-start w-full">
      <div className="mt-4 flex-shrink-0">
        {profilePicture ? (
          <Image
            width={100}
            height={100}
            className="hidden xs:inline-block h-10 w-10 mr-4 rounded-full object-cover"
            src={profilePicture.url as string}
            alt={user.first_name + " " + user.last_name}
          />
        ) : (
          <p className="hidden xs:flex items-center text-white justify-center uppercase font-bold h-10 w-10 rounded-full bg-sky-500 flex-shrink-0">
            {user.first_name && user.first_name.charAt(0)}
            {user.last_name && user.last_name.charAt(0)}
          </p>
        )}
      </div>
      <article className="max-w-3xl flex flex-col justify-self-start">
        <h3 className="text-xs mb-1 ml-2 font-medium text-gray-500">
          {user.first_name + " " + user.last_name}
        </h3>
        <div
          className={classNames(
            user.id === message.client_id ? "bg-sky-100" : "bg-green-100",
            "whitespace-break-spaces relative text-sm py-2 px-2 shadow rounded-xl",
          )}
        >
          <div>{message.message}</div>
          {message.files && <FileDownloader urls={message.files} />}
          {images && (
            <Tab.Group
              as="div"
              className={classNames(
                message.message ? "mt-4" : "",
                "flex flex-col-reverse",
              )}
            >
              <div
                className={classNames(
                  images.length > 1 ? "mt-6" : "",
                  "mx-auto w-full max-w-2xl lg:max-w-none",
                )}
              >
                <Tab.List className="grid grid-cols-4 gap-6 max-w-md">
                  {images.length > 1 &&
                    images.map((image) => (
                      <Tab
                        key={image.id}
                        className="relative aspect-1  flex cursor-pointer items-center justify-center rounded-md text-sm font-medium uppercase text-gray-900 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                      >
                        {({ selected }) => (
                          <>
                            <span className="sr-only">{image.name}</span>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                              <Image
                                width={300}
                                height={300}
                                src={image.url}
                                alt=""
                                className="h-full w-full object-cover object-center"
                              />
                            </span>
                            <span
                              className={classNames(
                                selected ? "ring-sky-500" : "ring-transparent",
                                "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2",
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </Tab>
                    ))}
                </Tab.List>
              </div>

              <Tab.Panels
                className={"bg-white/40 backdrop-blur max-w-md rounded-md p-1"}
              >
                {images.map((image) => (
                  <Tab.Panel key={image.id} className="h-96">
                    <Image
                      width={300}
                      height={300}
                      src={image.url}
                      alt="#"
                      className="h-full w-full  object-contain object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          )}
        </div>
        <span className="text-xs mt-1 ml-2 font-medium text-gray-500">
          {formattedDate}
        </span>
      </article>
    </div>
  );
};

export default Message;
