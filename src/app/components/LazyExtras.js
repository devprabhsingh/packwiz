"use client";

import dynamic from "next/dynamic";

const FAQ = dynamic(() => import("./FAQ"), { ssr: false });
const ServiceLocations = dynamic(() => import("./ServiceLocations"), {
  ssr: false,
});

export default function LazyExtras() {
  return (
    <>
      <FAQ />
      <ServiceLocations />
    </>
  );
}
