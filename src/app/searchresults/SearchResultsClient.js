"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react"; // Added useCallback
import ProductList from "../components/ProductList";
import SearchBar from "../components/Searchbar";

// Basic plural -> singular conversion
const simpleStem = (word) => {
  if (word.length <= 2) return word; // Don't stem very short words
  if (word.endsWith("ies")) return word.slice(0, -3) + "y"; // candies -> candy
  if (word.endsWith("es")) return word.slice(0, -2); // boxes -> box
  if (word.endsWith("s")) return word.slice(0, -1); // apples -> apple
  return word;
};

export default function SearchResultsClient({ keywordMap, products }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Function to calculate a relevance score for a product
  const calculateScore = useCallback(
    (product, tokens, categoryMatch = false) => {
      let score = 0;
      const combined =
        `${product.title || ""} ${product.desc || ""} ${product.size || ""}`.toLowerCase();

      // Boost score for direct category matches from keywordMap
      if (categoryMatch) {
        score += 50; // Significant boost for category matches
      }

      tokens.forEach((token) => {
        // Exact word match in title (highest priority)
        if (
          product.title?.toLowerCase().includes(` ${token} `) ||
          product.title?.toLowerCase().startsWith(`${token} `) ||
          product.title?.toLowerCase().endsWith(` ${token}`)
        ) {
          score += 20;
        }
        // Exact word match in description or size
        else if (
          product.desc?.toLowerCase().includes(` ${token} `) ||
          product.desc?.toLowerCase().startsWith(`${token} `) ||
          product.desc?.toLowerCase().endsWith(` ${token}`)
        ) {
          score += 10;
        } else if (
          product.size?.toLowerCase().includes(` ${token} `) ||
          product.size?.toLowerCase().startsWith(`${token} `) ||
          product.size?.toLowerCase().endsWith(` ${token}`)
        ) {
          score += 8;
        }
        // Partial match anywhere (lower priority)
        else if (combined.includes(token)) {
          score += 5;
        }
      });

      return score;
    },
    []
  ); // Memoize the function

  useEffect(() => {
    const page = searchParams.get("page") || "";
    setQuery(page);
  }, [searchParams]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const allProducts = products.flat(); // Ensure products is a flat array

    const tokens = query
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)
      .map(simpleStem);

    let scoredMatches = [];

    // --- Phase 1: Check if tokens match any keywordMap category ---
    let categoryMatchedOnce = false;
    for (const [category, keywords] of Object.entries(keywordMap)) {
      if (
        tokens.some((token) =>
          keywords.some(
            (k) =>
              k.includes(token) ||
              token.includes(k) ||
              simpleStem(k).includes(token)
          )
        )
      ) {
        // Find products whose title/desc/size contains the category name or a stemmed version of it
        const categorySpecificProducts = allProducts.filter((product) => {
          const productText = (
            product.title +
            product.desc +
            product.size
          ).toLowerCase();
          return (
            productText.includes(category) ||
            productText.includes(simpleStem(category))
          );
        });

        if (categorySpecificProducts.length > 0) {
          categoryMatchedOnce = true;
          categorySpecificProducts.forEach((product) => {
            const score = calculateScore(product, tokens, true); // True for category match boost
            scoredMatches.push({ product, score });
          });
        }
      }
    }

    // --- Phase 2: If no category match, or to supplement category matches,
    //             do a broader token-based match on all products ---
    // This ensures we catch products that might be relevant but weren't strictly
    // associated with a keywordMap category in their title/desc.
    if (scoredMatches.length === 0 || !categoryMatchedOnce) {
      // Only do this if no category match found, or if we want to broaden the search
      allProducts.forEach((product) => {
        const score = calculateScore(product, tokens);
        if (score > 0) {
          // Only add if there's at least some match
          // Check if this product was already added via a category match to avoid duplicates
          const exists = scoredMatches.some(
            (item) => item.product.id === product.id
          );
          if (!exists) {
            scoredMatches.push({ product, score });
          } else {
            // If it exists, update its score if the new score is higher
            const existingItem = scoredMatches.find(
              (item) => item.product.id === product.id
            );
            if (existingItem && score > existingItem.score) {
              existingItem.score = score;
            }
          }
        }
      });
    }

    // Sort results by score in descending order
    scoredMatches.sort((a, b) => b.score - a.score);

    // Remove duplicates based on product ID, keeping the one with the higher score
    const uniqueResultsMap = new Map();
    scoredMatches.forEach((item) => {
      if (
        !uniqueResultsMap.has(item.product.id) ||
        item.score > uniqueResultsMap.get(item.product.id).score
      ) {
        uniqueResultsMap.set(item.product.id, item);
      }
    });

    setResults(
      Array.from(uniqueResultsMap.values()).map((item) => item.product)
    );
  }, [query, products, keywordMap, calculateScore]); // Add calculateScore to dependencies

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
        <div style={styles.noItems}>
          <p style={{ textAlign: "center", margin: "20px" }}>
            No products found.
          </p>
          <a href="/products" style={styles.aboutButton}>
            Browse Products
          </a>
        </div>
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

const styles = {
  noItems: {
    backgroundColor: "white",
    borderRadius: "8px",
    minHeight: "30vh",
    width: "auto",
    margin: "5px 5px 0 5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  aboutButton: {
    display: "inline-block",
    width: "fit-content", // CSS 'inline-block'
    backgroundColor: "#ff6600", // CSS 'background-color'
    color: "#fff", // CSS 'color'
    padding: "12px 24px", // CSS 'padding'
    borderRadius: "6px", // CSS 'border-radius'
    fontWeight: "bold", // CSS 'font-weight'
    margin: "10px", // CSS 'margin'
    textDecoration: "none", // CSS 'text-decoration'
    transition: "background-color 0.3s ease", // CSS 'transition'
  },
  aboutButtonHover: {
    // For the :hover effect, handled separately
    backgroundColor: "#e05600",
  },
};
