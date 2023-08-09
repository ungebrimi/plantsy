import React from "react";
import { Fragment, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

type Conversation = {
  id: number;
  inserted_at: string;
  client_id: string | null;
  client_name: string | null;
  professional_id: string | null;
  professional_name: string | null;
  unread_messages: boolean;
};

const activeArr: Conversation[] = [
  {
    id: 1,
    inserted_at: "2023-08-07T08:00:00Z",
    client_id: "a1b2c3d4",
    client_name: "John doe",
    professional_id: null,
    professional_name: null,
    unread_messages: true,
  },
  {
    id: 2,
    inserted_at: "2023-08-07T08:00:00Z",
    client_id: "x9y8z7w6",
    client_name: "Jesus Escobar",
    professional_id: null,
    professional_name: null,
    unread_messages: false,
  },
  {
    id: 3,
    inserted_at: "2023-08-07T08:00:00Z",
    client_id: "m4n5o6p7",
    client_name: "Bhavin",
    professional_id: null,
    professional_name: null,
    unread_messages: false,
  },
];

const ArchivedConversations = () => {
  const [archivedConversations, setArchivedConverstations] = useState<
    Conversation[] | null
  >(activeArr);

  return (
    <Disclosure as="div" className="border-b border-gray-200 py-6">
      {({ open }: any) => (
        <>
          <h3 className="-my-3 flow-root">
            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-2 text-sm text-gray-400 hover:text-gray-500">
              <h2 className="text-sm font-semibold leading-6 text-gray-900">
                Archived conversations{" "}
                <span className="text-gray-400">
                  ({archivedConversations?.length})
                </span>
              </h2>
              <span className="flex items-center">
                {open ? (
                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className="pt-6">
            <div className="space-y-4">
              {archivedConversations &&
                archivedConversations.map((channel, channelIdx) => (
                  <Link
                    key={channel.id}
                    href={`account/professional/channels/${channel.id}`}
                    className="flex items-center hover:bg-gray-100 rounded-xl py-2"
                  >
                    <p className="flex items-center justify-center h-6 w-6 bg-indigo-200 rounded-full text-sm font-semibold">
                      {channel.client_name?.charAt(0)}
                    </p>
                    <p className="ml-2 text-sm font-medium">
                      {channel.client_name}
                    </p>
                    {channel.unread_messages === true && (
                      <span className="rounded-full bg-red-400 text-white w-2 h-2 ml-2"></span>
                    )}
                  </Link>
                ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default ArchivedConversations;
