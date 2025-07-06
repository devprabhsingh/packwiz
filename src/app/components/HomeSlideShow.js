"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./slideshow.module.css";

const slides = [
  {
    id: "ct01",
    title: "Clear Packing Tape",
    description: "Strong, transparent tape perfect for sealing boxes securely.",
    img: "/images/clear-tape.webp",
    priceOld: 2.7,
    priceCurrent: 2.43,
    discountPercent: 10,
  },
  {
    id: "mb01",
    title: "Moving Blanket",
    description:
      "Protect your furniture and fragile items during transport with our durable moving blankets.",
    img: "/images/moving_blankets.webp",
    priceOld: 11.99,
    priceCurrent: 10.79,
    discountPercent: 10,
  },
  {
    id: "sw01",
    title: "Shrink Wrap",
    description:
      "Industrial-grade shrink wrap to keep your items tightly packed and safe.",
    img: "/images/shrink_wrap.webp",
    priceOld: 18.95,
    priceCurrent: 14.21,
    discountPercent: 25,
  },
];

export default function HomeSlideshow() {
  const [current, setCurrent] = useState(0);
  const slideCount = slides.length;
  const timeoutRef = useRef(null);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <section
      className={styles.slideshow}
      aria-label="Featured products and delivery information"
    >
      {/* <h2 className={styles.dealsTitle}>
        <Image
          height={50}
          width={50}
          alt="lightning"
          src={"/images/lightning.png"}
        />
        Deals of the month
        <Image
          height={50}
          width={50}
          alt="lightning"
          src={"/images/lightning.png"}
        />
      </h2> */}
      <div className={styles.slidesContainer}>
        {slides.map((slide, index) => (
          <article
            key={slide.id}
            className={`${styles.slide} ${index === current ? styles.active : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slideCount}`}
            hidden={index !== current}
          >
            <div className={styles.imgBox}>
              <div className={styles.onSaleTitle}>
                On Sale
                <Image
                  alt="light"
                  src="/images/lightning.png"
                  height={50}
                  width={50}
                  style={{ transform: "rotateZ(30deg)" }}
                />
              </div>
              <Link href={`/ItemDetail/${slide.id}`}>
                <img
                  src={slide.img}
                  alt={slide.title}
                  className={styles.slideImage}
                  width={250}
                  height={150}
                />
              </Link>
              <div style={{ padding: "0 15px" }}>
                <div className={styles.pricing}>
                  <span className={styles.oldPrice}>
                    ${slide.priceOld.toFixed(2)}
                  </span>
                  <span className={styles.discount}>
                    {slide.discountPercent}% OFF
                  </span>
                </div>
                <div className={styles.currentPrice}>
                  Now only <strong>${slide.priceCurrent.toFixed(2)}</strong>
                </div>
                <div className={styles.promo}>Hurry up, 30 days only!</div>
              </div>
            </div>
            <div style={{ padding: "0 15px 0 0" }}>
              <div className={styles.slideContent}>
                <h3 className={styles.slideTitle}>{slide.title}</h3>
                <div className={styles.slideDescription}>
                  {slide.description}
                </div>
              </div>
              <a
                href={`/ItemDetail/${slide.id}`}
                className={styles.btn}
                aria-label={`View ${slide.title} product page`}
              >
                View Product
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
