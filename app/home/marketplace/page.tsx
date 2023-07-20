import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { TrophyIcon, MapPinIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

const Marketplace = () => {
  return (
    <div className='relative isolate'>
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className='md:flex gap-8'>
          <div className='md:w-1/5'>
            <p className='md:text-2xl font-medium'>Filters</p>
            <h3 className="sr-only">Categories</h3>

            <div className="pt-6" id="filter-section-mobile-0">
              <div className="space-y-2">
                <h3 className="text-md font-bold">Estimated Hours</h3>
                <div className="flex items-center">
                  <input id="filter-mobile-color-0" name="color[]" value="white" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <label className="ml-3 min-w-0 flex-1 text-gray-500">Less than 2 hours (Simple tasks)</label>
                </div>
                <div className="flex items-center">
                  <input id="filter-mobile-color-1" name="color[]" value="beige" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <label className="ml-3 min-w-0 flex-1 text-gray-500">2 - 5 hours (A few different projects)</label>
                </div>
                <div className="flex items-center">
                  <input id="filter-mobile-color-2" name="color[]" value="blue" type="radio" checked className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <label className="ml-3 min-w-0 flex-1 text-gray-500">A full day (Complex or long-term projects)</label>
                </div>
              </div>

              <div className="space-y-2 mt-8">
                <h3 className="text-md font-bold">Project Type</h3>
                <div className="flex items-center">
                  <input id="filter-mobile-color-0" name="color[]" value="white" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <label className="ml-3 min-w-0 flex-1 text-gray-500">Repairs</label>
                </div>
                <div className="flex items-center">
                  <input id="filter-mobile-color-1" name="color[]" value="beige" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <label className="ml-3 min-w-0 flex-1 text-gray-500">Installation</label>
                </div>
                <div className="flex items-center">
                  <input id="filter-mobile-color-2" name="color[]" value="blue" type="checkbox" checked className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <label className="ml-3 min-w-0 flex-1 text-gray-500">Maintenance</label>
                </div>
                <div className="flex items-center">
                  <input id="filter-mobile-color-3" name="color[]" value="brown" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <label className="ml-3 min-w-0 flex-1 text-gray-500">Assembly</label>
                </div>
                <div className="flex items-center">
                  <input id="filter-mobile-color-4" name="color[]" value="green" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <label className="ml-3 min-w-0 flex-1 text-gray-500">Painting</label>
                </div>
                <div className="flex items-center">
                  <input id="filter-mobile-color-5" name="color[]" value="purple" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <label className="ml-3 min-w-0 flex-1 text-gray-500">Purple</label>
                </div>
              </div>
            </div>
          </div>
          <div className='md:flex md:w-4/5'>
            <div>
              <p className='text-2xl sm:text-2xl font-medium'>
                Top 10 Handymen based on our criteria
              </p>
              <div className='grid grid-rows-4 grid-flow-col gap-4 mt-4'>
                <div className='bg-white rounded-xl shadow-md overflow-hidden'>
                  <div className='md:flex'>
                    <div className='box-border h-60 w-60 p-6'>
                      <img
                        src='https://production-next-images-cdn.thumbtack.com/i/465604260963860483/desktop/standard/400square-legacy'
                        alt='Picture of the author'
                      />
                    </div>
                    <div className='md:p-6 md:pl-0 md:w-2/3'>
                      <div className='uppercase tracking-wide text-md font-semibold'>
                        Ivan Handyman
                      </div>
                      <dt className='flex'>
                        <span className='mr-2 text-green-500 text-sm mt-1 font-semibold'>
                          Exceptional 5.0{" "}
                        </span>
                        <StarIcon className='h-4 w-4 mt-1 text-green-500' />
                        <StarIcon className='h-4 w-4 mt-1 text-green-500' />
                        <StarIcon className='h-4 w-4 mt-1 text-green-500' />
                        <StarIcon className='h-4 w-4 mt-1 text-green-500' />
                        <StarIcon className='h-4 w-4 mt-1 text-green-500' />
                        <span className='ml-2 text-sm mt-1'>(15)</span>
                      </dt>
                      <div className='mt-2'>
                        <span className='py-1 px-2 bg-slate-200 rounded-lg text-sm'>
                          $ Great Value
                        </span>
                      </div>
                      <div className='mt-2'>
                        <p className='text-gray-500'><span className='inline-block text-sm'><TrophyIcon className='h-4 w-4 inline-block' /> <span className='inline-block relative top-0.5 ml-1'>16 hires on Thumbtack</span></span></p>
                        <p className='text-gray-500'><span className='inline-block text-sm'><MapPinIcon className='h-4 w-4 inline-block' /> <span className='inline-block relative top-0.5 ml-1'>Serves Los angeles</span></span></p>
                        <p className='text-gray-500'><span className='inline-block text-sm'><ChatBubbleLeftIcon className='h-4 w-4 inline-block' /> <span className='inline-block relative top-0.5 ml-1'>Response in about <strong>2 hours</strong></span></span></p>
                      </div>
                      <p className='text-gray-500 mt-4 text-sm bg-slate-100 p-2'>
                        Dani G. says, Highly recommended for someone looking
                        for a good{" "}
                        <span className='font-semibold'>handyman</span>
                        <span className='text-cyan-400'>See More</span>
                      </p>
                    </div>
                    <div className='md:p-8 md:w-1/3 text-right'>
                      <div className='uppercase tracking-wide text-md font-semibold'>
                        $60/hour
                      </div>
                      <p className='text-gray-400 text-sm'>estimated price</p>
                      <button className='bg-blue-500 hover:bg-blue-700 text-white mt-6 font-bold py-2 px-4 rounded mb-0'>
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>

                <div className='bg-white rounded-xl shadow-md overflow-hidden'>
                  <div className='md:flex'>
                    <div className='box-border h-60 w-60 p-6'>
                      <img
                        src='https://production-next-images-cdn.thumbtack.com/i/465604260963860483/desktop/standard/400square-legacy'
                        alt='Picture of the author'
                      />
                    </div>
                    <div className='md:p-6 md:pl-0 md:w-2/3'>
                      <div className='uppercase tracking-wide text-md font-semibold'>
                        Ivan Handyman
                      </div>
                      <dt className='flex'>
                        <span className='mr-2 text-green-500 text-sm mt-1 font-semibold'>
                          Exceptional 5.0{" "}
                        </span>
                        <StarIcon className='h-4 w-4 mt-1 text-green-500' />
                        <StarIcon className='h-4 w-4 mt-1 text-green-500' />
                        <StarIcon className='h-4 w-4 mt-1 text-green-500' />
                        <StarIcon className='h-4 w-4 mt-1 text-green-500' />
                        <StarIcon className='h-4 w-4 mt-1 text-green-500' />
                        <span className='ml-2 text-sm mt-1'>(15)</span>
                      </dt>
                      <div className='mt-2'>
                        <span className='py-1 px-2 bg-slate-200 rounded-lg text-sm'>
                          $ Great Value
                        </span>
                      </div>
                      <div className='mt-2'>
                        <p className='text-gray-500'><span className='inline-block text-sm'><TrophyIcon className='h-4 w-4 inline-block' /> <span className='inline-block relative top-0.5 ml-1'>16 hires on Thumbtack</span></span></p>
                        <p className='text-gray-500'><span className='inline-block text-sm'><MapPinIcon className='h-4 w-4 inline-block' /> <span className='inline-block relative top-0.5 ml-1'>Serves Los angeles</span></span></p>
                        <p className='text-gray-500'><span className='inline-block text-sm'><ChatBubbleLeftIcon className='h-4 w-4 inline-block' /> <span className='inline-block relative top-0.5 ml-1'>Response in about <strong>2 hours</strong></span></span></p>
                      </div>
                      <p className='text-gray-500 mt-4 text-sm bg-slate-100 p-2'>
                        Dani G. says, Highly recommended for someone looking
                        for a good{" "}
                        <span className='font-semibold'>handyman</span>
                        <span className='text-cyan-400'>See More</span>
                      </p>
                    </div>
                    <div className='md:p-8 md:w-1/3 text-right'>
                      <div className='uppercase tracking-wide text-md font-semibold'>
                        $60/hour
                      </div>
                      <p className='text-gray-400 text-sm'>estimated price</p>
                      <button className='bg-blue-500 hover:bg-blue-700 text-white mt-6 font-bold py-2 px-4 rounded mb-0'>
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>

                <div className='bg-white rounded-xl shadow-md overflow-hidden'>
                  <div className='md:flex'>
                    <div className='box-border h-60 w-60 p-6'>
                      <img
                        src='https://production-next-images-cdn.thumbtack.com/i/465604260963860483/desktop/standard/400square-legacy'
                        alt='Picture of the author'
                      />
                    </div>
                    <div className='md:p-6 md:pl-0 md:w-2/3'>
                      <div className='uppercase tracking-wide text-md font-semibold'>
                        Ivan Handyman
                      </div>
                      <dt className='flex'>
                        <span className='mr-2 text-green-500 text-sm mt-1 font-semibold'>
                          Exceptional 5.0{" "}
                        </span>
                        <StarIcon className='h-4 w-4 mt-1 text-green-500' />
                        <StarIcon className='h-4 w-4 mt-1 text-green-500' />
                        <StarIcon className='h-4 w-4 mt-1 text-green-500' />
                        <StarIcon className='h-4 w-4 mt-1 text-green-500' />
                        <StarIcon className='h-4 w-4 mt-1 text-green-500' />
                        <span className='ml-2 text-sm mt-1'>(15)</span>
                      </dt>
                      <div className='mt-2'>
                        <span className='py-1 px-2 bg-slate-200 rounded-lg text-sm'>
                          $ Great Value
                        </span>
                      </div>
                      <div className='mt-2'>
                        <p className='text-gray-500'><span className='inline-block text-sm'><TrophyIcon className='h-4 w-4 inline-block' /> <span className='inline-block relative top-0.5 ml-1'>16 hires on Thumbtack</span></span></p>
                        <p className='text-gray-500'><span className='inline-block text-sm'><MapPinIcon className='h-4 w-4 inline-block' /> <span className='inline-block relative top-0.5 ml-1'>Serves Los angeles</span></span></p>
                        <p className='text-gray-500'><span className='inline-block text-sm'><ChatBubbleLeftIcon className='h-4 w-4 inline-block' /> <span className='inline-block relative top-0.5 ml-1'>Response in about <strong>2 hours</strong></span></span></p>
                      </div>
                      <p className='text-gray-500 mt-4 text-sm bg-slate-100 p-2'>
                        Dani G. says, Highly recommended for someone looking
                        for a good{" "}
                        <span className='font-semibold'>handyman</span>
                        <span className='text-cyan-400'>See More</span>
                      </p>
                    </div>
                    <div className='md:p-8 md:w-1/3 text-right'>
                      <div className='uppercase tracking-wide text-md font-semibold'>
                        $60/hour
                      </div>
                      <p className='text-gray-400 text-sm'>estimated price</p>
                      <button className='bg-blue-500 hover:bg-blue-700 text-white mt-6 font-bold py-2 px-4 rounded mb-0'>
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>

                <div className='bg-white rounded-xl shadow-md overflow-hidden'>
                  <div className='md:flex'>
                    <div className='box-border h-60 w-60 p-6'>
                      <img
                        src='https://production-next-images-cdn.thumbtack.com/i/465604260963860483/desktop/standard/400square-legacy'
                        alt='Picture of the author'
                      />
                    </div>
                    <div className='md:p-6 md:pl-0 md:w-2/3'>
                      <div className='uppercase tracking-wide text-md font-semibold'>
                        Ivan Handyman
                      </div>
                      <dt className='flex'>
                        <span className='mr-2 text-green-500 text-sm mt-1 font-semibold'>
                          Exceptional 5.0{" "}
                        </span>
                        <StarIcon className='h-4 w-4 mt-1 text-green-500' />
                        <StarIcon className='h-4 w-4 mt-1 text-green-500' />
                        <StarIcon className='h-4 w-4 mt-1 text-green-500' />
                        <StarIcon className='h-4 w-4 mt-1 text-green-500' />
                        <StarIcon className='h-4 w-4 mt-1 text-green-500' />
                        <span className='ml-2 text-sm mt-1'>(15)</span>
                      </dt>
                      <div className='mt-2'>
                        <span className='py-1 px-2 bg-slate-200 rounded-lg text-sm'>
                          $ Great Value
                        </span>
                      </div>
                      <div className='mt-2'>
                        <p className='text-gray-500'><span className='inline-block text-sm'><TrophyIcon className='h-4 w-4 inline-block' /> <span className='inline-block relative top-0.5 ml-1'>16 hires on Thumbtack</span></span></p>
                        <p className='text-gray-500'><span className='inline-block text-sm'><MapPinIcon className='h-4 w-4 inline-block' /> <span className='inline-block relative top-0.5 ml-1'>Serves Los angeles</span></span></p>
                        <p className='text-gray-500'><span className='inline-block text-sm'><ChatBubbleLeftIcon className='h-4 w-4 inline-block' /> <span className='inline-block relative top-0.5 ml-1'>Response in about <strong>2 hours</strong></span></span></p>
                      </div>
                      <p className='text-gray-500 mt-4 text-sm bg-slate-100 p-2'>
                        Dani G. says, Highly recommended for someone looking
                        for a good{" "}
                        <span className='font-semibold'>handyman</span>
                        <span className='text-cyan-400'>See More</span>
                      </p>
                    </div>
                    <div className='md:p-8 md:w-1/3 text-right'>
                      <div className='uppercase tracking-wide text-md font-semibold'>
                        $60/hour
                      </div>
                      <p className='text-gray-400 text-sm'>estimated price</p>
                      <button className='bg-blue-500 hover:bg-blue-700 text-white mt-6 font-bold py-2 px-4 rounded mb-0'>
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
