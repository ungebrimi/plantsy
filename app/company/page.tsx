import React from "react";
import Image from "next/image";

const timeline = [
  {
    name: "August - The Seed is Planted:",
    description:
      "Plantsy germinated as an idea in the mind of our founder, Jake. Inspired to merge technology with agriculture, the journey began with the planting of the first seed.",
    date: "August 2023",
    dateTime: "2023-08",
  },
  {
    name: "September - Rooted in Innovation",
    description:
      "With the visionary Jake leading the charge, our development team, under the hood of Next.js and Supabase, started crafting the robust infrastructure that powers Plantsy.",
    date: "October 2023",
    dateTime: "2023-10",
  },
  {
    name: "October - Cultivating Collaborations:",
    description:
      "As the app took shape, our team blossomed. From developers to security experts, each member brought unique expertise, enriching the soil for Plantsy to thrive.",
    date: "October 2023",
    dateTime: "2023-10",
  },
  {
    name: "November - Tending to Growth",
    description:
      "As we approach the MVP, Plantsy is on the brink of sprouting into a revolutionary platform. Join us as we cultivate connections, knowledge, and a shared love for everything green.",
    date: "November 2023",
    dateTime: "2023-10",
  },
];

const Company = () => {
  return (
    <main className="isolate">
      {/* Hero section */}
      <div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-green-100/20 pt-14">
        <div
          className="absolute inset-y-0 right-1/2 -z-10 bg-white -mr-96 w-[200%] origin-top-right skew-x-[-30deg]  shadow-xl shadow-green-300/10 ring-1 ring-green-50 sm:-mr-80 lg:-mr-96"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
              We’re a passionate group of people working from around the world
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg leading-8 text-gray-600">
                At Plantsy, our passion for agriculture unites us across
                borders. From the heart of the fields where our roots lie,
                we&apos;re cultivating a global community. Join us on a journey
                where technology meets the green, and together, we sow the seeds
                of a connected, thriving future in agriculture.
              </p>
            </div>
            <Image
              width={1280}
              height={720}
              src={
                "https://dhxummckajoranathmmy.supabase.co/storage/v1/object/public/app/images/hands-holding-plants-3.jpg"
              }
              alt=""
              className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>

      {/* Timeline section */}
      <div className="mx-auto -mt-8 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {timeline.map((item) => (
            <div key={item.name}>
              <time
                dateTime={item.dateTime}
                className="flex items-center text-sm font-semibold leading-6 text-green-600"
              >
                <svg
                  viewBox="0 0 4 4"
                  className="mr-4 h-1 w-1 flex-none"
                  aria-hidden="true"
                >
                  <circle cx={2} cy={2} r={2} fill="currentColor" />
                </svg>
                {item.date}
                <div
                  className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                  aria-hidden="true"
                />
              </time>
              <p className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                {item.name}
              </p>
              <p className="  mt-1 text-base leading-7 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-32 max-w-7xl sm:mt-40 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gray-900 px-6 py-72 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          {/* Dark blur overlay */}
          <div
            className="absolute z-10 inset-0 backdrop-filter backdrop-blur-xl bg-gray-900 opacity-70"
            aria-hidden="true"
          ></div>

          {/* Image */}
          <Image
            src={
              "https://dhxummckajoranathmmy.supabase.co/storage/v1/object/public/app/images/landscape-1.jpg"
            }
            width={1280}
            height={720}
            alt={"#"}
            className="absolute inset-0 object-cover w-full h-full"
          />

          {/* Text */}
          <div className="z-20 absolute inset-0 flex flex-col items-center justify-center text-white">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl max-w-2xl px-2">
              In the garden, you&apos;ll discover your closest companion in the
              whisper of leaves and the bloom of each flower. Nature&apos;s
              embrace is where true friendships with the earth are nurtured
            </h2>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="mt-32 overflow-hidden sm:mt-40">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
            <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Meet the Minds Behind Plantsy
              </h2>
              <p className="mt-6 text-xl leading-8 text-gray-600">
                In the garden of collaboration, our dynamic trio—Jake, Jesus,
                and our developer—nurtured Plantsy. Jake&apos;s vision,
                Jesus&apos;s security prowess, and Joakim&apos;s technical
                expertise combined seamlessly. The result? A passion-fueled
                project that transcends boundaries, connecting technology and
                agriculture. As we cultivate Plantsy, our roots run deep in the
                soil of trust, collaboration, and shared vision. Join us as we
                blossom into a revolutionary force in the agriculture and
                technology landscape-
              </p>
            </div>
            <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
              <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                <Image
                  width={1280}
                  height={720}
                  src={
                    "https://dhxummckajoranathmmy.supabase.co/storage/v1/object/public/app/images/planting.jpg"
                  }
                  alt=""
                  className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                />
              </div>
              <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                  <Image
                    width={1280}
                    height={720}
                    src={
                      "https://dhxummckajoranathmmy.supabase.co/storage/v1/object/public/app/images/planting.jpg"
                    }
                    alt=""
                    className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
                <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                  <Image
                    width={1280}
                    height={720}
                    src={
                      "https://dhxummckajoranathmmy.supabase.co/storage/v1/object/public/app/images/landscape-5.jpg?t=2023-11-22T10%3A53%3A44.401Z"
                    }
                    alt=""
                    className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
                <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                  <Image
                    width={1280}
                    height={720}
                    src={
                      "https://dhxummckajoranathmmy.supabase.co/storage/v1/object/public/app/images/landscape-7.jpg?t=2023-11-22T10%3A53%3A50.334Z"
                    }
                    alt=""
                    className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            We approach the workplace as something that adds to our lives and
            adds value to world.
          </h2>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Diam nunc lacus lacus aliquam turpis enim. Eget hac velit est
            euismod lacus. Est non placerat nam arcu. Cras purus nibh cursus sit
            eu in id. Integer vel nibh.
          </p>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end">
          <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-50 p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start">
            <p className="flex-none text-3xl font-bold tracking-tight text-gray-900">
              250k
            </p>
            <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p className="text-lg font-semibold tracking-tight text-gray-900">
                Users on the platform
              </p>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Vel labore deleniti veniam consequuntur sunt nobis.
              </p>
            </div>
          </div>
          <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-900 p-8 sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-sm lg:flex-auto lg:flex-col lg:items-start lg:gap-y-44">
            <p className="flex-none text-3xl font-bold tracking-tight text-white">
              $8.9 billion
            </p>
            <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p className="text-lg font-semibold tracking-tight text-white">
                We’re proud that our customers have made over $8 billion in
                total revenue.
              </p>
              <p className="mt-2 text-base leading-7 text-gray-400">
                Eu duis porta aliquam ornare. Elementum eget magna egestas.
              </p>
            </div>
          </div>
          <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-green-600 p-8 sm:w-11/12 sm:max-w-xl sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-none lg:flex-auto lg:flex-col lg:items-start lg:gap-y-28">
            <p className="flex-none text-3xl font-bold tracking-tight text-white">
              401,093
            </p>
            <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p className="text-lg font-semibold tracking-tight text-white">
                Transactions this year
              </p>
              <p className="mt-2 text-base leading-7 text-green-200">
                Eu duis porta aliquam ornare. Elementum eget magna egestas. Eu
                duis porta aliquam ornare.
              </p>
            </div>
          </div>
        </div>
      </div>
 */}
      {/* Content section
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
          <div className="w-full lg:max-w-lg lg:flex-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              We’re always looking for awesome people to join us
            </h2>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              Diam nunc lacus lacus aliquam turpis enim. Eget hac velit est
              euismod lacus. Est non placerat nam arcu. Cras purus nibh cursus
              sit eu in id.
            </p>
            <Image
              width={1280}
              height={720}
              src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1344&h=1104&q=80"
              alt=""
              className="mt-16 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]"
            />
          </div>
        </div>
      </div>
      */}
    </main>
  );
};

export default Company;
