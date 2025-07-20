import Image from "next/image";
import styles from "./FirstStyle.module.css";

export default function HeroIntro() {
  return (
    <section className={styles.heroIntro}>
      <div className={styles.proudbox}>
        <span style={{ fontWeight: "bold" }}>We are proudly</span>
        <Image
          src="/images/animflag.webp"
          alt="Canadian"
          width={40}
          height={40}
          style={{ margin: "10px" }}
        />
      </div>
      <div className={styles.introDiv}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "#2d3748",
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          Affordable Packing Supplies in GTA
        </h1>
        <p className={styles.tagline}>
          Moving is tough — finding supplies shouldn’t be.
        </p>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Fast Delivery</h3>
            <p>Across the Greater Toronto Area.</p>
          </div>
          <div className={styles.card}>
            <h3>Free Shipping</h3>
            <p>
              On orders over $100.<sup>*</sup>
            </p>
          </div>
          <div className={styles.card}>
            <h3>Trusted Quality</h3>
            <p>Premium Boxes, Durable Tapes & More</p>
          </div>
        </div>
        <div className={styles.buttonRow}>
          <a href="/products" className={styles.actionBtn}>
            Explore Products
          </a>
          <p style={{ margin: "0 20px" }}>OR</p>
          <a href="tel:+14377757688" className={styles.actionBtn}>
            +1 437-775-7688
          </a>
        </div>
        <p className={styles.mission}>
          Stress-Free Packing: Top-Quality Supplies, Unbeatable Prices
        </p>

        <p className={styles.closing}>
          <em>Your move is our mission.</em>
        </p>
      </div>
    </section>
  );
}
