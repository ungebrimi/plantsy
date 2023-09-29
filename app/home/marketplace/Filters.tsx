import React from "react";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { ServiceCategoryType } from "@/dbtypes";

function Filters({ categories }: any) {
  return (
    <form className="hidden lg:block">
      <h3 className="sr-only">Categories</h3>

      <Disclosure as="div" className="border-b border-gray-200 py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-100">
                <span className="font-medium text-gray-900">
                  Service Categories
                </span>
                <span className="ml-6 flex items-center">
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
                {categories.map(
                  (option: ServiceCategoryType, optionIdx: number) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${optionIdx}`}
                        name={`${option.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${option.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.name}
                      </label>
                    </div>
                  ),
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </form>
  );
}

export default Filters;
