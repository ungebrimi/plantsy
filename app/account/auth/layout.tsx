export const dynamic = "force-dynamic";
import Footer from "@/app/layout/Footer";
import "@/app/globals.css";
import Navbar from "@/app/layout/Navbar";

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
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
