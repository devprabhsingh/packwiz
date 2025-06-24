"use client";
import React, { useState, useEffect } from "react";
import "../ItemDetail.css";
import { products, categories, reviewList } from "@/data/numberSheet";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { getProductCat } from "@/utils";
import BackLinks from "@/app/components/BackLinks";
import ProductList from "@/app/components/ProductList";
import Link from "next/link";
import ReviewSection from "@/app/components/ReviewSection";
import Toast from "@/app/components/Toast";

export default function ItemDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const flatPs = products.flat();
  const letter = id.slice(0, id.length - 1);
  const similarProducts = flatPs.filter(
    (p) => p.id.startsWith(letter) && p.id !== id
  );
  const item = flatPs.find((item) => item.id == id);
  const [price, setPrice] = useState(item.priceTable.tier1);
  const [quantity, setQuantity] = useState(1);
  const [addedProductId, setAddedProductId] = useState(null);
  const { addToCart } = useCart();
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  if (!item) {
    return <div>Item not found.</div>;
  }

  const getPrice = (qty, p) => {
    if (qty <= 4) return p.tier1;
    if (qty <= 9) return p.tier2;
    if (qty <= 24) return p.tier3;
    return p.tier4;
  };

  useEffect(() => {
    setPrice(getPrice(quantity, item.priceTable));
  }, [quantity]);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    const price = getPrice(quantity, item.priceTable);
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
  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  useEffect(() => {
    if (addedProductId !== null) {
      const timer = setTimeout(() => setAddedProductId(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [addedProductId]);

  const category = categories[getProductCat(item.id)];

  const reviews = reviewList.filter((r) => r.category === item.title);
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
              {[
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
                {
                  label: "25+",
                  value: item.priceTable.tier4,
                  condition: quantity > 24,
                },
              ].map((row, i) => (
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
              <span style={{ color: "green" }}>${price * quantity}</span>
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
                <img src="/images/check2.png" alt="check" />
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
