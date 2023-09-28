"use client";
import React from "react";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import useImageUpload from "@/hooks/useImageUpload";
import { Professional } from "@/dbtypes";

interface Form {
  website: string | null;
  about: string | null;
  profile_picture: any;
}

const Avatar = ({
  formData,
  setFormData,
  user,
}: {
  formData: Form;
  setFormData: any;
  user: Professional;
}) => {
  const { loading, image, error, handleImageUpload, removeImage } =
    useImageUpload();
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (formData.profile_picture) {
      removeImage(formData.profile_picture.id);
    }
    handleImageUpload(event, `${user.id}/avatars`, false);
  };

  React.useEffect(() => {
    const handleFormDataUpdate = () => {
      if (error) console.error(error);
      if (image && !error) {
        setFormData((prevFormData: Form) => ({
          ...prevFormData,
          profile_picture: image,
        }));
      }
    };
    handleFormDataUpdate();
  }, [image, error, setFormData]);

  return (
    <div className="col-span-full">
      <label
        htmlFor="photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Photo
      </label>
      <div className="mt-2 flex items-center gap-x-3">
        {formData.profile_picture ? (
          <>
            <Image
              width={300}
              height={300}
              src={formData.profile_picture.url}
              alt="profile picture"
              className="h-12 w-12 text-gray-300 rounded-full"
            />
            <button
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              Change
            </button>
          </>
        ) : (
          <>
            <UserCircleIcon
              className="h-12 w-12 text-gray-300 rounded-full"
              aria-hidden="true"
            />
            <button
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              Change
            </button>
          </>
        )}
      </div>
      {loading && <p>Loading image...</p>}
      {error && <p>Error uploading image.</p>}
    </div>
  );
};

export default Avatar;
