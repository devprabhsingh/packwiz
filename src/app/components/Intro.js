import Image from "next/image";
import styles from "./HeroIntro.module.css";

export default function HeroIntro() {
  return (
    <section className={styles.heroIntro}>
      <div className={styles.proudbox}>
        <span style={{ fontWeight: "bold" }}>We are proudly</span>
        <Image
          src="/images/animflag.webp"
          loading="lazy"
          alt="Canadian"
          width={40}
          height={40}
          style={{ margin: "10px" }}
        />
      </div>
      <div className={styles.contentBox}>
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
            <p>On orders over $50.</p>
          </div>
          <div className={styles.card}>
            <h3>Trusted Quality</h3>
            <p>Boxes, tapes & more.</p>
          </div>
        </div>
        <div className={styles.buttonRow}>
          <a href="tel:+14377757688" className={styles.actionBtn}>
            +1 437-775-7688
          </a>
          <p style={{ margin: "0 20px" }}>OR</p>
          <a href="/products" className={styles.actionBtn}>
            Explore Products
          </a>
        </div>
        <p className={styles.mission}>
          Based in Toronto, packing pros with logistics experience.
        </p>

        <p className={styles.closing}>
          <em>Your move is our mission.</em>
        </p>
      </div>
    </section>
  );
}
