"use client";
import React from "react";
import { products, categories } from "@/data/numberSheet";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
const ProductList = dynamic(() => import("../../components/ProductList"));
import BackLinks from "@/app/components/BackLinks";
import SearchBar from "@/app/components/Searchbar";
let productCat = "";
let productList1 = "";

const ProductInfo = () => {
  const { id } = useParams();

  productList1 = products[id];

  productCat = categories[id];

  return (
    <div style={styles.maindiv}>
      <div style={styles.boxesdiv}>
        <div className="mobile-search">
          <SearchBar />
        </div>
        <BackLinks title={productCat.title} id={id} />
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
};

export default ProductInfo;
