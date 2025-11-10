"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import BackLinks from "@/app/components/BackLinks";
import dynamic from "next/dynamic";
import Link from "next/link";
import ReviewSection from "@/app/components/ReviewSection";
import Toast from "@/app/components/Toast";
import styles from "../ItemDetail.module.css";
import Image from "next/image";
import products from "@/data/products";
import { slugify } from "@/utils/slugify";
const ProductList = dynamic(() => import("../../components/ProductList"));

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
const ItemDetailClient = ({ category, reviews }) => {
  const router = useRouter();
  const { slug } = useParams();
  const { addToCart } = useCart();

  const availableSizes = ["S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState(availableSizes[0]);

  const [quantity, setQuantity] = useState(1);
  const [addedProductId, setAddedProductId] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [similarProducts, setSimilarProducts] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const [priceTiers, setPriceTiers] = useState([]);

  // Flatten the products array once
  const flatProducts = useMemo(() => products.flat(), []);

  // Effect to find the product and set related states based on the slug
  useEffect(() => {
    const product = flatProducts.find((p) => slugify(p.title) === slug);

    if (!product) {
      router.push("/404");
      return;
    }

    setSelectedProduct(product);
    setSelectedImage(product.image);

    // Find the category and similar products
    const parentCategory = products.find((cat) =>
      cat.some((item) => item.id === product.id)
    );
    if (parentCategory) {
      setCategoryData({
        name: parentCategory[0].categoryName || "Products",
        unit: "Pcs",
      }); // Assuming category name can be derived
      setSimilarProducts(parentCategory.filter((p) => p.id !== product.id));

      // Generate price tiers from priceTable
      const tiers = Object.entries(product.priceTable || {}).map(
        ([key, value]) => {
          let label;
          if (key === "tier1") label = "Upto 4";
          else if (key === "tier2") label = "5 - 9";
          else if (key === "tier3") label = "10 - 24";
          else if (key === "tier4") label = "25+";
          return { label, value };
        }
      );
      setPriceTiers(tiers);
    }
  }, [slug, flatProducts, router]);

  // Price and final price calculation
  const { price, finalPrice } = useMemo(() => {
    if (!selectedProduct || !selectedProduct.priceTable)
      return { price: 0, finalPrice: 0 };
    let currentPrice = 0;
    if (quantity <= 4) currentPrice = selectedProduct.priceTable.tier1;
    else if (quantity <= 9) currentPrice = selectedProduct.priceTable.tier2;
    else if (quantity <= 24) currentPrice = selectedProduct.priceTable.tier3;
    else currentPrice = selectedProduct.priceTable.tier4;

    const discountedPrice = Number(
      (
        currentPrice -
        (currentPrice * (selectedProduct.discount || 0)) / 100
      ).toFixed(2)
    );
    return { price: currentPrice, finalPrice: discountedPrice };
  }, [quantity, selectedProduct]);

  useEffect(() => {
    if (addedProductId !== null) {
      const timer = setTimeout(() => setAddedProductId(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [addedProductId]);

  const increaseQty = useCallback(
    () => setQuantity((prevQty) => prevQty + 1),
    []
  );
  const decreaseQty = useCallback(
    () => setQuantity((prevQty) => Math.max(1, prevQty - 1)),
    []
  );

  const handleAddToCart = useCallback(() => {
    if (!selectedProduct) return;
    const cartItem = {
      ...selectedProduct,
      qty: quantity,
      price: price,
      selectedSize,
      finalPrice: finalPrice,
    };
    addToCart(cartItem);
    setAddedProductId(selectedProduct.id);
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
  }, [selectedProduct, quantity, price, finalPrice, addToCart, selectedSize]);

  const handleBuyNow = useCallback(() => {
    handleAddToCart();
    router.push("/cart");
  }, [handleAddToCart, router]);

  const handleCloseToast = useCallback(
    () => setToast((prevToast) => ({ ...prevToast, show: false })),
    []
  );

  const getPriceTierCondition = useCallback(
    (label) => {
      if (label === "Upto 4") return quantity <= 4;
      if (label === "5 - 9") return quantity > 4 && quantity <= 9;
      if (label === "10 - 24") return quantity > 9 && quantity <= 24;
      if (label === "25+") return quantity > 24;
      return false;
    },
    [quantity]
  );

  if (!selectedProduct) {
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
  }

  return (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}

      {/* BackLinks component now needs category and item from state */}
      <BackLinks
        category={categoryData}
        nextTitle={selectedProduct.title}
        nextId={selectedProduct.id}
      />

      <div className={styles.itemDetailContainer}>
        {/* ... (rest of the component remains largely the same, but uses selectedProduct, selectedImage, similarProducts from state) */}
        <div className={styles.imageSection}>
          <Image
            height={300}
            width={350}
            src={selectedImage}
            alt={selectedProduct.title}
            priority
          />
          <div className={styles.thumbnailContainer}>
            <Image
              src={selectedProduct.image}
              alt="Thumbnail 1"
              height={120}
              width={100}
              className={styles.thumbnail}
              id={
                selectedImage === selectedProduct.image
                  ? styles.highlightedImg
                  : ""
              }
              onClick={() => setSelectedImage(selectedProduct.image)}
            />
            {selectedProduct.image2 && (
              <Image
                src={selectedProduct.image2}
                alt={selectedProduct.image2}
                height={120}
                width={100}
                className={styles.thumbnail}
                id={
                  selectedImage === selectedProduct.image2
                    ? styles.highlightedImg
                    : ""
                }
                onClick={() => setSelectedImage(selectedProduct.image2)}
              />
            )}
            {selectedProduct.image3 && (
              <Image
                src={selectedProduct.image3}
                alt={selectedProduct.image3}
                height={120}
                width={100}
                className={styles.thumbnail}
                id={
                  selectedImage === selectedProduct.image3
                    ? styles.highlightedImg
                    : ""
                }
                onClick={() => setSelectedImage(selectedProduct.image3)}
              />
            )}
          </div>
          {selectedProduct.id.startsWith("bx") && (
            <div className={styles.ect}>
              <h4>What is ECT?</h4> ECT (Edge Crush Test) measures stacking
              strength of a box. A 32 ECT box can withstand 32 pounds of
              pressure per inch, ensuring your items are protected during
              stacking and shipping.
            </div>
          )}
        </div>

        <div className={styles.infoSection}>
          <h1>{selectedProduct.title}</h1>
          <p className={styles.description}>{selectedProduct.desc}</p>
          <p>
            <strong>Size: </strong>
            {selectedProduct.id.startsWith("b")
              ? selectedProduct.size
                  .split("*")
                  .map(
                    (val, i) =>
                      `${val}${i === 0 ? '"L' : i === 1 ? '"W' : '"H'}`
                  )
                  .join(" × ")
              : selectedProduct.size}
          </p>
          <p className={styles.inStock}>In Stock</p>

          <table className={styles.priceTable}>
            <thead>
              <tr>
                <th>{category?.unit || "Pcs"}</th>
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
            {!selectedProduct.discount ? (
              <h4>
                Effective Price: ${price.toFixed(2)} X {quantity} ={" "}
                <span style={{ color: "green" }}>
                  ${(price * quantity).toFixed(2)}
                </span>
              </h4>
            ) : (
              <div>
                <span className={styles.discountTag}>
                  {selectedProduct.discount}% Off
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

          {selectedProduct.id.startsWith("gl") && (
            <SizeSelector
              sizes={availableSizes}
              selectedSize={selectedSize}
              onSelectSize={(size) => setSelectedSize(size)}
            />
          )}

          <div className={styles.qtyControls}>
            <button onClick={decreaseQty}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQty}>+</button>
          </div>

          <div className={styles.actionButtons}>
            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
              disabled={addedProductId === selectedProduct.id}
            >
              {addedProductId === selectedProduct.id ? "Added!" : "Add to Cart"}
            </button>
            <button className={styles.buyNowButton} onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
        <div className={styles.thirdDiv}>
          {selectedProduct.specs && (
            <div className={styles.specCard}>
              <h2 className={styles.specTitle}>Specifications</h2>
              <table className={styles.specTable}>
                <tbody>
                  {Object.entries(selectedProduct.specs).map(([key, value]) => (
                    <tr key={key}>
                      <td className={styles.specLabel}>{key}</td>
                      <td className={styles.specValue}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedProduct.features && selectedProduct.features.length > 0 && (
            <div className={styles.featuresSection}>
              <h2>Features</h2>
              {selectedProduct.features.map((feature, i) => (
                <p key={i}>
                  <Image
                    height={50}
                    width={50}
                    src="/images/check.webp"
                    alt="check icon"
                  />
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

      {/* Assuming a separate reviews file/function will provide review data */}
      <ReviewSection reviewList={reviews} headline="Customer Reviews" />
    </>
  );
};

export default ItemDetailClient;
