import "./globals.css";
import React from "react";
import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";
import { NotificationProvider } from "@/context/NotificationContext";
import ErrorNotifications from "@/app/components/layout/ErrorNotifications";

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
        <NotificationProvider>
          <main className="">{children}</main>
          <ErrorNotifications />
        </NotificationProvider>
        <Footer />
      </body>
    </html>
  );
}
