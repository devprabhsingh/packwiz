"use client";
import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getStartingPrice } from "@/utils/getStartingPrice";
import styles from "./productgrid.module.css";

const ProductGrid = React.memo(({ title, pds }) => {
  const router = useRouter();

  const multiPds = useMemo(() => [0, 3, 7, 8, 10, 12, 13, 14], []);

  const handleClick = useCallback(
    (product, index) => {
      if (product.name === "Furniture Corners") {
        if (multiPds.includes(product.id)) {
          router.push(`/productinfo/${index}`);
        } else {
          router.push(`/ItemDetail/${product.idKey}01`);
        }
      } else {
        if (product.id >= 14) {
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
    <div id="productGrid" className={styles.maindiv}>
      <h1 className={styles.heading}>{title || "Our Products"}</h1>
      <div className={styles.productGrid}>
        {pds?.map((product, index) => (
          <React.Fragment key={product.id}>
            <div
              onClick={() => handleClick(product, index)}
              className={styles.productCard}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={290}
                  height={290}
                  className={styles.itemImg}
                  placeholder="empty"
                  priority={index === 0}
                />
              </div>
              <p className={styles.productName}>{product.name}</p>

              {product.id < 14 && (
                <p className={styles.priceText}>
                  As low as ${getStartingPrice(product.id)}
                </p>
              )}

              <p className={styles.shopButton}>Shop</p>
            </div>

            {product.name === "Furniture Corners" && (
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
