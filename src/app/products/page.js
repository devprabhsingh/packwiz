"use client";
import React from "react";
import dynamic from "next/dynamic";
const ProductGrid = dynamic(() => import("../components/ProductGrid"));
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
