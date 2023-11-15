import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Tables } from "@/database";
import { useNotification } from "@/context/NotificationContext";
import { createClient } from "@/app/utils/supabase/client";
import { useRouter } from "next/navigation";

const ActiveChannels = ({
  user,
  userType,
}: {
  user: Tables<"professionals"> | Tables<"clients">;
  userType: string;
}) => {
  const supabase = createClient();
  const { addError } = useNotification();
  const [activeConversations, setActiveConversations] = useState<
    Tables<"channels">[] | null
  >(null);
  const router = useRouter();

  useEffect(() => {
    async function getChannels() {
      if (!user) return;
      if (userType === "clients") {
        const { data, error } = await supabase
          .from("channels")
          .select()
          .eq("client_id", user.id);
        if (error) {
          addError(error.message);
        }
        return data;
      }
      if (userType === "professionals") {
        const { data, error } = await supabase
          .from("channels")
          .select()
          .eq("professional_id", user.id);
        if (error) {
          addError(error.message);
        }
        return data;
      }
    }

    getChannels().then((res) =>
      setActiveConversations(res as Tables<"channels">[]),
    );
  }, [supabase, user, userType, addError]);

  async function setMessagesToUnread(channelId: number) {
    const { error } = await supabase
      .from("channels")
      .update({ unread_messages: false })
      .eq("id", channelId);
    if (error) {
      addError(error.message);
    }
  }

  // function to navigate to channel and set unread messages to false
  async function navigateToChannel(channelId: number) {
    await setMessagesToUnread(channelId);
    if (userType === "clients") {
      router.push(`/account/client/channels/${channelId}`);
    }
    if (userType === "professionals") {
      router.push(`/account/professional/channels/${channelId}`);
    }
  }

  return (
    <Disclosure as="div" defaultOpen className="border-b border-gray-200 py-6">
      {({ open }: any) => (
        <>
          <h3 className="-my-3 flow-root">
            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-2 text-sm text-gray-400 hover:text-gray-500">
              <h2 className="text-sm font-semibold leading-6 text-gray-900">
                Active conversations{" "}
                <span className="text-green-600">
                  ({activeConversations?.length})
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
              {activeConversations &&
                activeConversations.map((channel) => {
                  return (
                    <button
                      key={channel.id}
                      onClick={() => navigateToChannel(channel.id)}
                      className="flex items-center hover:bg-gray-100 rounded-xl py-2"
                    >
                      <p className="flex items-center justify-center h-6 w-6 bg-indigo-200 rounded-full text-sm font-semibold">
                        {userType === "clients" &&
                          `${channel.professional_name?.charAt(
                            0,
                          )}${channel.professional_name?.charAt(1)}`}
                        {userType === "professionals" &&
                          `${channel.client_name?.charAt(
                            0,
                          )}${channel.client_name?.charAt(1)}`}
                      </p>
                      <p className="ml-2 text-sm font-medium">
                        {userType === "clients"
                          ? channel.professional_name
                          : channel.client_name}
                      </p>
                      {/* @ts-ignore*/}
                      {channel.unread_messages && (
                        <span
                          aria-label="unread messages"
                          className="p-1 ml-4 rounded-full bg-red-500"
                        ></span>
                      )}
                    </button>
                  );
                })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default ActiveChannels;
