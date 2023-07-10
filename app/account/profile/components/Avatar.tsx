"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import imageCompression from 'browser-image-compression';

interface Form {
  website: string | null;
  about: string | null;
  profile_picture: string | null;
}

const Avatar = ({ formData, setFormData }: { formData: Form, setFormData: any }) => {
  const [loadingImage, setLoadingImage] = useState<boolean>(false);

  async function handleImageUpload(event: any) {
    const imageFile = event.target.files[0];
    setLoadingImage(true);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);

      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        setFormData((prevFormData: Form) => ({
          ...prevFormData,
          profile_picture: imageDataUrl,
        }));
        setLoadingImage(false);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.log(error);
      setLoadingImage(false);
    }
  }

  return (
    <div className="col-span-full">
      <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
        Photo
      </label>
      <div className="mt-2 flex items-center gap-x-3">
        {formData.profile_picture ? (
          <img src={formData.profile_picture} alt="profile picture" className="h-12 w-12 text-gray-300 rounded-full" />
        ) : (
          <>
            <UserCircleIcon className="h-12 w-12 text-gray-300 rounded-full" aria-hidden="true" />
            <button
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} />
              Change
            </button>
          </>
        )}

      </div>
      {loadingImage && <p>Loading image...</p>}
    </div>
  )
}

export default Avatar
