import React, { SetStateAction, useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { Tables } from "@/database";
import {createBrowserClient} from "@supabase/ssr";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface CityProps {
  formData: Tables<"services">;
  setFormData: React.Dispatch<SetStateAction<Tables<"services">>>;
  setZipList: React.Dispatch<SetStateAction<string[]>>
}

export default function City({ formData, setFormData, setZipList }: CityProps) {
  const [query, setQuery] = useState("");
  const [cityList, setCityList] = useState<Tables<"cities">[]>([]);
  const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function getCities() {
      if (query === "") {
        setCityList([]); // Clear the city list if the query is empty
        return;
      }

      const { data, error } = await supabase
        .from("cities")
        .select("city, county_name, state_name, id, zips")
        .textSearch("city", query)
        .range(0, 50); // Fetch 50 related cities
      if (error) {
        console.error(error);
      }
      if (data) {
        const typed: any = data;
        setCityList(typed);
      }
    }
    getCities();
  }, [query, supabase]);

  return (
    <Combobox
      as="div"
      value={formData}
      onChange={(e: any) => {
        const zipsArray = e.zips.split(" ");
        setZipList(zipsArray);
        setFormData((data: Tables<"services">) => ({
          ...data,
          city: e.city,
          county: e.county_name,
          state: e.state_name,
          zip: zipsArray[0]
        }));
      }}
    >
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
        City
      </Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(city: any) => city?.city}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {cityList.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {cityList.map((item) => (
              <Combobox.Option
                key={item.id}
                value={item}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900",
                  )
                }
              >
                {({ active, selected }: any) => (
                  <>
                    <div className="flex">
                      <span
                        className={classNames(
                          "truncate",
                          selected && "font-semibold",
                        )}
                      >
                        {item.city}
                      </span>
                      <span
                        className={classNames(
                          "ml-2 truncate text-gray-500",
                          active ? "text-indigo-200" : "text-gray-500",
                        )}
                      >
                        {item.county_name} ({item.state_name})
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600",
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
        )}
      </div>
    </Combobox>
  );
}
