import { DbResultOk, Tables } from "@/database";
import useImageUpload from "@/hooks/useImageUpload";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { SetStateAction } from "react";
import { useNotification } from "@/context/NotificationContext";
import { archiveData } from "@/app/utils/archive";
import { createClient } from "@/app/utils/supabase/client";

interface ThumbnailProps {
  professional: Tables<"professionals">;
  formData: Tables<"services">;
  setFormData: React.Dispatch<SetStateAction<Tables<"services">>>;
}

function Thumbnail({ professional, formData, setFormData }: ThumbnailProps) {
  const { loading, handleSingleImageUpload, removeImage } = useImageUpload();
  const { addError } = useNotification();
  const supabase = createClient();
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const image = (await handleSingleImageUpload(
        event,
        `${professional.id}/images`,
        1080,
      )) as DbResultOk<Tables<"files">>;
      setFormData({ ...formData, thumbnail: image });
    } catch (error: any) {
      if (error.status_code === "409") {
        addError(
          "We've encountered an issue with uploading your image: " +
            error.message +
            "rename the file to proceed",
        );
      } else {
        addError(
          "We've encountered an issue with uploading your image: " +
            error.message,
        );
      }
    }
  };

  const archiveImage = async (service: Tables<"services">) => {
    try {
      await archiveData(
        service.id,
        "services",
        JSON.stringify(service),
        "remove service",
      );
      console.log(
        "removal of service was successful, and is not stored in archive",
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemoveImage = async (image: Tables<"files">) => {
    try {
      await archiveData(
        image.id,
        "files",
        JSON.stringify(image),
        "remove image",
      );
      // Attempt to remove the image
      await removeImage(image?.id, `${professional.id}/images/${image?.name}`);
      // If removal is successful, reset the states
      setFormData((formData: any) => ({ ...formData, thumbnail: null }));
    } catch (error) {
      console.log("There was an error when removing the image");
      console.error(error);
    }
  };

  return (
    <div className="col-span-full">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Cover photo
      </label>
      <div
        className={`mt-2 flex justify-center rounded-lg border-dashed relative border border-gray-900/25 ${
          formData.thumbnail === null ? "px-2 py-10 " : "px-6 py-10"
        }`}
      >
        {formData.thumbnail &&
        typeof formData.thumbnail === "object" &&
        "url" in formData.thumbnail ? (
          <div className="">
            <button
              data-testid="delete"
              type="button"
              onClick={() =>
                handleRemoveImage(formData.thumbnail as Tables<"files">)
              }
              className="absolute top-2 right-2"
            >
              <span className="sr-only">Remove uploaded thumbnail</span>
              <XMarkIcon className="w-6 text-gray-700 hover:text-gray-500"></XMarkIcon>
            </button>
            <Image
              width={400}
              height={300}
              alt={formData.thumbnail.name as string}
              src={formData.thumbnail.url as string}
              className="max-w-sm h-64 object-contain"
              data-testid="thumbnail"
            />
          </div>
        ) : (
          <div
            data-testid={loading && "loading"}
            className={`text-center ${loading && "animate-pulse"}`}
          >
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="image-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                Upload a file
                <input
                  id="image-upload"
                  name="image-upload"
                  type="file"
                  className="sr-only"
                  onChange={(e) => handleImageChange(e)}
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
