"use client";
import React from "react";
import { products } from "@/data/numberSheet";
import Image from "next/image";
import { useRouter } from "next/navigation";

const pds = [
  { id: 0, idKey: "b", name: "Boxes", image: "/images/boxes.png" },
  {
    id: 1,
    idKey: "m",
    name: "Moving Blankets",
    image: "/images/moving_blankets.png",
  },
  {
    id: 2,
    idKey: "s",
    name: "Pallet Wrap",
    image: "/images/shrink_wrap.png",
  },
  { id: 3, idKey: "g", name: "Gloves", image: "/images/gloves.png" },
  {
    id: 4,
    idKey: "ct",
    name: "Clear/Packaging Tape",
    image: "/images/clear-tape.png",
  },
  {
    id: 5,
    idKey: "gt",
    name: "Green Painter's Tape",
    image: "/images/green-tape.png",
  },
  { id: 6, idKey: "rt", name: "Red Tuck Tape", image: "/images/red.png" },
  {
    id: 7,
    idKey: "gb",
    name: "Garbage Bags",
    image: "/images/garbage_bags.png",
  },
  { id: 8, idKey: "c", name: "Coveralls", image: "/images/coveralls.png" },
  { id: 9, idKey: "f", name: "Felt pads", image: "/images/felt_pads.png" },
  {
    id: 10,
    idKey: "n",
    name: "Newsprint Packing Paper",
    image: "/images/packing-paper.png",
  },
];

const ProductGrid = () => {
  const router = useRouter();

  return (
    <div className="product-grid-main" style={styles.maindiv}>
      <h1
        style={{
          textAlign: "center",
          width: "25%",
          fontSize: "1.9rem",
          margin: "20px auto",
        }}
      >
        Our Products
      </h1>
      <div className="product-grid">
        {pds.map((product, index) => (
          <div
            onClick={() => {
              const multiPds = [0, 3, 7, 8];

              if (multiPds.includes(product.id)) {
                router.push(`/productinfo/${index}`);
              } else {
                router.push(`/ItemDetail/${product.idKey + "01"}`);
              }
            }}
            className="product-card"
            key={product.id}
          >
            <div className="image-wrapper">
              <Image
                src={product.image}
                alt={product.name}
                width={290}
                height={290}
                loading="lazy"
              />
            </div>
            <p style={{ margin: 0 }} className="product-name">
              {product.name}
            </p>
            <p
              style={{
                backgroundColor: "#ff6f20",
                color: "white",
                fontWeight: "bold",
                margin: "10px",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              Shop
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  maindiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingBottom: "30px",
    margin: "8px",
    borderRadius: "8px",
  },
};
export default ProductGrid;
