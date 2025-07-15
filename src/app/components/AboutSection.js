import Image from "next/image";
import React from "react";
import WhyChooseUs from "./WhyChooseUs";
import styles from "./about.module.css";

const AboutSection = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutText}>
          <Image height={100} width={300} src="/images/logo.webp" alt="logo" />

          <section className={styles.aboutS}>
            <p>
              At <strong>Packwiz</strong>, we know moving can be stressful — but
              finding the right packing supplies shouldn’t be. That’s why we
              offer:
            </p>
            <ul>
              <li>
                <strong>Affordable, high-quality packing materials</strong>{" "}
                delivered straight to your door.
              </li>
              <li>
                <strong>Transparent pricing</strong> with{" "}
                <strong>free GTA delivery</strong> on orders over $50.
              </li>
              <li>
                <strong>Fast response times</strong> and easy online ordering.
              </li>
            </ul>

            <p>
              Founded in Toronto by experts with backgrounds in moving,
              restoration, and logistics, we understand how important reliable
              supplies are. We proudly serve the Greater Toronto Area including
              Mississauga, Brampton, Scarborough, and Etobicoke.
            </p>

            <p>
              Whether you’re a student, family, or business, Packwiz is your
              trusted source for:
            </p>
            <ul>
              <li>Moving boxes</li>
              <li>Bubble wrap</li>
              <li>Packing tape</li>
              <li>Complete moving kits</li>
            </ul>

            <p>
              Your move is our mission — protecting what matters to you is what
              matters to us.
            </p>
            <a href="/products" className={styles.aboutButton}>
              Browse Products
            </a>
          </section>
          <div className={styles.aboutImage}>
            <img
              src="/images/aboutimg.webp"
              alt="About Packwiz"
              loading="lazy"
            />
          </div>
        </div>

        <WhyChooseUs />
      </div>
    </section>
  );
};

export default AboutSection;
