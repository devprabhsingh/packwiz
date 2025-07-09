"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import SearchBar from "../../components/Searchbar";

// Basic plural -> singular conversion
const simpleStem = (word) => {
  if (word.endsWith("es")) return word.slice(0, -2);
  if (word.endsWith("s")) return word.slice(0, -1);
  return word;
};

export default function SearchResultsClient({ keywordMap, products }) {
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
