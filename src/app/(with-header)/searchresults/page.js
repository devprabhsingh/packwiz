import { Suspense } from "react";
import SearchResultsClient from "./SearchResultsClient";
import products from "@/data/products";

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
    },
  };
}
const keywordMap = {
  "moving blankets": [
    "moving blankets",
    "furniture blankets",
    "padded blankets",
    "protective blankets",
    "quilted blankets",
    "moving pads",
    "thick blankets",
    "moving pad",
  ],
  coveralls: [
    "coveralls",
    "disposable coveralls",
    "waterproof coveralls",
    "dustproof coveralls",
    "protective suits",
    "painting coveralls",
    "work coveralls",
  ],
  tapes: [
    "tape",
    "packing tape",
    "clear tape",
    "duct tape",
    "painter's tape",
    "red tape",
    "green tape",
    "adhesive tape",
    "moving tape",
  ],
  "stretch wrap": [
    "stretch wrap",
    "shrink wrap",
    "pallet wrap",
    "plastic wrap",
    "cling wrap",
    "moving wrap",
    "hand wrap",
  ],
  boxes: [
    "boxes",
    "moving boxes",
    "cardboard boxes",
    "1 cube",
    "1.5 cube",
    "2 cube",
    "wardrobe box",
    "small box",
    "large box",
  ],
  gloves: [
    "gloves",
    "work gloves",
    "packing gloves",
    "protective gloves",
    "rubber gloves",
    "disposable gloves",
  ],
  "newsprint paper": [
    "newsprint",
    "packing paper",
    "wrapping paper",
    "paper sheets",
    "moving paper",
  ],
  "moving kits": [
    "moving kits",
    "packing kits",
    "home moving kit",
    "box set",
    "moving supplies",
  ],
  "garbage bags": [
    "garbage bags",
    "trash bags",
    "black garbage bags",
    "contractor bags",
  ],
  "clear bags": [
    "clear bags",
    "transparent bags",
    "see through bags",
    "clear garbage bags",
  ],
  "felt pads": [
    "felt pads",
    "furniture pads",
    "chair leg pads",
    "floor protector pads",
  ],
};
export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchResultsClient products={products} keywordMap={keywordMap} />
    </Suspense>
  );
}
