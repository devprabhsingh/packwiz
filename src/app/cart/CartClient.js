"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { getProductCat } from "@/utils/getProductCat";
import { useRouter, useSearchParams } from "next/navigation";

import styles from "./cartPage.module.css";

export default function CartPage({ categories }) {
  const {
    setKit,
    cartItems,
    clearCart,
    setSubTotal,
    removeFromCart,
    updateItemQuantity,
  } = useCart();
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
  }, [subTotal, setSubTotal]); // Added subTotal and setSubTotal to dependency array

  const checkSubTotal = () => {
    if (subTotal < 10) {
      setError("Subtotal needs to be at least $10");
      return;
    }
    setError("");
    router.push("/shipping");
  };

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.heading}>🛒 Your Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          <p className={styles.empty}>Your cart is empty.</p>
          <Link href="/products" className={styles.shopNowBtn}>
            Shop now
          </Link>
        </div>
      ) : (
        <div className={styles.mainbox}>
          <div className="cart-list">
            {/* Added a clear all button class */}
            <button
              className={styles.clearAllBtn}
              onClick={() => {
                const confirmClear = window.confirm(
                  "Are you sure you want to clear all items from the cart?"
                );
                if (confirmClear) {
                  clearCart();
                }
              }}
            >
              Clear All
            </button>
            {cartItems.length > 0 &&
              cartItems.map((item) => (
                <div key={item.id} className={styles.cartItemCard}>
                  <Link
                    href={`/ItemDetail/${item.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {" "}
                    {/* Remove underline on link */}
                    <div className={styles.partone}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className={styles.thumbnail}
                      />
                      <div className={styles.info}>
                        <h3 className={styles.title}>{item.title}</h3>
                        <p className={styles.itemInfo}>{item.desc}</p>
                        <p className={styles.itemInfo}>
                          {item.id.startsWith("b")
                            ? item.size
                                .split("*")
                                .map(
                                  (val, i) =>
                                    `${val}${
                                      i === 0 ? '"L' : i === 1 ? '"W' : '"H'
                                    }`
                                )
                                .join(" × ")
                            : item.size}
                        </p>
                        {item.discount && (
                          <p className={styles.discountTag}>
                            {item.discount}% Off
                          </p>
                        )}
                        {item.discount ? (
                          <p className={styles.detail}>
                            Effective Price:{" "}
                            <span className={styles.subtotalOldPrice}>
                              ${item.price}
                            </span>
                            <span
                              className={styles.subtotalValue}
                              style={{ marginLeft: "10px" }}
                            >
                              ${item.finalPrice}
                            </span>
                          </p>
                        ) : (
                          <p className={styles.detail}>
                            Effective Price:{" "}
                            <span
                              className={styles.subtotalValue}
                              style={{ marginLeft: "3px" }}
                            >
                              ${item.price}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                  {!item.id.startsWith("pk") ? (
                    <table className={styles.priceTable}>
                      <thead>
                        <tr>
                          <th className={styles.tableHeader}>
                            {categories[getProductCat(item.id)]?.unit}
                          </th>
                          <th className={styles.tableHeader}>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          className={`${item.qty <= 4 ? styles.highlightRow : ""}`}
                        >
                          <td className={styles.tableCell}>Upto 4</td>
                          <td className={styles.tableCell}>
                            ${item?.priceTable?.tier1}
                          </td>
                        </tr>
                        <tr
                          className={`${item.qty > 4 && item.qty <= 9 ? styles.highlightRow : ""}`}
                        >
                          <td className={styles.tableCell}>5 - 9</td>
                          <td className={styles.tableCell}>
                            ${item?.priceTable?.tier2}
                          </td>
                        </tr>
                        <tr
                          className={`${item.qty > 9 && item.qty <= 24 ? styles.highlightRow : ""}`}
                        >
                          <td className={styles.tableCell}>10 - 24</td>
                          <td className={styles.tableCell}>
                            ${item.priceTable.tier3}
                          </td>
                        </tr>
                        <tr
                          className={`${item.qty > 24 ? styles.highlightRow : ""}`}
                        >
                          <td className={styles.tableCell}>25+</td>
                          <td className={styles.tableCell}>
                            ${item.priceTable.tier4}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    ""
                  )}
                  <div className={styles.controlsBtnParent}>
                    <div className={styles.controls}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => handleDecrement(item)}
                      >
                        -
                      </button>
                      <span className={styles.qty}>{item.qty}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => handleIncrement(item)}
                      >
                        +
                      </button>
                    </div>
                    <div>
                      {!item.discount ? (
                        <p className={styles.subtotalText}>
                          Subtotal:{" "}
                          <span className={styles.subtotalValue}>
                            ${(item.price * item.qty).toFixed(2)}
                          </span>
                        </p>
                      ) : (
                        <>
                          <p className={styles.subtotalText}>
                            Subtotal:{" "}
                            <span className={styles.subtotalOldPrice}>
                              ${(item.price * item.qty).toFixed(2)}
                            </span>
                            <span
                              className={styles.subtotalValue}
                              style={{ marginLeft: "10px" }}
                            >
                              ${(item.finalPrice * item.qty).toFixed(2)}
                            </span>
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    className={styles.cartItemDelete}
                    onClick={() => handleRemove(item.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}

            <Link href="/products" className={styles.shopMoreBtn}>
              Shop More
            </Link>
          </div>

          <div className={styles.checkoutCard}>
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span style={{ color: "green" }}>${subTotal.toFixed(2)}</span>
            </div>
            <p style={{ fontSize: "13px", color: "#333", margin: 0 }}>
              (Taxes & shipping calculated at next step)
            </p>
            {error && <p className={styles.error}>{error}</p>}

            <button
              className={styles.checkoutBtn}
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
