import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import LazyExtras from "./components/LazyExtras";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Packwiz | Boxes, Wraps & Packing Supplies Canada",
  description:
    "Packwiz offers high-quality corrugated boxes, packing tapes, moving blankets, stretch wrap, gloves, and essential packing supplies. Fast shipping across Canada!",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    title: "Packwiz",
  },
  openGraph: {
    title: "Buy Packing Supplies at Lowest Prices!",
    description:
      "Get high-quality bubble wrap, stretch film, boxes, and more at unbeatable rates. Shop now!",
    url: "https://www.packwiz.ca",
    type: "website",
    images: [
      {
        url: "https://www.packwiz.ca/images/social-share.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Packing Supplies at Lowest Prices!",
    description:
      "Get high-quality bubble wrap, stretch film, boxes, and more at unbeatable rates. Shop now!",
    images: ["https://www.packwiz.ca/images/social-share.webp"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-X5EC4D35N3"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X5EC4D35N3', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <LazyExtras />
          <Footer />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
