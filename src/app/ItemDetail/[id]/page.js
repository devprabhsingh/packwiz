"use client";
import React, { useState, useEffect } from "react";
import "../ItemDetail.css";
import { products, categories, reviewList } from "@/data/numberSheet";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { getProductCat } from "@/utils";
import BackLinks from "@/app/components/BackLinks";
import dynamic from "next/dynamic";
import Link from "next/link";
import ReviewSection from "@/app/components/ReviewSection";
import Toast from "@/app/components/Toast";

const ProductList = dynamic(() => import("../../components/ProductList"));
const flatPs = products.flat();

export default function ItemDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedProductId, setAddedProductId] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Find item on id change
  useEffect(() => {
    const foundItem = flatPs.find((p) => p.id === id) || null;
    setItem(foundItem);
    setQuantity(1); // reset quantity when item changes
  }, [id]);

  // Calculate price tier based on quantity and price table
  const getPrice = (qty, p) => {
    if (!p) return 0;
    if (qty <= 4) return p.tier1;
    if (qty <= 9) return p.tier2;
    if (qty <= 24) return p.tier3;
    return p.tier4;
  };

  const price = item ? getPrice(quantity, item.priceTable) : 0;

  // Reset addedProductId after 1 second
  useEffect(() => {
    if (addedProductId !== null) {
      const timer = setTimeout(() => setAddedProductId(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [addedProductId]);

  // Quantity control handlers
  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    if (!item) return;
    const cartItem = { ...item, qty: quantity, price };
    addToCart(cartItem);
    setAddedProductId(item.id);
    setToast({
      show: true,
      message: (
        <>
          Item added!{" "}
          <a
            href="/cart"
            style={{ color: "#fff", textDecoration: "underline" }}
          >
            Go to cart
          </a>
        </>
      ),
      type: "success",
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  const handleCloseToast = () => setToast((t) => ({ ...t, show: false }));

  if (!item) return <div>Loading item...</div>;

  // Compute similar products and category info
  const letter = id.slice(0, id.length - 1);
  const similarProducts = flatPs.filter(
    (p) => p.id.startsWith(letter) && p.id !== id
  );

  const category = categories[getProductCat(item.id)] || { unit: "" };
  const reviews = reviewList.filter((r) => r.category === item.title);

  // Price tiers for table display
  const priceTiers = [
    {
      label: "Upto 4",
      value: item.priceTable.tier1,
      condition: quantity <= 4,
    },
    {
      label: "5 - 9",
      value: item.priceTable.tier2,
      condition: quantity > 4 && quantity <= 9,
    },
    {
      label: "10 - 24",
      value: item.priceTable.tier3,
      condition: quantity > 9 && quantity <= 24,
    },
    { label: "25+", value: item.priceTable.tier4, condition: quantity > 24 },
  ];

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
      <div className="item-detail-container">
        <div className="image-section">
          <img src={item.image} alt={item.title} />
        </div>
        <div className="info-section">
          <h1>{item.title}</h1>
          <p className="description">{item.desc}</p>
          <p>
            <strong>Size:</strong> {item.size}
          </p>

          <table className="price-table">
            <thead>
              <tr>
                <th>{category.unit}</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {priceTiers.map((row, i) => (
                <tr key={i} className={row.condition ? "highlight" : ""}>
                  <td>{row.label}</td>
                  <td>${row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <h4>
              Effective Price: ${price} X {quantity} ={" "}
              <span style={{ color: "green" }}>
                ${(price * quantity).toFixed(2)}
              </span>
            </h4>
          </div>

          <div className="qty-controls">
            <button onClick={decreaseQty}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQty}>+</button>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart" onClick={handleAddToCart}>
              {addedProductId === item.id ? "Added!" : "Add to Cart"}
            </button>
            <button className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>

        {item.features && (
          <div className="features-section">
            <h2>Features</h2>
            {item.features.map((feature, i) => (
              <p key={i}>
                <img src="/images/check.png" alt="check" />
                {feature}
              </p>
            ))}
          </div>
        )}
      </div>

      {similarProducts.length > 0 ? (
        <ProductList productList={similarProducts} modified={true} />
      ) : (
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            margin: "10px 10px 0 10px",
            padding: "10px 0",
          }}
        >
          <Link
            href="/products"
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
              margin: "auto",
            }}
          >
            Explore Other Products
          </Link>
        </div>
      )}

      <ReviewSection reviewList={reviews} headline={"Customer Reviews"} />
    </>
  );
}
