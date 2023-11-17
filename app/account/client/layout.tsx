export const dynamic = "force-dynamic";
import React from "react";
import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";

export default async function ProfessionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="py-10">
        <Header />
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        <Footer />
      </main>
    </>
  );
}
