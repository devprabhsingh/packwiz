"use client";

import { useSearchParams } from "next/navigation";
import { products } from "@/data/numberSheet";
import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import BackLinks from "../components/BackLinks";

// Basic plural -> singular conversion
const simpleStem = (word) => {
  if (word.endsWith("es")) return word.slice(0, -2);
  if (word.endsWith("s")) return word.slice(0, -1);
  return word;
};

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Set query from URL param
  useEffect(() => {
    const page = searchParams.get("page") || "";
    setQuery(page);
  }, [searchParams]);

  // Run search based on query changes
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const allProducts = products.flat();

    // Normalize and tokenize input
    const tokens = query
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)
      .map(simpleStem); // handle plurals

    // Trigger search if:
    // - 3 or more words
    // - or a single meaningful word is entered (3+ letters)
    if (tokens.length >= 3 || tokens.some((word) => word.length >= 3)) {
      const matched = allProducts.filter((product) => {
        const combined =
          `${product.title || ""} ${product.desc || ""} ${product.size || ""}`.toLowerCase();
        return tokens.some((token) => combined.includes(token));
      });

      setResults(matched);
    } else {
      setResults([]); // clear if too few words or too short
    }
  }, [query]);

  return (
    <div style={{ padding: "10px" }}>
      <BackLinks />
      <h1 className="search-results-title">
        Search Results for:{" "}
        <span
          style={{
            color: "#ff6f20",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "5px",
          }}
        >
          {query}
        </span>
      </h1>

      {results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ProductList productCat="fdf" productList={results} />
      )}
    </div>
  );
}
