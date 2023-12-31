"use client";
import React, { useState } from "react";
import Avatar from "./Avatar";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Tables } from "@/database";
import { useNotification } from "@/context/NotificationContext";
import Alert from "@/app/components/Alert";
import { createClient } from "@/app/utils/supabase/client";

type Form = {
  website: string | null;
  about: string | null;
  profile_picture: Tables<"files"> | null;
};

const ProfileInformation = ({
  user,
  userType,
}: {
  user: Tables<"clients"> | Tables<"professionals">;
  userType: string;
}) => {
  const supabase = createClient();
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<Form>({
    website: user.website,
    about: user.about,
    profile_picture: user.profile_picture
      ? (JSON.parse(user.profile_picture as string) as Tables<"files">)
      : null,
  });

  const originalFormData = {
    ...formData,
    website: user.website,
    about: user.about,
  };
  const [cancelWarning, setCancelWarning] = useState<boolean>(false);
  const { addError } = useNotification();

  async function updateProfileInformation() {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from(userType)
        .update({
          website: formData.website,
          about: formData.about,
          profile_picture: JSON.stringify(formData.profile_picture),
        })
        .eq("id", user.id)
        .select("website, about, profile_picture");

      if (error) {
        setErrorMessage("error: " + error.message);
      }
      if (data) {
        setSuccess(true);
      }
    } catch (error: any) {
      console.error(error);
      addError(
        "There was an issue updating your information: " + error.message,
      );
    }
  }

  const handleCancel = () => {
    setCancelWarning(true);
  };

  return (
    <form
      onSubmit={updateProfileInformation}
      className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
    >
      <div className="px-4 py-6 sm:p-8">
        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="website"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Website
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
                <input
                  type="text"
                  name="website"
                  id="website"
                  value={formData.website ?? ""}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="www.example.com"
                />
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="about"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              About
            </label>
            <div className="mt-2">
              <textarea
                id="about"
                name="about"
                onChange={(e) =>
                  setFormData({ ...formData, about: e.target.value })
                }
                value={formData.about ?? ""}
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Write a few sentences about yourself.
            </p>
          </div>
          <Avatar
            formData={formData}
            setFormData={setFormData}
            user={user}
            userType={userType}
          />
        </div>
      </div>
      {success && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon
                className="h-5 w-5 text-green-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Profile information has been updated
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                >
                  <span className="sr-only">Dismiss</span>
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {errorMessage && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{errorMessage}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                >
                  <span className="sr-only">Dismiss</span>
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <button
          type="button"
          onClick={handleCancel}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={updateProfileInformation}
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Save
        </button>
      </div>
      <Alert
        open={cancelWarning}
        setOpen={setCancelWarning}
        setNewData={setFormData}
        originalData={originalFormData}
      />
    </form>
  );
};

export default ProfileInformation;
