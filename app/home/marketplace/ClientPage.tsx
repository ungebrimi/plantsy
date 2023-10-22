"use client";
import React from "react";
import { useState } from "react";
import Grid from "./Grid";
import MobileFilterDialog from "./MobileFilterDialog";
import Filters from "./Filters";
import ActionGroup from "./ActionGroup";
import {Tables} from "@/database";

const ClientPage = ({
  serverServices,
  categories,
}: {
  serverServices: Tables<"services">[];
  categories: Tables<"service_categories">[];
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const [services, setServices] = useState<Tables<"services">[]>(serverServices);
  return (
    <div>
      {/* Mobile filter dialog */}
      <MobileFilterDialog
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
        categories={categories}
      />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Discover
          </h1>
          <ActionGroup
            setMobileFiltersOpen={setMobileFiltersOpen}
          ></ActionGroup>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Discover offered services
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <Filters categories={categories} />

            <Grid services={services} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClientPage;
