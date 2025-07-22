// app/products/[id]/ProductInfoClient.js
"use client";

import React from "react";
import dynamic from "next/dynamic";
import BackLinks from "@/app/components/BackLinks";
import SearchBar from "@/app/components/Searchbar";

const ProductList = dynamic(() => import("../../../components/ProductList"));

const ProductInfoClient = ({ productData, productCat }) => {
  if (!productCat || !productData) {
    return (
      <div style={styles.maindiv}>
        <div style={styles.boxesdiv}>
          <p>Product information not available.</p>
        </div>
      </div>
    );
  }

  const productList1 = productData; // Assuming productData is the list you want to pass to ProductList

  return (
    <div style={styles.maindiv}>
      <div style={styles.boxesdiv}>
        <div className="mobile-search">
          <SearchBar />
        </div>
        {/* Pass productCat.id for BackLinks if needed, or get it from props */}
        <BackLinks title={productCat.title} id={productCat.id} />
        <div className="title-box" style={styles.titlebox}>
          <h1
            style={{
              backgroundColor: "rgba(255,255,255,0.8)",
              margin: 0,
              padding: "10px",
            }}
          >
            {productCat.title}
          </h1>
          <h3 style={{ fontStyle: "italic", color: "#ff6f20", margin: "10px" }}>
            {productCat.subtitle}
          </h3>
          <p style={styles.pInfo}>{productCat.info}</p>
        </div>
        <ProductList productList={productList1} />
      </div>
    </div>
  );
};

const styles = {
  boxesdiv: {
    backgroundColor: "white",
  },
  titlebox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  pInfo: {
    color: "#000000bc",
    textAlign: "center",
    width: "80%",
    margin: "10px auto",
    backgroundColor: "#e9e9e9ff",
    borderRadius: "5px",
    padding: "10px",
  },
};

export default ProductInfoClient;
