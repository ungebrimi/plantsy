"use client";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { Professional, ServiceType } from "@/dbtypes";
import { HashtagIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ServiceCategory from "./ServiceCategory";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import City from "@/app/comboboxes/City";
import Images from "./Images";
import Thumbnail from "./Thumbnail";
import Informational from "./Informational";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/navigation";

interface CardInformationProps {
  professional: Professional;
  service: any;
  edit: boolean;
}

function ServiceForm({ professional, service, edit }: CardInformationProps) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  //states
  const [keyword, setKeyword] = useState<string>("");
  const [formData, setFormData] = useState<ServiceType>({
    title: (service && service.title) || "",
    description: (service && service.description) || "",
    thumbnail: (service && JSON.parse(service.thumbnail)) || null,
    images: (service && JSON.parse(service.images)) || [],
    price: (service && service.price) || 0,
    vat: (service && service.vat) || 0,
    city: (service && service.city) || "",
    county: (service && service.county) || "",
    state: (service && service.state) || "",
    zip: (service && service.zip) || "",
    keywords: (service && service.keywords) || [],
    service_category:
      (service && {
        name: service.service_category,
        value: service.service_category,
      }) ||
      null,
  });

  // ref
  const formRef = useRef<HTMLFormElement>(null);
  const keywordRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.service_category) {
      console.log("service category has not been selected");
    }

    if (edit) {
      const { error } = await supabase
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
          //@ts-ignore
          service_category: formData.service_category.value,
          keywords: formData.keywords,
        })
        .eq("id", service.id)
        .select("*");
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
          //@ts-ignore
          service_category: formData.service_category.value,
          keywords: formData.keywords,
        })
        .select()
        .single();
      if (error) console.error(error);
      router.push("/account/professional/services");
    }
  }

  function addKeyword() {
    if (formData.keywords.length >= 5) {
      return;
    } else {
      setFormData((state: any) => ({
        ...state,
        keywords: [keyword, ...state.keywords],
      }));
      setKeyword("");
    }
  }

  function removeKeyword(indexToRemove: number) {
    const updatedKeywords = formData.keywords.filter(
      (_: any, index: number) => index !== indexToRemove,
    );
    setFormData({
      ...formData,
      keywords: updatedKeywords,
    });
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
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="I will..."
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <Thumbnail
              professional={professional}
              thumbnail={formData.thumbnail}
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
                  value={formData.vat}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3 sm:col-start-1">
              <City formData={formData} setFormData={setFormData} />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="state"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="state"
                  id="state"
                  autoComplete="address-level1"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="county"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                County
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="county"
                  id="county"
                  autoComplete="address-level1"
                  value={formData.county}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="zip"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  autoComplete="zip"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.zip}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <ServiceCategory
                selectedService={formData.service_category}
                setFormData={setFormData}
              />
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="keyword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Keywords (5 maximum)
              </label>
              <div className="mt-2 flex rounded-md shadow-sm">
                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <HashtagIcon
                      className="h-4 w-4 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    ref={keywordRef}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    type="keyword"
                    name="keyword"
                    id="keyword"
                    className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Write your keywords here"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => addKeyword()}
                  className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-600 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <PlusIcon
                    className="-ml-0.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <>
                {formData.keywords.length > 0 && (
                  <div className="flex flex-wrap mt-2 gap-x-2">
                    {formData.keywords.map((word: string, idx: number) => {
                      return (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                        >
                          {word}
                          <button
                            type="button"
                            onClick={() => removeKeyword(idx)}
                            className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20"
                          >
                            <span className="sr-only">Remove</span>
                            <svg
                              viewBox="0 0 14 14"
                              className="h-3.5 w-3.5 stroke-gray-600/50 group-hover:stroke-gray-600/75"
                            >
                              <path d="M4 4l6 6m0-6l-6 6" />
                            </svg>
                            <span className="absolute -inset-1" />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}
              </>
            </div>

            <Images
              professional={professional}
              gallery={formData.images}
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
