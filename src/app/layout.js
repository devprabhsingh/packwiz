import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Packwiz | Corrugated Boxes, Tapes, & Packing Supplies in Canada",
  description:
    "Packwiz offers high-quality corrugated boxes, packing tapes, moving blankets, stretch wrap, gloves, and essential packing supplies. Fast shipping across Canada!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={` ${inter.variable}`}>
      <body>
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
