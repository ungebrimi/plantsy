export const dynamic = "force-dynamic"
import React from "react";
import Footer from "../layout/Footer";
import "../globals.css";
import ServerNav from "../layout/ServerNav";
export const metadata = {
  title: "Plantsy",
  description: "Discover jobs",
};

export default async function Layout({
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
