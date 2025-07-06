"use client";

import { useSearchParams } from "next/navigation";
import { products } from "@/data/numberSheet";
import { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import SearchBar from "../../components/Searchbar";

// Basic plural -> singular conversion
const simpleStem = (word) => {
  if (word.endsWith("es")) return word.slice(0, -2);
  if (word.endsWith("s")) return word.slice(0, -1);
  return word;
};

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

export default function SearchResultsClient() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const page = searchParams.get("page") || "";
    setQuery(page);
  }, [searchParams]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const allProducts = products.flat();

    const tokens = query
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)
      .map(simpleStem);

    let matched = [];

    // Check if tokens match any keywordMap category
    for (const [category, keywords] of Object.entries(keywordMap)) {
      if (
        tokens.some((token) =>
          keywords.some((k) => k.includes(token) || token.includes(k))
        )
      ) {
        matched = allProducts.filter((product) =>
          (product.title + product.desc + product.size)
            .toLowerCase()
            .includes(category)
        );

        // Fallback: if category name doesn't exist in title/desc, match manually
        if (matched.length === 0) {
          matched = allProducts.filter(
            (product) =>
              product.title?.toLowerCase().includes(category) ||
              product.desc?.toLowerCase().includes(category)
          );
        }

        // Break on first match
        if (matched.length > 0) break;
      }
    }

    // If no match via keywordMap, do fallback to default token-based match
    if (
      matched.length === 0 &&
      (tokens.length >= 3 || tokens.some((w) => w.length >= 3))
    ) {
      matched = allProducts.filter((product) => {
        const combined =
          `${product.title || ""} ${product.desc || ""} ${product.size || ""}`.toLowerCase();
        return tokens.some((token) => combined.includes(token));
      });
    }

    setResults(matched);
  }, [query]);

  return (
    <div>
      <div className="searchbarbox">
        <SearchBar />
      </div>

      <h1 className="search-results-title">
        Search Results for:{" "}
        <span
          style={{
            color: "#ff6f20",
          }}
        >
          {query}
        </span>
      </h1>

      {results.length === 0 ? (
        <p style={{ textAlign: "center" }}>No products found.</p>
      ) : (
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            margin: "8px",
          }}
        >
          <ProductList productCat="search" productList={results} />
        </div>
      )}
    </div>
  );
}
