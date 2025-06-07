"use client";
import React from "react";
import ProductGrid from "../components/ProductGrid";
import BackLinks from "../components/BackLinks";
import SearchBar from "../components/Searchbar";
const Products = () => {
  return (
    <>
      <div className="mobile-search">
        <SearchBar />
      </div>
      <BackLinks title="" id="" />

      <ProductGrid />
    </>
  );
};

export default Products;
