"use client";
import { useState } from "react";
import FileUpload from "./FileUpload";
import ImageUpload from "./ImageUpload";
import Emoji from "./Emoji";
import { Tables } from "@/database";
import Image from "next/image";
import { createClient } from "@/app/utils/supabase/client";
import { useNotification } from "@/context/NotificationContext";

export default function Editor({
  user,
  channel,
  userType,
}: {
  channel: Tables<"channels">;
  user: Tables<"clients"> | Tables<"professionals">;
  userType: string;
}) {
  const supabase = createClient();
  const [message, setMessage] = useState<string>("");
  const [files, setFiles] = useState<Tables<"files">[]>([]);
  const [images, setImages] = useState<Tables<"files">[]>([]);
  const profilePicture = JSON.parse(user.profile_picture as string);
  const { addError } = useNotification();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // stringify the array of files and images
    const jsonFiles = files.length > 0 ? JSON.stringify(files) : null;
    const jsonImages = images.length > 0 ? JSON.stringify(images) : null;
    const userIdField =
      userType === "clients" ? "client_id" : "professional_id";

    try {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          message: message,
          [userIdField]: user.id,
          channel_id: channel.id,
          files: jsonFiles,
          images: jsonImages,
        })
        .select();
      if (error) {
        return addError("Error inserting message" + error);
      }
      console.log("Message inserted:", data);
    } catch (error: any) {
      addError("Error inserting message" + error?.name);
      console.error(error);
    }

    setMessage("");
    setFiles([]);
    setImages([]);
  };

  return (
    <section className="flex items-start mt-6 sm:space-x-4">
      <div className="flex-shrink-0 hidden sm:block">
        {profilePicture ? (
          <Image
            width={profilePicture.width ?? 300}
            height={profilePicture.height ?? 300}
            className="inline-block h-10 w-10 rounded-full object-cover"
            src={profilePicture.url}
            alt={user.first_name + " " + user.last_name}
          />
        ) : (
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-sky-500 font-bold uppercase text-white flex-shrink-0">
            {user.first_name?.charAt(0)}
            {user.last_name?.charAt(0)}
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1 bg-white p-2 rounded-xl border shadow">
        <form action="#" onSubmit={handleSubmit}>
          <div className="border-b border-gray-200 focus-within:border-sky-600">
            <label htmlFor="message" className="sr-only">
              Add your message
            </label>
            <textarea
              rows={3}
              name="message"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-sky-600 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Add your message..."
            />
          </div>
          <div className="flex justify-between pt-2">
            <div className="flex items-center space-x-2">
              <ImageUpload
                images={images}
                setImages={setImages}
                user={user}
                userType={userType}
              />
              <FileUpload
                files={files}
                setFiles={setFiles}
                user={user}
                userType={userType}
              />
              <Emoji message={message} setMessage={setMessage} />
            </div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
