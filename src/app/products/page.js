"use client";
import React from "react";
import dynamic from "next/dynamic";
const ProductGrid = dynamic(() => import("../components/ProductGrid"));
import BackLinks from "../components/BackLinks";
import SearchBar from "../components/Searchbar";

export const metadata = {
  title: "Shop All Packing Products - Packwiz",
  description:
    "Explore our full range of packing products, including moving boxes, bubble wrap, tape dispensers, and more. Find the perfect packing solution.",
};

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
