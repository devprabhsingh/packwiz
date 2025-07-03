import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next";
import ServiceLocations from "./components/ServiceLocations";
import FAQ from "./components/FAQ";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Packwiz | Boxes, Wraps & Packing Supplies Canada",
  description:
    "Packwiz offers high-quality corrugated boxes, packing tapes, moving blankets, stretch wrap, gloves, and essential packing supplies. Fast shipping across Canada!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={` ${inter.variable}`}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Packwiz" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/favicon-48x48.png"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>

      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <FAQ />
          <ServiceLocations />
          <Footer />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
