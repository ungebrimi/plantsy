import "./globals.css";
import React from "react";

export const metadata = {
  title: "Plantsy",
  description: "Your green fingered friends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-neutral-50">
      <body className="h-full">{children}</body>
    </html>
  );
}
