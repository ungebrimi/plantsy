import React, { Fragment } from "react";
import { FaceSmileIcon as FaceSmileIconOutline } from "@heroicons/react/24/outline";
import { Listbox, Transition } from "@headlessui/react";

const moods = [
  {
    name: "Excited",
    value: "🔥",
    iconColor: "text-white",
    bgColor: "bg-purple-500",
  },
  {
    name: "Loved",
    value: "❤️",
    iconColor: "text-white",
    bgColor: "bg-yellow-400",
  },
  {
    name: "Happy",
    value: "☺️",
    iconColor: "text-white",
    bgColor: "bg-green-400",
  },
  {
    name: "Sad",
    value: "😢",
    iconColor: "text-white",
    bgColor: "bg-blue-400",
  },
  {
    name: "Thumbsy",
    value: "👍",
    iconColor: "text-white",
    bgColor: "bg-red-500",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Emoji = ({
  message,
  setMessage,
}: {
  message: string;
  setMessage: any;
}) => {
  const addEmojiToMessage = (emojiValue: string) => {
    const updatedMessage = message + emojiValue;
    setMessage(updatedMessage);
  };

  return (
    <div className="flow-root">
      <Listbox>
        {({ open }) => (
          <>
            <Listbox.Label className="sr-only">Your mood</Listbox.Label>
            <div className="relative">
              <Listbox.Button className="relative -m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                <span className="flex items-center justify-center">
                  <span>
                    <FaceSmileIconOutline
                      className="h-6 w-6 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Add your mood</span>
                  </span>
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                  {moods.map((mood) => (
                    <Listbox.Option
                      key={mood.value}
                      onClick={() => addEmojiToMessage(mood.value)}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-gray-100" : "bg-white",
                          "relative cursor-default select-none px-3 py-2"
                        )
                      }
                      value={mood}
                    >
                      <div className="flex items-center">
                        <p
                          className={classNames(
                            mood.bgColor,
                            "grid place-items-center h-8 w-8 rounded-full flex-shrink-0"
                          )}
                          aria-hidden="true"
                        >
                          {mood.value}
                        </p>
                        <span className="ml-3 block truncate font-medium">
                          {mood.name}
                        </span>
                      </div>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default Emoji;
