import { PhotoIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Picture = () => {
  return (
    <main className="flex min-h-full flex-1 flex-col py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-3xl">Add your profile photo.</h1>
        <p>Make a good first impression. upload a clear photo of yourself</p>
        <section className="mt-8 rounded-md">
          <div className='flex justify-between'>
            <aside className="">
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-12 py-20">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or take from camera</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </aside>
            <aside>

            </aside>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Picture
