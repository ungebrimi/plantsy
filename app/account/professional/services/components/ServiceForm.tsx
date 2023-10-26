"use client";
import React, { useRef, useState } from "react";
import ServiceCategory from "./ServiceCategory";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import City from "./City";
import Images from "./Images";
import Thumbnail from "./Thumbnail";
import Informational from "./Informational";
import { redirect, useRouter } from "next/navigation";
import { Tables } from "@/database";
import Keywords from "./Keywords";
import TextInput from "./inputs/TextInput";
import {useNotification} from "@/context/NotificationContext";
import Zip from "@/app/account/professional/services/components/Zip";
interface CardInformationProps {
  professional: Tables<"professionals">;
  service: Tables<"services">;
  edit: boolean;
}

function ServiceForm({ professional, service, edit }: CardInformationProps) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [formData, setFormData] = useState<Tables<"services">>(service);
  const [ zipList, setZipList ] = useState<string[]>([])
  // ref
  const formRef = useRef<HTMLFormElement>(null);
  const { addError } = useNotification()

  function checkForm(formData: Tables<"services">) {
    switch (true) {
      case !formData.service_category:
        addError("Service category is required.");
        return false;
      case !formData.title:
        addError("Title is required.");
        return false;
      case !formData.description:
        addError("Description is required.");
        return false;
        // Add cases for other mandatory fields here.
      case !formData.thumbnail:
        addError("A thumbnail is required")
            return false
      case !formData.price:
        addError("Price is required")
            return false
      case !formData.vat:
        addError("VAT percentage is required")
            return false
      case !formData.city:
        addError("City is required")
            return false
      case !formData.county:
        addError("County is required")
            return false
      case !formData.state:
        addError("State is required")
            return false
      case !formData.zip:
        addError("ZIP is required")
            return false
      default:
    }
    return true
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!checkForm(formData)) {
      // break the function if form is not valid
      return;
    }


    if (edit) {
      const { data, error } = await supabase
        .from("services")
        .update({
          title: formData.title,
          description: formData.description,
          thumbnail: JSON.stringify(formData.thumbnail),
          images: JSON.stringify(formData.images),
          professional_id: professional.id,
          price: formData.price,
          vat: formData.vat,
          city: formData.city,
          county: formData.county,
          state: formData.state,
          zip: formData.zip,
          service_category: formData.service_category,
          keywords: formData.keywords,
        })
        .eq("id", service.id)
        .select("*")
        .single();
      if (error) console.error(error);
      router.push("/account/professional/services");
    } else {
      const { error } = await supabase
        .from("services")
        .insert({
          title: formData.title,
          description: formData.description,
          thumbnail: JSON.stringify(formData.thumbnail),
          images: JSON.stringify(formData.images),
          professional_id: professional.id,
          price: formData.price,
          vat: formData.vat,
          city: formData.city,
          county: formData.county,
          state: formData.state,
          zip: formData.zip,
          service_category: formData.service_category,
          keywords: formData.keywords,
        })
        .select()
        .single();
      if (error) console.error(error);
      router.push("/account/professional/services");
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
      <aside className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Service information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly on the service page the
          client sees.
        </p>
        <Informational />
      </aside>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
      >
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/*TITLE */}
            <div className="sm:col-span-4">
              <TextInput
                label={"Title"}
                name={"title"}
                value={formData.title}
                formData={formData}
                setFormData={setFormData}
                placeholder={"I will..."}
              />
            </div>

            <Thumbnail
              professional={professional}
              formData={formData}
              setFormData={setFormData}
            />

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block min-h-[30rem] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a descriptive text of what you service you offer.
              </p>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  name="price"
                  min={0}
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="0.00"
                  aria-describedby="price-currency"
                  value={formData.price}
                  onChange={handleInputChange}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span
                    className="text-gray-500 sm:text-sm"
                    id="price-currency"
                  >
                    USD
                  </span>
                </div>
              </div>
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="vat"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                VAT
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
                <input
                  type="number"
                  name="vat"
                  min={0}
                  max={100}
                  step={0.1}
                  id="vat"
                  className="block w-full rounded-md border-0 py-1.5 pl-8 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="25"
                  aria-describedby="price-currency"
                  value={formData.vat as number}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3 sm:col-start-1">
              <City formData={formData} setFormData={setFormData} setZipList={setZipList}/>
            </div>

            {/* STATE */}
            <div className="sm:col-span-2">
              <TextInput
                label={"State"}
                name={"state"}
                placeholder={"State"}
                value={formData.state as string}
                formData={formData}
                setFormData={setFormData}
              />
            </div>

            {/* COUNTY */}
            <div className="sm:col-span-3">
              <TextInput
                label={"County"}
                name={"county"}
                placeholder={"County"}
                value={formData.county as string}
                formData={formData}
                setFormData={setFormData}
              />
            </div>

            {/* POSTAL CODE / ZIP */}
            <div className="sm:col-span-2">
              {/*<TextInput
                label={"ZIP / Postal code"}
                name={"zip"}
                placeholder={""}
                value={formData.zip as string}
                formData={formData}
                setFormData={setFormData}
              />*/}
              <Zip formData={formData} setFormData={setFormData} zipList={zipList}/>
            </div>

            <div className="sm:col-span-4">
              <ServiceCategory formData={formData} setFormData={setFormData} />
            </div>

            <Keywords formData={formData} setFormData={setFormData} />

            <Images
              professional={professional}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default ServiceForm;
