import { AlignCenter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <i style={{ color: "grey", fontSize: "13px" }}>
        <sup>*</sup>Free delivery within GTA on order above $50 only.
      </i>
      <div style={styles.footerContent}>
        <div style={styles.footerSection}>
          <h4 style={styles.footerTitle}>Quick Links</h4>
          <a href="/" style={styles.footerLink}>
            Home
          </a>
          <a href="/products" style={styles.footerLink}>
            Products
          </a>
          <a href="/contact" style={styles.footerLink}>
            Contact
          </a>
          <a href="/track-order" style={styles.footerLink}>
            Track order
          </a>
        </div>

        <div style={styles.footerSection}>
          <h4 style={styles.footerTitle}>Contact</h4>
          <p style={styles.footerText}>📞 +1 (437) 775-7688</p>
          <p style={styles.footerText}>📧 info@packwiz.ca</p>
        </div>

        <div style={styles.footerSection}>
          <h4 style={styles.footerTitle}>Follow Us</h4>
          <a href="#" style={styles.footerLink}>
            Instagram
          </a>
          <a href="#" style={styles.footerLink}>
            Facebook
          </a>
          <a href="#" style={styles.footerLink}>
            LinkedIn
          </a>
        </div>
      </div>

      <div style={styles.footerBottom}>
        <p style={styles.footerCopyright}>
          © {new Date().getFullYear()}{" "}
          <img
            height="50px"
            width="140px"
            src="/images/logo.png"
            alt="Packwiz"
          />
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
