import "./globals.css";
import React from "react";
import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";

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
    <html lang="en" className="h-full bg-white">
      <body className="h-full">
        <Header />
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
