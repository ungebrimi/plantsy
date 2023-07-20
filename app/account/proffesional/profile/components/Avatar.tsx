"use client"
import React from 'react';
import Image from 'next/image';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import useImageUpload from '@/hooks/useImageUpload';
import { User } from '@/dbtypes';

interface Form {
  website: string | null;
  about: string | null;
  profile_picture: string | null;
}

const Avatar = ({ formData, setFormData, user }: { formData: Form, setFormData: any, user: User }) => {
  const { loading, image, error, handleImageUpload } = useImageUpload();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(event);
  };

  React.useEffect(() => {
    const handleFormDataUpdate = () => {
      if (image && !error) {
        setFormData((prevFormData: Form) => ({
          ...prevFormData,
          profile_picture: image.url,
        }));
      }
    };
    handleFormDataUpdate()
  }, [image, error, setFormData])

  return (
    <div className="col-span-full">
      <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
        Photo
      </label>
      <div className="mt-2 flex items-center gap-x-3">
        {formData.profile_picture ? (
          <>
            <img src={formData.profile_picture} alt="profile picture" className="h-12 w-12 text-gray-300 rounded-full" />
            <button
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <input type="file" accept="image/*" onChange={handleImageChange} />
              Change
            </button>
          </>) : (
          <>
            <UserCircleIcon className="h-12 w-12 text-gray-300 rounded-full" aria-hidden="true" />
            <button
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <input type="file" accept="image/*" onChange={handleImageChange} />
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
      // THIS BIT IS FOR IF YOU WANT TO READ THE IMAGE WITHOUT UPLOADING IT
      // const reader = new FileReader();
      // reader.onload = () => {
      //   const imageDataUrl = reader.result as string;
      //   setFormData((prevFormData: Form) => ({
      //     ...prevFormData,
      //     profile_picture: imageDataUrl,
      //   }));
      //   setLoadingImage(false);
      // };
      // reader.readAsDataURL(compressedFile);

