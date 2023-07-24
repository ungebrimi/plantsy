export const dynamic = "force-dynamic";

import Footer from "../layout/Footer";
import "../globals.css";
import Navbar from "../layout/Navbar";
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
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
