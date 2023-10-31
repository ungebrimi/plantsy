import { SetStateAction, useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { Tables } from "@/database";
import {getClientSupabase} from "@/app/supabase-client";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ServiceCategoryProps {
  formData: Tables<"services">;
  setFormData: React.Dispatch<SetStateAction<Tables<"services">>>;
}

export default function ServiceCategory({
  formData,
  setFormData,
}: ServiceCategoryProps) {
  const [query, setQuery] = useState<string>("");
  const [serviceList, setServiceList] = useState<
    Tables<"service_categories">[]
  >([]);
  const initialServiceCategory = formData.service_category
      ? {
        name: formData.service_category,
        value: formData.service_category,
      }
      : { name: "", value: "" };

  const [selectedServiceCategory, setSelectedServiceCategory] = useState<{
    name: string;
    value: string;
  }>(initialServiceCategory);
  const { supabase } = getClientSupabase()

  useEffect(() => {
    async function getServices() {
      const { data, error } = await supabase
        .from("service_categories")
        .select("*");
      if (error) console.error(error);
      return data;
    }
    getServices().then((res: any) => setServiceList(res));
  }, [supabase]);

  const filteredServices =
    query === ""
      ? serviceList
      : serviceList.filter((service: any) => {
        return service.name.toLowerCase().includes(query.toLowerCase());
      });

  return (
    <Combobox
      as="div"
      value={selectedServiceCategory}
      onChange={(e: any) => {
        setFormData((formData) => ({ ...formData, service_category: e.name }));
        setSelectedServiceCategory(e)
      }}
    >
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
        Service category
      </Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full first-letter:capitalize rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(service: any) => service.name}
          data-testid="input"
        />
        <Combobox.Button
          data-testid="Open-btn"
          className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
        >
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredServices.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredServices.map((service: any) => (
              <Combobox.Option
                key={service.id}
                value={service}
                data-testid="option"
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900",
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
                      {service.name}
                    </span>

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
