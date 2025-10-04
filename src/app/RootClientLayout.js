"use client";
import dynamic from "next/dynamic";
import { CartProvider } from "./context/CartContext";
import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const DynamicAnalytics = dynamic(
  () => import("@vercel/analytics/next").then((mod) => mod.Analytics),
  { ssr: false }
);

const GA_MEASUREMENT_ID = "G-X5EC4D35N3";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics-script"
        strategy="lazyOnload"
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
        <DynamicAnalytics />
      </CartProvider>
    </>
  );
}
