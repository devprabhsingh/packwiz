// components/CashOnDeliverySection.js

import Image from "next/image";
import React from "react";

const CashOnDeliverySection = ({
  orderStatus,
  loading,
  handleCOD,
  buttonDisabled,
}) => {
  return (
    <div style={styles.codMethodWrapper}>
      <div style={styles.codTitle} id="cod-title">
        <Image height={25} width={25} src="/images/cod.png" alt="cod" />
        <span
          id="cod-title-cod"
          style={{ fontSize: "14px", color: "#4e4e4e", fontWeight: "700" }}
        >
          Cash on Delivery (COD)
        </span>
      </div>

      <div style={styles.codDialog} id="cod-method">
        <div
          id="cod-inner-div"
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          <Image height={40} width={40} src="/images/cod.png" alt="cod" />
          <p>Cash on Delivery (COD) selected</p>
        </div>
        <p id="cod-info" style={{ marginTop: "0.5rem" }}>
          Cash on Delivery (COD) allows you to pay the delivery agent upon
          receiving your order. You can pay using cash or a debit/credit card.
          This secure option lets you place your order without upfront payment.
        </p>
      </div>

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            height={40}
            width={40}
            src="/images/loader.gif"
            alt="loading..."
          />
        </div>
      ) : (
        <p>{orderStatus}</p>
      )}

      {loading ? (
        <p style={{ textAlign: "center" }}>Processing...</p>
      ) : (
        <button
          onClick={handleCOD}
          style={buttonDisabled ? styles.disabledStyle : styles.buttonStyle}
        >
          Submit your order
        </button>
      )}
    </div>
  );
};

const styles = {
  codTitle: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "1rem",
    border: "2px solid white",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
  },
  codDialog: {
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "0.5rem",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    marginTop: "1rem",
    color: "#4e4e4e",
    fontSize: "14px",
  },
  disabledStyle: {
    backgroundColor: "#ff6f20",
    color: "white",
    width: "100%",
    padding: "1.25rem",
    marginTop: "0.5rem",
    borderRadius: "0.375rem",
    fontWeight: "bold",
    opacity: 1,
    cursor: "pointer",
    transition: "opacity 0.3s ease",
    opacity: 0.5,
    animation: "pulse 2s infinite",
    cursor: "not-allowed",
  },
  buttonStyle: {
    outline: "none",
    border: "none",
    backgroundColor: "#ff6f20",
    color: "white",
    width: "100%",
    padding: "1.25rem",
    marginTop: "0.5rem",
    borderRadius: "0.375rem",
    fontWeight: "bold",
    fontSize: "16px",
    opacity: 1,
    cursor: "pointer",
    transition: "opacity 0.3s ease",
  },
};
export default CashOnDeliverySection;
