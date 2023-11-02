export const dynamic = "force-dynamic"
import React from "react";
import Footer from "@/app/layout/Footer";
import "@/app/globals.css";
import ServerNav from "@/app/layout/ServerNav";

export const metadata = {
  title: "Plantsy",
  description: "Discover jobs",
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServerNav />
      {children}
      <Footer />
    </>
  );
}
