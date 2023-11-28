import useImageUpload from "@/hooks/useImageUpload";
import { CameraIcon } from "@heroicons/react/24/outline";
import React, { SetStateAction, useState } from "react";
import { DbResultOk, Tables } from "@/database";
import ImageModal from "./ImageModal";
import { useNotification } from "@/context/NotificationContext";

interface ImageUploadProps {
  user: Tables<"clients"> | Tables<"professionals">;
  images: Tables<"files">[];
  setImages: React.Dispatch<SetStateAction<Tables<"files">[]>>;
  userType: string;
}

const ImageUpload = ({
  user,
  images,
  setImages,
  userType,
}: ImageUploadProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { loading, handleImageUpload } = useImageUpload();
  const { addError } = useNotification();

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const res = (await handleImageUpload(
        userType,
        event,
        `${user.id}/images`,
        810,
        true,
      )) as DbResultOk<Tables<"files">>;
      // check if res is array or an object, if it's an array, set images to the array, if it's an object, add it to the images array
      console.log(res);
      if (Array.isArray(res)) {
        setImages(res);
      } else {
        setImages([...images, res]);
      }
    } catch (error: any) {
      if (error.status_code === "409") {
        addError(error.message + "rename the duplicated file to proceed");
      } else {
        addError(
          "We've encountered an issue with uploading your image: " +
            error.message,
        );
      }
    }
  };

  return (
    <div className="flow-root">
      {images && images.length > 0 ? (
        <button
          onClick={() => setOpenModal(true)}
          type="button"
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
          userType={userType}
        />
      )}
    </div>
  );
};

export default ImageUpload;
