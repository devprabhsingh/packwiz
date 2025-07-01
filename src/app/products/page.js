import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export const metadata = {
  title: "Shop All Packing Products - Packwiz",
  description:
    "Explore our full range of packing products, including moving boxes, bubble wrap, tape dispensers, and more. Find the perfect packing solution.",
};

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <ProductsClient />
    </Suspense>
  );
}
