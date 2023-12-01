"use client";
import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Tables } from "@/database";
import Link from "next/link";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const SearchBar = ({
  serviceCategories,
}: {
  serviceCategories: Tables<"service_categories">[] | null;
}) => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<Tables<"service_categories"> | null>(null);

  const filteredServiceCategories =
    query === ""
      ? serviceCategories
      : serviceCategories?.filter((category: Tables<"service_categories">) => {
          return category.name.toLowerCase().includes(query.toLowerCase());
        });

  console.log(selectedCategory);

  return (
    <Combobox as="div" value={selectedCategory} onChange={setSelectedCategory}>
      <div className="relative mt-2 max-w-md text-lg">
        <Combobox.Input
          className="flex bg-white text-xl items-center justify-between w-full rounded-full border-0 max-w-md px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 "
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(category: any) => category?.name}
          placeholder="Search for a service"
        />
        <Combobox.Button className="absolute inset-y-0 right-1 flex items-center rounded-r-md px-2 focus:outline-none text-teal-500">
          <Link
            href={
              selectedCategory !== null
                ? `/discover?category=${selectedCategory.name?.toLowerCase()}`
                : `/discover`
            }
          >
            <svg
              height="20"
              width="20"
              fill="currentColor"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.5 2C10.532 2 13 4.467 13 7.5c0 1.156-.36 2.229-.972 3.114l3.679 3.679a.999.999 0 11-1.414 1.414l-3.68-3.679A5.46 5.46 0 017.5 13 5.506 5.506 0 012 7.5C2 4.467 4.468 2 7.5 2zm0 2C5.57 4 4 5.57 4 7.5S5.57 11 7.5 11 11 9.43 11 7.5 9.43 4 7.5 4z"></path>
            </svg>
          </Link>
        </Combobox.Button>

        {filteredServiceCategories && filteredServiceCategories.length > 0 ? (
          <Combobox.Options className="absolute z-40 mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredServiceCategories.map((category) => (
              <Combobox.Option
                key={category.id}
                value={category}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-teal-600 text-white" : "text-gray-900",
                  )
                }
              >
                {({ active, selected }: any) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold",
                      )}
                    >
                      {category.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-teal-600",
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        ) : (
          <Combobox.Options className="absolute z-40 mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <Combobox.Option
              value={null}
              className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
            >
              <span className="block truncate">No matching category found</span>
            </Combobox.Option>
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};

export default SearchBar;
