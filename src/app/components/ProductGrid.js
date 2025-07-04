"use client";
import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getStartingPrice } from "@/utils";
import { pds } from "@/data/numberSheet";

const ProductGrid = React.memo(({ title }) => {
  const router = useRouter();

  const multiPds = useMemo(() => [0, 3, 7, 8, 12], []);

  const handleClick = useCallback(
    (product, index) => {
      if (product.name === "Bubble Cushion Wrap") {
        if (multiPds.includes(product.id)) {
          router.push(`/productinfo/${index}`);
        } else {
          router.push(`/ItemDetail/${product.idKey}01`);
        }
      } else {
        if (product.id >= 12) {
          router.push(`/movingKits/${product.idKey}`);
        } else {
          if (multiPds.includes(product.id)) {
            router.push(`/productinfo/${index}`);
          } else {
            router.push(`/ItemDetail/${product.idKey}01`);
          }
        }
      }
    },
    [router, multiPds]
  );

  return (
    <div id="product-grid" className="product-grid-main" style={styles.maindiv}>
      <h2 style={styles.heading}>{title || "Our Products"}</h2>
      <div className="product-grid">
        {pds.map((product, index) => (
          <React.Fragment key={product.id}>
            <div
              onClick={() => handleClick(product, index)}
              className="product-card"
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
              <p style={styles.productName} className="product-name">
                {product.name}
              </p>

              {product.id < 12 && (
                <p style={styles.priceText}>
                  As low as ${getStartingPrice(product.id)}
                </p>
              )}

              <p style={styles.shopButton}>Shop</p>
            </div>

            {product.name === "Bubble Cushion Wrap" && (
              <h2 style={styles.subHeadline}>Explore Our Packing Kits</h2>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});

const styles = {
  maindiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingBottom: "30px",
    margin: "5px",
    borderRadius: "8px",
  },
  heading: {
    textAlign: "center",
    width: "25%",
    fontSize: "1.9rem",
    margin: "20px auto",
  },
  productName: {
    margin: 0,
  },
  priceText: {
    margin: 0,
    color: "#333",
    fontStyle: "italic",
    fontSize: "12px",
  },
  shopButton: {
    backgroundColor: "#ff6f20",
    color: "white",
    fontWeight: "bold",
    margin: "10px",
    padding: "10px",
    borderRadius: "8px",
  },
  subHeadline: {
    gridColumn: "1 / -1",
    textAlign: "center",
    margin: "30px 0 10px",
    fontSize: "1.5rem",
  },
};

ProductGrid.displayName = "ProductGrid";
export default ProductGrid;
