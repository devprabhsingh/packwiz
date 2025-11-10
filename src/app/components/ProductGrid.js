"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getStartingPrice } from "@/utils/getStartingPrice";
import styles from "./productgrid.module.css";
import { slugify } from "@/utils/slugify";
import pds from "@/data/pds";
const ProductGrid = React.memo(() => {
  const router = useRouter();

  const multiPds = useMemo(
    () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 13, 14, 15],
    []
  );

  const handleClick = useCallback(
    (product) => {
      // Generate a slug from the product's name
      const productSlug = slugify(product.name);

      if (product.id >= 15) {
        router.push(`/moving-kits/${productSlug}`);
      } else if (multiPds.includes(product.id)) {
        router.push(`/product-info/${productSlug}`);
      } else {
        router.push(`/item-details/${productSlug}`);
      }
    },
    [router, multiPds]
  );

  return (
    <div id="productGrid" className={styles.maindiv}>
      <h1 className={styles.heading}>{"Our Products"}</h1>
      <div className={styles.productGrid}>
        {pds?.map((product, index) => (
          <React.Fragment key={product.id}>
            <div
              onClick={() => handleClick(product)}
              className={styles.productCard}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={product.image}
                  alt={product.alt}
                  width={290}
                  height={290}
                  className={styles.itemImg}
                  placeholder="empty"
                  priority={index === 0}
                />
              </div>
              <p className={styles.productName}>{product.name}</p>

              {product.id < 15 && (
                <p className={styles.priceText}>
                  As low as ${getStartingPrice(product.id)}
                </p>
              )}

              <p className={styles.shopButton}>Shop</p>
            </div>

            {product.name === "Mattress Bags" && (
              <h2 className={styles.subHeadline}>Explore Our Packing Kits</h2>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});

ProductGrid.displayName = "ProductGrid";
export default ProductGrid;
