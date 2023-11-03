import useImageUpload from "@/hooks/useImageUpload";
import { CameraIcon } from "@heroicons/react/24/outline";
import React, {ChangeEvent, SetStateAction, useState} from "react";
import {DbResultOk, Tables} from "@/database";
import ImageModal from "./ImageModal";
import {StorageError} from "@supabase/storage-js";
import {useNotification} from "@/context/NotificationContext";


interface ImageUploadProps {
  user: Tables<"clients"> | Tables<"professionals">;
  images: Tables<"files">[]
  setImages: React.Dispatch<SetStateAction<Tables<"files">[]>>
  userType: string;
}

const ImageUpload = ({user, images, setImages }: ImageUploadProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { loading, handleMultipleImagesUpload } =
    useImageUpload();
  const { addError } = useNotification()

  const handleImageChange = async (
      event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const res = (await handleMultipleImagesUpload(
          event,
          `${user.id}/images`,
      )) as DbResultOk<Tables<"files">>;
      setImages(res)
    } catch (error: any) {
      if(error.status_code === "409") {
        addError(error.message + "rename the duplicated file to proceed")
      }
      else {
        addError("We've encountered an issue with uploading your image: " + error.message)
      }
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
                onChange={handleImageChange}
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
