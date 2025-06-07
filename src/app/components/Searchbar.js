"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    let value = e.target.value.slice(0, 50); // max 50 characters
    setQuery(value);
  };

  const hasAlphabet = (text) => {
    return /[a-zA-Z]/.test(text);
  };

  const handleSearch = () => {
    if (!hasAlphabet(query)) {
      alert("Please enter at least one alphabet character in search.");
      return;
    }

    const encodedQuery = encodeURIComponent(query.trim());
    router.push(`/searchresults?page=${encodedQuery}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="searchBox">
      <input
        type="text"
        placeholder="Search tapes, wraps, boxes..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>
        <Search size={20} />
      </button>
    </div>
  );
}
