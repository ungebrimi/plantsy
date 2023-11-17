import React, { Fragment, SetStateAction, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Tables } from "@/database";
import { createBrowserClient } from "@supabase/ssr";

type ImageModalProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  images: Tables<"files">[];
  setImages: React.Dispatch<SetStateAction<Tables<"files">[]>>;
};

export default function ImageModal({
  open,
  setOpen,
  images,
  setImages,
}: ImageModalProps) {
  const cancelButtonRef = useRef(null);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const [tempImages, setTempImages] = useState<Tables<"files">[]>(images);

  async function removeImage(image_id: number) {
    const updatedTempImages = tempImages.filter(
      (image) => image.id !== image_id,
    );
    setTempImages(updatedTempImages);
  }

  async function removeImageFromDB(image: Tables<"files">) {
    const { error } = await supabase.from("files").delete().eq("id", image.id);
    if (error) {
      console.error(error);
    } else {
      console.log(`image ${image.name} has been removed from the database`);
    }
  }

  function handleSave() {
    // Find images that were present in the images array but are not in tempImages
    const imagesToRemove = images.filter(
      (image) => !tempImages.some((tempImage) => tempImage.id === image.id),
    );

    // Remove those images from the database
    imagesToRemove.forEach((image) => {
      removeImageFromDB(image);
    });

    // Update the images array to match tempImages
    setImages(tempImages);
    setOpen(false);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <PhotoIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-6 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Manage Images
                      </Dialog.Title>
                      <ul
                        role="list"
                        className="divide-y mt-4 divide-gray-100 w-full"
                      >
                        {tempImages.map((image) => (
                          <li
                            key={image.id}
                            className="flex items-center justify-between gap-x-6 py-5"
                          >
                            <div className="flex min-w-full gap-x-4">
                              <img
                                className="w-16 h-16 flex-none rounded-sm bg-gray-50"
                                src={image.url as string}
                                alt=""
                              />
                              <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                  {image.name}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                  {image.type}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(image.id)}
                              className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    onClick={() => handleSave()}
                  >
                    Save changes
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
