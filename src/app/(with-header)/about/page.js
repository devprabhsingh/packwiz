import React from "react";
import AboutSection from "@/app/components/AboutSection";

export const metadata = {
  title: "About Packwiz - Your Trusted Packing Supplier",
  description:
    "Learn more about Packwiz, our commitment to quality packing supplies, and our mission to simplify your moving and shipping needs.",
  alternates: {
    canonical: "/about",
  },
};

const About = () => {
  return <AboutSection />;
};

export default About;
