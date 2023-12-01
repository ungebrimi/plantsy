"use client";
import React from "react";
import Filters from "./Filters";
import { Tables } from "@/database";

const ClientPage = ({
  serverServices,
  filterOptions,
}: {
  serverServices: Tables<"services">[];
  filterOptions: any[];
}) => {
  return (
    <div>
      {/* Mobile filter dialog
            <MobileFilterDialog
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
        filterOptions={filterOptions}
      />
      */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Discover
          </h1>
          {/*}
          <ActionGroup
            setMobileFiltersOpen={setMobileFiltersOpen}
          ></ActionGroup> */}
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Discover offered services
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <Filters filterOptions={filterOptions} />

            {/*<Grid services={services} />*/}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClientPage;
