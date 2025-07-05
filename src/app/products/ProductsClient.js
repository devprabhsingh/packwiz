"use client";
import React from "react";
import dynamic from "next/dynamic";
const ProductGrid = dynamic(() => import("../components/ProductGrid"));
import BackLinks from "../components/BackLinks";
import SearchBar from "../components/Searchbar";
import Head from "next/head";
import { structuredData } from "./StructuredData";

export async function getStaticProps() {
  return {
    props: {
      structuredData,
    },
  };
}

const Products = ({ structuredData }) => {
  return (
    <>
      <Head>
        <title>All Products | Packwiz</title>
        <meta
          name="description"
          content="Browse affordable packing supplies including boxes, bubble wrap, tape, and more."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <div className="mobile-search">
        <SearchBar />
      </div>
      <BackLinks title="" id="" />

      <ProductGrid />
    </>
  );
};

export default Products;
