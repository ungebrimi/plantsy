import React from "react";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";
import ChannelCard from "@/app/account/messages/components/ChannelCard";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default async function messages({
  searchParams,
}: {
  searchParams: {
    unread_messages: string;
  };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.getSession();
  const { session } = data;

  const { count: fullCount } = await supabase
    .from("channels")
    .select("*", { count: "planned", head: true })
    .eq(`${session?.user.user_metadata.role}_id`, session?.user.id);

  const { count: unreadCount } = await supabase
    .from("channels")
    .select("*", { count: "planned", head: true })
    .eq(`${session?.user.user_metadata.role}_id`, session?.user.id)
    .eq("unread_messages", true);

  const tabs = [
    {
      name: "All Messages",
      href: "/account/messages",
      count: fullCount ? fullCount - 1 : "N/A",
      current: !searchParams.unread_messages,
    },
    {
      name: "Unread",
      href: "/account/messages?unread_messages=true",
      count: unreadCount ? unreadCount - 1 : "N/A",
      current: !!searchParams.unread_messages,
    },
  ];

  /* channelQuery renders either the full inbox or only the unread messages, this is based of params */
  const channelQuery = supabase.from("channels").select();
  channelQuery.eq(`${session?.user.user_metadata.role}_id`, session?.user.id);
  if (searchParams.unread_messages) {
    channelQuery.eq(
      "unread_messages",
      JSON.parse(searchParams.unread_messages),
    );
  }
  const { data: channels, error: channelError } = await channelQuery;

  console.log(tabs[0].count, tabs[1].count);

  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#bef264] to-[#d9f99d] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        {/* Content container */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 rounded-lg backdrop-blur bg-white/50 shadow-lg">
          <div className="flex items-baseline justify-between border-b border-gray-200">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-800 pb-2">
              Your messages
            </h1>
          </div>
          <div>
            <div className="block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <Link
                      key={tab.name}
                      href={tab.href}
                      className={classNames(
                        tab.current
                          ? "border-sky-500 text-sky-600"
                          : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700",
                        "flex whitespace-nowrap border-b-2 py-4 px-1 text-xs sm:text-sm font-medium",
                      )}
                      aria-current={tab.current ? "page" : undefined}
                    >
                      {tab.name}
                      {tab.count ? (
                        <span
                          className={classNames(
                            tab.current
                              ? "bg-sky-100 text-sky-600"
                              : "bg-gray-100 text-gray-900",
                            "ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block",
                          )}
                        >
                          {tab.count}
                        </span>
                      ) : (
                        <span
                          className={classNames(
                            tab.current
                              ? "bg-sky-100 text-sky-600"
                              : "bg-gray-100 text-gray-900",
                            "ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block",
                          )}
                        >
                          0
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          <ul role="list" className="divide-y divide-gray-100">
            {channels && channels.length > 0 ? (
              channels.map((channel) => (
                <ChannelCard key={channel.id} channel={channel} />
              ))
            ) : (
              <div className="flex items-center flex-col py-12">
                <Image
                  src={"/message-not-found.svg"}
                  className="mx-auto"
                  alt="no message found"
                  width={300}
                  height={400}
                />
                <h1 className="mx-auto mt-3 text-center md:text-lg text-gray-600">
                  {searchParams.unread_messages
                    ? "You have no unread messages"
                    : "We could not find any messages"}
                </h1>
              </div>
            )}
          </ul>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#d9f99d] to-[#bef264] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
