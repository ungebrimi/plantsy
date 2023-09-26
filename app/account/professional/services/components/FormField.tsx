import React from "react";

interface FormFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "number"; // You can extend this for other input types
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type,
}) => {
  return (
    <div className="sm:col-span-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2 ">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <input
            type={type}
            name={name}
            min={0}
            id={name}
            value={value}
            onChange={onChange}
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  );
};

export default FormField;
