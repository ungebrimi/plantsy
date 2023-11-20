"use client";
import { useState } from "react";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/20/solid";
import { createClient } from "@/app/utils/supabase/client";
import { Tables } from "@/database";
import Link from "next/link";
import Review from "@/app/discover/[service]/components/Review";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ReviewsProps {
  reviews: any;
  average: number;
  totalReviewsCount: number;
  serviceId: number;
  professional: Tables<"professionals">;
  client: Tables<"clients"> | null;
}

export default function Reviews({
  reviews,
  average,
  totalReviewsCount,
  serviceId,
  professional,
  client,
}: ReviewsProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const supabase = createClient();

  const handleHover = (hoveredRating: number) => {
    setHoveredRating(hoveredRating);
  };

  const handleClick = () => {
    setRating(hoveredRating);
  };

  const handleReviewSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const title = data.title;
    const comment = data.comment;
    const { error } = await supabase.from("reviews").insert({
      title,
      comment,
      rating,
      service_id: serviceId,
      reviewee_id: professional.id,
    });
    if (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customer Reviews
          </h2>

          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIconSolid
                    key={rating}
                    className={classNames(
                      average > rating ? "text-yellow-400" : "text-gray-300",
                      "h-5 w-5 flex-shrink-0",
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              {average && <p className="sr-only">{average} out of 5 stars</p>}
            </div>
            {totalReviewsCount && (
              <p className="ml-2 text-sm text-gray-900">
                Based on {totalReviewsCount} reviews
              </p>
            )}
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-900">
              Share your thoughts
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              If you’ve benefited from these services, share your thoughts about{" "}
              {professional.first_name} {professional.last_name}.
            </p>

            <form
              onSubmit={handleReviewSubmit}
              className="mt-4 relative bg-white rounded-md overflow-hidden shadow-md border-gray-300 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500"
            >
              <label htmlFor="title" className="sr-only">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
                placeholder="Title"
              />
              <label htmlFor="comment" className="sr-only">
                Comment
              </label>
              <textarea
                rows={2}
                name="comment"
                id="comment"
                className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Write a comment..."
                defaultValue={""}
              />

              {/* Spacer element to match the height of the toolbar */}
              <div aria-hidden="true">
                <div className="py-2">
                  <div className="h-9" />
                </div>
                <div className="h-px" />
                <div className="py-2">
                  <div className="py-px">
                    <div className="h-9" />
                  </div>
                </div>
              </div>
              <div className="flex border-b items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
                <div className="flex-shrink-0">
                  {!client && (
                    <Link
                      href={"/auth/login"}
                      className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                      Sign in to submit
                    </Link>
                  )}
                  {client && (
                    <button
                      type="submit"
                      className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                      Submit
                    </button>
                  )}
                </div>
                <div className="flex-1 min-w-0 justify-self-end">
                  <div>
                    {[...Array(5)].map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        className="text-yellow-500"
                        onMouseEnter={() => handleHover(index + 1)}
                        onMouseLeave={() => handleHover(0)}
                        onClick={handleClick}
                      >
                        {index + 1 <= (hoveredRating || rating) ? (
                          <StarIconSolid
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <StarIconOutline
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <h3 className="sr-only">Recent reviews</h3>

          <div className="flow-root">
            <div className="-my-12 divide-y divide-gray-200">
              {reviews &&
                reviews.length > 0 &&
                reviews.map((review: any) => {
                  return (
                    <Review key={review.id} review={review} client={client} />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
