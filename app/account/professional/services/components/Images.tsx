import { DbResultOk, Tables } from "@/database";
import useImageUpload from "@/hooks/useImageUpload";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, {Fragment, SetStateAction, useState} from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {useNotification} from "@/context/NotificationContext";
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";

interface ImagesProps {
  professional: Tables<"professionals">;
  formData: Tables<"services">;
  setFormData: React.Dispatch<SetStateAction<Tables<"services">>>;
}

function Images({ professional, formData, setFormData }: ImagesProps) {
  const { loading, handleMultipleImagesUpload, removeImage } = useImageUpload();
  const { addError } = useNotification()
  const [currentImage, setCurrentImage] = useState<Tables<"files"> | null>(null)
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const images = (await handleMultipleImagesUpload(
        event,
        `${professional.id}/images`,
      )) as DbResultOk<Tables<"files">>;
      setFormData({ ...formData, images: images });
    } catch (error: any) {
      if(error.status_code === "409") {
        addError(error.message + "rename the duplicated file to proceed")
      }
      else {
        addError("We've encountered an issue with uploading your image: " + error.message)
      }
    }
  };

  const handleRemoveImage = async (image: Tables<"files"> | null) => {
    if(image) {
      try {
        await removeImage(
            image?.id,
            `${professional.id}/images/${image?.name}`,
        );

        const images = formData.images as Tables<"files">[]
        const indexToRemove = images.findIndex((img: Tables<"files">) => img.id === image.id);

        if (indexToRemove !== -1) {
          images.splice(indexToRemove, 1);
        }
        setFormData({...formData, images: images});
      } catch (error) {
        console.error("Error removing the image:", error);
      }
    }
    else {
      return
    }
  };

  return (
      <div className="col-span-full">
        <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
        >
          Pictures of your work
        </label>
        {formData.images &&
        Array.isArray(formData.images) &&
        formData.images.every(
            (image) =>
                image !== null && typeof image === "object" && "url" in image,
        ) &&
        formData.images.length > 0 ? (
            <Carousel showThumbs={false} infiniteLoop={true}>
              {formData.images.map((image: any) => {
                return (
                    <div
                        key={image.id}
                        className="relative border border-dashed border-gray-900/25 px-6 py-10 mt-2 rounded-lg"
                    >
                      <button
                          type="button"
                          className="absolute top-4 right-8"
                          data-testid="delete"
                          onClick={() => handleRemoveImage(image as Tables<"files">)}
                      >
                        <XMarkIcon className="w-6 h-6 hover:text-gray-500"></XMarkIcon>
                      </button>
                      <div className="relative">
                        <Image
                            data-testid={image.id as number}
                            height={400}
                            width={400}
                            src={image.url as string}
                            className="h-96 object-contain"
                            alt={`Image ${image.id}`}
                        />
                      </div>
                    </div>
                );
              })}
            </Carousel>
        ) : (
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
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
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={(e) => handleImageChange(e)}
                        multiple
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
        )}
      </div>
  );
}

export default Images;
