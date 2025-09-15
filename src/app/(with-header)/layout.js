"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function WithHeaderLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // This will run on every page change
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
