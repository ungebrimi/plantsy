import { Tables } from "@/database";
import React, { SetStateAction } from "react";

interface TextInputProps {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  formData: Tables<"services">;
  setFormData: React.Dispatch<SetStateAction<Tables<"services">>>;
}

const TextInput = ({
  label,
  name,
  value,
  formData,
  setFormData,
  placeholder,
}: TextInputProps) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Spread the previous state
      [name]: value, // Update the specific field
    });
  };

  return (
    <>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <input
            type="text"
            name={name}
            id={name}
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </>
  );
};

export default TextInput;
