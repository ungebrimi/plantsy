/** @format */

"use client";
import React from "react";
import { Fragment } from "react";
import {
	ArrowUpOnSquareIcon,
	ShieldCheckIcon,
	MapPinIcon,
	CheckBadgeIcon,
	CheckIcon,
	UserGroupIcon,
	ClockIcon,
	ChatBubbleLeftIcon,
	PhoneIcon,
	MagnifyingGlassIcon,
	ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

import {
	StarIcon
} from "@heroicons/react/24/solid";
import Select from "react-select";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const CategoryDetail = () => {
	const [warna, setWarna] = useState([]);
	const [open, setOpen] = useState(false);

	const optionsWarna = [
		{ value: "biru", label: "Biru" },
		{ value: "kuning", label: "Kuning" },
		{ value: "hijau", label: "Hijau" },
		{ value: "cokelat", label: "Cokelat" },
		{ value: "merah", label: "Merah" },
	];

	const handleWarnaChange = async (selected: any, selectaction: any) => {
		const { action } = selectaction;
		if (action === "clear") {
		} else if (action === "select-option") {
		} else if (action === "remove-value") {
			console.log("remove");
		}
		setWarna(selected);
	};

	const reviews = {
		average: 4,
		totalCount: 1624,
		counts: [
			{ rating: 5, count: 1019 },
			{ rating: 4, count: 162 },
			{ rating: 3, count: 97 },
			{ rating: 2, count: 199 },
			{ rating: 1, count: 147 },
		],
		featured: [
			{
				id: 1,
				rating: 5,
				content: `
			  <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
			`,
				author: "Emily Selman",
				avatarSrc:
					"https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
			},
			// More reviews...
		],
	};

	function classNames(...classes: any) {
		return classes.filter(Boolean).join(" ");
	}

	return (
		<>
			<div className='relative isolate'>
				<div className='mx-auto mt-10 max-w-7xl'>
					<div className='flex gap-8'>
						<div className='flex md:w-9/12'>
							<div className='w-full'>
								<div className='grid grid-rows-4 grid-flow-col gap-4'>
									<div className='bg-white rounded-xl shadow-md overflow-hidden'>
										<div className='md:flex'>
											<div className='box-border h-48 w-48 p-6'>
												<img
													src='https://production-next-images-cdn.thumbtack.com/i/465604260963860483/desktop/standard/400square-legacy'
													alt='Picture of the author'
												/>
											</div>
											<div className='md:p-6 md:pl-0 md:w-2/3'>
												<div className='uppercase tracking-wide text-md font-bold'>
													Flash Guys cleaning
												</div>
												<dt className='flex'>
													<span className='mr-2 text-yellow-400 text-sm mt-1 font-semibold'>
														Exceptional 5.0
													</span>
													<StarIcon className='h-4 w-4 mt-1 text-yellow-400' />
													<StarIcon className='h-4 w-4 mt-1 text-yellow-400' />
													<StarIcon className='h-4 w-4 mt-1 text-yellow-400' />
													<StarIcon className='h-4 w-4 mt-1 text-yellow-400' />
													<StarIcon className='h-4 w-4 mt-1 text-yellow-400' />
													<span className='ml-2 text-sm mt-1'>(15)</span>
												</dt>
												<div className='mt-2'>
													<span className='py-1 px-2 bg-slate-200 rounded-lg text-sm'>
														$ Great Value
													</span>
												</div>
												<div className='mt-4 w-32'>
													<button className='border-2 text-gray-500 p-2 font-small w-full rounded flex items-center justify-center'>
														<ArrowUpOnSquareIcon className='h-6 w-6 text-gray-500 mr-2' />{" "}
														Share
													</button>
												</div>
											</div>
										</div>
										<div className='pl-6 pr-6 pb-2'>
											<p className='text-gray-500 text-sm mb-3'>
												Thumbtack // Lawn Care // Lawn Love Lawn Care
											</p>
											<span className='text-sm font-bold'>
												Introduction :{" "}
												<span className='text-gray-600 text-sm font-semibold'>
													Lawn Love is a modern, high-tech lawn care service.
													Get an instant, accurate satellite quote, and we
													send over a lawn pro to work their magic on your yard.
													Payment and scheduling are automated, and you can
													manage everything from your phone. We are Lawn Love,
													and we bringing lawn care into the 21st century.
												</span>
											</span>
										</div>
										<div className='pl-6 pr-6 pb-2 grid grid-cols-2 gap-4'>
											<div className='p-2'>
												<p className='font-semibold mb-2'>Overview</p>
												<p className='flex mb-0.5 text-sm'>
													<ShieldCheckIcon className='h-4 w-4 text-gray-500 mr-2 mt-1' />{" "}
													Hired 202 times
												</p>
												<p className='flex mb-0.5 text-sm'>
													<MapPinIcon className='h-4 w-4 text-gray-500 mr-2 mt-1' />{" "}
													Serves Los Angeles, CA
												</p>
												<p className='flex mb-0.5 text-sm'>
													<CheckBadgeIcon className='h-4 w-4 text-gray-500 mr-2 mt-1' />{" "}
													Background checked
												</p>
												<p className='flex mb-0.5 text-sm'>
													<CheckIcon className='h-4 w-4 text-gray-500 mr-2 mt-1' />{" "}
													Verified business
												</p>
												<p className='flex mb-0.5 text-sm'>
													<UserGroupIcon className='h-4 w-4 text-gray-500 mr-2 mt-1' />{" "}
													125 employees
												</p>
												<p className='flex mb-0.5 text-sm'>
													<ClockIcon className='h-4 w-4 text-gray-500 mr-2 mt-1' />{" "}
													10 years in business
												</p>
												<button className='w-full border-2 p-2 mt-8 text-cyan-600 rounded font-semibold flex items-center justify-center'>
													<ChatBubbleLeftIcon className='h-4 w-4 text-cyan-500 mr-2' />{" "}
													Message
												</button>
											</div>
											<div className='p-2'>
												<p className='font-semibold'>Payment methods</p>
												<p className='text-gray-500 text-sm'>
													This pro accepts payments via Credit card.
												</p>
												<p className='text-sm font-semibold p-3 bg-orange-100 mt-3 mb-3'>
													Unfortunately, you can redeem Thumbtack discounts or
													pay this pro with referral credits.
												</p>
												<p className='text-sm font-semibold mt-1'>
													Top pro status
												</p>
												<p className='text-sm mt-1'>
													Top Pros are among the highest-rated, most popular
													professionals on Thumbtack.
												</p>
												<button className='w-full border-2 p-2 mt-4 text-cyan-600 rounded font-semibold flex items-center justify-center'>
													<PhoneIcon className='h-4 w-4 text-cyan-500 mr-2' />{" "}
													Request a call
												</button>
											</div>
										</div>
										<div className='pl-6 pr-6 pb-2 border-t-2'>
											<p className='text-gray-700 text-lg font-bold mt-4'>
												Reviews
											</p>
											<p className='text-gray-700 mt-1'>
												Customers rated this pro highly for{" "}
												<strong>work quality, professionalism,</strong> and{" "}
												<strong>responsiveness.</strong>
											</p>
											<div className='pt-4 grid grid-cols-2 gap-4'>
												<div className='border-r-2'>
													<p className='text-yellow-400 font-bold text-lg'>
														Good 4.0
													</p>
													<div className='flex'>
														<StarIcon className='h-8 w-8 mt-1 text-yellow-400' />
														<StarIcon className='h-8 w-8 mt-1 text-yellow-400' />
														<StarIcon className='h-8 w-8 mt-1 text-yellow-400' />
														<StarIcon className='h-8 w-8 mt-1 text-yellow-400' />
														<StarIcon className='h-8 w-8 mt-1 text-gray-500' />
													</div>
													<p className='text-gray-500'>60 reviews</p>
												</div>

												<div>
													<h3 className='sr-only'>Review data</h3>
													<dl className='space-y-3'>
														{reviews.counts.map((count) => (
															<div
																key={count.rating}
																className='flex items-center text-sm'>
																<dt className='flex flex-1 items-center'>
																	<p className='w-3 font-medium text-gray-900'>
																		{count.rating}
																		<span className='sr-only'>
																			{" "}
																			star reviews
																		</span>
																	</p>
																	<div
																		aria-hidden='true'
																		className='ml-1 flex flex-1 items-center'>
																		<StarIcon
																			className={classNames(
																				count.count > 0
																					? "text-yellow-400"
																					: "text-gray-300",
																				"h-5 w-5 flex-shrink-0"
																			)}
																			aria-hidden='true'
																		/>

																		<div className='relative ml-3 flex-1'>
																			<div className='h-3 rounded-full border border-gray-200 bg-gray-100' />
																			{count.count > 0 ? (
																				<div
																					className='absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400'
																					style={{
																						width: `calc(${count.count} / ${reviews.totalCount} * 100%)`,
																					}}
																				/>
																			) : null}
																		</div>
																	</div>
																</dt>
																<dd className='ml-3 w-10 text-right text-sm tabular-nums text-gray-900'>
																	{Math.round(
																		(count.count / reviews.totalCount) * 100
																	)}
																	%
																</dd>
															</div>
														))}
													</dl>
												</div>
											</div>
											<div className='flex mt-4'>
												<p className='text-gray-500'>
													Your trust means everything to us.
												</p>
												<p
													className='ml-1 text-cyan-500 font-bold'
													onClick={() => setOpen(true)}>
													Learn about our review guidelines.
												</p>
											</div>
										</div>
										<div className='flex pl-6 pr-6 pb-2'>
											<div className='relative mt-2 rounded-md shadow-sm'>
												<div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
													<span className='text-gray-500 sm:text-sm'>
														<MagnifyingGlassIcon className='h-4 w-4 text-gray-500' />
													</span>
												</div>
												<input
													type='text'
													name='price'
													id='price'
													className='block w-96 rounded-md border-0 py-1.5 pl-8 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
													placeholder='Search reviews'
												/>
											</div>
											<div className='relative ml-4 w-full mt-2 rounded-md shadow-sm'>
												<select
													name='hours'
													className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
													placeholder='DD-MM-YYYY'>
													<option>Most relevant</option>
													<option>Highest Rated</option>
													<option>Lowest Rated</option>
													<option>Newest first</option>
													<option>Oldest first</option>
												</select>
											</div>
										</div>
										<div className='flex pl-6 pr-6 pb-2'>
											<p>Read reviews that mention:</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='w-3/12 border p-3 border-t-4 border-t-indigo-600 bg-white shadow-md h-full'>
							<div className='border-b-2'>
								<p className='text-l font-medium'>$50/hour</p>
								<p className='text-xs font-medium mb-3 text-gray-400'>
									estimated price
								</p>
							</div>
							<h3 className='sr-only'>Categories</h3>

							<div className='pt-6' id='filter-section-mobile-0'>
								<div className='space-y-2'>
									<h3 className='text-md font-medium'>Zip Code</h3>
									<div className='flex items-center'>
										<input
											type='number'
											name='zip_code'
											className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
											placeholder='000000'
										/>
									</div>
									<h3 className='text-md font-medium'>Scheduling</h3>
									<div className='flex items-center'>
										<input
											type='date'
											name='scheduling'
											className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
											placeholder='DD-MM-YYYY'
										/>
									</div>
									<h3 className='text-md font-medium'>Estimated hours</h3>
									<div className='flex items-center'>
										<select
											name='hours'
											className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
											placeholder='DD-MM-YYYY'>
											<option>Select Answer</option>
											<option>Less than 2 hours (Simple tasks)</option>
											<option>2 - 5 hours (A few different projects)</option>
											<option>
												A full day (Complex or long-term projects)
											</option>
										</select>
									</div>
									<h3 className='text-md font-medium'>Project type</h3>
									<Select
										id='selectWarna'
										instanceId='selectWarna'
										isMulti
										name='colors'
										className='basic-multi-select'
										classNamePrefix='select'
										options={optionsWarna}
										onChange={handleWarnaChange}
										placeholder='Select Project Type'
									/>
									<p className='text-sm font-normal text-slate-600'>
										Sorry this pro can’t do your job, but we know other pros who
										can.
									</p>
									<button className='bg-sky-500 text-white p-3 font-medium w-full rounded'>
										Check availability
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Review guideline dialog */}
			<Transition.Root show={open} as={Fragment}>
				<Dialog as='div' className='relative z-10' onClose={setOpen}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'>
						<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
					</Transition.Child>

					<div className='fixed inset-0 z-10 overflow-y-auto'>
						<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
								enterTo='opacity-100 translate-y-0 sm:scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 translate-y-0 sm:scale-100'
								leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
								<Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-90'>
									<div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
										<div className='sm:flex sm:items-start'>
											<div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
												<ExclamationTriangleIcon
													className='h-6 w-6 text-red-600'
													aria-hidden='true'
												/>
											</div>
										</div>
										<div className='mt-3 font-bold'>
											<p className='text-md '>Our review guidelines</p>
										</div>
										<p className='mt-2 text-gray-600'>
											We here to help you find the best pro for your project
											and reviews are an important part of your search.
										</p>
										<p className='mt-3 text-gray-600'>
											We remove any reviews that:
										</p>
										<div className='mt-2'>
											<ul>
												<li className='flex gap-x-3'>
													<CheckIcon
														className='h-6 w-5 flex-none text-indigo-600'
														aria-hidden='true'
													/>
													Are not directly related to pro professionalism,
													interactions, or performance
												</li>
												<li className='flex gap-x-3'>
													<CheckIcon
														className='h-6 w-5 flex-none text-indigo-600'
														aria-hidden='true'
													/>
													Misrepresent a customer’s experience
												</li>
												<li className='flex gap-x-3'>
													<CheckIcon
														className='h-6 w-5 flex-none text-indigo-600'
														aria-hidden='true'
													/>
													Are not posted within a reasonable period after the
													work is completed
												</li>
												<li className='flex gap-x-3'>
													<CheckIcon
														className='h-6 w-5 flex-none text-indigo-600'
														aria-hidden='true'
													/>
													Endorses illegal, violent, discriminatory, vulgar, or
													threatening activities
												</li>
												<li className='flex gap-x-3'>
													<CheckIcon
														className='h-6 w-5 flex-none text-indigo-600'
														aria-hidden='true'
													/>
													Promotes commercial promotion of products or services
												</li>
												<li className='flex gap-x-3'>
													<CheckIcon
														className='h-6 w-5 flex-none text-indigo-600'
														aria-hidden='true'
													/>
													Disclose confidential information
												</li>
											</ul>
										</div>
									</div>
									<div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
										<button
											type='button'
											className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
											onClick={() => setOpen(false)}>
											Close
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
			{/* Review guideline dialog */}
		</>
	);
};

export default CategoryDetail;