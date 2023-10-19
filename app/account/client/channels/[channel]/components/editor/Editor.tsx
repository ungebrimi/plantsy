import { useState } from "react";
import FileUpload from "./FileUpload";
import ImageUpload from "./ImageUpload";
import Emoji from "./Emoji";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import useImageUpload from "@/hooks/useImageUpload";
import { Tables } from "@/database";

export default function Editor({
  session,
  client,
  channel,
}: {
  session: Session;
  channel: Tables<"channels">;
  client: Tables<"clients">;
}) {
  const supabase = createClientComponentClient();
  const [message, setMessage] = useState<string>("");
  const [files, setFiles] = useState<Tables<"files">[]>([]);
  const profilePicture = JSON.parse(client.profile_picture as string);
  const { images, setImages } = useImageUpload();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (message !== "") {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          message: message,
          client_id: session.user.id,
          channel_id: channel.id,
          files: files.length > 0 ? JSON.stringify(files) : null,
          images: images.length > 0 ? JSON.stringify(images) : null,
        })
        .select();

      if (error) {
        console.error(error);
      }
      // Process successful response, if needed
      console.log("Message inserted:", data);
      setMessage("");
      setFiles([]);
      setImages([]);
    }
  };

  return (
    <section className="flex items-start mt-6 sm:space-x-4">
      {client && (
        <>
          <div className="flex-shrink-0 hidden sm:block">
            {client.profile_picture ? (
              <Image
                width={300}
                height={300}
                className="inline-block h-10 w-10 rounded-full"
                src={profilePicture.url}
                alt={client.first_name + " " + client.last_name}
              />
            ) : (
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 font-bold uppercase text-white flex-shrink-0">
                {client.first_name?.charAt(0)}
                {client.last_name?.charAt(0)}
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1 bg-white p-2 rounded-xl border">
            <form action="#" onSubmit={handleSubmit}>
              <div className="border-b border-gray-200 focus-within:border-indigo-600">
                <label htmlFor="message" className="sr-only">
                  Add your message
                </label>
                <textarea
                  rows={3}
                  name="message"
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Add your message..."
                />
              </div>
              <div className="flex justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <ImageUpload session={session} />
                  <FileUpload
                    files={files}
                    setFiles={setFiles}
                    session={session}
                  />
                  <Emoji message={message} setMessage={setMessage} />
                </div>
                <div className="flex-shrink-0">
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </section>
  );
}
