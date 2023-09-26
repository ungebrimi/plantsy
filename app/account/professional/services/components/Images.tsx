import { FileType } from "@/dbtypes";
import useImageUpload from "@/hooks/useImageUpload";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Images({ professional, gallery, setFormData }: any) {
  const { loading, images, error, handleImageUpload, removeImage } =
    useImageUpload();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(event, `${professional.id}/files`, true);
  };

  console.log();

  useEffect(() => {
    if (!error && images.length > 0) {
      setFormData((formData: any) => ({ ...formData, images: images }));
    } else if (images.length === 0 || gallery.images === 0) {
      setFormData((formData: any) => ({ ...formData, images: [] }));
    }
  }, [images, error]);

  return (
    <div className="col-span-full">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Pictures of your work
      </label>
      {gallery && gallery.length > 0 ? (
        <Carousel showThumbs={false} infiniteLoop={true}>
          {gallery.map((image: FileType) => {
            return (
              <div
                key={image.id}
                className="relative border border-dashed border-gray-900/25 px-6 py-10 mt-2 rounded-lg"
              >
                <button
                  type="button"
                  className="absolute top-4 right-8"
                  onClick={() =>
                    removeImage(
                      image.id,
                      `${professional.id}/images/${image.name}`,
                      true,
                    )
                  }
                >
                  <XMarkIcon className="w-6 h-6 hover:text-gray-500"></XMarkIcon>
                </button>
                <div className="relative">
                  <Image
                    height={400}
                    width={400}
                    src={image.url}
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
          <div className={`text-center ${loading && "animate-pulse"}`}>
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
