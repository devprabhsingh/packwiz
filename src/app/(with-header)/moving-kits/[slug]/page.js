"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import products from "@/data/products"; // This is the data array you provided
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Toast from "@/app/components/Toast";
import { slugify } from "@/utils/slugify";
import styles from "./kitdetail.module.css"; // The new CSS module

const MovingKit = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [kitData, setKitData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const { addToCart, kit, setKit } = useCart();
  const [addedProductId, setAddedProductId] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [toastTriggered, setToastTriggered] = useState(false);

  // Memoize the flattened products array for efficiency
  const flatProducts = useMemo(() => products.flat(), []);

  useEffect(() => {
    if (addedProductId !== null) {
      const timer = setTimeout(() => setAddedProductId(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [addedProductId]);

  useEffect(() => {
    const movingKits = products[products.length - 1];
    const selectedKit = movingKits.find((item) => slugify(item.title) === slug);

    if (!selectedKit) {
      router.push("/404");
      return;
    }

    const enrichedItems = selectedKit.items.map((kitItem) => {
      const itemDetails = flatProducts.find((p) => p.id === kitItem.id);
      return {
        ...itemDetails,
        qty: kitItem.qty,
        price: itemDetails?.priceTable?.tier3 || 0,
      };
    });

    setKitData({ ...selectedKit, items: enrichedItems });
  }, [slug, flatProducts, router]);

  useEffect(() => {
    if (!kitData) return;
    const price = kitData.items.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    setTotalPrice(price);
  }, [kitData]);

  const updateQty = (index, delta) => {
    setKitData((prev) => {
      if (!prev) return prev;
      const updatedItems = [...prev.items];
      updatedItems[index].qty = Math.max(0, updatedItems[index].qty + delta);
      return {
        ...prev,
        items: updatedItems,
      };
    });
  };

  const handleAddToCart = () => {
    setKit(true);
    addToCart({
      ...kitData,
      qty: 1,
    });
    setAddedProductId(kitData.id);
    setToastTriggered(true);
  };

  useEffect(() => {
    if (kit && toastTriggered) {
      setToast({
        show: true,
        message: (
          <>
            <p> Item added!</p>
            <div className="toast-link-container">
              <a href="/cart?kit=true" className={styles.toastLink}>
                Go to cart
              </a>
            </div>
          </>
        ),
        type: "success",
      });
      setToastTriggered(false);
    }
  }, [kit, toastTriggered]);

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  if (!kitData)
    return (
      <div className={styles.loading}>
        <Image
          height={50}
          width={50}
          alt="loading..."
          src={"/images/loader.gif"}
        />
      </div>
    );

  return (
    <div className={styles.container}>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}
      <h1 className={styles.title}>{kitData.title}</h1>
      <div className={styles.mainContentWrapper}></div>
      <div className={styles.kitWrapper}>
        <div className={styles.leftPane}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.subtitle}>What is Included</h2>
            {/* You could add a simple description here */}
          </div>
          <div className={styles.scrollBox}>
            {kitData.items.map((item, index) => (
              <div key={item.id} className={styles.card}>
                <Image
                  src={item.image || "/images/no_pictures.webp"}
                  alt={item.title}
                  width={150}
                  height={150}
                  className={styles.image}
                />
                <p className={styles.name}>{item.title}</p>
                <p className={styles.desc}>{item.desc}</p>
                <div className={styles.controls}>
                  <button
                    className={styles.button}
                    onClick={() => updateQty(index, -1)}
                  >
                    -
                  </button>
                  <span className={styles.qty}>{item.qty}</span>
                  <button
                    className={styles.button}
                    onClick={() => updateQty(index, 1)}
                  >
                    +
                  </button>
                </div>
                <p className={styles.price}>
                  Subtotal: <span>${(item.price * item.qty).toFixed(2)}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.rightPane}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.summaryText}>
              <p>
                This moving kit is tailored for your space and includes a
                complete set of supplies needed for packing and protection.
              </p>
              <p>
                You can increase or decrease the quantity of items in the kit.
                The price will update accordingly.
              </p>
            </div>
            <div className={styles.totalContainer}>
              <h2 className={styles.totalLabel}>Total:</h2>
              <h2 className={styles.totalPrice}>${totalPrice.toFixed(2)}</h2>
            </div>
            <div className={styles.actions}>
              <button onClick={handleAddToCart} className={styles.primaryBtn}>
                Add to Cart
              </button>
              <button onClick={handleBuyNow} className={styles.secondaryBtn}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mobileSummaryFixed}>
        <div className={styles.summaryContent}>
          <div className={styles.totalContainer}>
            <span className={styles.totalLabel}>Total:</span>
            <h2 className={styles.totalPrice}>${totalPrice.toFixed(2)}</h2>
          </div>
          <div className={styles.mobileActions}>
            <button onClick={handleAddToCart} className={styles.primaryBtn}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovingKit;
