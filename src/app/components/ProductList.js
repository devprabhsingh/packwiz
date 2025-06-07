"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import RequestForm from "./RequestForm";
import Image from "next/image";

const ProductList = ({ id, modified, productList }) => {
  const router = useRouter();
  const [quantities, setQuantities] = useState(new Array(8).fill(1));
  const [addedProductId, setAddedProductId] = useState(null);
  const { addToCart } = useCart();
  const [openForm, setOpenForm] = useState(false);

  const updateQuantity = (index, value) => {
    if (value === "" || value === null) {
      // Handle clearing the input (set to 0 when empty)
      setQuantities((prev) => {
        const updated = [...prev];
        updated[index] = 0;
        return updated;
      });
    } else {
      const newValue = Math.max(0, parseInt(value)); // Prevent negative values
      setQuantities((prev) => {
        const updated = [...prev];
        updated[index] = newValue;
        return updated;
      });
    }
  };

  const getPrice = (qty, p) => {
    if (qty <= 4) return p.tier1;
    if (qty <= 9) return p.tier2;
    if (qty <= 24) return p.tier3;
    return p.tier4;
  };

  const gridcss = () => {
    let len = productList.length;
    if (len === 1) {
      return "1fr";
    } else if (len === 2) {
      return "repeat(2,1fr)";
    } else if (modified) {
      return "repeat(5,1fr)";
    }
    return "repeat(4,1fr)";
  };
  const boxTypesGrid = {
    display: "grid",
    gridTemplateColumns: gridcss(),
    placeItems: "center",
    gap: "10px",
    maxWidth: modified ? "95%" : "1300px",
    margin: "0 auto",
    padding: "10px",
  };

  const handleAddToCart = (product, qty, when) => {
    const price = getPrice(qty, product.priceTable);

    const item = { ...product, qty: Number(qty), price };

    addToCart(item);

    setAddedProductId(product.id);
    if (when === "now") {
      router.push("/cart");
    }
  };

  useEffect(() => {
    if (addedProductId !== null) {
      const timer = setTimeout(() => {
        setAddedProductId(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [addedProductId]);

  // Updated rendering logic for product cards with improved layout and styling
  return (
    <div style={styles.innerContent} className={`${modified}inner`}>
      {modified && (
        <h2
          style={{
            backgroundColor: "white",
            margin: "10px auto",
            width: "fit-content",
            borderRadius: "8px",
            padding: "15px",
          }}
        >
          Similar Products
        </h2>
      )}
      <div
        className="box-types-grid"
        style={boxTypesGrid}
        id={`${modified}grid`}
      >
        {productList?.map((product, index) => {
          const qty = quantities[index];
          const pricePerUnit = getPrice(qty, product.priceTable);

          return (
            <div
              className="box-type-card"
              style={{
                ...styles.boxTypeCard,
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                borderRadius: "8px",
                overflow: "hidden",
                position: "relative",
              }}
              id={modified + "hover"}
              key={index}
              onClick={() => {
                modified && router.push(`/ItemDetail/${product.id}`);
              }}
            >
              <div>
                <div
                  style={{
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    !modified && router.push(`/ItemDetail/${product.id}`);
                  }}
                  className={"item-info-expand-" + modified}
                >
                  <div className="image-wrapper">
                    <Image
                      src={
                        product.image
                          ? product.image
                          : "/images/no-pictures.png"
                      }
                      alt={product.size}
                      loading="lazy"
                      width={200}
                      height={200}
                      style={{ borderRadius: "8px" }}
                    />
                    {product.title.length > 15 && (
                      <img
                        src="/images/hot.png"
                        alt="hot"
                        className="hot-icon"
                        style={{
                          position: "absolute",
                        }}
                      />
                    )}
                  </div>

                  <p
                    style={{
                      ...styles.boxTitle,
                      fontSize: "18px",
                      fontWeight: "600",
                      marginTop: "12px",
                      maxWidth: "80%",
                    }}
                  >
                    {product.title}
                  </p>
                  <p
                    style={{
                      ...styles.boxSize,
                      fontSize: "14px",
                      color: "#555",
                      marginBottom: 4,
                    }}
                  >
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
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#777",
                      marginBottom: 12,
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                      overflowWrap: "anywhere",
                      width: "70%",
                    }}
                  >
                    {product.desc}
                  </p>
                </div>

                {modified ? (
                  <div>
                    Starts @{" "}
                    <span style={{ color: "green" }}>
                      ${(qty * pricePerUnit).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <button
                        style={styles.button}
                        onClick={() => updateQuantity(index, qty - 1)}
                      >
                        -
                      </button>
                      <input
                        className="qty-input"
                        type="number"
                        value={qty}
                        min="1"
                        onChange={(e) =>
                          updateQuantity(index, parseInt(e.target.value))
                        }
                        style={{
                          ...styles.qtyInput,
                          width: "60px",
                          textAlign: "center",
                          borderRadius: "8px",
                          padding: "6px",
                        }}
                      />
                      <button
                        style={styles.button}
                        onClick={() => updateQuantity(index, qty + 1)}
                      >
                        +
                      </button>
                    </div>

                    <div style={{ fontSize: "17px", margin: "16px" }}>
                      Total:{" "}
                      <strong style={{ color: "#1a8917" }}>
                        ${(qty * pricePerUnit).toFixed(2)}
                      </strong>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "100%",
                      }}
                    >
                      <button
                        onClick={() => handleAddToCart(product, qty, "now")}
                        style={{
                          ...styles.addToCartButton,
                          borderRadius: "5px",
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
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="" style={{ width: "100%", paddingBottom: "20px" }}>
        <button
          style={{
            ...styles.addToCartButton,
            display: "block",
            margin: "40px auto",
            padding: "15px",
          }}
          onClick={() => {
            setOpenForm(true);
            window.scrollBy({
              top: window.innerHeight * 0.2, // scroll down by 20% of viewport
              behavior: "smooth",
            });
          }}
        >
          Need more sizes?
        </button>
      </div>
      {openForm && (
        <div>
          <h3 style={{ textAlign: "center", marginBottom: "16px" }}>
            Fill this out. Our team will contact you soon.
          </h3>
          <div style={{ width: "25%", margin: "auto", paddingBottom: "30px" }}>
            <RequestForm />
          </div>
        </div>
      )}
    </div>
  );
};
const styles = {
  boxTypeCard: {
    background: "#fff",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 0 12px rgba(0, 0, 0, 0.5)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "10px 40px",
    justifyContent: "space-around",
    minHeight: "500px",
    width: "250px",
  },
  cardparttwo: {
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  boxTitle: {
    fontWeight: "bold",
    fontSize: "16px",
    margin: "4px 0 0 0",
  },
  boxSize: {
    fontSize: "16px",
    color: "rgba(0,0,0,0.8)",
    margin: "3px 0",
  },
  pricing: {
    width: "fit-content",
    display: "flex",
    flexDirection: "column",
    fontSize: "1.1rem",
    marginBottom: "12px",
  },
  innercardparttwo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "20px 0",
  },
  button: {
    padding: "4px 10px",
    fontSize: "18px",
    cursor: "pointer",
  },

  qtyInput: {
    width: "50px",
    textAlign: "center",
    fontSize: "16px",
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  addToCartButton: {
    padding: "10px 15px",
    backgroundColor: "#ff6f20",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "15px",
    margin: "10px",
  },
};
export default ProductList;
