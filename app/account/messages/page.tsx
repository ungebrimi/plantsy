import React from "react";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";
import ChannelCard from "@/app/account/messages/components/ChannelCard";

const tabs = [
  {
    name: "Unread",
    href: "/account/messages?unread_messages=true",
    count: "2",
    current: true,
  },
  {
    name: "All Messages",
    href: "/account/messages",
    count: "12",
    current: false,
  },
  /* {
                       name: "Archived",
                       href: "/account/messages?unread_messages=false&archived=true",
                       count: "6",
                       current: false,
                     }, */
];
const comments = [
  {
    id: 1,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content:
      "Explicabo nihil laborum. Saepe facilis consequuntur in eaque. Consequatur perspiciatis quam. Sed est illo quia. Culpa vitae placeat vitae. Repudiandae sunt exercitationem nihil nisi facilis placeat minima eveniet.",
    date: "1d ago",
    dateTime: "2023-03-04T15:54Z",
  },
  {
    id: 2,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content:
      "Laudantium quidem non et saepe vel sequi accusamus consequatur et. Saepe inventore veniam incidunt cumque et laborum nemo blanditiis rerum. A unde et molestiae autem ad. Architecto dolor ex accusantium maxime cumque laudantium itaque aut perferendis.",
    date: "2d ago",
    dateTime: "2023-03-03T14:02Z",
  },
  {
    id: 3,
    name: "Dries Vincent",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content:
      "Quia animi harum in quis quidem sint. Ipsum dolorem molestias veritatis quis eveniet commodi assumenda temporibus. Dicta ut modi alias nisi. Veniam quia velit et ut. Id quas ducimus reprehenderit veniam fugit amet fugiat ipsum eius. Voluptas nobis earum in in vel corporis nisi.",
    date: "2d ago",
    dateTime: "2023-03-03T13:23Z",
  },
  {
    id: 4,
    name: "Lindsay Walton",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content:
      "Unde dolore exercitationem nobis reprehenderit rerum corporis accusamus. Nemo suscipit temporibus quidem dolorum. Nobis optio quae atque blanditiis aspernatur doloribus sit accusamus. Sunt reiciendis ut corrupti ab debitis dolorem dolorem nam sit. Ducimus nisi qui earum aliquam. Est nam doloribus culpa illum.",
    date: "3d ago",
    dateTime: "2023-03-02T21:13Z",
  },
];

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
            <div className="sm:hidden">
              <form action={"#"}>
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                  id="tabs"
                  name="tabs"
                  className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  //@ts-ignore
                  defaultValue={tabs.find((tab) => tab.current).name}
                >
                  {tabs.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
                <button type="submit">hello</button>
              </form>
            </div>
            <div className="hidden sm:block">
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
                        "flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium",
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
                      ) : null}
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
                  className="mx-auto max-w-md"
                  alt="no message found"
                  width={300}
                  height={400}
                />
                <h1 className="mx-auto mt-3 text-center md:text-xl text-gray-600">
                  We{`'`}re sorry we could not find any messages
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
