"use client";
import React, { useCallback } from "react";

export default function ScrollButton() {
  const handleScroll = useCallback(() => {
    const section = document.getElementById("product-grid");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div
      className="scroll-btn"
      onClick={handleScroll}
      style={styles.scrollBtn}
      role="button"
      tabIndex={0}
      aria-label="Scroll down"
    >
      <img
        src="/images/darrow.webp"
        alt="scroll down"
        style={styles.scrollIcon}
        loading="lazy"
      />
    </div>
  );
}

const styles = {
  scrollBtn: {
    width: "50px",
    margin: "20px auto",
    cursor: "pointer",
  },
  scrollIcon: {
    width: "40px",
    border: "3px solid white",
    borderRadius: "50%",
  },
};
