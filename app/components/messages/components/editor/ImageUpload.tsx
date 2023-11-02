import useImageUpload from "@/hooks/useImageUpload";
import { CameraIcon } from "@heroicons/react/24/outline";
import React, {ChangeEvent, SetStateAction, useState} from "react";
import { Tables } from "@/database";
import ImageModal from "./ImageModal";
import {StorageError} from "@supabase/storage-js";


interface ImageUploadProps {
  professional: Tables<"professionals">;
  images: Tables<"files">[]
  setImages: React.Dispatch<SetStateAction<Tables<"files">[]>>
}

const ImageUpload = ({professional, images, setImages }: ImageUploadProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { loading, handleMultipleImagesUpload } =
    useImageUpload();

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const result = await handleMultipleImagesUpload(event, `${professional.id}/files`);

      if (Array.isArray(result)) {
        // It's an array of images, set it to state
        setImages(result);
      } else if (result instanceof StorageError) {
        // Handle the storage error here
        console.error(result);
      } else {
        // Handle the undefined case here
        console.error('No images uploaded');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flow-root">
      {images && images.length > 0 ? (
        <button
          onClick={() => setOpenModal(true)}
          className="-m-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-red-400 hover:text-red-500"
        >
          <CameraIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      ) : (
        <>
          {loading ? (
            <CameraIcon
              className="animate-pulse text-gray-600 h-6 w-6"
              aria-hidden="true"
            />
          ) : (
            <label htmlFor="imageInput" className="cursor-pointer">
              <div className="-m-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                <CameraIcon className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Attach an image</span>
              </div>
              <input
                type="file"
                id="imageInput"
                className="sr-only"
                onChange={handleChange}
                multiple
                accept="image/*"
              />
            </label>
          )}
        </>
      )}
      {openModal && (
        <ImageModal
          open={openModal}
          setOpen={setOpenModal}
          images={images}
          setImages={setImages}
        />
      )}
    </div>
  );
};

export default ImageUpload;
