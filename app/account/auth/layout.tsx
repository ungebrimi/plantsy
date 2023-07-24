import Footer from "../../layout/Footer";
import Navigation from "../../layout/Navigation";
import "../../globals.css";

export const metadata = {
  title: "Plantsy",
  description: "Discover jobs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
