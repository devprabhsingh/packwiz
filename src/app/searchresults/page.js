import { Suspense } from "react";
import SearchResultsClient from "./SearchResultsClient";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams; // Await searchParams
  const searchQuery = params.page || "all products";

  return {
    title: `Search Results for "${searchQuery}" | Packwiz`,
    description: `Find all packing and moving supplies related to "${searchQuery}" at Packwiz. Explore our extensive catalog for your needs.`,
    // You can add more meta tags here, e.g., Open Graph for sharing
    openGraph: {
      title: `Search Results for "${searchQuery}" | Packwiz`,
      description: `Find all packing and moving supplies related to "${searchQuery}" at Packwiz.`,
      url: `https://packwiz.com/search?page=${encodeURIComponent(searchQuery)}`, // Canonical URL for sharing
      // images: ['/images/packwiz-search-og.png'], // Optional: a generic image for search results shares
    },
  };
}
export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchResultsClient />
    </Suspense>
  );
}
