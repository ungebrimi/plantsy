/*
 * THIS COMPONENT IS COMPLETED
 * */
import { Professional, ServiceType } from "@/dbtypes";
import useImageUpload from "@/hooks/useImageUpload";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { SetStateAction, useEffect, useState } from "react";

interface ThumbnailProps {
  professional: Professional;
  thumbnail: any;
  setFormData: React.Dispatch<SetStateAction<ServiceType>>;
}

function Thumbnail({ professional, thumbnail, setFormData }: ThumbnailProps) {
  const { loading, image, setImage, error, handleImageUpload, removeImage } =
    useImageUpload();
  const [edit, setEdit] = useState<boolean>(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(event, `${professional.id}/images`, false);
    setEdit(false);
  };

  useEffect(() => {
    if (error) console.error(error);
    if (image && !thumbnail) {
      setFormData((formData: any) => ({ ...formData, thumbnail: image }));
    }
    if (thumbnail && !image) {
      setImage(thumbnail);
    }
    if (thumbnail && image && !edit) {
      return;
    }
    if (thumbnail && image && edit) {
      setImage(null);
      setFormData((formData: any) => ({ ...formData, thumbnail: null }));
    }
  }, [image, error, thumbnail]);

  return (
    <div className="col-span-full">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Cover photo
      </label>
      <div
        className={`mt-2 flex justify-center rounded-lg border-dashed border border-gray-900/25
                    ${thumbnail === null ? "px-2 py-10" : "px-6 py-10"}`}
      >
        {thumbnail ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setEdit(true);
                removeImage(
                  thumbnail.id,
                  `${professional.id}/images/${thumbnail.name}`,
                );
              }}
              className="absolute top-2 right-2"
            >
              <XMarkIcon className="w-6 text-gray-600"></XMarkIcon>
            </button>
            <Image
              width={400}
              height={300}
              alt={thumbnail.name}
              src={thumbnail.url}
              className="max-w-sm h-64 object-contain"
            />
          </div>
        ) : (
          <div className={`text-center ${loading && "animate-pulse"}`}>
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="image-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="image-upload"
                  name="image-upload"
                  type="file"
                  className="sr-only"
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Thumbnail;
