import React from "react";
import ContactSection from "../../components/ContactSection";

export const metadata = {
  title: "Contact Us | Packwiz - Packing & Moving Supplies Canada",

  description:
    "Have questions about Packwiz's packing supplies, an order, or need assistance? Contact our team for quick support via form, email, or phone. We're here to help!",

  openGraph: {
    title: "Get in Touch with Packwiz - Customer Support & Inquiries", // More specific OG title
    description:
      "Reach out to Packwiz for any questions regarding our boxes, wraps, or moving supplies. Fast and friendly customer service across Canada.", // More specific OG description
    url: "https://www.packwiz.ca/contact", // Absolute URL for the contact page
    siteName: "Packwiz", // Re-using siteName for clarity
    type: "website",
    images: [
      {
        url: "https://www.packwiz.ca/images/social-share.webp", // Can reuse your general social share image, or create a specific 'contact' one if desired
        width: 1200,
        height: 630,
        alt: "Contact Packwiz for Packing Supplies", // Alt text for the image
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Packwiz - Expert Packing Supply Support",
    description:
      "Need help with your packing supply order or have questions about boxes and wraps? Contact Packwiz's dedicated team in Canada.",
    images: ["https://www.packwiz.ca/images/social-share.webp"], // Reuse or specify new Twitter image
  },

  alternates: {
    canonical: "/contact",
  },
};

const Contact = () => {
  return <ContactSection />;
};

export default Contact;
