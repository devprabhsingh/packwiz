"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import RequestForm from "./RequestForm";
import Image from "next/image";
import Link from "next/link";
import Toast from "@/app/components/Toast";

// Import your CSS module
import styles from "./ProductList.module.css"; // Adjust path if needed

// Utility function to convert a title to a URL-friendly slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/-+$/, "");
};
const SizeSelector = ({ sizes, selectedSize, onSelectSize }) => {
  return (
    <div className={styles.sizeSelector}>
      <span className={styles.sizeSelectorLabel}>Size:</span>
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onSelectSize(size)}
          className={`
            ${styles["size-selector__button"]} 
            ${selectedSize === size ? styles["size-selector__button--selected"] : ""}
          `}
          aria-label={`Select size ${size}`}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

const ProductList = ({ id, modified, productList }) => {
  const router = useRouter();
  const { addToCart } = useCart();

  // Example state initialization
  const availableSizes = ["S", "M", "L", "XL"];
  const [selectedSizes, setSelectedSizes] = useState(
    productList.map(() => availableSizes[0])
  );
  const [quantities, setQuantities] = useState(productList.map(() => 1));
  const [addedProductId, setAddedProductId] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    setQuantities((prev) => {
      if (productList.length !== prev.length) {
        return new Array(productList.length).fill(1);
      }
      return prev;
    });
  }, [productList.length]);

  const dynamicMaxWidth = useMemo(
    () => (modified ? "95%" : "1300px"),
    [modified]
  );

  const getPrice = useCallback(
    (qty, product) => {
      if (productList[0].id.startsWith("pk")) return product.price;
      if (qty <= 4) return product.priceTable.tier1;
      if (qty <= 9) return product.priceTable.tier2;
      if (qty <= 24) return product.priceTable.tier3;
      return product.priceTable.tier4;
    },
    [productList]
  );

  const handleQuantityChange = useCallback((index, value) => {
    // If the value is empty or not a valid number, set it to an empty string
    const newValue = value === "" ? "" : Math.max(0, parseInt(value));

    setQuantities((prev) => {
      const updated = [...prev];
      updated[index] = newValue;
      return updated;
    });
  }, []);

  const handleAddToCart = useCallback(
    (product, qty, index, when) => {
      const price = getPrice(qty, product);
      const selectedSize = selectedSizes[index];
      const finalPrice = Number(
        (price - (price / 100) * product.discount).toFixed(2)
      );
      addToCart({
        ...product,
        qty: Number(qty),
        selectedSize: selectedSize,
        price,
        finalPrice,
      });
      setAddedProductId(product.id);
      setToast({
        show: true,
        message: (
          <>
            <span>Item added! </span>
            <Link
              href="/cart"
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              Go to cart
            </Link>
          </>
        ),
        type: "success",
      });
      if (when === "now") router.push("/cart");
    },
    [addToCart, getPrice, router, selectedSizes]
  );

  const handleCloseToast = () =>
    setToast((prevToast) => ({ ...prevToast, show: false }));

  useEffect(() => {
    if (addedProductId !== null) {
      const timer = setTimeout(() => setAddedProductId(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [addedProductId]);

  const handleProductClick = useCallback(
    (product) => {
      const productSlug = slugify(product.title);
      // Construct the new URL using the slug
      if (product.id.startsWith("pk")) {
        router.push(`/movingKits/${productSlug}`);
      } else {
        router.push(`/item-details/${productSlug}`);
      }
    },
    [router]
  );

  const handleSelectSize = useCallback((index, size) => {
    setSelectedSizes((prev) => {
      const updated = [...prev];
      updated[index] = size;
      return updated;
    });
  }, []);

  return (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}

      {/* Apply styles using className from the imported CSS module */}
      <div className={styles.innerContent}>
        {modified && (
          <h2 className={styles.similarHeading}>Similar Products</h2>
        )}

        <div
          className={`${styles.boxTypesGrid} ${modified}grid`}
          style={{ maxWidth: dynamicMaxWidth }}
          id={`${modified}grid`}
        >
          {productList.map((product, index) => {
            const qty = quantities[index];
            const currentSelectedSize = selectedSizes[index];
            const pricePerUnit = getPrice(qty, product);
            const finalPrice = Number(
              (pricePerUnit - (pricePerUnit / 100) * product.discount).toFixed(
                2
              )
            );
            return (
              <div
                key={product.id}
                className={styles.boxTypeCard}
                id={`${modified}hover`}
              >
                <div>
                  <div
                    className={`${styles.itemInfo} item-info-expand-${modified} image-wrapper`}
                    onClick={() => handleProductClick(product)}
                  >
                    <Image
                      src={product.image || "/images/no-pictures.webp"}
                      alt={product.size || "size"}
                      width={230}
                      height={180}
                      loading="lazy"
                      style={{
                        borderRadius: "8px",
                        objectFit: "contain",
                        backgroundColor: "white",
                      }}
                    />
                    <div className={styles.toolTip}>
                      Click to see more details
                    </div>
                  </div>

                  <p className={styles.boxTitle}>
                    {product.title || product.desc}
                  </p>
                  <p className={styles.boxSize}>
                    {product.id.startsWith("b")
                      ? product.size
                          .split("*")
                          .map(
                            (val, i) =>
                              `${val}${i === 0 ? '"L' : i === 1 ? '"W' : '"H'}`
                          )
                          .join(" × ")
                      : product.size}
                  </p>
                  <p className={styles.boxDesc}>{product.desc}</p>
                  <p className={styles.inStock}>In Stock</p>

                  {modified ? (
                    <div>
                      Starts @{" "}
                      <span style={{ color: "green" }}>
                        ${(qty * pricePerUnit).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className={styles.quantityControls}>
                        <button
                          className={styles.button}
                          onClick={() => handleQuantityChange(index, qty - 1)}
                        >
                          -
                        </button>
                        <input
                          className={`${styles.qtyInput} qty-input`}
                          type="number"
                          value={qty}
                          min="1"
                          onChange={(e) =>
                            handleQuantityChange(index, e.target.value)
                          }
                        />
                        <button
                          className={styles.button}
                          onClick={() => handleQuantityChange(index, qty + 1)}
                        >
                          +
                        </button>
                      </div>
                      {product.discount && (
                        <span
                          style={{
                            backgroundColor: "#ff6f20",
                            padding: "3px 6px",
                            color: "white",
                            borderRadius: "8px",
                          }}
                        >
                          {product.discount}% Off
                        </span>
                      )}
                      {!product.discount ? (
                        <div className={styles.totalPrice}>
                          Total:{" "}
                          <strong style={{ color: "#1a8917" }}>
                            ${(qty * pricePerUnit).toFixed(2)}
                          </strong>
                        </div>
                      ) : (
                        <div className={styles.totalPrice}>
                          Total:{" "}
                          <strong style={{ textDecoration: "line-through" }}>
                            ${(qty * pricePerUnit).toFixed(2)}
                          </strong>
                          <strong
                            style={{ marginLeft: "10px", color: "#1a8917" }}
                          >
                            ${(qty * finalPrice).toFixed(2)}
                          </strong>
                        </div>
                      )}
                      {product.id.startsWith("gl") && (
                        <SizeSelector
                          sizes={availableSizes}
                          selectedSize={currentSelectedSize}
                          onSelectSize={(size) => handleSelectSize(index, size)}
                        />
                      )}
                      <div className={styles.actionButtons}>
                        <button
                          onClick={() =>
                            handleAddToCart(product, qty, index, "now")
                          }
                          className={styles.addToCartButton}
                          style={{
                            backgroundColor: "#ff6f20",
                            color: "white",
                          }}
                        >
                          Buy Now
                        </button>
                        {addedProductId === product.id ? (
                          <p className={styles.addToCartButton}>Added!</p>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(product, qty, index)}
                            className={styles.addToCartButton}
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ width: "100%", paddingBottom: "20px" }}>
          <button
            className={styles.addToCartButton}
            style={{
              display: "block",
              margin: "40px auto",
              padding: "15px",
            }}
            onClick={() => {
              setOpenForm(true);
            }}
          >
            Need more sizes?
          </button>
        </div>

        {openForm && (
          <div style={{ width: "80%", margin: "auto", paddingBottom: "20px" }}>
            <RequestForm />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
