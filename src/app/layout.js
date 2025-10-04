"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
  display: "swap",
});

const GA_MEASUREMENT_ID = "G-X5EC4D35N3";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
