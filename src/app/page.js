import HomeClient from "./HomeClient";

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
  metadataBase: new URL("https://www.packwiz.ca"),
  alternates: {
    canonical: "/",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Packwiz",
  image: "https://www.packwiz.ca/images/logo.webp",
  url: "https://www.packwiz.ca",
  telephone: "+1-437-775-7688",
  address: {
    "@type": "PostalAddress",
    streetAddress: "64 Caranci Crescent",
    addressLocality: "Brampton",
    addressRegion: "ON",
    postalCode: "L6P 1H1",
    addressCountry: "CA",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  sameAs: [
    "https://www.instagram.com/pack_wiz",
    "https://www.facebook.com/profile.php?id=61577687830138",
  ],
  description:
    "Packwiz is a Canadian supplier of affordable packing and moving supplies with fast GTA delivery.",
  priceRange: "$",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you ship packing supplies across Canada?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer fast and reliable shipping to all provinces and major cities across Canada, including Toronto, Vancouver, Montreal, and more.",
      },
    },
    {
      "@type": "Question",
      name: "What's included in your packing kits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our packing kits typically include boxes, bubble wrap, tape, labels, and other essentials to simplify your move or storage.",
      },
    },
    {
      "@type": "Question",
      name: "Are your stretch wraps and tapes industrial-grade?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! Our stretch wraps, clear tapes, and tuck tapes are industrial-grade, strong, and perfect for both home and commercial use.",
      },
    },
    {
      "@type": "Question",
      name: "Can I place bulk or wholesale orders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we welcome bulk and wholesale orders. Please contact us directly for discounted rates on large quantities.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer eco-friendly packing materials?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer eco-conscious options like recyclable newsprint packing paper and durable supplies that can be reused multiple times.",
      },
    },
    {
      "@type": "Question",
      name: "Where do you offer free delivery in the GTA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide free delivery on packing supplies across the Greater Toronto Area for orders over $100.",
      },
    },
    {
      "@type": "Question",
      name: "What size moving boxes do you sell?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer a range of moving box sizes including small, medium, large, and wardrobe boxes to suit apartments, condos, and houses of all sizes.",
      },
    },
    {
      "@type": "Question",
      name: "Do you supply packing materials for businesses or restoration companies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we work with restoration companies and businesses across Toronto and the GTA, offering reliable packing materials, fast service, and bulk pricing options.",
      },
    },
  ],
};

function SchemaScripts() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

export default function Page() {
  return (
    <>
      <SchemaScripts />
      <HomeClient />
    </>
  );
}
