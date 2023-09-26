import React from "react";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import service from "@/data/service.json";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Informational() {
  return (
    <>
      {service.data &&
        service.data.map((service, idx) => {
          return (
            <Disclosure as="div" key={idx}>
              {({ open }) => (
                <>
                  <h3>
                    <Disclosure.Button className="group relative flex w-full items-center justify-between py-3 text-left">
                      <span
                        className={classNames(
                          open ? "text-indigo-600" : "text-gray-700",
                          "text-sm font-medium"
                        )}
                      >
                        {service.title}:
                      </span>
                      <span className="ml-6 flex items-center">
                        {open ? (
                          <MinusIcon
                            className="block h-5 w-5 text-indigo-400 group-hover:text-indigo-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusIcon
                            className="block h-5 w-5 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </h3>
                  <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                    <ul
                      role="list"
                      className="text-gray-600 space-y-1 text-sm list-disc list-inside"
                    >
                      {service.list &&
                        service.list.map((detail: any, idx) => (
                          <li key={idx}>
                            <strong>{detail.title}</strong> {detail.content}
                          </li>
                        ))}
                    </ul>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          );
        })}
    </>
  );
}

export default Informational;
