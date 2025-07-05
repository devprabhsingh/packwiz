import Image from "next/image";
import styles from "./HeroIntro.module.css";

export default function HeroIntro() {
  return (
    <section className={styles.heroIntro}>
      <div className={styles.logoBox}>
        <Image
          src="/images/logo-shadow.webp"
          alt="Packwiz Logo"
          width={350}
          height={120}
          priority
        />
      </div>
      <div className={styles.contentBox}>
        <h1 className={styles.heading}>Affordable Packing Supplies in GTA</h1>
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
            <p>Boxes, tape, bubble wrap & more.</p>
          </div>
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
