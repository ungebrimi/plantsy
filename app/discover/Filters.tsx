"use client";
import React from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tables } from "@/database";
import { Disclosure } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Filters({ filterOptions }: { filterOptions: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const isFilterChecked = (option: Tables<"service_categories">) => {
    // if there is no category in the search params, return false
    if (!searchParams.get("category")) return false;
    // if there is a category in the search params, return true if the category is included in the search params
    return searchParams.get("category")?.includes(option.value as string);
  };
  const handleCheckboxChange = (option: Tables<"service_categories">) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (isFilterChecked(option)) {
      // If the option is already checked, remove it
      const currentCategories =
        newSearchParams.get("category")?.split(",") || [];
      const updatedCategories = currentCategories.filter(
        (category) => category !== option.value,
      );
      newSearchParams.set("category", updatedCategories.join(","));
    } else {
      // If the option is not checked, add it
      const currentCategories = newSearchParams.get("category") || "";
      const separator = currentCategories ? "," : "";
      newSearchParams.set(
        "category",
        `${currentCategories}${separator}${option.value}`,
      );
    }

    // Check if there are any categories left after updating
    const updatedCategoryParam = newSearchParams.get("category");
    if (!updatedCategoryParam) {
      // If no categories are selected, remove the category parameter
      newSearchParams.delete("category");
    }

    router.push(`${pathName}?${newSearchParams.toString()}`);
  };

  return (
    <form className="hidden lg:block">
      <h3 className="sr-only">Categories</h3>
      {filterOptions.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
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
                  {section.options.map(
                    (
                      option: Tables<"service_categories">,
                      optionIdx: number,
                    ) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          defaultChecked={isFilterChecked(option)}
                          onChange={() => handleCheckboxChange(option)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
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
      ))}
    </form>
  );
}

export default Filters;
