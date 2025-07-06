"use client"; // This directive is crucial to mark it as a Client Component

import React, { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import BackLinks from "@/app/components/BackLinks";
import dynamic from "next/dynamic";
import Link from "next/link";
import ReviewSection from "@/app/components/ReviewSection";
import Toast from "@/app/components/Toast";

// Import CSS
import "../ItemDetail.css"; // Ensure this path is correct relative to this file

// Dynamically import ProductList if it's a client component and only needed on the client
// Otherwise, if ProductList can be a Server Component, import it directly in page.js
const ProductList = dynamic(() => import("../../../components/ProductList"));

export default function ItemDetailClient({
  item, // Item data passed from the server component
  similarProducts, // Similar products passed from the server component
  category, // Category info passed from the server component
  reviews, // Reviews data passed from the server component
  priceTiers, // Pre-calculated price tiers from the server
}) {
  const router = useRouter(); // For client-side navigation
  const { addToCart } = useCart(); // Access cart context

  // State for quantity, added product ID, and toast notification
  const [quantity, setQuantity] = useState(1);
  const [addedProductId, setAddedProductId] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Calculate current price based on quantity (memoized for performance)
  const { price, finalPrice } = useMemo(() => {
    if (!item || !item.priceTable) {
      return { price: 0, finalPrice: 0 };
    }

    let currentPrice = 0;
    if (quantity <= 4) {
      currentPrice = item.priceTable.tier1;
    } else if (quantity <= 9) {
      currentPrice = item.priceTable.tier2;
    } else if (quantity <= 24) {
      currentPrice = item.priceTable.tier3;
    } else {
      currentPrice = item.priceTable.tier4;
    }

    const discountedPrice = Number(
      (currentPrice - (currentPrice * (item.discount || 0)) / 100).toFixed(2)
    );

    return { price: currentPrice, finalPrice: discountedPrice };
  }, [quantity, item]); // Recalculate only if quantity or item changes

  // Effect to hide the "Added!" message after a delay
  useEffect(() => {
    if (addedProductId !== null) {
      const timer = setTimeout(() => setAddedProductId(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [addedProductId]);

  // Quantity control handlers
  const increaseQty = () => setQuantity((prevQty) => prevQty + 1);
  const decreaseQty = () => setQuantity((prevQty) => Math.max(1, prevQty - 1));

  // Handle adding item to cart
  const handleAddToCart = () => {
    if (!item) return;

    const cartItem = {
      ...item,
      qty: quantity,
      price: price, // Current tier price
      finalPrice: finalPrice, // Discounted price
    };
    addToCart(cartItem);
    setAddedProductId(item.id); // Show "Added!" state
    setToast({
      show: true,
      message: (
        <>
          Item added!{" "}
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
  };

  // Handle "Buy Now" action (add to cart and navigate to cart)
  const handleBuyNow = () => {
    handleAddToCart(); // First add to cart
    router.push("/cart"); // Then navigate to cart page
  };

  // Close toast notification
  const handleCloseToast = () =>
    setToast((prevToast) => ({ ...prevToast, show: false }));

  // Determine which price tier row should be highlighted in the table
  const getPriceTierCondition = (label) => {
    if (label === "Upto 4") return quantity <= 4;
    if (label === "5 - 9") return quantity > 4 && quantity <= 9;
    if (label === "10 - 24") return quantity > 9 && quantity <= 24;
    if (label === "25+") return quantity > 24;
    return false;
  };

  // Inline styles object (can be moved to a separate CSS module if preferred)
  const styles = {
    details: {
      width: "100%",
      color: "#444",
    },
    inStock: {
      color: "green",
      fontSize: "13px", // Corrected 'fontsize' to 'fontSize'
      margin: 0,
      marginBottom: "5px",
    },
    // Common button styles (example, can be moved to CSS)
    buttonBase: {
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "background-color 0.3s ease",
    },
    addToCartButton: {
      backgroundColor: "#ff6f20",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#e05a1e",
      },
    },
    buyNowButton: {
      backgroundColor: "#007bff",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#0056b3",
      },
    },
  };

  return (
    <>
      {/* Toast notification component */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}

      {/* BackLinks component */}
      <BackLinks nextTitle={item.title} nextId={item.id} />

      <div className="item-detail-container">
        {/* Product Image Section */}
        <div className="image-section">
          <img src={item.image} alt={item.title} />
        </div>

        {/* Product Info Section */}
        <div className="info-section">
          <h1>{item.title}</h1>
          <p className="description">{item.desc}</p>
          <p style={{ marginBottom: "5px" }}>
            <strong>Size: </strong>
            {/* Conditional size rendering based on item ID prefix */}
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
          <p style={styles.inStock}>In Stock</p>

          {/* Price Table */}
          <table className="price-table">
            <thead>
              <tr>
                <th>{category.unit}</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {priceTiers.map((row, i) => (
                <tr
                  key={i}
                  className={
                    getPriceTierCondition(row.label) ? "highlight" : ""
                  }
                >
                  <td>{row.label}</td>
                  <td>${row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Price Display with/without Discount */}
          <div>
            {!item.discount ? (
              <h4>
                Effective Price: ${price.toFixed(2)} X {quantity} ={" "}
                <span style={{ color: "green" }}>
                  ${(price * quantity).toFixed(2)}
                </span>
              </h4>
            ) : (
              <div>
                <span
                  style={{
                    backgroundColor: "#ff6f20",
                    color: "white",
                    padding: "3px 6px",
                    borderRadius: "8px",
                    marginRight: "10px",
                  }}
                >
                  {item.discount}% Off
                </span>
                <p>
                  Effective Price:{" "}
                  <span style={{ textDecoration: "line-through" }}>
                    ${price.toFixed(2)}
                  </span>
                  <span style={{ color: "green", marginLeft: "10px" }}>
                    ${finalPrice.toFixed(2)} x {quantity} = $
                    {(finalPrice * quantity).toFixed(2)}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="qty-controls">
            <button onClick={decreaseQty} aria-label="Decrease quantity">
              -
            </button>
            <span>{quantity}</span>
            <button onClick={increaseQty} aria-label="Increase quantity">
              +
            </button>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className="add-to-cart"
              onClick={handleAddToCart}
              style={styles.addToCartButton}
              disabled={addedProductId === item.id} // Disable button when "Added!"
            >
              {addedProductId === item.id ? "Added!" : "Add to Cart"}
            </button>
            <button
              className="buy-now"
              onClick={handleBuyNow}
              style={styles.buyNowButton}
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Product Details and Features Section */}
        <div className="third-div">
          {/* Details (HTML content from item.details) */}
          <div
            style={styles.details}
            dangerouslySetInnerHTML={{ __html: item.details }}
          />

          {/* Features List (if available) */}
          {item.features && item.features.length > 0 && (
            <div className="features-section">
              <h2>Features</h2>
              {item.features.map((feature, i) => (
                <p key={i}>
                  <img src="/images/check.webp" alt="check icon" />
                  {feature}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Similar Products Section */}
      {similarProducts && similarProducts.length > 0 ? (
        <ProductList productList={similarProducts} modified={true} />
      ) : (
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            margin: "5px 5px 0 5px",
            padding: "10px 0",
            textAlign: "center", // Center the link
          }}
        >
          <Link
            href="/products"
            style={{
              display: "inline-block", // Use inline-block for centering with text-align
              padding: "10px 20px",
              backgroundColor: "#ff6f20",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              textDecoration: "none",
              fontWeight: "bold",
              // width: "fit-content", // Redundant with inline-block + text-align
              // margin: "auto", // Redundant
            }}
          >
            Explore Other Products
          </Link>
        </div>
      )}

      {/* Customer Reviews Section */}
      {reviews && reviews.length > 0 && (
        <ReviewSection reviewList={reviews} headline={"Customer Reviews"} />
      )}
    </>
  );
}
