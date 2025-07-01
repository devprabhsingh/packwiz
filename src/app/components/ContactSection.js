"use client";

import { useState, useEffect } from "react";
import RequestForm from "./RequestForm";
import Image from "next/image";

export default function ContactSection() {
  const phone = "+1 (437) 775-7688";
  const email = "info@packwiz.ca";
  const [copied, setCopied] = useState(null);
  const [showFormHeader, setShowFormHeader] = useState(true);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 700) {
      setShowFormHeader(false);
    }
  }, []);

  return (
    <div style={styles.section}>
      <h2 style={styles.title}>Need custom solutions? Let&apos;s connect.</h2>
      <p style={styles.subtitle}>
        Get in touch with us the way that works best for you.
      </p>
      <div style={styles.container}>
        <div style={styles.leftPane}>
          {showFormHeader && (
            <h3 style={styles.formTitle} id="contact-form-header">
              Request a Quote
            </h3>
          )}
          <RequestForm />
        </div>
        <div style={styles.rightPane}>
          <h3 style={styles.contactTitle}>Contact Information</h3>

          {[
            {
              label: "Phone",
              value: phone,
              href: `tel:${phone.replace(/[^+\d]/g, "")}`,
              icon: "/images/call.png",
              type: "phone",
            },
            {
              label: "Email",
              value: email,
              href: `mailto:${email}`,
              icon: "/images/email.png",
              type: "email",
            },
          ].map((contact, index) => (
            <div key={index} style={styles.infoCard}>
              <div style={styles.iconText}>
                <Image
                  height={30}
                  width={30}
                  src={contact.icon}
                  alt={contact.label}
                  style={styles.icon}
                />
                <a href={contact.href} style={styles.linkText}>
                  {contact.value}
                </a>
              </div>
              <button
                onClick={() => copyToClipboard(contact.value, contact.type)}
                style={styles.copyButton}
                title={`Copy ${contact.label}`}
              >
                {copied === contact.type ? "✅" : "📋"}
              </button>
            </div>
          ))}
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
  infoCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    width: "90%",
    borderRadius: "12px",
    backgroundColor: "#fafafa",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
    marginBottom: "20px",
  },
  iconText: {
    display: "flex",
    alignItems: "center",
    fontSize: "1rem",
  },
  icon: {
    marginRight: "10px",
  },
  linkText: {
    color: "#0070f3",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "1rem",
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
};
