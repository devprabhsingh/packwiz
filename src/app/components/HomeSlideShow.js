"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
// import styles from "./FirstStyle.module.css";
import styles from "./slideshow.module.css";
import { slugify } from "@/utils/slugify";
const slides = [
  {
    id: "ct01",
    title: "Clear Packing Tape",
    description: "Strong, transparent tape perfect for sealing boxes securely.",
    img: "/images/clear-tape-slide.png",
    priceOld: 1.89,
    priceCurrent: 1.7,
    discountPercent: 10,
  },
  {
    id: "mb01",
    title: "Moving Blankets",
    description:
      "Protect your furniture and fragile items during transport with our durable moving blankets.",
    img: "/images/moving_blankets-slide.png",
    priceOld: 11.99,
    priceCurrent: 10.79,
    discountPercent: 10,
  },
  {
    id: "sw01",
    title: "Pallet Wrap",
    description:
      "Industrial-grade shrink wrap to keep your items tightly packed and safe.",
    img: "/images/shrink_wrap-slide.png",
    priceOld: 16.55,
    priceCurrent: 12.41,
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
    <>
      <section
        className={styles.slideshow}
        aria-label="Featured products and delivery information"
      >
        <h2 className={styles.dealsTitle}>
          <Image
            height={40}
            width={40}
            alt="lightning"
            src="/images/lightning.png"
            className={styles.icon}
          />
          <span>Deals of the Month</span>
          <Image
            height={40}
            width={40}
            alt="lightning"
            src="/images/lightning.png"
            className={styles.icon}
          />
        </h2>

        <div className={styles.slidesContainer}>
          {slides.map((slide, index) => (
            <article
              key={slide.id}
              className={`${styles.slide} ${
                index === current ? styles.active : ""
              }`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slideCount}`}
              hidden={index !== current}
            >
              <div className={styles.card}>
                <div className={styles.imgBox}>
                  <Link href={`/item-details/${slugify(slide.title)}`}>
                    <Image
                      src={slide.img}
                      alt={slide.title}
                      className={styles.slideImage}
                      width={300}
                      height={200}
                      loading="eager"
                    />
                  </Link>
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.discount}>
                    {slide.discountPercent}% OFF
                  </div>

                  <h3 className={styles.slideTitle}>{slide.title}</h3>

                  <p className={styles.slideDescription}>{slide.description}</p>

                  <div className={styles.pricing}>
                    <div className={styles.priceBox}>
                      <span className={styles.currentPrice}>
                        <span className={styles.oldPrice}>
                          ${slide.priceOld.toFixed(2)}
                        </span>
                        ${slide.priceCurrent.toFixed(2)}
                      </span>
                    </div>
                    <Link
                      href={`/item-details/${slugify(slide.title)}`}
                      className={styles.btn}
                      aria-label={`View ${slide.title} product page`}
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
