import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Tables } from "@/database";
import { getClientSupabase } from "@/app/supabase-client";
import { useNotification } from "@/context/NotificationContext";

const ActiveChannels = ({
  user,
  userType,
}: {
  user: Tables<"professionals"> | Tables<"clients">;
  userType: string;
}) => {
  const { supabase } = getClientSupabase();
  const { addError } = useNotification();
  const [activeConversations, setActiveConversations] = useState<
    Tables<"channels">[] | null
  >(null);

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
                activeConversations.map((channel) => (
                  <Link
                    key={channel.id}
                    href={
                      userType === "client"
                        ? `/account/client/channels/${channel.id}`
                        : `/account/professional/channels/${channel.id}`
                    }
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
                  </Link>
                ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default ActiveChannels;
