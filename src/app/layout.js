import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

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
    url: "https://www.packwiz.ca", // This is fine as it's your preferred URL for Open Graph
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

  metadataBase: new URL("https://www.packwiz.ca"),
  alternates: {
    canonical: "/",
  },
};
const GA_MEASUREMENT_ID = "G-X5EC4D35N3";

export default function RootLayout({ children }) {
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
          {children}
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
