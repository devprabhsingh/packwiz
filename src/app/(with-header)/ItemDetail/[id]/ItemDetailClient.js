"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import BackLinks from "@/app/components/BackLinks";
import dynamic from "next/dynamic";
import Link from "next/link";
import ReviewSection from "@/app/components/ReviewSection";
import Toast from "@/app/components/Toast";
import styles from "../ItemDetail.module.css";

const ProductList = dynamic(() => import("../../../components/ProductList"));

export default function ItemDetailClient({
  item,
  similarProducts,
  category,
  reviews,
  priceTiers,
}) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedProductId, setAddedProductId] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [selectedImage, setSelectedImage] = useState(item.image);

  const { price, finalPrice } = useMemo(() => {
    if (!item || !item.priceTable) return { price: 0, finalPrice: 0 };
    let currentPrice = 0;
    if (quantity <= 4) currentPrice = item.priceTable.tier1;
    else if (quantity <= 9) currentPrice = item.priceTable.tier2;
    else if (quantity <= 24) currentPrice = item.priceTable.tier3;
    else currentPrice = item.priceTable.tier4;

    const discountedPrice = Number(
      (currentPrice - (currentPrice * (item.discount || 0)) / 100).toFixed(2)
    );
    return { price: currentPrice, finalPrice: discountedPrice };
  }, [quantity, item]);

  useEffect(() => {
    if (addedProductId !== null) {
      const timer = setTimeout(() => setAddedProductId(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [addedProductId]);

  const increaseQty = () => setQuantity((prevQty) => prevQty + 1);
  const decreaseQty = () => setQuantity((prevQty) => Math.max(1, prevQty - 1));

  const handleAddToCart = () => {
    if (!item) return;
    const cartItem = {
      ...item,
      qty: quantity,
      price: price,
      finalPrice: finalPrice,
    };
    addToCart(cartItem);
    setAddedProductId(item.id);
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
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  const handleCloseToast = () =>
    setToast((prevToast) => ({ ...prevToast, show: false }));

  const getPriceTierCondition = (label) => {
    if (label === "Upto 4") return quantity <= 4;
    if (label === "5 - 9") return quantity > 4 && quantity <= 9;
    if (label === "10 - 24") return quantity > 9 && quantity <= 24;
    if (label === "25+") return quantity > 24;
    return false;
  };

  return (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}

      <BackLinks nextTitle={item.title} nextId={item.id} />

      <div className={styles.itemDetailContainer}>
        <div className={styles.imageSection}>
          <img src={selectedImage} alt={item.title} />
          <div className={styles.thumbnailContainer}>
            <img
              src={item.image}
              alt="Thumbnail 1"
              className={styles.thumbnail}
              id={selectedImage === item.image ? styles.highlightedImg : ""}
              onClick={() => setSelectedImage(item.image)}
            />
            {item?.image2 && (
              <img
                src={item.image2}
                alt="2"
                className={styles.thumbnail}
                id={selectedImage === item.image2 ? styles.highlightedImg : ""}
                onClick={() => setSelectedImage(item.image2)}
              />
            )}
          </div>
          {item.id.startsWith("bx") && (
            <div className={styles.ect}>
              <h4>What is ECT?</h4> ECT (Edge Crush Test) measures a box's
              stacking strength. A 32 ECT box can withstand 32 pounds of
              pressure per inch, ensuring your items are protected during
              stacking and shipping.
            </div>
          )}
        </div>

        <div className={styles.infoSection}>
          <h1>{item.title}</h1>
          <p className={styles.description}>{item.desc}</p>
          <p>
            <strong>Size: </strong>
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
          <p className={styles.inStock}>In Stock</p>

          <table className={styles.priceTable}>
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
                    getPriceTierCondition(row.label) ? styles.highlight : ""
                  }
                >
                  <td>{row.label}</td>
                  <td>${row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

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
                <span className={styles.discountTag}>{item.discount}% Off</span>
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

          <div className={styles.qtyControls}>
            <button onClick={decreaseQty}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQty}>+</button>
          </div>

          <div className={styles.actionButtons}>
            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
              disabled={addedProductId === item.id}
            >
              {addedProductId === item.id ? "Added!" : "Add to Cart"}
            </button>
            <button className={styles.buyNowButton} onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>

        <div className={styles.thirdDiv}>
          {item.specs && (
            <div className={styles.specCard}>
              <h2 className={styles.specTitle}>Specifications</h2>
              <table className={styles.specTable}>
                <tbody>
                  {Object.entries(item.specs).map(([key, value]) => (
                    <tr key={key}>
                      <td className={styles.specLabel}>{key}</td>
                      <td className={styles.specValue}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {item.features && item.features.length > 0 && (
            <div className={styles.featuresSection}>
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

      {similarProducts && similarProducts.length > 0 ? (
        <ProductList productList={similarProducts} modified={true} />
      ) : (
        <div className={styles.exploreContainer}>
          <Link href="/products" className={styles.exploreButton}>
            Explore Other Products
          </Link>
        </div>
      )}

      {reviews && reviews.length > 0 && (
        <ReviewSection reviewList={reviews} headline="Customer Reviews" />
      )}
    </>
  );
}
