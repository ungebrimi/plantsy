import React from "react";
import "@/app/globals.css";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
