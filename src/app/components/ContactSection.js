"use client";

import { useState, useEffect } from "react";
import RequestForm from "./RequestForm";

export default function ContactSection() {
  const phone = "+1 (437) 775-7688";
  const email = "isprabhsingh@gmail.com";
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  useEffect(() => {
    if (window.innerWidth >= 700) {
      const el = document.getElementById("contact-form-header");
      if (el) el.style.display = "none";
    }
  }, []);

  return (
    <div style={styles.section}>
      <h2 style={styles.title}>Need custom solutions. Let's connect.</h2>
      <p style={styles.subtitle}>
        Get in touch with us the way that works best for you.
      </p>
      <div style={styles.container}>
        <div style={styles.leftPane}>
          <RequestForm />
        </div>
        <div style={styles.rightPane}>
          <h3 style={styles.contactTitle}>Contact Information</h3>

          <div className="info-wrapper" style={styles.infoWrapper}>
            <div style={styles.infoCard}>
              <div style={styles.iconText}>
                <span role="img" aria-label="phone" style={styles.icon}>
                  📞
                </span>
                <a href="tel:+14377757688" style={styles.linkText}>
                  +1 (437) 775-7688
                </a>
              </div>
              <button
                onClick={() => copyToClipboard(phone, "phone")}
                style={styles.copyButton}
                title="Copy phone"
              >
                📋
              </button>
            </div>

            <div style={styles.infoCard}>
              <div style={styles.iconText}>
                <span role="img" aria-label="email" style={styles.icon}>
                  📧
                </span>
                <a href="mailto:info@packwiz.ca" style={styles.linkText}>
                  info@packwiz.ca
                </a>
              </div>
              <button
                onClick={() => copyToClipboard(email, "email")}
                style={styles.copyButton}
                title="Copy email"
              >
                📋
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  section: {
    padding: "60px 20px",
    backgroundColor: "#f9f9f9",
    fontFamily: "'Segoe UI', sans-serif",
  },
  infoWrapper: {
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "30px",
  },

  infoCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    width: "90%",
    borderRadius: "12px",
    backgroundColor: "#fafafa",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.2s ease",
  },

  iconText: {
    display: "flex",
    alignItems: "center",

    fontSize: "1rem",
  },

  icon: {
    fontSize: "1.25rem",
  },

  linkText: {
    color: "#0070f3",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "1rem",
  },

  copyButton: {
    backgroundColor: "#f0f0f0",
    border: "none",
    borderRadius: "8px",
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background 0.3s ease",
  },

  title: {
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "40px",
    fontSize: "1.1rem",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  leftPane: {
    flex: "1 1 400px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
  },
  rightPane: {
    flex: "1 1 300px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  formTitle: {
    marginBottom: "20px",
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#333",
  },
  contactTitle: {
    marginBottom: "20px",
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#333",
  },
  contactCard: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  label: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "4px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  link: {
    fontSize: "1.1rem",
    color: "#0070f3",
    textDecoration: "none",
    fontWeight: 500,
  },
  copyButton: {
    backgroundColor: "#eee",
    border: "none",
    borderRadius: "6px",
    padding: "4px 8px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background 0.2s ease",
  },
  copiedMsg: {
    fontSize: "0.85rem",
    color: "green",
    marginLeft: "4px",
  },
};
