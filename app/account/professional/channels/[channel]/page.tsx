import React from "react";
import Editor from "./Editor";
import Image from "next/image";

const dummyMessages = [
  {
    id: 1,
    inserted_at: "2023-08-07T08:00:00Z",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    channel_id: 1,
    client_id: "a1b2c3d4",
    professional_id: null,
  },
  {
    id: 2,
    inserted_at: "2023-08-07T08:10:00Z",
    message: "Im ok what about you?",
    channel_id: 1,
    client_id: null,
    professional_id: "x9y8z7w6",
  },
  {
    id: 3,
    inserted_at: "2023-08-07T08:10:00Z",
    message: "Did you do the thing?",
    channel_id: 1,
    client_id: null,
    professional_id: "x9y8z7w6",
  },
  {
    id: 4,
    inserted_at: "2023-08-07T08:15:00Z",
    message: "Lorem ipsum dolor sit amet...",
    channel_id: 2,
    client_id: "a1b2c3d4",
    professional_id: null,
  },
  {
    id: 5,
    inserted_at: "2023-08-07T08:20:00Z",
    message: "Consectetur adipisicing elit...",
    channel_id: 2,
    client_id: null,
    professional_id: "m4n5o6p7",
  },
  // ...more messages here
];

const Channel = () => {
  return (
    <div className="flex flex-auto h-full max-w-7xl mx-auto">
      <div className="flex-auto flex-wrap h-full rounded-xl bg-gray-100">
        <div className="h-full overflow-x-auto">
          <div className="grid grid-cols-12 gap-y-2 w-full ">
            {dummyMessages.map((message) => (
              <div
                key={message.id}
                className={`${message.client_id
                    ? "col-start-1 col-end-13 lg:col-end-8"
                    : "col-start-1 lg:col-start-6 col-end-13"
                  } p-3 rounded-lg`}
              >
                <div
                  className={`flex items-center justify-self-${message.client_id ? "start" : "end"
                    } ${message.client_id ? "" : "flex-row-reverse"}`}
                >
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                  </div>
                  <div
                    className={`relative ml-3 text-sm ${message.client_id ? "bg-white" : "bg-indigo-100"
                      } py-2 px-4 shadow rounded-xl`}
                  >
                    <div>{message.message}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Editor />
      </div>
    </div>
  );
};

export default Channel;
