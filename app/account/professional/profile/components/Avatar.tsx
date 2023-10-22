"use client";
import React, { SetStateAction } from "react";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import useImageUpload from "@/hooks/useImageUpload";
import {Tables} from "@/database";

interface Form {
  website: string | null;
  about: string | null;
  profile_picture: Tables<"files"> | null
}
const Avatar = ({
    formData,
  setFormData,
  professional,
}: {
  formData: Form;
  setFormData: React.Dispatch<SetStateAction<Form>>;
  professional: Tables<"professionals">;
}) => {
  const { loading, handleSingleImageUpload, removeImage } =
    useImageUpload();
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const image = await handleSingleImageUpload(event, `${professional.id}/avatars`);
      setFormData({...formData, profile_picture: image as Tables<"files">});
    } catch (e) {
      console.error(e)
    }
  };
  const handleRemoveImage = async (image: Tables<"files">) => {
    try {
      // Attempt to remove the image
      await removeImage(image?.id, `${professional.id}/images/${image?.name}`);
      setFormData((formData: any) => ({ ...formData, profile_picture: null }));
    } catch (error) {
      console.log("There was an error when removing the image");
      console.error(error)
    }
  };



  return (
    <div className="col-span-full">
      <label
        htmlFor="photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Photo
      </label>
      <div className="mt-2 flex items-center gap-x-3">
        {professional.profile_picture &&
        typeof professional.profile_picture === "object" &&
        "url" in professional.profile_picture ? (
          <>
            <Image
              width={300}
              height={300}
              src={professional.profile_picture.url as string}
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
    </div>
  );
};

export default Avatar;
