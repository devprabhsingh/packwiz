import dynamic from "next/dynamic";
import FirstSection from "../components/FirstSection";
import SearchBar from "../components/Searchbar";
import pds from "@/data/pds";
// Dynamic imports remain the same
const ProductGrid = dynamic(() => import("../components/ProductGrid"), {
  loading: () => <p>Loading...</p>,
});
const AboutSection = dynamic(() => import("../components/AboutSection"), {
  loading: () => <p>Loading...</p>,
});
const ContactSection = dynamic(() => import("../components/ContactSection"), {
  loading: () => <p>Loading...</p>,
});
const ReviewSection = dynamic(() => import("../components/ReviewSection"), {
  loading: () => <p>Loading...</p>,
});
const LazyExtras = dynamic(() => import("../components/LazyExtras"), {
  loading: () => <></>,
});

export const metadata = {
  title: "Packwiz - Packing Supplies with Free GTA Delivery",
  description:
    "Looking for packing supplies in Toronto? Get low-cost bubble wrap, boxes, tape, and kits with free GTA delivery. Smooth, stress-free moves start here.",
  robots: "index, follow",
};

export default function HomePage() {
  // Define your structured data as JavaScript objects
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Packwiz",
    image: "https://www.packwiz.ca/images/logo.webp", // Use full absolute URL
    url: "https://www.packwiz.ca", // Use full absolute URL
    telephone: "+1-437-775-7688",
    address: {
      "@type": "PostalAddress",
      streetAddress: "571 Fenmar Drive",
      addressLocality: "Brampton",
      addressRegion: "ON",
      postalCode: "M9L 2R6",
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
          text: "We provide free delivery on packing supplies across the Greater Toronto Area, including Brampton, Mississauga, Scarborough, Etobicoke, and North York, for orders over $50.",
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
        key="local-business-schema" // Recommended for unique scripts
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        key="faq-schema" // Recommended for unique scripts
      />

      {/* Your page content */}
      <div style={styles.maindiv}>
        <div className="mobile-search">
          <SearchBar />
        </div>
        <FirstSection />
        <ProductGrid pds={pds} />
        <AboutSection />
        <ReviewSection />
        <ContactSection />
        <LazyExtras />
      </div>
    </>
  );
}

const styles = {};
