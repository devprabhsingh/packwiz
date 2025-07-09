"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { getProductCat } from "@/utils/getProductCat";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function CartPage({ categories }) {
  const { setKit, cartItems, setSubTotal, removeFromCart, updateItemQuantity } =
    useCart();
  const searchParams = useSearchParams();
  const kitFromQuery = searchParams.get("kit") === "true";
  const router = useRouter();
  const [error, setError] = useState("");
  const handleIncrement = (item) => {
    updateItemQuantity(item.id, item.qty + 1);
  };

  useEffect(() => {
    if (kitFromQuery) {
      setKit(true); // set in context for downstream use
    }
  }, [kitFromQuery]);

  const handleDecrement = (item) => {
    if (item.qty > 1) {
      updateItemQuantity(item.id, item.qty - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  // Pricing calculations
  const subTotal = cartItems.reduce(
    (sum, i) => sum + (i.finalPrice || i.price) * i.qty,
    0
  );

  useEffect(() => {
    setSubTotal(Number(subTotal.toFixed(2)));
  });

  const checkSubTotal = () => {
    if (subTotal < 10) {
      setError("Subtotal needs to be atleast $10");
      return;
    }
    setError("");

    router.push("/shipping");
  };
  return (
    <div className="cart-container">
      <h1 style={styles.heading}>🛒 Your Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          <p style={styles.empty}>Your cart is empty.</p>
          <Link
            style={{
              display: "block",
              padding: "10px 20px",
              backgroundColor: "#ff6f20",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              textDecoration: "none",
              fontWeight: "bold",
              width: "fit-content",
              margin: "10px auto",
            }}
            href="/products"
          >
            Shop now
          </Link>
        </div>
      ) : (
        <div style={styles.mainbox}>
          <div className="cart-list">
            {cartItems.length > 0 &&
              cartItems.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <Link href={`/ItemDetail/${item.id}`}>
                    <div className="card-cart-one" style={styles.partone}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={styles.thumbnail}
                      />
                      <div style={styles.info} className="item-info">
                        <h3 style={styles.title}>{item.title}</h3>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "rgba(0,0,0,0.8)",
                            marginTop: "3px",
                            marginBottom: "3px",
                          }}
                        >
                          {item.desc}
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#ff6f20",
                            margin: "3px 0",
                          }}
                        >
                          {item.id.startsWith("b")
                            ? item.size
                                .split("*")
                                .map(
                                  (val, i) =>
                                    `${val}${i === 0 ? '"L' : i === 1 ? '"W' : '"H'}`
                                )
                                .join(" × ")
                            : item.size}
                        </p>
                        {item.discount && (
                          <p
                            style={{
                              backgroundColor: "#ff6f20",
                              color: "white",
                              borderRadius: "8px",
                              width: "fit-content",
                              padding: "3px 6px",
                            }}
                          >
                            {item.discount}% Off
                          </p>
                        )}
                        {item.discount ? (
                          <p style={styles.detail}>
                            Effective Price:
                            <span style={{ textDecoration: "line-through" }}>
                              ${item.price}
                            </span>
                            <span
                              style={{ marginLeft: "10px", color: "green" }}
                            >
                              ${item.finalPrice}
                            </span>
                          </p>
                        ) : (
                          <p style={styles.detail}>
                            Effective Price:
                            <span style={{ marginLeft: "3px", color: "green" }}>
                              ${item.price}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                  {!item.id.startsWith("pk") ? (
                    <table
                      style={{
                        width: "180px",
                        borderCollapse: "collapse",
                        fontSize: "13px",
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            backgroundColor: "#f5f5f5",
                            fontWeight: "bold",
                          }}
                        >
                          <th
                            style={{
                              border: "1px solid #ccc",
                              padding: "6px",
                            }}
                          >
                            {categories[getProductCat(item.id)]?.unit}
                          </th>
                          <th
                            style={{
                              border: "1px solid #ccc",
                              padding: "6px",
                            }}
                          >
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          style={
                            item.qty <= 4
                              ? {
                                  fontWeight: "bold",
                                  color: "green",
                                  backgroundColor: "rgb(255, 227, 72)",
                                }
                              : {}
                          }
                        >
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "6px",
                            }}
                          >
                            Upto 4
                          </td>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "6px",
                            }}
                          >
                            ${item?.priceTable?.tier1}
                          </td>
                        </tr>
                        <tr
                          style={
                            item.qty > 4 && item.qty <= 9
                              ? {
                                  fontWeight: "bold",
                                  color: "green",
                                  backgroundColor: "rgb(255, 227, 72)",
                                }
                              : {}
                          }
                        >
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "6px",
                            }}
                          >
                            5 - 9
                          </td>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "6px",
                            }}
                          >
                            ${item?.priceTable?.tier2}
                          </td>
                        </tr>
                        <tr
                          style={
                            item.qty > 9 && item.qty <= 24
                              ? {
                                  fontWeight: "bold",
                                  color: "green",
                                  backgroundColor: "rgb(255, 227, 72)",
                                }
                              : {}
                          }
                        >
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "6px",
                            }}
                          >
                            10 - 24
                          </td>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "6px",
                            }}
                          >
                            ${item.priceTable.tier3}
                          </td>
                        </tr>
                        <tr
                          style={
                            item.qty > 24
                              ? {
                                  fontWeight: "bold",
                                  color: "green",
                                  backgroundColor: "rgb(255, 227, 72)",
                                }
                              : {}
                          }
                        >
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "6px",
                            }}
                          >
                            25+
                          </td>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "6px",
                            }}
                          >
                            ${item.priceTable.tier4}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    ""
                  )}
                  <div className="controls-btn-parent">
                    <div className="controls-btn" style={styles.controls}>
                      <button
                        style={styles.qtyBtn}
                        onClick={() => handleDecrement(item)}
                      >
                        -
                      </button>
                      <span style={styles.qty}>{item.qty}</span>
                      <button
                        style={styles.qtyBtn}
                        onClick={() => handleIncrement(item)}
                      >
                        +
                      </button>
                    </div>
                    <div>
                      {!item.discount ? (
                        <p style={{ fontWeight: "bold", padding: "5px" }}>
                          Subtotal:{" "}
                          <span style={{ color: "green" }}>
                            ${(item.price * item.qty).toFixed(2)}
                          </span>
                        </p>
                      ) : (
                        <>
                          <p style={{ fontWeight: "bold", padding: "5px" }}>
                            Subtotal:{" "}
                            <span
                              style={{
                                textDecoration: "line-through",
                              }}
                            >
                              ${(item.price * item.qty).toFixed(2)}
                            </span>
                            <span
                              style={{
                                marginLeft: "10px",
                                color: "green",
                              }}
                            >
                              ${(item.finalPrice * item.qty).toFixed(2)}
                            </span>
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    className="cart-item-delete"
                    onClick={() => handleRemove(item.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}

            <Link style={{ textDecoration: "none" }} href="/products">
              <button
                style={{
                  display: "block",
                  padding: "10px 20px",
                  backgroundColor: "#ff6f20",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  textDecoration: "none",
                  fontWeight: "normal",
                  width: "fit-content",
                  margin: "auto",
                }}
              >
                Shop More
              </button>
            </Link>
          </div>

          <div className="checkout-card">
            <div style={styles.summaryTotal}>
              <span>Total</span>
              <span style={{ color: "green" }}>${subTotal.toFixed(2)}</span>
            </div>
            <p style={{ fontSize: "13px", color: "#333", margin: 0 }}>
              (Taxes & shipping calculated at next step)
            </p>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <button
              className="checkout-btn"
              style={styles.checkoutBtn}
              onClick={() => checkSubTotal()}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  heading: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "30px",
    textAlign: "center",
  },
  empty: {
    fontSize: "18px",
    textAlign: "center",
    color: "#555",
  },
  mainbox: {
    width: "100%",
    display: "flex",
    margin: "auto",
    justifyContent: "space-between",
    height: "auto", // instead of maxWidth
  },

  partone: {
    display: "flex",
    alignItems: "center",
  },
  thumbnail: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "8px",
    marginRight: "15px",
  },
  info: {
    flex: 1,
    color: "black",
  },
  detail: {
    fontSize: "15px",
  },
  title: {
    margin: 0,
    textDecoration: "none",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  qtyBtn: {
    padding: "4px 10px",
    fontSize: "16px",
    cursor: "pointer",
  },
  qty: {
    minWidth: "24px",
    textAlign: "center",
    fontSize: "16px",
  },
  summaryTotal: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "10px",
    borderTop: "1px solid #ddd",
    paddingTop: "10px",
  },
  checkoutBtn: {
    width: "100%",
    marginTop: "20px",
    padding: "12px",
    backgroundColor: "#ff6f20",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};
