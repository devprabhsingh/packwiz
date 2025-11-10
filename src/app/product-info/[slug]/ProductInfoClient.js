// app/product-info/ProductInfoClient.js
"use client";

import React from "react";
import dynamic from "next/dynamic";
import BackLinks from "@/app/components/BackLinks";
import SearchBar from "@/app/components/Searchbar";

const ProductList = dynamic(() => import("../../components/ProductList"));

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

  return (
    <div style={styles.maindiv}>
      <div style={styles.boxesdiv}>
        <div className="mobile-search">
          <SearchBar />
        </div>
        <BackLinks title={productCat.title} />
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
          <h3
            style={{
              fontStyle: "italic",
              color: "#ff6f20",
            }}
          >
            {productCat.subtitle}
          </h3>
        </div>
        <p style={styles.pInfo}>{productCat.info}</p>
        <ProductList productList={productData} />
      </div>
    </div>
  );
};

const styles = {
  maindiv: {},
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
    margin: "15px auto",
    backgroundColor: "#e9e9e9ff",
    borderRadius: "5px",
    padding: "10px",
  },
};

export default ProductInfoClient;
