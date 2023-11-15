import React, { useEffect, useState } from "react";
import Image from "next/image";
import { StarIcon as StarIconSolid } from "@heroicons/react/20/solid";
import { createClient } from "@/app/utils/supabase/client";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Review({ review, client }: any) {
  const [reviewer, setReviewer] = useState<any>(null);
  const [profilePicture, setProfilePicture] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    async function getReviewer() {
      const { data: reviewer, error } = await supabase
        .from("clients")
        .select()
        .eq("id", client.id)
        .single();
      if (error) {
        console.log(error);
      }
      return reviewer;
    }

    if (review) {
      getReviewer().then((reviewer) => {
        setReviewer(reviewer);
        if (reviewer.profile_picture) {
          setProfilePicture(JSON.parse(reviewer.profile_picture));
        }
      });
    }
  }, [review, supabase]);

  return (
    <div key={review.id} className="py-12">
      <div className="flex items-center">
        {profilePicture && (
          <Image
            width={300}
            height={300}
            src={profilePicture.url}
            alt={`${reviewer.first_name + reviewer.last_name}.`}
            className="h-12 w-12 rounded-full"
          />
        )}
        <div className="ml-4">
          <h4 className="text-sm font-bold text-gray-900">
            {reviewer && reviewer.first_name + " " + reviewer.last_name}
          </h4>
          <div className="mt-1 flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIconSolid
                key={rating}
                className={classNames(
                  review.rating > rating ? "text-yellow-400" : "text-gray-300",
                  "h-5 w-5 flex-shrink-0",
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="sr-only">{review.rating} out of 5 stars</p>
        </div>
      </div>

      <p className="mt-4 space-y-6 text-base italic text-gray-600">
        {review.comment}
      </p>
    </div>
  );
}

export default Review;
