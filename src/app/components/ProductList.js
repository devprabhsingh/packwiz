"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import RequestForm from "./RequestForm";
import Image from "next/image";
import Link from "next/link";
import Toast from "@/app/components/Toast";

const ProductList = ({ id, modified, productList }) => {
  const router = useRouter();
  const { addToCart } = useCart();

  const [quantities, setQuantities] = useState(() => new Array(8).fill(1));
  const [addedProductId, setAddedProductId] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Adjust quantity array length if productList changes
  useEffect(() => {
    setQuantities((prev) => {
      if (productList.length !== prev.length) {
        return new Array(productList.length).fill(1);
      }
      return prev;
    });
  }, [productList.length]);

  const gridTemplate = useMemo(() => {
    const len = productList.length;
    if (len === 1) return "1fr";
    if (len === 2) return "repeat(2,1fr)";
    if (modified) return "repeat(5,1fr)";
    return "repeat(5,1fr)";
  }, [productList.length, modified]);

  const boxTypesGrid = useMemo(
    () => ({
      display: "grid",
      gridTemplateColumns: gridTemplate,
      placeItems: "center",
      gap: "10px",
      maxWidth: modified ? "95%" : "1300px",
      margin: "0 auto",
      padding: "10px",
    }),
    [gridTemplate, modified]
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
    const newValue =
      value === "" || value === null ? 0 : Math.max(0, parseInt(value));
    setQuantities((prev) => {
      const updated = [...prev];
      updated[index] = newValue;
      return updated;
    });
  }, []);

  const handleAddToCart = useCallback(
    (product, qty, when) => {
      const price = getPrice(qty, product);
      const finalPrice = Number(
        price - ((price / 100) * product.discount).toFixed(2)
      );
      addToCart({ ...product, qty: Number(qty), price, finalPrice });
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
    [addToCart, getPrice, router]
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
      if (productList[0]?.id.startsWith("pk")) {
        router.push(`/movingKits/${product.id}`);
      } else {
        router.push(`/ItemDetail/${product.id}`);
      }
    },
    [productList, router]
  );

  return (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}

      <div style={styles.innerContent} className={`${modified}inner`}>
        {modified && <h2 style={styles.similarHeading}>Similar Products</h2>}

        <div
          style={boxTypesGrid}
          className="box-types-grid"
          id={`${modified}grid`}
        >
          {productList.map((product, index) => {
            const qty = quantities[index];
            const pricePerUnit = getPrice(qty, product);
            const finalPrice = Number(
              pricePerUnit -
                ((pricePerUnit / 100) * product.discount).toFixed(2)
            );
            return (
              <div
                key={product.id}
                className="box-type-card"
                style={styles.boxTypeCard}
                id={`${modified}hover`}
              >
                <div>
                  <div
                    style={styles.itemInfo}
                    className={`item-info-expand-${modified} image-wrapper`}
                    onClick={() => handleProductClick(product)}
                  >
                    <Image
                      src={product.image || "/images/no-pictures.webp"}
                      alt={product.size || "size"}
                      width={200}
                      height={200}
                      loading="lazy"
                      style={{ borderRadius: "8px" }}
                    />
                    <div className="tooltip">Click to see more details</div>
                    {product?.title?.length > 15 && (
                      <Image
                        src="/images/hot.webp"
                        alt="hot"
                        width={30}
                        height={30}
                        className="hot-icon"
                        style={{ position: "absolute" }}
                      />
                    )}
                  </div>

                  <p style={styles.boxTitle}>{product.title || product.desc}</p>
                  <p style={styles.boxSize}>
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
                  <p style={styles.boxDesc}>{product.desc}</p>
                  <p style={styles.inStock}>In Stock</p>

                  {modified ? (
                    <div>
                      Starts @{" "}
                      <span style={{ color: "green" }}>
                        ${(qty * pricePerUnit).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <>
                      <div style={styles.quantityControls}>
                        <button
                          style={styles.button}
                          onClick={() => handleQuantityChange(index, qty - 1)}
                        >
                          -
                        </button>
                        <input
                          className="qty-input"
                          type="number"
                          value={qty}
                          min="1"
                          onChange={(e) =>
                            handleQuantityChange(index, e.target.value)
                          }
                          style={styles.qtyInput}
                        />
                        <button
                          style={styles.button}
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
                        <div style={styles.totalPrice}>
                          Total:{" "}
                          <strong style={{ color: "#1a8917" }}>
                            ${(qty * pricePerUnit).toFixed(2)}
                          </strong>
                        </div>
                      ) : (
                        <div style={styles.totalPrice}>
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

                      <div style={styles.actionButtons}>
                        <button
                          onClick={() => handleAddToCart(product, qty, "now")}
                          style={{
                            ...styles.addToCartButton,
                            backgroundColor: "#ff6f20",
                            color: "white",
                          }}
                        >
                          Buy Now
                        </button>
                        {addedProductId === product.id ? (
                          <p style={styles.addToCartButton}>Added!</p>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(product, qty)}
                            style={styles.addToCartButton}
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
            style={{
              ...styles.addToCartButton,
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

const styles = {
  innerContent: {},
  similarHeading: {
    backgroundColor: "white",
    margin: "10px auto",
    width: "fit-content",
    borderRadius: "8px",
    padding: "15px",
  },
  boxTypeCard: {
    background: "#fff",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 0 12px rgba(0,0,0,0.5)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "10px",
    justifyContent: "space-around",
    minHeight: "400px",
    width: "250px",
    overflow: "hidden",
    position: "relative",
  },
  itemInfo: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  boxTitle: {
    fontWeight: "bold",
    fontSize: "16px",
    margin: "12px 0 0",
  },
  boxSize: {
    fontSize: "15px",
    color: "#555",
    margin: 4,
  },
  boxDesc: {
    fontSize: "13px",
    color: "#777",
    marginBottom: 12,
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    width: "100%",
    textAlign: "center",
  },
  inStock: {
    color: "green",
    fontSize: "13px",
    margin: "0 0 5px 0",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "10px",
  },
  button: {
    padding: "4px 10px",
    fontSize: "18px",
    cursor: "pointer",
  },
  qtyInput: {
    width: "60px",
    textAlign: "center",
    borderRadius: "8px",
    padding: "6px",
  },
  totalPrice: {
    fontSize: "17px",
    margin: "16px",
  },
  actionButtons: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
  addToCartButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "15px",
    margin: "10px",
  },
};

export default ProductList;
