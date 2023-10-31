import React, { useEffect } from "react";
import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import {Tables} from "@/database";
import {createBrowserClient} from "@supabase/ssr";

type Conversation = {
  id: number;
  inserted_at: string;
  client_id: string | null;
  client_name: string | null;
  professional_id: string | null;
  professional_name: string | null;
  unread_messages: boolean;
};

const ActiveChannels = ({ client }: { client: Tables<"clients"> }) => {
  const [activeConversations, setActiveConversations] = useState<
    Conversation[] | null
  >(null);

  const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function getChannels() {
      const { data, error } = await supabase
        .from("channels")
        .select()
        .eq("client_id", client.id);
      if (error) console.error(error);
      return data;
    }
    getChannels().then((res) => setActiveConversations(res));
  }, [supabase, client.id]);

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
                    href={`/account/client/channels/${channel.id}`}
                    className="flex items-center hover:bg-gray-100 rounded-xl py-2"
                  >
                    <p className="flex items-center justify-center h-6 w-6 bg-indigo-200 rounded-full text-sm font-semibold">
                      {channel.professional_name?.charAt(0)}
                    </p>
                    <p className="ml-2 text-sm font-medium">
                      {channel.professional_name}
                    </p>
                    {channel.unread_messages && (
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

export default ActiveChannels;
