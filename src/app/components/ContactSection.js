"use client";

import { useState, useEffect } from "react";
import RequestForm from "./RequestForm";
import Image from "next/image";
import styles from "./contact.module.css";

export default function ContactSection() {
  const phone = "+1 (437) 775-7688";
  const part1 = "info";
  const email = "@packwiz.ca";
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
    <div className={styles.section}>
      <h2 className={styles.title}>
        Need custom solutions? Let&apos;s connect.
      </h2>
      <p className={styles.subtitle}>
        Get in touch with us the way that works best for you.
      </p>
      <div className={styles.container}>
        <div className={styles.leftPane}>
          {showFormHeader && (
            <h3 className={styles.formTitle} id="contact-form-header">
              Request a Quote
            </h3>
          )}
          <RequestForm />
        </div>
        <div className={styles.rightPane}>
          <h3 className={styles.contactTitle}>Contact Information</h3>

          {[
            {
              label: "Phone",
              value: phone,
              href: `tel:${phone.replace(/[^+\d]/g, "")}`,
              icon: "/images/call.webp",
              type: "phone",
            },
            {
              label: "Email",
              value: "Click to Email",
              href: `mailto:${part1 + email}`,
              icon: "/images/email.webp",
              type: "email",
            },
          ].map((contact, index) => (
            <div key={index} className={styles.infoCard}>
              <div className={styles.iconText}>
                <Image
                  height={30}
                  width={30}
                  src={contact.icon}
                  alt={contact.label}
                  className={styles.icon}
                />
                <a href={contact.href} className={styles.linkText}>
                  {contact.value}
                </a>
              </div>
              <button
                onClick={() => copyToClipboard(contact.value, contact.type)}
                className={styles.copyButton}
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
