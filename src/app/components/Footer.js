import React from "react";
import Link from "next/link";
import Image from "next/image";
const Footer = () => {
  return (
    <footer style={styles.footer}>
      <i style={{ color: "grey", fontSize: "13px" }}>
        <sup>*</sup>Free delivery within GTA on order above $50 only.
      </i>
      <div style={styles.footerContent}>
        <div style={styles.footerSection}>
          <h4 style={styles.footerTitle}>Quick Links</h4>
          <Link href="/" style={styles.footerLink}>
            Home
          </Link>
          <Link href="/products" style={styles.footerLink}>
            Products
          </Link>
          <Link href="/contact" style={styles.footerLink}>
            Contact
          </Link>
          <Link href="/track-order" style={styles.footerLink}>
            Track order
          </Link>
        </div>

        <div style={styles.footerSection}>
          <h4 style={styles.footerTitle}>Contact</h4>
          <p style={styles.footerText}>
            <Image height={30} width={30} alt="call" src="/images/call.png" />

            <a href="tel:+14377757688" style={styles.linkText}>
              +1 (437) 775-7688
            </a>
          </p>
          <p style={styles.footerText}>
            <Image height={30} width={30} alt="email" src="/images/email.png" />
            <a href="mailto:info@packwiz.ca" style={styles.linkText}>
              info@packwiz.ca
            </a>
          </p>
        </div>

        <div style={styles.footerSection}>
          <h4 style={styles.footerTitle}>Follow Us</h4>
          <Link
            href="https://www.instagram.com/pack_wiz/"
            style={styles.footerLink}
          >
            Instagram
          </Link>
          <Link
            href="https://www.facebook.com/profile.php?id=61577687830138"
            style={styles.footerLink}
          >
            Facebook
          </Link>
        </div>
      </div>

      <div style={styles.footerBottom}>
        <p style={styles.footerCopyright}>
          © {new Date().getFullYear()}{" "}
          <Image height={50} width={140} src="/images/logo.png" alt="Packwiz" />
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
const styles = {
  footer: {
    backgroundColor: "#f9f9f9",
    padding: "40px 20px 20px",
    borderTop: "1px solid #eee",
    fontFamily: "sans-serif",
    borderRadius: "24px 24px 0 0",
    boxShadow: "0 -4px 12px rgba(0,0,0,0.05)",
    marginTop: "10px",
  },
  footerContent: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  footerSection: {
    flex: "1 1 200px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  footerTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#222",
  },
  footerLink: {
    color: "#0070f3",
    textDecoration: "none",
    fontSize: "0.95rem",
  },
  footerText: {
    fontSize: "0.95rem",
    color: "#444",
    margin: "2px",
    display: "flex",
    alignItems: "center",
  },
  linkText: {
    color: "#0070f3",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "1rem",
    marginLeft: "10px",
  },
  footerBottom: {
    marginTop: "40px",
    textAlign: "center",
    fontSize: "0.85rem",
    color: "#888",
  },
  footerCopyright: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
