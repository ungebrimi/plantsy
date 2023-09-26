import { FileType } from "@/dbtypes";
import useImageUpload from "@/hooks/useImageUpload";
import { CameraIcon } from "@heroicons/react/24/outline";
import React, { ChangeEvent, SetStateAction, useState } from "react";
import ImageModal from "./ImageModal";

interface ImageUploadProps {
  setGallery: React.Dispatch<SetStateAction<FileType[]>>;
  session: any;
}

const ImageUpload = ({ setGallery, session }: ImageUploadProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { loading, images, setImages, error, handleImageUpload } =
    useImageUpload();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(event, `${session.user.id}/files`, true);
  };

  React.useEffect(() => {
    const handleFormDataUpdate = () => {
      if (error) console.error(error);
      if (images && !error) {
        setGallery(images);
      }
    };
    handleFormDataUpdate();
  }, [images, error, setGallery]);

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
