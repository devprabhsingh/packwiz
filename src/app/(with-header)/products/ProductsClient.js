"use client";

import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

import BackLinks from "../../components/BackLinks";
import SearchBar from "../../components/Searchbar";

const ProductGrid = dynamic(() => import("../../components/ProductGrid"));

// Import your products data (adjust path as needed)
import { products } from "@/data/numberSheet";

export async function getStaticProps() {
  // Generate structured data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": products.flat().map((product) => ({
      "@type": "Product",
      name: product.title,
      image: [`https://packwiz.ca${product.image}`],
      description: product.desc,
      sku: product.id,
      brand: {
        "@type": "Brand",
        name: "Packwiz",
      },
      offers: {
        "@type": "Offer",
        url: product.id.startsWith("pk")
          ? `https://packwiz.ca/movingKits/${product.id}`
          : `https://packwiz.ca/ItemDetail/${product.id}`,
        priceCurrency: "CAD",
        price: product.id.startsWith("pk")
          ? product.price
          : product.priceTable.tier4,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    })),
  };

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
