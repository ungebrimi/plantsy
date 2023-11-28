"use client";
import React, { SetStateAction, useRef } from "react";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import useImageUpload from "@/hooks/useImageUpload";
import { DbResultOk, Tables } from "@/database";
import { useNotification } from "@/context/NotificationContext";
import { createClient } from "@/app/utils/supabase/client";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Form {
  website: string | null;
  about: string | null;
  profile_picture: Tables<"files"> | null;
}

const Avatar = ({
  formData,
  setFormData,
  user,
  userType,
}: {
  formData: Form;
  setFormData: React.Dispatch<SetStateAction<Form>>;
  user: Tables<"professionals"> | Tables<"clients">;
  userType: string;
}) => {
  const { loading, handleImageUpload, removeImage } = useImageUpload();
  const supabase = createClient();
  const { addError } = useNotification();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRemoveImage = async (image: Tables<"files">) => {
    try {
      // Attempt to remove the image
      await removeImage(image?.id, `${user.id}/avatars/${image?.name}`);
      setFormData((formData: any) => ({ ...formData, profile_picture: null }));
    } catch (error: any) {
      addError("There was an error when removing the image:" + error.message);
      console.error(error);
    }
  };

  async function updateProfileThumbnail(image: Tables<"files">) {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from(userType)
        .update({
          profile_picture: JSON.stringify(image),
        })
        .eq("id", user.id)
        .select("profile_picture");
      if (error) {
        addError("error: " + error.message);
      }
      if (data) {
        console.log("updated the profile picture in DB");
      }
    } catch (error: any) {
      console.error(error);
      addError(
        "There was an issue updating your profile picture: " + error.message,
      );
    }
  }

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      // If there is an image, remove it
      if (
        formData.profile_picture &&
        typeof formData.profile_picture === "object" &&
        "id" in formData.profile_picture
      ) {
        if (
          event.target.files &&
          event.target?.files[0].name === formData.profile_picture.name
        ) {
          addError(
            "Same image name. if you still wish to upload the image, rename it and try again",
          );
          return;
        }
        await handleRemoveImage(formData.profile_picture);
        console.log("removed the image");
      }
      // Upload the image
      const image = (await handleImageUpload(
        userType,
        event,
        `${user.id}/avatars`,
        500,
        false,
      )) as DbResultOk<Tables<"files">>;
      await updateProfileThumbnail(image);
      setFormData({ ...formData, profile_picture: image });
    } catch (error: any) {
      // If there is an error, display it
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

  return (
    <div className="col-span-full">
      <label
        htmlFor="photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Photo{" "}
        <span
          className={classNames(
            loading ? "animate-pulse" : "",
            "text-gray-500 italic text-wrap break-words",
          )}
        >
          {formData.profile_picture ? `(${formData.profile_picture.name})` : ""}{" "}
          {loading && "(loading)"}
        </span>
      </label>
      <div className="mt-2 flex items-center gap-x-3">
        {formData.profile_picture &&
        typeof formData.profile_picture === "object" &&
        "url" in formData.profile_picture ? (
          <>
            <div className="flex items-center gap-4">
              <Image
                width={300}
                height={300}
                src={formData.profile_picture.url as string}
                alt="profile picture"
                className="h-12 w-12 sm:h-16 sm:w-16 flex-0 text-gray-300 rounded-full object-cover"
              />
              <label className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <input
                  id="photo"
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  multiple={false}
                  onChange={(e) => handleImageChange(e)}
                  className="hidden"
                />
                Change
              </label>
            </div>
          </>
        ) : (
          <>
            <UserCircleIcon
              className="h-12 w-12 text-gray-300 rounded-full"
              aria-hidden="true"
            />
            <label className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              Change
            </label>
          </>
        )}
      </div>
      <p className="mt-3 text-sm leading-6 text-gray-600">
        Profile Picture will auto save when changed
      </p>
    </div>
  );
};

export default Avatar;
