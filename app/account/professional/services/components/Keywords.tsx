import React, { SetStateAction, useState } from "react";
import { Tables } from "@/database";
import { HashtagIcon, PlusIcon } from "@heroicons/react/24/outline";

interface KeywordsProps {
  formData: Tables<"services">;
  setFormData: React.Dispatch<SetStateAction<Tables<"services">>>;
}

function Keywords({ formData, setFormData }: KeywordsProps) {
  const [keyword, setKeyword] = useState<string>("");
  const keywords = formData.keywords ? formData.keywords : [];

  function addKeyword() {
    if (!keyword || keyword === "") return;
    if (formData.keywords && formData.keywords.length >= 5) return;
    setFormData({
      ...formData,
      keywords: [keyword, ...keywords],
    });
    setKeyword("");
  }

  function removeKeyword(indexToRemove: number) {
    const updatedKeywords = formData.keywords?.filter(
      (_, index) => index !== indexToRemove,
    );
    setFormData({
      ...formData,
      keywords: updatedKeywords as string[],
    });
  }

  return (
    <div className="sm:col-span-4">
      <label
        htmlFor="keyword"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Keywords (5 maximum)
      </label>
      <div className="mt-2 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <HashtagIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </div>
          <input
            data-testid="Input"
            role="input"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            type="text"
            name="keyword"
            id="keyword"
            className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Write your keywords here"
          />
        </div>
        <button
          data-testid="Add"
          type="button"
          onClick={() => addKeyword()}
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-600 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <PlusIcon
            className="-ml-0.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </button>
      </div>
      {keywords.length >= 5 && (
        <span className="text-sm text-red-600 font-medium">
          List can only contain 5 keywords maximum
        </span>
      )}
      <>
        {keywords.length > 0 && (
          <div className="flex flex-wrap mt-2 gap-x-2">
            {keywords.map((word: string, idx: number) => (
              <span
                key={idx}
                className="inline-flex items-cerounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
              >
                {word}
                <button
                  type="button"
                  data-testid="Remove"
                  onClick={() => removeKeyword(idx)}
                  className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20"
                >
                  <span className="sr-only">Remove</span>
                  <svg
                    viewBox="0 0 14 14"
                    className="h-3.5 w-3.5 stroke-gray-600/50 group-hover:stroke-gray-600/75"
                  >
                    <path d="M4 4l6 6m0-6l-6 6" />
                  </svg>
                  <span className="absolute -inset-1" />
                </button>
              </span>
            ))}
          </div>
        )}
      </>
    </div>
  );
}

export default Keywords;
