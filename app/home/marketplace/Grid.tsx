import Link from "next/link";
import React from "react";

function Grid({ services }: any) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8">
      {services.map((service: any) => {
        const thumbnail = JSON.parse(service.thumbnail);
        return (
          <Link
            key={service.id}
            href={`/home/marketplace/${service.id}`}
            className="group text-sm"
          >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
              <img
                src={thumbnail.url}
                alt={service.imageAlt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <h3 className="mt-4 font-medium text-gray-900">{service.title}</h3>
            <p className="italic text-gray-500">
              {service.city} in {service.county}
            </p>
            <p className="mt-2 font-medium text-gray-900">{service.price} $</p>
          </Link>
        );
      })}
    </div>
  );
}

export default Grid;
