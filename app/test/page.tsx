import { PhotoIcon } from "@heroicons/react/24/outline";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";

const Page = async () => {
  async function handleImage(formData: any) {
    "use server";
    const photo = formData.get("file-upload") as File;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: '{"api_key":"0fe4913e875f41f8b5a11a3ef9a45a4b","url":"https://dhxummckajoranathmmy.supabase.co/storage/v1/object/public/professionals/d08fcf2f-e49c-4e4a-a802-b021136dd370/images/michael-olsen-CBrjgZ53NOs-unsplash.jpg,"lossy":true,"quality": 75", "resize":{ "width": 300, "height": 300 }}',
      };

      fetch("https://images.abstractapi.com/v1/url/", options)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full py-12">
      <form
        method="POST"
        action={handleImage}
        className="max-w-7xl mx-auto flex items-center justify-center flex-col"
      >
        <div className="col-span-full">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Cover photo
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
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
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Page;
