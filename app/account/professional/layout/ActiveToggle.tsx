"use client";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@/dbtypes";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ActiveToggle({ professional }: { professional: User }) {
  const [enabled, setEnabled] = useState(professional.active);
  const supabase = createClientComponentClient();

  async function changeActiveStatus() {
    try {
      const { data, error } = await supabase
        .from("professionals")
        .update({ active: !enabled }) // Toggle the active status
        .eq("id", professional.id)
        .select("active");
      if (error) throw error;
      return data[0].active; // Return the updated active status from the database
    } catch (error) {
      console.error(error);
      return enabled; // Return the original state if an error occurs
    }
  }

  const handleToggle = async () => {
    const newEnabledState = await changeActiveStatus(); // Get the updated active status from the database
    setEnabled(newEnabledState); // Update the local state with the new status
  };
  return (
    <Switch.Group
      as="div"
      className="flex flex-col justify-center items-center mt-3"
    >
      <Switch
        checked={enabled}
        onChange={handleToggle}
        className={classNames(
          enabled ? "bg-green-600" : "bg-gray-200",
          "relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
      <Switch.Label as="span" className="mt-2 text-sm">
        <span className="font-medium text-gray-900">Active status</span>{" "}
      </Switch.Label>
    </Switch.Group>
  );
}
